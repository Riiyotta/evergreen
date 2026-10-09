// Leaf decoration data — transcribed VERBATIM from CLONE_SPEC §7.1 / §7.2.
// Single source of truth shared by the section components and the animation agent.
// Do not eyeball or "tidy" these numbers; they are the original's hand-authored
// em coordinates read out of its compiled component source.

/** §7.1 — the three leaf SVG primitives and their em box sizes. */
export const LEAF_ART = {
  leaf: { src: '/assets/ever-regular-leafsvg-1b92f2.svg', w: '7.10621em', h: '12.308em' }, // 116x199 intrinsic
  small: { src: '/assets/leaf-smallersvg-6114e8.svg', w: '8.34021em', h: '14.7087em' }, // 86x150
  spike: { src: '/assets/leaf-spikesvg-7a4672.svg', w: '1.20175em', h: '7.32222em' }, // viewBox-only
};

/** Drift easing — easeInOutQuad. Every drift leaf uses this, with no delay/stagger. */
export const DRIFT_EASE = [0.455, 0.03, 0.515, 0.955];
/** Default drift duration in ms (§7.2). */
export const DRIFT_DURATION = 1500;
/** whileInView viewport config (§7.2): fires when any pixel enters, once only. */
export const DRIFT_VIEWPORT = { once: true, amount: 0 };

/**
 * HERO_LEAVES (12) — inside `div.relative.mx-auto.my-[1.5em].w-[81.25em]`.
 * 6 are drift (`from`), 6 are scroll-tracked (`track`). CLONE_SPEC §7.2.
 * `track` percentages are of the leaf's OWN box; `start`/`end` are spring-progress x100.
 */
export const HERO_LEAVES = [
  { top: '-4.5em', left: '-5.3em', rotate: -54, from: [12, 7], duration: 1500 },
  { top: '1em', left: '-6.2em', rotate: -86, from: [11, 0], duration: 1500 },
  { top: '19.8em', phoneTop: '12.4em', left: '-4.5em', rotate: -106, track: { start: 35, end: 42, x: 200 } },
  { top: '26em', phoneTop: '18.7em', left: '-4.5em', rotate: -131, z: 2, track: { start: 38, end: 48, x: 200, y: -50 } },
  { top: '47.1em', phoneTop: '33.2em', left: '-4.5em', rotate: -117, z: 2, track: { start: 50, end: 58, x: 140, y: -50 } },
  { top: '52.8em', phoneTop: '36.4em', left: '-1.3em', rotate: -148, z: 3, track: { start: 51, end: 64, x: 91, y: -90 } },
  { top: '-7.3em', right: '1em', rotate: 20, from: [-5, 10], duration: 1500 },
  { top: '-5.7em', right: '-4.5em', rotate: 60, from: [-9, 7], duration: 1500 },
  { top: '13.3em', phoneTop: '6.1em', right: '-4.5em', rotate: 66, track: { start: 37, end: 41, x: -110 } },
  { top: '29.5em', phoneTop: '18.7em', right: '-1.6em', rotate: 91, track: { start: 39, end: 49, x: -150 } },
  { top: '47.7em', phoneTop: '31.6em', right: '-5.8em', rotate: 114, track: { start: 53, end: 65, x: -130, y: -60 } },
  { top: '52.4em', phoneTop: '35.6em', right: '-2em', rotate: 149, track: { start: 59, end: 69, x: -69, y: -90 } },
];

/**
 * DIVIDER_LEAVES (12) — all drift, default 1500ms, all `from: [0, yEm]` (vertical
 * drop-in). Used identically in both divider bands, inside
 * `div.relative.mx-auto.-mt-[3em].w-[120em]`. CLONE_SPEC §7.2.
 */
export const DIVIDER_LEAVES = [
  { top: '10.3em', left: '3.5em', rotate: 151, z: 11, from: [0, -10] },
  { art: 'small', top: '12.7em', left: '17.1193em', rotate: 146, from: [0, -12.5] },
  { top: '10.3em', left: '31.6585em', rotate: -149, z: 11, from: [0, -8] },
  { art: 'spike', top: '10.7em', left: '43.52em', rotate: -20, from: [0, -4] },
  { art: 'spike', top: '11.9em', left: '48.7em', rotate: 17, from: [0, -4] },
  { top: '7.8em', left: '53.9641em', rotate: -166, z: 11, from: [0, -6] },
  { top: '11.3em', left: '59.3641em', rotate: 166, z: 12, from: [0, -9] },
  { art: 'small', top: '11.9em', left: '72.8875em', rotate: -149, from: [0, -12.5] },
  { top: '12em', left: '87.0737em', rotate: -151, z: 12, from: [0, -10] },
  { top: '9.1em', left: '93.9737em', rotate: 177, z: 13, from: [0, -7] },
  { art: 'spike', top: '10.7em', left: '106.62em', rotate: 0, from: [0, -4] },
  { top: '11em', left: '110.525em', rotate: -169, z: 11, from: [0, -9] },
];

/** CARD_LEAVES (3) — drift, behind the section-E and section-F visuals. §7.2 */
export const CARD_LEAVES = [
  { top: '-6em', left: '-5.1em', rotate: -54, z: 11, from: [7, 8], duration: 1300 },
  { top: '-7.6em', left: '-0.6em', rotate: 6, z: 11, from: [1, 8], duration: 1500 },
  { top: '-0.7em', left: '-5.6em', rotate: -80, z: 13, from: [10, 1], duration: 1000 },
];

/**
 * QUOTE_LEAVES (6) — behind each testimonial card. STATIC: no `from`, no `track`,
 * so no `marketing-drift-leaf` class and initial === animate. Render unanimated. §7.2
 */
export const QUOTE_LEAVES = [
  { top: '-1.1em', left: '-5.7em', rotate: -69, z: 11 },
  { bottom: '-3.3em', left: '-4.7em', rotate: -126, z: 11 },
  { bottom: '-7.6em', left: '-1.1em', rotate: -160, z: 11 },
  { bottom: '-6.4em', right: '-2.3em', rotate: 143, z: 11 },
  { bottom: '3.5em', right: '-2.8em', rotate: 114, z: 11 },
  { top: '-5.2em', right: '-4.3em', rotate: 46, z: 11 },
];

/**
 * Builds the style object for one leaf's INITIAL (pre-animation) state, byte-for-byte
 * equivalent to the shipped HTML's inline style. Verified against
 * _reference/Evergreen _ Give recognition and plant trees.html, e.g.
 *   position:absolute; top:-4.5em; --leaf-rotate:-54deg; left:-5.3em;
 *   width:7.10621em; height:12.308em; z-index:1;
 *   transform:translateX(12em) translateY(7em) rotate(-54deg)
 * Notes: z-index defaults to 1; `from` offsets are in **em**; `track` offsets are in
 * **%** of the leaf's own box. The animation agent animates x/y to 0 from here.
 */
export function leafStyle(leaf) {
  const art = LEAF_ART[leaf.art || 'leaf'];
  const style = {
    position: 'absolute',
    width: art.w,
    height: art.h,
    zIndex: leaf.z ?? 1,
    '--leaf-rotate': `${leaf.rotate}deg`,
  };
  if (leaf.phoneTop !== undefined) {
    // driven by .marketing-responsive-leaf in index.css
    style['--leaf-top'] = leaf.top;
    style['--leaf-phone-top'] = leaf.phoneTop;
  } else if (leaf.top !== undefined) {
    style.top = leaf.top;
  }
  if (leaf.left !== undefined) style.left = leaf.left;
  if (leaf.right !== undefined) style.right = leaf.right;
  if (leaf.bottom !== undefined) style.bottom = leaf.bottom;

  const parts = [];
  if (leaf.from) {
    const [x, y] = leaf.from;
    if (x) parts.push(`translateX(${x}em)`);
    if (y) parts.push(`translateY(${y}em)`);
  } else if (leaf.track) {
    if (leaf.track.x) parts.push(`translateX(${leaf.track.x}%)`);
    if (leaf.track.y) parts.push(`translateY(${leaf.track.y}%)`);
  }
  parts.push(`rotate(${leaf.rotate}deg)`);
  style.transform = parts.join(' ');

  return { src: art.src, style };
}

/** Class list the original puts on each leaf kind (§7.2 / §7.3). */
export function leafClassName(leaf) {
  const cls = [];
  if (leaf.phoneTop !== undefined) cls.push('marketing-responsive-leaf');
  if (leaf.track) cls.push('marketing-scroll-leaf');
  else if (leaf.from) cls.push('marketing-drift-leaf');
  return cls.join(' ');
}
