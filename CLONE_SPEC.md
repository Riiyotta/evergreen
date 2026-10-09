Source: https://www.evergreen.so/

# Evergreen homepage — build spec (measurement-backed)

Measured live on 2026-10-09 with Playwright/Chromium 153. Primary measurement viewport **1280 x 900**; also captured at 1440, 768, 390. Cross-checked against the saved copy at
`/Users/riyaghosh/V3/evergreen/_reference/Evergreen _ Give recognition and plant trees.html` + `..._files/2tpd2u4gatswf.css` (the site's real compiled Tailwind) and `..._files/22o6sbhqooj29.js` / `1zyd6mgakkc6u.js` / `043iauolx97i1.js` (the real motion + component source).

Screenshots: `/Users/riyaghosh/V3/evergreen/_reference/screenshots/` — referenced per section below.
Asset manifest: `/Users/riyaghosh/V3/evergreen/ASSET_MANIFEST.md`.

---

## 0. Tech the original is built with

| Thing | Value |
|---|---|
| Framework | **Next.js App Router** (React Server Components; `self.__next_f` payload, `next-route-announcer`, Turbopack chunks). NOT Framer, NOT Webflow — class names are Webflow-*flavoured* (`max-wf-tablet`) but it is hand-written Tailwind. |
| CSS | **Tailwind CSS v4** (`@theme` custom properties in `:root`, `@property --tw-*`, `color-mix(in oklab, …)` fallbacks) + a hand-written `.marketing-root` base layer. |
| Animation | **Framer Motion / `motion` v12** (`motion.img`, `useScroll`, `useSpring`, `useTransform`, `whileInView`, `AnimatePresence`). No GSAP, no Lenis, no AOS, no ScrollTrigger. |
| Smooth scroll | **None.** `html { scroll-behavior: auto }`. No scroll hijacking, no virtual scroller. Native scrolling only. |
| Body sans font | **Rubik** (Google), self-hosted via `next/font` with a generated `Rubik Fallback` metric-override face. |
| Display font | **ivypresto-headline** weight 600, loaded from **Adobe Typekit** (`use.typekit.net`). Licensed — see §3.1 for the reinterpretation plan. |
| Fonts total | Only those two families. |

### Things that need creative reinterpretation
1. **`ivypresto-headline` is a paid Adobe Fonts (Typekit) webfont** served from a kit URL tied to evergreen.so. We cannot legally/reliably re-serve it. Use the fallback chain the original itself declares (`ui-serif, Georgia, serif`) or substitute a free high-contrast transitional serif. Recommended free substitute with closest proportions: **Playfair Display** (600) or **EB Garamond** (600) via Google Fonts. Whatever is chosen must be declared as the `--font-headline` token so a single swap changes every headline. Expect small line-wrap differences in the h1 and the 4.5em section headings.
2. **The whole page is sized in `em` off a `vw`-based root** (§4). Do not convert to fixed px: reproduce the `vw` root or the responsive behaviour will be wrong.
3. **Server actions**: the newsletter form posts to a Next.js server action (`subscribeToNewsletter`). There is no public endpoint. Build it as a client-side form with the three real states (idle / pending / done / error) and a stub submit.
4. **Leaf decoration layers** are 44 copies of 3 SVGs at hand-authored `em` coordinates. The exact coordinate tables are transcribed verbatim in §7 — use them, do not eyeball.
5. The hero screenshot image `evergreen-recognition-demo-view-185a06.webp` is a flat raster. The animated "recognition line + heart" overlays are absolutely positioned on top of it at `em` coordinates (§7.3) and must be positioned relative to the image's own `em` context.

---

## 1. Section-by-section page map (DOM order, 1280px)

Root wrapper: `div.marketing-root.bg-cream` — `background #fffff3`, `color #333333`, `font-size: 0.833333vw` (= **10.6667px** at 1280), `line-height: 1.6`.

Total document height at 1280: **7189px** (after lazy images resolve; 7053px pre-load).

| # | Role | Element | y (1280) | height | Background | Vertical padding | Inner max-width / gutter | Columns | Screenshot |
|---|---|---|---|---|---|---|---|---|---|
| A | Announcement banner | `div.flex.items-center.justify-center.bg-black.py-[10px]` | 0 | 52 | `#000000` | `10px 0` | text block `max-w: 49ch` (580.71px), centred | 1 | `1280-01-banner.png` |
| B | Nav bar (static, **not** sticky — `position: relative`, z-index 999999998) | `div` | 52 | 77 | transparent (shows `#fffff3`) | `1.7em = 18.13px` top/bottom | full-bleed, `padding-inline: 2.9em = 30.93px` | logo \| links \| CTA (`justify-between`) | `1280-02-nav.png` |
| C | **Hero + social proof** (one `<section class="relative bg-cream">`) | `section` → `div.mx-auto.-mt-[3em].w-full.max-w-[1920px].px-[6em]` → `div.pt-[10.2em]` | 96 | 3151 | `#fffff3` | wrapper `margin-top: -3em = -32px`; inner `padding-top: 10.2em = 108.8px`, no bottom padding | `max-width: 1920px`, `padding-inline: 6em = 64px` → content 1152px | stacked, mostly 1-col centred; stat row and testimonials are 2x2 / 2-col | `1280-03-hero-section.png` |
| D | Leaf divider band 1 | `section.relative[aria-hidden]` | 3216 | 162 | transparent; inner cream bar | wrapper `margin-top: -3em`; inner cream block `height: 15em = 160px` + 2px black rule | inner `width: 120em = 1280px`, `mx-auto` | 1 | `1280-04-divider.png` |
| E | **"Publicly recognise your peers…"** feature | `section.relative.bg-cream-dark` | 3346 | 1125 | `#edede2` | wrapper `-3em` top margin; `padding: 18em 6em 5em` = `192px 64px 53.33px` | `max-width: 1920px`, gutter 64px | 2-col flex `justify-center`: left visual `width: 34.4013em = 367px`, gap `margin-left: 9.91014em = 105.7px`, right copy `width: 50em = 533.3px` | `1280-05-seeds.png` |
| F | **"Report on employee engagement…" + "Fulfill your CSR…"** | `section.relative.bg-cream` | 4438 | 1103 | `#fffff3` | wrapper `-3em`; `padding: 8em 6em 0` = `85.33px 64px 0` | same | two 2-col rows, same geometry as E (left visual `39.1132em = 417px`) | `1280-06-report-csr.png` |
| G | Leaf divider band 2 (identical to D) | `section.relative[aria-hidden]` | 5509 | 162 | transparent | as D | as D | 1 | `1280-04-divider.png` |
| H | **Pricing reassurance + final CTA** | `section.relative.bg-cream-dark` | 5639 | 1039 | `#edede2` | wrapper `-3em`; `padding: 18em 6em 5em` = `192px 64px 53.33px` | same | 3-col icon row (`justify-around`), then centred stack | `1280-07-cta.png` |
| I | **Footer** (outside `<main>`) | `section.relative.bg-cream` | 6646 | 543 | `#fffff3` | wrapper `-3em`; `padding: 5em 6em` = `53.33px 64px` | same | logo row; then `justify-between` 2-col (newsletter+social \| 3 link columns); then legal row `justify-between` | `1280-08-footer.png` |

**Structural rule to replicate exactly:** every section's inner wrapper carries `margin-top: -3em` (`-32px` @1280), so adjacent sections overlap by 32px. This is what makes the divider bands and background transitions line up. Wrapper class, verbatim:
`mx-auto -mt-[3em] w-full max-w-[1920px] px-[6em] max-wf-tablet:px-[6vw]`

**Universal content-block rule:** nearly every child of a section wrapper is a "block" with
`my-[4.2em] text-center max-wf-mini:my-[3.5em]` → `margin-block: 44.8px` @1280 (`36.76px` @ ≤479px). Variants append `mt-0`, `mb-0`, `mt-[6.5em]`, `mt-[7.7em]`, flex utilities, etc. Treat this as a `<Block>` component.

### 1.1 Hero section inner block list (section C), measured at 1280

| idx | Content | y | height | margin | notes |
|---|---|---|---|---|---|
| 0 | H1 + 2 floating avatar pills | 205 | 195 | `0` | wrapper `relative mx-auto w-[108em]` = 1152px |
| 1 | Sub-paragraph | 445 | 95 | `44.8px 0` | |
| 2 | "Start 14 Day Trial" button | 585 | 56 | `44.8px 0` | |
| 3 | H2 "+500 000 trees planted by teams" | 686 | 41 | `44.8px 0 0` | `mb-0` |
| 4 | Hero product screenshot + 12 leaves + 2 line/heart overlays | 743 | 615 | `16px 142.688px` | wrapper `relative mx-auto my-[1.5em] w-[81.25em]` = 867px wide |
| 5 | H3 "8000+ users • 300,000+ recognitions" | 1374 | 41 | `0 0 44.8px` | `mt-0` |
| 6 | Slack / Teams install links | 1460 | 37 | `0 0 44.8px` | |
| 7 | H2 (display) "Plant trees to recognise your peers…" | 1542 | 292 | `0 0 44.8px` | inner `mt-[7.4em] w-[70.3em]` = 750px |
| 8 | 4 stat pills (2 halves x 2) | 1903 | 138 | `69.33px 0 44.8px` | `mt-[6.5em]` |
| 9 | "Used by leading companies…" paragraph | 2136 | 164 | `44.8px 0` | inner `mx-auto mt-[8.9em] w-[49em]` = 522.7px |
| 10 | 2 testimonial cards + 12 quote leaves + 2 company logos | 2457 | 410 | `44.8px 0` | inner `mt-[14.7433em]` = 157.3px |
| 11 | 6-logo customer strip | 2949 | 41 | `82.13px 0 44.8px` | `mt-[7.7em]`, `pl-[3em]` = 32px, `justify-between` |
| 12 | G2 logo + 5 stars + "4.8 / 5 on G2 Reviews" | 3065 | 183 | `44.8px 0 0` | inner `mt-[7em]` = 74.67px |

---

## 2. Design tokens (exact)

All values read from the site's own `:root` `@theme` block in `2tpd2u4gatswf.css` and verified against computed styles.

```js
// tailwind.config.js → theme.extend
colors: {
  // page / surfaces
  cream:        '#fffff3',   // rgb(255,255,243)  page bg, light sections, testimonial card bg
  'cream-dark': '#edede2',   // rgb(237,237,226)  alternating section bg, footer social chips
  leaf:         '#beedc0',   // rgb(190,237,192)  pill / badge / avatar-frame fill
  black:        '#000000',   // borders, rules, buttons, all headings
  white:        '#ffffff',   // on-black text, mobile menu overlay bg

  // text levels
  'text-body':    '#333333', // .marketing-root default inherited colour
  'text-strong':  '#000000', // every h1-h4, every <p> inside .marketing-root, nav links
  'text-default': '#474747', // --color-text, applied to <body> (visible only outside .marketing-root)
  'text-muted':   '#505363', // --color-text-muted (not used on the homepage)

  // accents (declared in the theme; not used by the homepage itself)
  'primary-green': '#02a57e',
  'cool-1': '#f8f3f0',
  'cool-2': '#fde6da',
  'quote-leaf': '#c3f2c5',   // rich-text blockquote bg — unused on homepage
}
```

Alpha values actually used on the page:
- Email input placeholder: `text-black/60` → **`rgba(0,0,0,0.6)`**.
- Disabled submit button: `opacity: 0.70`.

**No gradients anywhere on this page.** **No box-shadows anywhere on this page** (`box-shadow: none` on every measured element). The entire visual language is flat fills + 2px black strokes.

Border token: `border-2 border-black` → **`2px solid #000000`** (nav CTA, stat pills, testimonial cards, avatar rings, value badge, email input, social chips). One exception: `FormError` uses `border` = **1px solid #000000**.

Radii actually used:
| Token | Value | Used by |
|---|---|---|
| `radius-pill-cta` | **40.5px** | primary black "Start 14 Day Trial" button, trial-modal platform buttons |
| `radius-pill-nav` | **30px** | nav "Schedule a demo" outline button, `SubmitButton` |
| `radius-pill-stat` | **46px** | 4 stat pills, 2 hero avatar pills (`h-[5.75094em] w-[11.2528em]`) |
| `radius-card` | **10px** | testimonial cards, "Tagged Value: Grit" badge, `FormDone`, `FormError`, newsletter button right side |
| `radius-input` | **7px** | newsletter email input left side (`rounded-l-[7px]`), `LabelledField` |
| `radius-full` | `9999px` (computed `3.35544e7px`) | testimonial avatar circles, footer social chips |

---

## 3. Typography

### 3.1 Font loading

**Rubik** — self-hosted woff2 (next/font). Weights used: **400, 500, 600, 700**, `font-style: normal`, `font-display: swap`, latin subset `c9f6ebf08ddd616b-s.p.*.woff2` is the one actually fetched/preloaded. For the clone, the simplest faithful equivalent is Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet">
```

The original also ships a metric-override fallback face — replicate it to kill layout shift:

```css
@font-face {
  font-family: "Rubik Fallback";
  src: local("Arial");
  ascent-override: 89.06%;
  descent-override: 23.81%;
  line-gap-override: 0%;
  size-adjust: 104.98%;
}
```

**ivypresto-headline** — original face (for reference only, kit-bound and not reusable):

```css
@font-face {
  font-family: ivypresto-headline;
  src: url("https://use.typekit.net/af/1382d4/00000000000000007735e5ad/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3") format("woff2");
  font-display: optional;
  font-style: normal;
  font-weight: 600;
  font-stretch: 100%;
}
```

Stacks (verbatim from `:root`):
```css
--font-sans:     var(--font-rubik), ui-sans-serif, system-ui, sans-serif;
                 /* computed: Rubik, "Rubik Fallback", ui-sans-serif, system-ui, sans-serif */
--font-headline: "ivypresto-headline", ui-serif, Georgia, serif;
```
In the clone set `--font-headline: "Playfair Display", "ivypresto-headline", ui-serif, Georgia, serif;` and load Playfair Display 600 from Google Fonts.

### 3.2 Base layer (`.marketing-root`) — reproduce verbatim

```css
.marketing-root { color:#333; -webkit-font-smoothing:auto; -moz-osx-font-smoothing:auto;
                  font-size:.833333vw; line-height:1.6; }
@media (min-width:1920px){ .marketing-root{ font-size:16px } }
@media (max-width:991px) { .marketing-root{ font-size:8.25833px } }

.marketing-root :is(h1,h2,h3,h4){ margin:0; font-weight:700; line-height:1.4 }
.marketing-root h1{ color:#000; font-family:var(--font-headline); font-size:6.125em;
                    font-weight:600; line-height:1.49 }
.marketing-root h2{ font-size:2.5em }
.marketing-root h3{ font-size:2.19em }
.marketing-root h4{ font-size:1.88em }
.marketing-root p { color:#000; margin:0; font-size:1.75em; font-weight:400; line-height:1.7 }
.marketing-root a { color:inherit; font-family:var(--font-sans); font-weight:600;
                    line-height:1; text-decoration:underline }
.marketing-root :is(b,strong){ font-weight:700 }
```
Note the consequences: every `<p>` is black (not `#333`), every `<a>` is 600-weight + underlined *unless* the markup adds `font-normal` / `no-underline` (which the nav and most links do).

### 3.3 Every distinct text role, at 1280 (1em = 10.6667px)

| Role | Selector / class | em | px @1280 | Weight | line-height | letter-spacing | Colour |
|---|---|---|---|---|---|---|---|
| Hero H1 (display) | `h1` (base rule) | 6.125em | **65.333px** | 600 | 1.49 → 97.35px | `normal` | `#000000` |
| Hero H1 @ ≤479px | `max-wf-mini:text-[3.9em]` | 3.9em | 32.21px | 600 | 1.49 | normal | `#000000` |
| Section display heading | `.font-headline text-[4.5em] leading-[1.48] font-semibold` | 4.5em | **48px** | 600 | 1.48 → 71.04px | normal | `#000000` |
| ↳ @ ≤479px | `max-wf-mini:text-[3.9em]` | 3.9em | 32.21px | 600 | 1.48 | normal | `#000000` |
| Final-CTA display heading | `.font-headline text-[6.125em] leading-[1.4] font-semibold` | 6.125em | **65.333px** | 600 | 1.4 → 91.47px | normal | `#000000` |
| ↳ @ ≤479px | `max-wf-mini:text-[5.1em]` | 5.1em | 42.12px | 600 | 1.4 | normal | `#000000` |
| Big stat / proof heading | `text-[2.5em] leading-[1.54] font-bold` (h2, h3, stat pill numbers) | 2.5em | **26.667px** | 700 | 1.54 → 41.07px | normal | `#000000` |
| ↳ @ ≤767px | `max-wf-phone:text-[2.4em]` | 2.4em | 19.82px | 700 | 1.54 | normal | `#000000` |
| Eyebrow / lead-in paragraph ("Used by leading companies…", "4.8 / 5 on G2 Reviews") | `text-[2.5em] leading-[1.54] font-semibold` | 2.5em | **26.667px** | 600 | 1.54 → 41.07px | normal | `#000000` |
| Body paragraph | `.marketing-root p` | 1.75em | **18.667px** | 400 | 1.7 → 31.73px | normal | `#000000` |
| Body `<strong>` inside paragraph | `strong` | 1em | 18.667px | 700 | 1.7 | normal | `#000000` |
| Footnote superscript | `sup` inside `<a>` | 0.75em | **14px** | 600 | 0 | normal | `#000000` |
| Announcement banner text | `.bg-black p` | 1.75em | 18.667px | 400 | 1.7 → 31.73px | normal | `#ffffff` |
| Announcement banner link | `a.font-semibold.underline` | 1em | 18.667px | 600 | 1 | normal | `#ffffff` (inherit), `text-decoration: underline` |
| Desktop nav link | `span.text-[1.5625em].leading-[1.9]` | 1.5625em | **16.667px** | 400 | 1.9 → 31.67px | normal | `#000000`, no underline; `hover:underline` |
| Nav CTA label | `span.block.text-[1.5625em].leading-[1.9]` | 1.5625em | 16.667px | 400 | 1.9 → 31.67px | normal | `#000000`, no underline, **no hover state** |
| Primary button label | `span.text-[1.875em].leading-[1.54].font-semibold` | 1.875em | **20px** | 600 | 1.54 → 30.8px | normal | `#ffffff` |
| Platform ("add to Slack") label | `span.text-[1.4375em]` | 1.4375em | **15.333px** | 400 (`<strong>` 700 on the product word) | 1.7 (inherited) | normal | `#000000` |
| ↳ @ ≤479px, container scales | `max-wf-mini:text-[1.3em]` on the `<a>` | — | — | — | — | — | — |
| Small print under CTA | `p.text-[1.4375em]` | 1.4375em | 15.333px | 400 | 1.7 → 26.07px | normal | `#000000` |
| Testimonial quote | `p.text-center.text-[2.3em].leading-[1.54].font-semibold` | 2.3em | **24.533px** | 600 | 1.54 → 37.78px | normal | `#000000` |
| Testimonial attribution | `p.text-center.text-[1.9375em].leading-[1.41]` | 1.9375em | **20.667px** | 400 | 1.41 → 29.14px | normal | `#000000` |
| Value badge / seed label | `p.text-[1.625em].leading-[1.54].font-semibold` | 1.625em | **17.333px** | 600 | 1.54 → 26.69px | normal | `#000000` |
| Newsletter prompt | `p.mt-[0.5em].font-semibold` | 1.75em | 18.667px | 600 | 1.7 | normal | `#000000` |
| Newsletter input text + placeholder | `input.text-[1.75em].leading-[1.7]` | 1.75em | **18.667px** | 400 | 1.7 → 31.73px | normal | text `#000000`, placeholder `rgba(0,0,0,0.6)` |
| Newsletter submit label | `button.text-[1.75em].leading-[1.7].font-bold` | 1.75em | 18.667px | 700 | 1.7 | normal | `#ffffff` |
| Footer nav link | `a.text-[1.6875em].font-medium` | 1.6875em | **18px** | 500 | 1 → 18px | normal | `#000000`, no underline; `hover:underline` |
| Footer legal copyright | `span.text-[1.5em].leading-none` | 1.5em | **16px** | 400 | 1 → 16px | normal | `#333333` (inherits root) |
| Footer legal link | `a.text-[1.5em].font-normal` | 1.5em | 16px | 400 | 1 | normal | `#333333` (inherit), no underline; `hover:underline` |
| Mobile menu link (≤991px) | `a.font-headline.text-[4em].leading-none.font-semibold` | 4em | **33.03px** @8.25833px root | 600 | 1 | normal | `#000000`, no underline |
| ↳ @ ≤479px | `max-wf-mini:text-[3em]` | 3em | 24.77px | 600 | 1 | normal | `#000000` |
| Trial-modal heading | `p.font-headline.text-[4.5em].leading-[1.48].font-semibold` | 4.5em | 48px | 600 | 1.48 | normal | `#000000` |
| Trial-modal "Back" | `button.text-[1.6875em].leading-none.font-medium.underline` | 1.6875em | 18px | 500 | 1 | normal | `#000000`, underlined |

No element on the page uses a non-`normal` `letter-spacing`. Verified via `getComputedStyle` on all of the above.

---

## 4. Spacing system & responsive

### 4.1 The root-em engine (this *is* the spacing system)

| Viewport | `.marketing-root` font-size | source |
|---|---|---|
| ≥1920px | **16px** (clamped) | `@media (min-width:1920px)` |
| 992–1919px | **0.833333vw** → 1280px = **10.6667px**, 1440px = **12px**, 1600px = 13.333px, 1920px = 16px | base rule |
| ≤991px | **8.25833px** (fixed, does not scale) | `@media (max-width:991px)` |

So **everything above 991px scales linearly with viewport width**, and below 992px the type/spacing freeze and only the gutters are fluid. Measured and confirmed: `root = 10.6667px @1280`, `12px @1440`, `8.25833px @768`, `8.25833px @390`.

### 4.2 Breakpoints (Webflow-style, max-width variants)

```js
// tailwind.config.js
screens: {
  'wf-tablet': '992px',  // max-wf-tablet:  @media not all and (min-width: 992px)
  'wf-phone':  '768px',  // max-wf-phone:   @media not all and (min-width: 768px)
  'wf-mini':   '480px',  // max-wf-mini:    @media not all and (min-width: 480px)
}
```
In Tailwind v3 use `screens: { 'max-wf-tablet': {max:'991.98px'}, 'max-wf-phone': {max:'767.98px'}, 'max-wf-mini': {max:'479.98px'} }` so the class names match the original markup 1:1.

### 4.3 Container & gutters (measured)

| Viewport | Container max-width | `padding-inline` class | computed gutter | content width |
|---|---|---|---|---|
| 1280 | 1920px | `px-[6em]` | **64px** | 1152px |
| 1440 | 1920px | `px-[6em]` | **72px** | 1296px |
| 768 | 1920px | `max-wf-tablet:px-[6vw]` | **46.08px** | 675.84px |
| 390 | 1920px | `max-wf-tablet:px-[6vw]` | **23.4px** | 343.2px |

Nav gutter: `px-[2.9em]` → **30.93px @1280**, **34.8px @1440**, **23.95px @768**; `max-wf-phone:px-[1.5em]` → **12.39px @390**. Nav vertical padding `py-[1.7em]` → **18.13px @1280**, 14.04px @≤991.

### 4.4 The real vertical increments (in `em`, so they scale)

| em | px @1280 | Where |
|---|---|---|
| `0.7em` | 7.47 | leaf-icon → text gap in bullets, nav ESG leaf |
| `1em` | 10.67 | icon → label gap, social chip gap base, newsletter prompt→form |
| `1.2em` | 12.8 | stat pill → caption, footer link bottom margin, social chip gap |
| `1.5em` | 16 | hero image block `my`, CTA small-print `mt` |
| `1.6em` | 17.07 | newsletter form bottom margin |
| `2.02566em` | 21.61 | value-badge `my` in section E |
| `2.4em` | 25.6 | testimonial quote → attribution |
| `3em` | 32 | **section overlap** (`-mt-[3em]`), company logo `mt` under testimonial, logo-strip `pl` |
| `3.5em` | 37.33 | Slack/Teams link `mx`; mobile block `my` |
| `4em` | 42.67 | bullet-row bottom margin, footer newsletter group bottom |
| `4.2em` | **44.8** | **default block `margin-block`** |
| `5em` | 53.33 | section wrapper `padding-bottom`, footer `py` |
| `6em` | 64 | **container gutter**; testimonial card `padding-top` |
| `6.5em` | 69.33 | stat row `mt` |
| `6.60743em` | 70.48 | feature heading → bullet list |
| `7em` | 74.67 | G2 block `mt` |
| `7.4em` | 78.93 | display-heading block `mt` |
| `7.7em` | 82.13 | logo strip `mt` |
| `8em` | 85.33 | section F `padding-top` |
| `8.9em` | 94.93 | "Used by leading companies" `mt` |
| `9.91014em` | **105.71** | **2-col feature gap** (`ml` on the copy column) |
| `10.2em` | 108.8 | hero `padding-top` |
| `13.4em` | 142.93 | testimonial avatar offset above card (`-top-[13.4em]`) |
| `14.7433em` | 157.26 | testimonials row `mt` |
| `15em` | 160 | divider cream band height |
| `18em` | 192 | sections E & H `padding-top` |

Named column widths: `108em` (1152px, hero text frame), `81.25em` (867px, hero image), `70.3em` (750px, display heading), `50em` (533px, feature copy col), `49em` (523px, eyebrow col), `51em` (544px, final CTA heading), `39.1109em` (417px, testimonial card), `39.1132em` (417px, section-F visual), `34.4013em` (367px, section-E visual), `25em` (267px, stat column), `29em` (309px, middle pricing column), `120em` (1280px, divider), `16.0983em` (171.7px, footer logo), `13.471em` (143.7px, nav logo), `max-w-[49ch]` (**580.714px @1280** — used for banner text, hero paragraph, all centred captions, email input).

---

## 5. Component specs

### 5.1 Announcement banner
```
div.flex.items-center.justify-center.bg-black.py-[10px]     // height 52px @1280
  p.mx-auto.max-w-[49ch].text-center.text-white.max-wf-mini:max-w-[19.05em]
    "Tired of managing too many workplace apps? "
    a[href=…arketta…][target=_blank][rel=noreferrer].font-semibold.underline  "See our solution."
```
- bg `#000000`, padding `10px 0`, text 18.667px/31.73px `#ffffff`, max-width 580.714px (≤479px: `19.05em` = 157.3px).
- Link: weight 600, `text-decoration: underline`, inherits white. No hover change.

### 5.2 Nav (`1280-02-nav.png`)
- `div.relative.z-[999999998].flex.w-full.justify-between.px-[2.9em].py-[1.7em].max-wf-phone:px-[1.5em]`
- **Not sticky, not fixed. `position: relative`. No backdrop blur, no scroll-state change, no shadow, no border.** Total height **77px @1280**. It simply scrolls away.
- Logo: `a.flex.w-[13.471em].items-center` (143.7px) → `img.h-auto.w-full`, rendered **144 x 40**. `max-wf-tablet:w-[17em]` → 140.4px at ≤991.
- Link group: `div.flex.items-center.max-wf-tablet:hidden`. Each link `a.mr-[2.5em].flex.items-center.font-normal.text-black.no-underline` (`margin-right: 26.67px`), label `span.text-[1.5625em].leading-[1.9].hover:underline`.
- Order & hrefs: Home `/`; ESG `/esg` (**preceded by** `img[src=ever-small-leafsvg].mr-[0.7em].w-[1.26708em]`, rendered 14 x 23); Pricing `/pricing`; Customers `/case-studies`; Resources `/employee-recognition`; Purpose `/our-purpose`; Login `https://app.evergreen.so/login` (label span additionally `inline-block min-w-[5.2em]` = 55.5px, so the label "Login"/"Open app" doesn't shift layout).
- CTA: `a[href="/schedule-a-demo"].rounded-[30px].border-2.border-black.px-[1.8em].py-[0.2em].font-normal.text-black.no-underline` → **border-radius 30px, border 2px solid #000, padding 2.133px 19.2px, transparent background, measured 175.72 x 39.92px**. No hover state, no transition.
- Hover on nav text links: `text-decoration: underline` appears instantly (no transition declared; `@media (hover:hover)` only).

### 5.3 Mobile nav (≤991px) — `390-mobile-menu-open.png`
- Trigger: `button[aria-label="Open menu"|"Close menu"][aria-expanded].relative.z-[2147483647].hidden.size-[6em].items-center.justify-center.max-wf-tablet:flex` → 49.55 x 49.55px.
- Icon: `span.relative.block.h-[1.55em].w-[4.15em]` (12.8 x 34.27px) containing two bars `span.absolute.left-0.block.h-[0.35em].w-full.bg-black.transition-transform.duration-200` (2.89px tall).
  - closed: bar1 `top-0`, bar2 `bottom-0`
  - open: both `top-1/2 -translate-y-1/2`, bar1 `rotate-45`, bar2 `-rotate-45`
  - transition (computed): `transform .2s cubic-bezier(0.4, 0, 0.2, 1), translate .2s …, scale .2s …, rotate .2s cubic-bezier(0.4, 0, 0.2, 1)`
- Panel = `SlideOverlay`: `div[tabindex=-1][role=dialog][aria-modal=true][aria-label="Main navigation"].fixed.inset-0.bg-white.z-[999999].flex.flex-col.items-center.justify-center` — background **`#ffffff`** (not cream).
- Items (`MOBILE_NAV_LINKS`, note this adds **Blog** and renames the demo link): Home `/`; ESG `/esg`; Pricing `/pricing`; Customers `/case-studies`; Resources `/employee-recognition`; Blog `/blog`; Purpose `/our-purpose`; Book Demo `/schedule-a-demo`; Login `https://app.evergreen.so/login`.
- Link class: `font-headline mb-[1em] text-[4em] leading-none font-semibold text-black no-underline max-wf-mini:text-[3em]`. The ESG row is instead `a.mb-[4em].flex.items-center.font-normal.text-black.no-underline` with `img.mr-[1em].h-[4em].w-[2em].max-wf-mini:mr-[0.9em].max-wf-mini:h-auto.max-wf-mini:w-[1.8em]` + `span.font-headline.text-[4em].font-semibold.leading-none.max-wf-mini:text-[3em]`.
- Behaviour: sets `document.body.style.overflow = 'hidden'`; focus moves to first focusable on open and returns to the previous element on close; **Escape closes**; Tab is trapped (wraps first↔last).
- Animation: see §7.6.

### 5.4 Buttons

**Primary (pill, black) — `TrialButton`.** Used twice (hero, final CTA).
```html
<button type="button" class="inline-block rounded-[40.5px] bg-black px-[2.2em] py-[1.2em]">
  <span class="block text-[1.875em] leading-[1.54] font-semibold text-white">Start 14 Day Trial</span>
</button>
```
| prop | value @1280 |
|---|---|
| background | `#000000` |
| border | none |
| border-radius | **40.5px** |
| padding | `1.2em 2.2em` = **12.8px 23.467px** |
| measured size | **212.92 x 56.39px** |
| label | 20px / 30.8px, weight 600, `#ffffff` |
| hover | **none** (no hover class, no transition; `transition` computes to the UA default `all 0s`) |
| active | **none** |
| onClick | opens the Trial modal (§5.11) |

**Secondary (pill outline) — nav CTA.** See §5.2. radius 30px, 2px black border, transparent bg, black 16.667px/31.67px label. No hover/active.

**Newsletter submit (right half of a split field).**
```html
<button type="submit" class="h-[3em] shrink-0 rounded-r-[10px] bg-black px-[1.4em] text-[1.75em] leading-[1.7] font-bold text-white disabled:opacity-70">Plant a tree</button>
```
- `height: 3em` — note `3em` is computed *after* `text-[1.75em]`, so height = 3 x 18.667 = **55.98px**.
- radius `0 10px 10px 0`, padding-inline **26.13px**, bg `#000000`, label 18.667px/31.73px weight 700 white. Measured **159.69 x 55.98px**.
- Pending state: `disabled`, `opacity: .70`, label text becomes **"Please wait..."**.

**Trial-modal platform button** (not visible on initial page, but part of the hero CTA flow):
```html
<a class="flex items-center rounded-[40.5px] bg-black px-[3.5em] py-[1.2em] text-white no-underline mt-[10px]|mt-[20px]">
  <img class="mr-[1em] h-auto w-[3.47539em]"> <span class="block text-[1.875em] leading-[1.54] font-semibold">Start with Slack</span>
</a>
```

**`SubmitButton`** (shared form component, not used on the homepage): `mt-[0.5em] self-center rounded-[30px] bg-black px-[1.4em] py-[9px] text-[1.75em] leading-[1.7] font-bold text-white disabled:opacity-70`.

### 5.5 Stat pill + caption (`1280-09-stats.png`)
```html
<div class="flex w-[25em] flex-col items-center max-wf-phone:mx-[1em] max-wf-phone:w-[16em] max-wf-mini:mb-[4.6em]">
  <span class="mb-[1.2em] flex h-[5.75094em] w-[11.2528em] items-center justify-center rounded-[46px] border-2 border-black bg-leaf">
    <span class="text-[2.5em] leading-[1.54] font-bold text-black max-wf-phone:text-[2.4em] text-center">69%</span>
  </span>
  <p class="mx-auto max-w-[49ch] text-center">of employees work harder when recognised<a … class="ml-[0.2em] no-underline"><sup>1</sup></a></p>
</div>
```
- Pill: **120.02 x 61.33px** (`11.2528em x 5.75094em`), `border-radius 46px`, `border 2px solid #000`, `background #beedc0`.
- Column `width: 25em` = 266.7px. Row: two halves each `flex w-1/2 justify-around`; outer `flex justify-around`. Pill→caption gap `1.2em` = 12.8px.
- `<sup>` link: `ml-[0.2em] no-underline`, sup renders 14px weight 600.

### 5.6 Hero avatar pills
Same geometry as the stat pill (`h-[5.75094em] w-[11.2528em] rounded-[46px] border-2 border-black bg-leaf`) but `items-end` and containing a webp.
- Pill 1: `span.absolute.top-[2.5em].left-[30.9em]` + `max-wf-phone:static max-wf-phone:mb-[1.5em]` → `a1png-5e2164.webp`, `w-full h-auto`, rendered **116 x 104**.
- Pill 2: `span.absolute.top-[11.5em].left-[62em]` + `max-wf-tablet:top-[20.7em] max-wf-tablet:left-[25.1em] max-wf-phone:hidden` → `a2png-f0a2cf.webp`, rendered **116 x 104**, `loading=lazy decoding=async`.
- Both positioned inside `div.relative.mx-auto.w-[108em]` which also contains the H1.

### 5.7 Testimonial card (`1280-10-testimonials.png`)
```html
<div class="flex flex-col max-wf-mini:text-[0.8em]">
  <div class="relative mx-[9.25em] w-[39.1109em]">
    <span aria-hidden class="pointer-events-none"> … 6 QUOTE_LEAVES … </span>
    <div class="relative z-20 flex w-full flex-col items-center rounded-[10px] border-2 border-black bg-cream px-[1.4em] pt-[6em] pb-[3em]">
      <span class="absolute -top-[13.4em] flex size-[11.7918em] items-end justify-center overflow-hidden rounded-full border-2 border-black bg-leaf">
        <img src="/assets/t1png-cd91ac.webp" class="h-auto w-full" loading="lazy" decoding="async">
      </span>
      <p class="text-center text-[2.3em] leading-[1.54] font-semibold">“…”</p>
      <div class="mt-[2.4em]"><p class="text-center text-[1.9375em] leading-[1.41]">Name<br>Role</p></div>
    </div>
  </div>
  <div class="mx-auto mt-[3em] flex justify-center"><img class="w-[7.96em]"></div>
</div>
```
- Card: **417.17 x 297.14px**, `padding: 64px 14.933px 32px`, `border-radius 10px`, `border 2px solid #000`, `background #fffff3` (cream on a cream-coloured section → the border is the only separation), `box-shadow: none`.
- Avatar: `size-[11.7918em]` = **126 x 126px**, `border-radius 9999px`, `border 2px solid #000`, `background #beedc0`, `overflow: hidden`, `items-end` so the portrait sits on the baseline. Positioned `-top-[13.4em]` = **-142.93px**, i.e. avatar top at y 2316 while card top is 2457.
- Card horizontal margin `mx-[9.25em]` = 98.67px; the two cards sit at x 124 and x 739 inside the 1152px content box.
- Company logo under each card: `mt-[3em]` = 32px, `img.w-[7.96em]` = **85px** wide (`logo-wunderdogsvg-62f3d4.svg`, `logo-acmsvg-a35036.svg`).
- Second card adds `max-wf-tablet:mt-[14.4em] max-wf-tablet:mb-[5em]` (cards stack ≤991px).

### 5.8 Value badge / seed line (section E)
- Badge: `div.my-[2.02566em].rounded-[10px].border-2.border-black.bg-leaf.px-[1.5em].py-[0.8em]` → **189 x 48px**, padding `8.533px 16px`, radius 10px, border 2px `#000`, bg `#beedc0`; label `p.text-[1.625em].leading-[1.54].font-semibold` (17.333px/26.69px).
- Seed line: `div.flex.items-center` → leaf `img.mr-[0.7em].w-[1.26708em]` (13.5px) + `p.text-[1.625em].leading-[1.54].font-semibold` "Sue earned 3 seeds".

### 5.9 Logo strip (`1280-11-logostrip.png`)
Row: `div.my-[4.2em].text-center.max-wf-mini:my-[3.5em].mt-[7.7em].flex.items-center.justify-between.pl-[3em] max-wf-tablet:w-[56em] max-wf-tablet:max-w-full max-wf-tablet:flex-wrap max-wf-tablet:pl-0 max-wf-mini:mt-[7.7em] max-wf-mini:w-auto max-wf-mini:justify-center`
Each item: `div.max-wf-tablet:mb-[2.6em].max-wf-mini:mx-[0.5em]` wrapping an `img` with an **inline** width style (height auto, intrinsic aspect):

| Logo | inline width | rendered @1280 | x |
|---|---|---|---|
| Harvard University Employees Credit Union | `17.1909em` | **183 x 36** | 96 |
| Nitro | `11.5931em` | **124 x 41** | 328 |
| Earnest Ice Cream | `8.79133em` | **94 x 38** | 500 |
| Octopus Energy | `19.4863em` | **208 x 28** | 642 |
| CoverWallet | `11.6417em` | **124 x 25** | 898 |
| Hifyre | `13.6854em` | **146 x 37** | 1070 |

No greyscale filter, no opacity, no hover effect, no marquee — it is a static `justify-between` flex row.

### 5.10 G2 rating block (`1280-12-g2.png`)
```html
<div class="mt-[7em] flex flex-col items-center">
  <img src="/assets/logo-g2png-c53a3f.webp" alt="G2 logo" class="w-[6.03104em]">   <!-- 64 x 64 -->
  <div class="mt-[1.95218em] mb-[2.45003em] flex">
    x5  <img src="/assets/star1svg-303d31.svg" class="mx-[1.14204em] w-[3.03685em]">  <!-- 32 x 31 -->
  </div>
  <p class="text-[2.5em] leading-[1.54] font-semibold w-full text-center">4.8 / 5 on G2 Reviews</p>
</div>
```
Star `mx` = 12.18px, stars block `margin: 20.82px 0 26.13px`.

### 5.11 Trial modal (opened by every "Start 14 Day Trial" button)
`SlideOverlay` with `role=dialog aria-modal aria-label="Choose your 14 day free trial type"`, class `z-[999999999] flex items-center justify-center px-[2em]`, `fixed inset-0 bg-white`.
```
div.flex.w-[42em].flex-col.items-center.text-center
  div.mb-[3em]  > p.font-headline.text-[4.5em].leading-[1.48].font-semibold.text-black.max-wf-mini:text-[3.9em]
                  "Choose your 14 day free trial type:"
  div.mb-[3.2em].flex.flex-col
    a[href=https://app.evergreen.so/api/slack/install].flex.items-center.rounded-[40.5px].bg-black.px-[3.5em].py-[1.2em].text-white.no-underline.mt-[10px]
      img[src=slacksvg-1b4e41.svg][alt="Slack logo"].mr-[1em].h-auto.w-[3.47539em]
      span.block.text-[1.875em].leading-[1.54].font-semibold "Start with Slack"
    a[href=https://app.evergreen.so/api/teams/install]… .mt-[20px]  "Start with Teams"
  div.mb-[3.2em] > div.flex.items-center.max-wf-mini:text-[1.3em]
    span.mr-[1em].flex.w-[3.47539em].items-center.justify-center > img[src=/marketing/webexpng-52e71f.webp][alt="Webex logo"].h-auto.w-full
    p.text-[1.4375em] "Coming soon"
  button[type=button].h-[1.092em].text-[1.6875em].leading-none.font-medium.text-black.underline  "Back"
```
⚠️ `webexpng-52e71f.webp` is **not** in `public/assets` — see §6.

### 5.12 Newsletter form (footer)
```html
<form class="relative flex w-full justify-center">
  <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"
         class="absolute -left-[9999px] size-px opacity-0">  <!-- honeypot -->
  <input type="email" name="email" required maxlength="256" placeholder="Your best email" aria-label="Your best email"
         class="h-[3em] w-full max-w-[49ch] rounded-l-[7px] border-2 border-black px-[0.9em] text-[1.75em] leading-[1.7] text-black placeholder:text-black/60">
  <button type="submit" class="h-[3em] shrink-0 rounded-r-[10px] bg-black px-[1.4em] text-[1.75em] leading-[1.7] font-bold text-white disabled:opacity-70">Plant a tree</button>
</form>
```
- Input measured **246.59 x 55.98px** at 1280 (it is `w-full max-w-[49ch]` inside a `flex-col` that is itself `justify-between`'s left column, hence the narrow width). `border: 2px solid #000`, radius `7px 0 0 7px`, padding-inline **16.8px**, no shadow, no focus ring declared (browser default outline).
- Wrapper: `div.mt-[1em].mb-[1.6em].flex.w-full.flex-col`.
- States (from `useMarketingForm`):
  - **pending** → submit `disabled`, `opacity .70`, label "Please wait..."
  - **done** → the whole form is replaced by `FormDone`: `div[role=status].rounded-[10px].border-2.border-black.bg-leaf.p-[20px].text-center > p.text-black` with text **"Thank you!"**
  - **error** → `FormError` appended below: `div[role=alert].mt-[1.4em].rounded-[10px].border.border-black.p-[10px] > p.text-black` (1px border)
  - form `reset()` on success.

### 5.13 Footer (`1280-08-footer.png`)
- Section bg `#fffff3`, wrapper `py-[5em]` = 53.33px (plus the `-3em` top margin).
- Row 1 `my-[4.2em] flex justify-between` → `a.block.w-[16.0983em]` (171.7px) with the logo svg, rendered **144 x 40** (it's `h-auto w-full` of a 216x61 svg scaled to 171.7 → actually measured 144x40 because the preloaded intrinsic is reused; use `w-full h-auto`).
- Row 2 `my-[4.2em] flex justify-between max-wf-phone:flex-col`:
  - Left: `div.flex.flex-col.items-start` → `div.mb-[4em].flex.flex-col.items-start` containing
    - prompt row `div.flex.max-wf-mini:w-full.max-wf-mini:flex-row-reverse.max-wf-mini:items-center`: `p.mt-[0.5em].font-semibold.max-wf-mini:mt-0.max-wf-mini:ml-[1em].max-wf-mini:text-left.max-wf-mini:leading-[1.6]` "Sign up for our newsletter and plant a tree" + leaf `img.mt-[0.4em].ml-[0.7em].w-[1.26708em].max-wf-mini:mb-[0.9em].max-wf-mini:w-[2em]`
    - newsletter form (§5.12)
    - social row `div.flex`: three `a.mr-[1.2em].flex.size-[4em].items-center.justify-center.rounded-full.border-2.border-black.bg-cream-dark` → **43 x 43px**, radius 9999px, `border 2px solid #000`, `background #edede2`, `margin-right 12.8px`; icons `img.h-[1.67015em].w-auto` (**18px tall**). Order: LinkedIn `https://www.linkedin.com/company/evergreenapp/` (`aria-label="Evergreen on LinkedIn"`), Twitter `https://twitter.com/AppEvergreen` (`aria-label="Evergreen on Twitter"`), Email `mailto:teemu@evergreen.so?subject=Email%20from%20website` (`aria-label="Email Evergreen"`).
  - Right: `nav[aria-label="Footer"].flex.justify-end.max-wf-mini:flex-col` with **3** `ul.flex.list-none.flex-col.items-start` (first two also `mr-[3.1em]` = 33.07px). Every link: `a.block.mb-[1.2em].text-[1.6875em].font-medium.text-black.no-underline.hover:underline` (18px/18px, weight 500, `margin-bottom 12.8px`).
- Row 3 `my-[4.2em] mb-0 flex flex-row items-center justify-between max-wf-mini:flex-col-reverse max-wf-mini:items-start`:
  - `span.text-[1.5em].leading-none.max-wf-mini:mb-[1.1em]` "© Evergreen • Made with 💚 in Helsinki, Finland"
  - `span.flex.max-wf-mini:flex-col.max-wf-mini:text-left` with `a.mr-[1.2em].text-[1.5em].font-normal.no-underline.hover:underline` → `/terms-of-service`, and `a.text-[1.5em].font-normal.no-underline.hover:underline` → `/privacy-policy`.

### 5.14 Components NOT present on this page
No accordion, no tabs, no carousel, no marquee, no video, no modal other than the two `SlideOverlay`s, no tooltips, no sticky anything.

---

## 6. Assets

See `/Users/riyaghosh/V3/evergreen/ASSET_MANIFEST.md` for the full URL → local-file → usage table with dimensions.

**Summary:** all **32** images rendered by the homepage are already present in `/Users/riyaghosh/V3/evergreen/public/assets/`. Serve them from `/assets/<filename>`.

**Assets referenced by the live page that are MISSING from `public/assets` — download these:**

| What | Full URL | Needed for |
|---|---|---|
| Favicon | `https://www.evergreen.so/icon.png?icon.1rjukf3ieuvra.png` | `<link rel="icon">` |
| Webex logo | `https://www.evergreen.so/marketing/webexpng-52e71f.webp` | "Coming soon" row inside the trial modal (§5.11) |
| Rubik latin woff2 (only if self-hosting instead of Google Fonts) | `https://www.evergreen.so/_next/static/media/c9f6ebf08ddd616b-s.p.0sv86lbjkn8rn.woff2` | body font |

Not needed (preloaded by the live page for *other* routes — pricing, ESG, case studies): `workletesvg-eb3abc.svg`, `logo-wunderdogsvg-a66a50.svg` (different hash from the homepage's `62f3d4`), `logo-kent-and-whitepng-139c7a.webp`, `logo-nitrosvg-4caa4a.svg` (homepage uses `7a0f33`), `a-price-1png-5e6ffc.webp`, `a-price-2png-1bdf4a.webp`, `ticksvg-589d98.svg`, `img-6223-7511ba.webp`, `sn-4apng-19e16a.webp`, `screen-report-split-2svg-008209.svg`, `icon-povertysvg-375091.svg`, `icon-youthsvg-db3447.svg`, `icon-environmentsvg-89f589.svg`, `icon-treesvg-fb7494.svg`, `leaf-smaller-reflectsvg-c42957.svg`, `company-1ddd00.svg`, `checked-a91d37.svg`.

Loading attributes to replicate: `loading="lazy" decoding="async"` on everything except the nav logo, `ever-small-leafsvg` instances, `a1png`, the hero screenshot, `green-heartsvg`, `slacksvg`, `teamssvg`, and the three pricing icons (those are eagerly loaded + `<link rel=preload>`ed). `object-fit` is `fill` (the default) everywhere — no cropping anywhere; every image is width-constrained with `h-auto` or height-constrained with `w-auto`.

---

## 7. Motion inventory (measured, from Framer Motion source)

Global: **no smooth-scroll library, no scroll hijacking.** `scroll-behavior: auto`. Only two mechanisms are used: `whileInView` (IntersectionObserver) for "drift" leaves, and a spring-smoothed `useScroll` progress for the hero overlay.

Reduced-motion handling (replicate exactly):
```css
@media (prefers-reduced-motion: reduce){
  *,:before,:after{ scroll-behavior:auto!important; transition-duration:.01ms!important;
                    animation-duration:.01ms!important; animation-iteration-count:1!important }
  .marketing-recognition-line{ transform:scaleX(1)!important }
  .marketing-hero-heart{ opacity:1!important }
  .marketing-scroll-leaf,.marketing-drift-leaf{ transform:rotate(var(--leaf-rotate))!important }
}
```

### 7.1 Leaf art primitives
```js
const LEAF_ART = {
  leaf:  { src:'/assets/ever-regular-leafsvg-1b92f2.svg', w:'7.10621em', h:'12.308em' },  // 116x199 intrinsic
  small: { src:'/assets/leaf-smallersvg-6114e8.svg',      w:'8.34021em', h:'14.7087em' }, // 86x150
  spike: { src:'/assets/leaf-spikesvg-7a4672.svg',        w:'1.20175em', h:'7.32222em' },
};
```
Every leaf is `position:absolute`, `aria-hidden`, `loading=lazy decoding=async`, carries `--leaf-rotate: <rotate>deg`, a base `rotate(<rotate>deg)`, and a `z-index`.

### 7.2 "Drift" leaves — `whileInView`, class `marketing-drift-leaf`

| | value |
|---|---|
| Trigger | **IntersectionObserver via Framer `whileInView`**, `viewport: { once: true, amount: 0 }` → fires as soon as **any** pixel of the leaf enters the viewport, once only |
| Property | `transform` (`x`, `y` translate; rotation stays constant) |
| From | per-leaf `from: [xEm, yEm]` → `transform: translateX(<x>em) translateY(<y>em) rotate(<r>deg)` |
| To | `x: 0, y: 0` → `transform: rotate(<r>deg)` |
| Duration | per-leaf, default **1500ms**; divider leaves use the default; card leaves 1300/1500/1000ms |
| Easing | **`cubic-bezier(0.455, 0.03, 0.515, 0.955)`** (easeInOutQuad) — the same for every drift leaf |
| Delay / stagger | **none** — zero delay, no stagger. Each leaf triggers independently on its own intersection. |

**HERO_LEAVES (12), inside `div.relative.mx-auto.my-[1.5em].w-[81.25em]`** — 6 are drift, 6 are scroll-tracked:
```js
[ {top:'-4.5em',  left:'-5.3em', rotate:-54,  from:[12,7],  duration:1500},
  {top:'1em',     left:'-6.2em', rotate:-86,  from:[11,0],  duration:1500},
  {top:'19.8em',  phoneTop:'12.4em', left:'-4.5em', rotate:-106, track:{start:35,end:42,x:200}},
  {top:'26em',    phoneTop:'18.7em', left:'-4.5em', rotate:-131, z:2, track:{start:38,end:48,x:200,y:-50}},
  {top:'47.1em',  phoneTop:'33.2em', left:'-4.5em', rotate:-117, z:2, track:{start:50,end:58,x:140,y:-50}},
  {top:'52.8em',  phoneTop:'36.4em', left:'-1.3em', rotate:-148, z:3, track:{start:51,end:64,x:91,y:-90}},
  {top:'-7.3em',  right:'1em',    rotate:20,  from:[-5,10], duration:1500},
  {top:'-5.7em',  right:'-4.5em', rotate:60,  from:[-9,7],  duration:1500},
  {top:'13.3em',  phoneTop:'6.1em',  right:'-4.5em', rotate:66,  track:{start:37,end:41,x:-110}},
  {top:'29.5em',  phoneTop:'18.7em', right:'-1.6em', rotate:91,  track:{start:39,end:49,x:-150}},
  {top:'47.7em',  phoneTop:'31.6em', right:'-5.8em', rotate:114, track:{start:53,end:65,x:-130,y:-60}},
  {top:'52.4em',  phoneTop:'35.6em', right:'-2em',   rotate:149, track:{start:59,end:69,x:-69,y:-90}} ]
```
Leaves with `phoneTop` get class `marketing-responsive-leaf` + CSS vars `--leaf-top` / `--leaf-phone-top`, driven by:
```css
.marketing-responsive-leaf{ top: var(--leaf-top) }
@media (max-width:479px){ .marketing-responsive-leaf{ top: var(--leaf-phone-top) } }
```

**DIVIDER_LEAVES (12)** — all drift, default duration 1500ms, all `from: [0, yEm]` (pure vertical drop-in), inside `div.relative.mx-auto.-mt-[3em].w-[120em]` (used identically in both divider sections):
```js
[ {top:'10.3em', left:'3.5em',     rotate:151,  z:11, from:[0,-10]},
  {art:'small', top:'12.7em', left:'17.1193em', rotate:146,  from:[0,-12.5]},
  {top:'10.3em', left:'31.6585em', rotate:-149, z:11, from:[0,-8]},
  {art:'spike', top:'10.7em', left:'43.52em',   rotate:-20,  from:[0,-4]},
  {art:'spike', top:'11.9em', left:'48.7em',    rotate:17,   from:[0,-4]},
  {top:'7.8em',  left:'53.9641em', rotate:-166, z:11, from:[0,-6]},
  {top:'11.3em', left:'59.3641em', rotate:166,  z:12, from:[0,-9]},
  {art:'small', top:'11.9em', left:'72.8875em', rotate:-149, from:[0,-12.5]},
  {top:'12em',   left:'87.0737em', rotate:-151, z:12, from:[0,-10]},
  {top:'9.1em',  left:'93.9737em', rotate:177,  z:13, from:[0,-7]},
  {art:'spike', top:'10.7em', left:'106.62em',  rotate:0,    from:[0,-4]},
  {top:'11em',   left:'110.525em', rotate:-169, z:11, from:[0,-9]} ]
```

**CARD_LEAVES (3)** — drift, used behind the section-E and section-F visuals:
```js
[ {top:'-6em',   left:'-5.1em', rotate:-54, z:11, from:[7,8],  duration:1300},
  {top:'-7.6em', left:'-0.6em', rotate:6,   z:11, from:[1,8],  duration:1500},
  {top:'-0.7em', left:'-5.6em', rotate:-80, z:13, from:[10,1], duration:1000} ]
```

**QUOTE_LEAVES (6)** — behind each testimonial card. **These are static** (no `from`, no `track`, so no `marketing-drift-leaf` class and `initial === animate`). Render them with no animation:
```js
[ {top:'-1.1em',   left:'-5.7em', rotate:-69,  z:11},
  {bottom:'-3.3em',left:'-4.7em', rotate:-126, z:11},
  {bottom:'-7.6em',left:'-1.1em', rotate:-160, z:11},
  {bottom:'-6.4em',right:'-2.3em',rotate:143,  z:11},
  {bottom:'3.5em', right:'-2.8em',rotate:114,  z:11},
  {top:'-5.2em',   right:'-4.3em',rotate:46,   z:11} ]
```

### 7.3 Hero scroll track — `marketing-scroll-leaf` + recognition lines + hearts

Driver (exact):
```js
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
const p = useSpring(scrollYProgress, { stiffness: 144, damping: 24, mass: 1 });
```
`ref` is the hero image wrapper `div.relative.mx-auto.my-[1.5em].w-[81.25em]…`. `offset: ['start end','end start']` → progress 0 when the wrapper's top hits the viewport bottom, 1 when its bottom hits the viewport top. The spring (stiffness 144, damping 24, mass 1 → underdamped, ζ≈1.0, settles in ~400ms) smooths it; use the same params or `framer-motion`'s `useSpring`.

**Scroll-tracked leaves** (the 6 `track:` entries in HERO_LEAVES): two `useTransform(p, [start/100, end/100], [from, '0%'], { clamp: true })` mappings drive `x` and `y` as **percentages of the leaf's own box**:
```
x: [`${track.x ?? 0}%`, '0%']     y: [`${track.y ?? 0}%`, '0%']
input range: [track.start/100, track.end/100]    clamp: true
```
So e.g. the first tracked leaf starts at `translateX(200%)` and reaches `translateX(0%)` as spring-progress goes 0.35 → 0.42. Initial inline transforms in the shipped HTML (useful as the SSR default): `translateX(200%) rotate(-106deg)`, `translateX(200%) translateY(-50%) rotate(-131deg)`, `translateX(140%) translateY(-50%) rotate(-117deg)`, `translateX(91%) translateY(-90%) rotate(-148deg)`, `translateX(-110%) rotate(66deg)`, `translateX(-150%) rotate(91deg)`, `translateX(-130%) translateY(-60%) rotate(114deg)`, `translateX(-69%) translateY(-90%) rotate(149deg)`.

**Recognition line + heart pairs (2).** Component:
```js
scaleX  = useTransform(p, draw,              [0,1], {clamp:true})   // line draw
opacity = useTransform(p, [reveal, reveal+1e-4], [0,1], {clamp:true}) // heart snap-on
```
| | Pair 1 | Pair 2 |
|---|---|---|
| `draw` (progress range) | **[0.35, 0.45]** | **[0.42, 0.52]** |
| `reveal` | **0.40** | **0.47** |
| line class | `top-[7.5em] left-[38.0042em] w-[26.9152em] max-wf-mini:top-[5em] max-wf-mini:left-[26.2em] max-wf-mini:w-[18.5em]` | `top-[34.5765em] left-[38.0042em] w-[26.9152em] max-wf-mini:top-[22.8765em] max-wf-mini:left-[26.2em] max-wf-mini:w-[18.5em]` |
| heart class | `top-[6.5em] left-[50.123em] max-wf-mini:top-[4em] max-wf-mini:left-[34.223em]` | `top-[33.5383em] left-[50.123em] max-wf-mini:top-[22.0383em] max-wf-mini:left-[34.223em]` |

Line element: `span[aria-hidden].marketing-recognition-line.absolute.z-[201].block.h-[1.5px].origin-left.bg-black.max-wf-tablet:h-px`, initial inline `transform: scaleX(0)`.
Heart element: `img[src=/assets/green-heartsvg-200bb6.svg][aria-hidden].marketing-hero-heart.absolute.z-[202].h-[2.31476em].w-[2.64134em]`, initial inline `opacity: 0`, rendered **28 x 25px**.

There is **no duration/easing** on these — they are scroll-position-linked; the only timing is the spring above. The heart's `reveal + 1e-4` range makes it an effectively instantaneous pop at that scroll position.

### 7.4 Hover transitions
Only one hover effect exists on this page: `hover:underline` on desktop nav link labels, footer nav links, and the two footer legal links. It is inside `@media (hover:hover)`, has **no transition** (instant). Buttons, cards, pills, logos and images have **no hover state at all**.

### 7.5 Declared transitions actually present in the markup
`transition-transform duration-200` on the two hamburger bars only → computed `transform .2s cubic-bezier(0.4, 0, 0.2, 1)` (plus the same for `translate`/`scale`/`rotate` because Tailwind v4 animates those as separate properties). Tailwind defaults in the theme: `--default-transition-duration: .15s`, `--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1)`.

### 7.6 Overlay (mobile menu + trial modal) animation
`SlideOverlay` wraps its panel in `AnimatePresence` and animates a full-viewport vertical slide:
```js
const OPEN_EASE  = [0.455, 0.03, 0.515, 0.955];
const CLOSE_EASE = [0.55,  0.085, 0.68, 0.53];
const hidden = reducedMotion ? '0vh' : '-110vh';
<motion.div
  initial={{ y: hidden }}
  animate={{ y: '0vh', transition: { duration: reducedMotion ? 0 : 1,   ease: OPEN_EASE  } }}
  exit   ={{ y: hidden, transition: { duration: reducedMotion ? 0 : 0.5, ease: CLOSE_EASE } }}
  className="fixed inset-0 bg-white …" />
```
- Open: `translateY(-110vh) → 0`, **1000ms**, `cubic-bezier(0.455, 0.03, 0.515, 0.955)`.
- Close: `0 → translateY(-110vh)`, **500ms**, `cubic-bezier(0.55, 0.085, 0.68, 0.53)`.
- `document.body.style.overflow = 'hidden'` while open, restored on close.

### 7.7 Unused keyframes present in the stylesheet
`sd-fadeIn`, `sd-blurIn`, `sd-slideUp`, `sd-markerIn`, `enter`, `leave`, `exit`, `fade`, `pulse`, `bounce` — none are applied to any homepage element. Skip them.

---

## 8. Verbatim text content

Use these strings exactly, including the typographic apostrophes (`’`), curly quotes (`“ ”`), the `•` bullet, the `💚` emoji, and the non-breaking-ish spacing in "+500 000".

### A — Announcement banner
> Tired of managing too many workplace apps? **See our solution.** *(link text; href `https://arketta.app/?utm_source=evergreen&utm_medium=banner&utm_campaign=waitlist`, `target=_blank rel=noreferrer`)*

### B — Nav
`Home` · `ESG` · `Pricing` · `Customers` · `Resources` · `Purpose` · `Login` · `Schedule a demo`
(Mobile menu adds `Blog`, and the demo link reads `Book Demo`. `Login` becomes `Open app` when the user is signed in — build the static `Login` version.)

### C — Hero + social proof

H1 (three parts; the first span has `mr-[2.25em]`, the last `ml-[2.25em]`, both reset to 0 at ≤767px):
> `<span>`Recognise`</span>` good work in your team while doing good for `<span>`the planet`</span>`

Paragraph:
> Evergreen is the **only** peer-to-peer recognition software that lets teams recognise a job well done, while planting trees for the planet. For the ultimate positive, feel-good team culture.

Button: `Start 14 Day Trial`

H2: `+500 000 trees planted by teams`

H3: `8000+ users • 300,000+ recognitions`

Platform links: `add to **Slack**` → `https://app.evergreen.so/api/slack/install` · `add to **Teams**` → `https://app.evergreen.so/api/teams/install`

Display H2:
> Plant trees to recognise your peers, while uniting your team around great environmental purpose.

Stats (pill / caption / footnote href):
| Pill | Caption | Footnote link |
|---|---|---|
| `69%` | `of employees work harder when recognised` | `1` → `https://blog.hubspot.com/marketing/11-employee-feedback-statistics` |
| `39%` | `of employees don’t feel appreciated at work` | `2` → same hubspot URL |
| `14.9%` | `lower turnover rates in teams with regular feedback` | `3` → same hubspot URL |
| `65%` | `of employees prefer non-cash incentives` | `4` → `https://www.apollotechnical.com/employee-recognition-statistics/` |

Eyebrow paragraph:
> Used by leading companies wanting to improve team culture while furthering their environmental and social programs

Testimonial 1 (`t1png-cd91ac.webp`, logo `logo-wunderdogsvg-62f3d4.svg`):
> “Evergreen brings positive feedback into our everyday work lives, with green values.”
>
> Emilia Vesa `<br>` Head Of People & Culture

Testimonial 2 (`t2png-2ed757.webp`, logo `logo-acmsvg-a35036.svg`):
> “Casual, fun, positive with recognition that makes a real world difference.”
>
> Andrew Wilson `<br>` Chief Of Staff

Logo strip alt text: `Harvard University Employees Credit Union logo`, `Nitro logo`, `Earnest Ice Cream logo`, `Octopus Energy logo`, `CoverWallet logo`, `Hifyre logo`.

G2 block: alt `G2 logo`; caption `4.8 / 5 on G2 Reviews`

### E — "Publicly recognise…" (bg `#edede2`)

Left visual: `sn-2png-f6c14a.webp` (alt `A screen of an employee being recognised`), then badge `Tagged Value: Grit`, then leaf + `Sue earned 3 seeds`.

H2 (display):
> Publicly recognise your peers with seeds they can plant into trees

Bullets (each preceded by `ever-small-leafsvg`):
1. Timely peer-to-peer recognition with real trees your team can plant, posted to a public team channel.
2. Every month, members of your team can each distribute 12 seeds to whomever they wish.
3. Tag company values to understand who is championing and living them.

Then:
> **x3.5** *(rendered as `p.font-headline.text-[4.5em].leading-[1.48].font-semibold`)*
>
> The average times Evergeen users (active at least once a month) recognise their peers each month.

*(Note: "Evergeen" is a typo in the original. Reproduce it verbatim.)*

### F — "Report on employee engagement…" + "Fulfill your CSR…" (bg `#fffff3`)

Left visual: `sn-3png-556d34.webp` (alt `A screen showing a report of employee engagement`).

H2 (display):
> Report on employee engagement, and your company’s Carbon offset

Bullets:
1. See who is giving and receiving the most recognitions to better understand your team.
2. Track personal and company-wide Carbon offsets.
3. See which values earned the most recognitions, ensuring company values are visible and real.
4. Admins and managers have extensive reporting to help understand how the team is doing.

Second row — left visual `ever-badgepng-6b8d93.webp` (alt `A badge showing 20,000 trees planted`, `-mt-[0.8em] w-[20.4952em]` = 219px wide).

H2 (display):
> Fulfill your CSR and net zero commitments

Paragraph:
> Prove your corporate environmental credibility, and visualise it with badges. Learn more about how Evergreen improves your [Environmental, Social and Governance](/esg) *(link class `underline`)*

### H — Pricing reassurance + final CTA (bg `#edede2`)

Three icon columns (`icon-usersvg`, `icon-supportsvg`, `icon-timesvg`; icon wrapper `span.mb-[1em].flex.h-[3.24544em].items-center.justify-center`, `img.h-full.w-auto`; column widths `25em` / `29em` / `25em`):
1. Only pay for active users who use Evergreen
2. Lots of support, with a help center and direct email options
3. Cancel at any time, so why not give us a try

H2 (display, `text-[6.125em] leading-[1.4]`):
> Start feeling good about work

Paragraph:
> For only $3.99 per active user a month. In the 14 day free trial we don’t plant real trees, but you can skip the trial if you like.

Button: `Start 14 Day Trial`
Small print: `No credit card needed • No setup costs`
Platform links: `add to **Slack**` · `add to **Teams**`

### I — Footer

Prompt: `Sign up for our newsletter and plant a tree`
Input placeholder / aria-label: `Your best email`
Submit: `Plant a tree` (pending: `Please wait...`; success panel: `Thank you!`)

Column 1: `ESG` `/esg` · `Pricing` `/pricing` · `Customers` `/case-studies` · `Blog` `/blog` · `Schedule a demo` `/schedule-a-demo`
Column 2: `Our purpose` `/our-purpose` · `Help center` `https://folksoft.notion.site/Help-Center-defd1351f1a64b6fabe5040f1c2697a5?pvs=4` · `Referral Program` `/referral` · `Contact us` `/contact`
Column 3: `Employee recognition guide` `/employee-recognition` · `Recognition messages` `/employee-recognition-messages` · `Company values` `/company-values` · `Recognition glossary` `/employee-recognition/glossary` · `Recognition for teams` `/employee-recognition/for` · `Alternatives` `/alternatives`

Legal row:
> © Evergreen • Made with 💚 in Helsinki, Finland

`Terms of service` `/terms-of-service` · `Privacy policy` `/privacy-policy`

### Document head
- `<title>`: `Evergreen | Give recognition and plant trees`
- `<link rel="canonical" href="https://www.evergreen.so/">`
- `<link rel="icon" href="/icon.png">`

---

## 9. Responsive notes (measured)

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| root font-size | 12px | 10.6667px | 8.25833px | 8.25833px |
| container gutter | 72px | 64px | 46.08px (`6vw`) | 23.4px (`6vw`) |
| content width | 1296px | 1152px | 675.84px | 343.2px |
| H1 | 73.5px / 109.52px | 65.33px / 97.35px | 50.58px / 75.37px | **32.21px** (`max-wf-mini:text-[3.9em]`) |
| display H2 (4.5em) | 54px | 48px | 37.16px | **32.21px** (`3.9em`) |
| body `<p>` | 21px | 18.667px | 14.45px | 14.45px |
| nav | links visible | links visible | **hamburger** (`max-wf-tablet:hidden` on links, `max-wf-tablet:flex` on button), logo `17em` = 140px | hamburger, nav `px-[1.5em]` = 12.39px |
| doc height | 8083px | 7189px | 6368px | 8458px |

Breakpoint behaviour worth calling out:
- **≤991px (`max-wf-tablet`)**: desktop nav links hide, hamburger appears; hero text frame `w-[80em]`; feature 2-col gap shrinks to `ml-[5.5em]`; testimonial cards stack (`mt-[14.4em] mb-[5em]` on the second); logo strip becomes `w-[56em] max-w-full flex-wrap pl-0` with `mb-[2.6em]` per logo; recognition lines go `h-px` instead of `1.5px`; hero avatar pill 2 repositions to `top-[20.7em] left-[25.1em]`.
- **≤767px (`max-wf-phone`)**: hero frame becomes `flex w-full flex-col items-center` and avatar pill 1 becomes `static mb-[1.5em]` (inline above the headline) while pill 2 is `hidden`; H1 spans lose their `mr/ml-[2.25em]`; feature sections become `flex-col items-center` with copy `mx-auto mt-[5em]`; stat halves become `w-full` (second half `mt-[7em]`); hero image block gets `my-[3.9em] text-[0.6em]` (shrinking its whole em context, and therefore all its leaves/lines); big stat headings drop to `2.4em`; footer row 2 becomes `flex-col`.
- **≤479px (`max-wf-mini`)**: blocks' `my` drops to `3.5em`; H1 → `3.9em`; display H2 → `3.9em`; final-CTA H2 → `5.1em`; hero image block `my-[9.2em] w-[56em]`; feature copy `ml-0 w-auto`, bullets become `flex-col items-center text-center` with the leaf above the text at `w-[2em]`; Slack/Teams links stack (`flex-col`, `mb-[2.2em]`, `text-[1.3em]`); testimonial columns get `text-[0.8em]`; responsive leaves switch to `--leaf-phone-top`; footer link columns stack and the legal row becomes `flex-col-reverse items-start`; banner text `max-w-[19.05em]`.

---

## 10. Build checklist / gotchas

1. Set `.marketing-root { font-size: 0.833333vw; line-height: 1.6; color:#333 }` with the two media overrides. **Every other length on the page is `em`** and must stay `em`.
2. Register the three max-width breakpoints with the *original* names so the class strings in this spec can be copied verbatim.
3. Apply `-mt-[3em]` to every section wrapper — the 32px overlap is load-bearing.
4. Use the real `max-w-[49ch]` (not a px value) for centred text; `49ch` of Rubik 1.75em = 580.714px @1280, and it changes with the font, so keep the `ch` unit.
5. `h-[3em]` on the newsletter input/button resolves *after* `text-[1.75em]` → 55.98px, not 32px. Keep both classes on the same element.
6. `rounded-full` computes to `3.35544e7px`; plain `9999px` is equivalent in effect.
7. No shadows, no gradients, no hover transforms. Resist adding any.
8. The hero image's two overlay line/heart pairs are positioned in the image wrapper's em context, which is itself rescaled by `max-wf-phone:text-[0.6em]` — position them as children of that wrapper, not of the image.
9. Both `SlideOverlay` panels are `bg-white` (`#ffffff`), the only pure-white surface on the page.
10. Reproduce the honeypot `input[name=website]` and the `aria-*` attributes listed in §5 — they are part of the measured DOM.
