// Measure every template's in-flow section heights at 1440px from the BUILT clone
// and write them to extraction/measured-values.json -> sectionHeights.
//
//   npm ci && npx vite build --outDir <scratch>/dist
//   npx vite preview --outDir <scratch>/dist --port <port>
//   NODE_PATH="$(npm root -g)" node design-repo/extraction/measure_sections.mjs --base http://localhost:<port>
//
// Playwright is resolved through NODE_PATH (or a local install); no browser or
// machine path is ever written into this repo. The DOM -> node mapping lives in
// extraction/section-dom-map.json; extraction/wrapper_gate.py reads the result.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = dirname(HERE);
const arg = (name, dflt) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : dflt;
};
const BASE = arg('--base', 'http://localhost:4173');
const read = (rel) => JSON.parse(readFileSync(join(REPO, rel), 'utf8'));

const map = read('extraction/section-dom-map.json');
const templates = read('templates/templates.json').templates;
const { width, height } = map.viewport;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
const out = {};

for (const [tid, spec] of Object.entries(map.templates)) {
  await page.goto(BASE + spec.route, { waitUntil: 'networkidle' });
  const raw = await page.evaluate((units) => {
    const r1 = (v) => Math.round(v * 10) / 10;
    const top = (e) => e.getBoundingClientRect().top + window.scrollY;
    const bot = (e) => e.getBoundingClientRect().bottom + window.scrollY;
    const root = document.querySelector('.marketing-root');
    const main = root.querySelector('main');
    const secs = [...main.children];
    const kidsOf = (s) => (s.children.length === 1 ? [...s.children[0].children] : []);
    // resolve every unit to a start element / start y
    const starts = units.map((u) => {
      const s = secs[u.main];
      if (!s) return { err: `main child ${u.main} missing` };
      if (u.part) {
        const heroRoot = kidsOf(s)[0];
        const blocks = heroRoot ? [...heroRoot.children] : [];
        const split = blocks.find((b) => b.querySelector('h2.font-headline'));
        if (!split) return { err: 'no display-h2 split point' };
        return { y: u.part === 'hero' ? top(s) : top(split) };
      }
      if (u.kids) {
        const k = kidsOf(s)[u.kids[0]];
        if (!k) return { err: `kid ${u.kids[0]} of main ${u.main} missing` };
        return { y: top(k) };
      }
      return { y: top(s) };
    });
    const res = [];
    units.forEach((u, i) => {
      if (starts[i].err) { res.push({ error: starts[i].err }); return; }
      const s = secs[u.main];
      const sameSec = units.map((v, j) => [v, j]).filter(([v]) => v.main === u.main);
      const firstInSec = sameSec[0][1] === i;
      const nextInSec = sameSec.find(([, j]) => j > i);
      const y0 = firstInSec ? top(s) : starts[i].y;
      const y1 = nextInSec ? starts[nextInSec[1]].y : bot(s);
      const entry = { heightPx: r1(y1 - y0) };
      if (u.chapters) {
        const prose = kidsOf(s)[u.kids[0]];
        const h2s = [...prose.querySelectorAll('h2, h3')];
        const cuts = [y0, ...h2s.slice(1).map(top), y1];
        entry.chapters = cuts.slice(1).map((c, n) => ({
          heading: n < h2s.length ? h2s[n].innerText.slice(0, 60) : null,
          heightPx: r1(c - cuts[n]),
        }));
      }
      res.push(entry);
    });
    const shell = {};
    const banner = root.querySelector(':scope > div.bg-black');
    if (banner) shell['chrome.announcement-banner'] = r1(banner.getBoundingClientRect().height);
    const nav = main.previousElementSibling;
    if (nav && nav !== banner) shell['chrome.nav'] = r1(nav.getBoundingClientRect().height);
    const footer = main.nextElementSibling;
    if (footer) shell['chrome.footer'] = r1(footer.getBoundingClientRect().height);
    return { documentHeightPx: document.documentElement.scrollHeight, units: res, shell };
  }, spec.units);

  const flow = templates[tid].nodes
    .map((n, index) => ({ ...n, index }))
    .filter((n) => !n.section.startsWith('chrome.'));
  const nodes = [];
  flow.forEach((n, i) => {
    const u = raw.units[i] || { error: 'no unit' };
    const base = { templateNodeIndex: n.index, section: n.section };
    if (n.variant) base.variant = n.variant;
    if (u.error) { nodes.push({ ...base, error: u.error }); return; }
    if (u.chapters) {
      u.chapters.forEach((c, ci) => nodes.push({ ...base, chapter: ci + 1, chapterHeading: c.heading, heightPx: c.heightPx }));
    } else nodes.push({ ...base, heightPx: u.heightPx });
  });
  out[tid] = {
    route: spec.route,
    documentHeightPx: raw.documentHeightPx,
    shell: raw.shell,
    nodes,
  };
  console.log(`${tid.padEnd(22)} ${spec.route}  doc ${raw.documentHeightPx}px  ${nodes.length} in-flow units`);
}
await browser.close();

const mvPath = join(REPO, 'extraction/measured-values.json');
const mv = JSON.parse(readFileSync(mvPath, 'utf8'));
mv.sectionHeights = {
  viewport: { width, height },
  measuredWith: 'extraction/measure_sections.mjs (headless Chromium via Playwright) against `vite preview` of a fresh `vite build` of the clone; DOM mapping from extraction/section-dom-map.json',
  measuredOn: new Date().toISOString().slice(0, 10),
  scope: 'one representative route per template (the tallest served route that renders the full node set); heights in CSS px at a 1440px-wide viewport',
  templates: out,
};
writeFileSync(mvPath, JSON.stringify(mv, null, 2) + '\n');
console.log(`wrote sectionHeights for ${Object.keys(out).length} templates`);
