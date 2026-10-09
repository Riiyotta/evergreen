# evergreen.so — technical replica

A pixel-accurate rebuild of the marketing site at `https://www.evergreen.so/`
in **React 18 + Vite + Tailwind CSS v3**, produced as a front-end
reverse-engineering exercise: measure a live site precisely, then reproduce its
layout, type scale, token system and motion from those measurements.

> **Not affiliated with Evergreen.** This is an unofficial study build. The
> Evergreen name, logo, product screenshots, customer photographs and
> testimonials, written content, and all third-party company logos that appear
> here remain the property of their respective owners and are included only as
> captured reference material. Don't deploy this as a live site or present it as
> Evergreen's own.

## Running it

```bash
npm install
npm run dev      # http://localhost:5190
npm run build
```

## What it covers

All **195 URLs** from the original's `sitemap.xml`, which collapse onto ~23
route patterns and 14 distinct page templates:

| Group | Routes | Implementation |
|---|---|---|
| Homepage | 1 | `src/pages/Home.jsx` |
| Core marketing | 9 | one page component each |
| `/blog` + articles | 54 | index + one article template |
| `/alternatives` + detail | 16 | index + one comparison template |
| glossary / for / messages / company-values | 106 | **2 components** (`TIndex` + `TDetail` block composer) |
| case studies, partners, ebook, legal | 11 | one template each |

Collection routes are data-driven: a new entry is a row in `src/data/`, not a
new component.

## Verified fidelity

Measured in-browser against the live original at 1920 / 1440 / 1280 / 768 / 390.
The homepage matches on every section offset, every section height and total
document height, with a 369-element DOM geometry walk showing zero structural
diffs. Per-page document heights at 1280:

| Route | Original | This build |
|---|---|---|
| `/` | 7189 | 7189 |
| `/esg` | 7043 | 7043 |
| `/our-purpose` | 3838 | 3838 |
| `/pricing` | 3115 | 3115 |
| `/case-studies` | 3253 | 3253 |
| `/contact` | 3063 | 3063 |
| `/schedule-a-demo` | 3130 | 3130 |
| `/referral` | 4007 | 4007 |
| `/blog` | 29100 | 29100 |
| `/partners/*` | 7868 / 7893 | exact |
| `/ebook/*` | 3347 | 3347 |

Collection detail routes land within ±3% on document height with per-block
geometry exact; see "Known deviations".

### The sizing engine

Every length on the site is `em` off a root of `font-size: 0.833333vw`, clamped
to `16px` above 1920px and frozen at `8.25833px` below 992px — so the root
resolves to 12px @1440, 10.6667px @1280, 8.25833px @768/390. That single rule in
`src/index.css` governs the whole layout; `em` values are never converted to px
anywhere in this codebase, and `ch` values stay in `ch`.

### Design facts worth knowing

- **Zero gradients and zero box-shadows** on the entire site. Everything is flat
  fill plus `2px solid #000`.
- **Almost no interactive state.** The only hover effects are `hover:underline`
  on nav and footer links, and `hover:bg-white` on the eyebrow badge pill.
  Buttons, cards and logos have no hover, active or focus styling at all.
- Colour tokens: `cream #fffff3`, `cream-dark #edede2`, `leaf #beedc0`,
  body text `#333333`, headings `#000000`.
- Motion is a leaf-drift system: `whileInView` (once, threshold 0), 1000–1500ms,
  `cubic-bezier(0.455, 0.03, 0.515, 0.955)`, **no delay and no stagger**. The
  homepage adds a scroll-spring track (`stiffness 144, damping 24`) driving six
  leaves, two line draws and two icon reveals. Quote leaves are static by design.

## Known deviations

1. **Display serif substituted.** The original uses `ivypresto-headline` from
   Adobe Typekit, which is kit-bound and cannot be self-hosted. This build uses
   **Gloock** (SIL OFL, self-hosted) with `size-adjust: 92.44%`, chosen by
   measuring ~50 open serifs against the original's real text-advance widths.
   Section geometry comes out exact; display text sits ~2.7% shorter in
   cap-height. Swapping in a licensed kit is a one-line change in
   `src/index.css`. Two headings have <2% wrap headroom, so re-measure if you
   change it.
2. **Long-form prose is placeholder.** Layout, type scale, block structure and
   element counts are reproduced from measurement, but blog articles, glossary
   definitions, message libraries, case-study narratives and the legal pages
   contain clearly-marked placeholder copy sized to the original's measured
   block heights — not the original's writing. Page titles, slugs, headings,
   labels and images are real. Replace per-record in `src/data/`.
   Because recon sampled 4 of 102 detail routes, the unsampled ones reuse their
   sibling's element counts, so a few document heights run 8–13% short where the
   real page carries more copy.
3. **No external requests.** Every off-domain link is rendered inert (markup and
   styling unchanged, `href` removed) and all assets are local. The original's
   Calendly embeds are static placeholders matched to the measured box —
   nothing loads `assets.calendly.com`.
4. **Forms are stubbed.** The originals post to Next.js server actions with no
   public endpoint. State machines (idle → pending → done / error) are faithful;
   submission resolves locally. Server-supplied error strings were not
   observable and are marked as stand-ins in code.
5. Reproduced faithfully because the original does it: a typo in one section
   heading, a tick icon squashed by `object-fit: fill`, a case-study card that
   overhangs its own flex item, and a G2 caption partly overlapped by the next
   section's divider band.

## Layout

```
src/
├── layout/Layout.jsx      global chrome, rendered once for all routes
├── pages/                 one component per distinct page
├── templates/             TIndex + TDetail (106 routes)
├── components/            ~50 shared components
│   └── blocks/            the prose block vocabulary
├── data/                  per-collection data + placeholder prose generators
├── lib/leaves.js          leaf coordinate tables and motion constants
└── index.css              the em engine, @font-face, prose type scale
```

`CLONE_SPEC*.md` are the measurement specs the build was written against —
geometry, computed type, asset manifests and decoded motion configs.
`_reference/` holds the captured source material and screenshots those specs
were derived from.
