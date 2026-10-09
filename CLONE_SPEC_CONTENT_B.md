Source: https://www.evergreen.so/

# Evergreen — content templates build spec (set B)

Companion to `CLONE_SPEC.md` (homepage + design system). **Read that first.** This file records
**only what is new or different**. Every token, the `.marketing-root` em engine, the container
contract, the 25 base type roles, the buttons/pills/badges and the leaf-motion constant tables are
defined there and are reused verbatim here; references are given as "§n".

Measured live 2026-10-09 with Playwright/Chromium (own isolated browser instance, not the shared
MCP one). Primary viewport **1280 x 900** (`.marketing-root` font-size = **10.6667px**, 1em = 10.6667px).
Spot-checked at 1440 (root 12px), 768 and 390 (root frozen 8.25833px).

Raw measurement JSON for every page sampled: `/Users/riyaghosh/V3/evergreen/_reference/recon-b/*.json`
(one file per route; `*_1440.json`, `*_768.json`, `*_390.json` for the responsive spot checks).
Full-page screenshots at 1280: `/Users/riyaghosh/V3/evergreen/_reference/screenshots/` — filenames
given per template below.

---

## 0. Route → template map

**~140 routes in scope collapse onto 6 distinct templates.**

| Template | ID | Routes | Count | Screenshot |
|---|---|---|---|---|
| **SEO index / listing** | `T-INDEX` | `/employee-recognition/glossary`, `/employee-recognition/for`, `/employee-recognition-messages`, `/company-values` | 4 | `gloss-index-1280.png`, `for-index-1280.png`, `msg-index-1280.png`, `values-index-1280.png` |
| **SEO detail (block composer)** | `T-DETAIL` | `/employee-recognition/glossary/:slug` (30), `/employee-recognition/for/:slug` (12), `/employee-recognition-messages/:slug` (35), `/company-values/:slug` (25) | **102** | `gloss-kudos-1280.png`, `for-startups-1280.png`, `msg-promotion-1280.png`, `values-accountability-1280.png` |
| **SEO pillar** (T-DETAIL + stat row + inline card groups + lead-magnet CTA) | `T-PILLAR` | `/employee-recognition` | 1 | `er-hub-1280.png` |
| **Case study** | `T-STORY` | `/customer-success-stories/:slug` (wunderdog, nitro-games, kent-white, worklete) | 4 | `story-wunderdog-1280.png`, `story-nitro-1280.png`, `story-kentwhite-1280.png`, `story-worklete-1280.png` |
| **Partner landing** (= homepage with 4 substitutions) | `T-PARTNER` | `/partners/50pros`, `/partners/product-hunt`, `/partners/the-people-people-group` | 3 | `partner-50pros-1280.png` |
| **Lead magnet** | `T-EBOOK` | `/ebook/practical-guide-to-employee-recognition` | 1 | `ebook-1280.png` |
| **Legal / long text** | `T-LEGAL` | `/privacy-policy`, `/terms-of-service` | 2 | `legal-privacy-1280.png`, `legal-terms-1280.png` |

### Collapse notes (read these)
- `T-INDEX` and `T-DETAIL` are the big win: **106 routes, 2 templates.** The 4 index pages are
  byte-for-byte the same component tree; only `badge`, `h1`, `lede`, the card array and the trailing
  "related" group differ. The 4 detail collections are the same **block composer** (§3) with a
  per-collection fixed block *sequence* (§3.9) and per-collection labels.
- **`/employee-recognition/:slug` does not exist as a collection.** The only children of
  `/employee-recognition` in `routes.json` are `/for` and `/glossary`, which are themselves
  `T-INDEX`. There is no third-level article collection under the hub. Do not build one.
- `T-PILLAR` is `T-DETAIL` **plus** three extras: the 4-stat pill row (§5.5 of CLONE_SPEC, verbatim),
  inline `T-INDEX` card groups between prose blocks, and a **different final CTA section** (lead
  magnet form instead of the trial CTA). It is the only page in set B that breaks the shared CTA.
- `T-PARTNER` is the **homepage** (`/`) with exactly four swaps: a partner logo block above the H1,
  a Calendly card where the hero screenshot is, one offer sentence appended to the hero paragraph,
  and one discount clause appended to the CTA small print. If the homepage is already built
  pixel-exact, build `T-PARTNER` by parameterising it, not by re-deriving it.
- `T-LEGAL` and the prose body of `T-DETAIL` / `T-STORY` / `T-PILLAR` share **one** prose container:
  `.marketing-rich-text` (§2). Spec'd once.
- `T-EBOOK`'s form is the same component as `T-PILLAR`'s final CTA form (§7).

---

## 1. Shared chrome — identical on every template in set B

- **Announcement banner** (§5.1), **nav** (§5.2/5.3), **footer** (§5.13), **trial modal** (§5.11):
  identical markup, identical geometry. No page in set B changes them.
- **Leaf divider band** (§D/§G of CLONE_SPEC §1 + `DIVIDER_LEAVES` in §7.2): present on every
  template **except `T-LEGAL`**. Verified identical: same wrapper
  `div.relative.mx-auto.-mt-[3em].w-[120em]`, same 12 `marketing-drift-leaf` images at the same
  `em` coordinates and the same `from:[0,-y]`. Band = `div.relative.z-[200].h-[15em]` + 2px black
  rule, measured **159.98px + 2px** at 1280, section height **161.98px**.
  ⚠️ **The band's fill colour follows the section above it.** On T-INDEX/T-DETAIL/T-PILLAR/T-STORY/
  T-EBOOK it is `bg-cream` (`#fffff3`). On `T-PARTNER` the first two dividers are `bg-cream-dark`
  (`#edede2`) and the third is `bg-cream` (exactly as on the homepage).
- **Final CTA section** ("Start feeling good about work"): identical to homepage **section H**
  (`section.relative.bg-cream-dark` → `pt-[18em] pb-[5em]`, **1038.81px tall** at 1280,
  3-icon row → 6.125em display h2 → paragraph → `TrialButton` → small print → Slack/Teams links).
  Present on **T-INDEX, T-DETAIL, T-STORY, T-EBOOK** unchanged. `T-PARTNER` adds one clause to the
  small print (§8). `T-PILLAR` **replaces** it (§4.3). `T-LEGAL` **omits** it.
- Footer link inventory (3 `<ul>` columns, same on every page incl. homepage — verify against your
  build):
  - col 1: `ESG` `/esg` · `Pricing` `/pricing` · `Customers` `/case-studies` · `Blog` `/blog` · `Schedule a demo` `/schedule-a-demo`
  - col 2: `Our purpose` `/our-purpose` · `Help center` `https://folksoft.notion.site/Help-Center-defd1351f1a64b6fabe5040f1c2697a5?pvs=4` **[off-domain]** · `Referral Program` `/referral` · `Contact us` `/contact`
  - col 3: `Employee recognition guide` `/employee-recognition` · `Recognition messages` `/employee-recognition-messages` · `Company values` `/company-values` · `Recognition glossary` `/employee-recognition/glossary` · `Recognition for teams` `/employee-recognition/for` · `Alternatives` `/alternatives`

### Negatives — re-verified by measurement, not assumed
Scanned **every element** of 23 sampled pages with `getComputedStyle`:

| Claim | Result |
|---|---|
| Gradients | **0** elements with any `*-gradient` in `background-image`, on every page. |
| Box shadows | **0** elements with `box-shadow != none`, on every page. |
| Hover states | Only **three** `hover:` utilities exist anywhere: `hover:underline` on nav link labels, `hover:underline` on footer links — both already in §7.4 — **and one new one: `hover:bg-white` on the hero eyebrow badge (§5.1).** |
| Declared transitions in `<main>` | Exactly one non-default: `transition-colors` on the eyebrow badge → computed `color/background-color/border-color/outline-color/text-decoration-color/fill/stroke/--tw-gradient-* 0.15s cubic-bezier(0.4,0,0.2,1)`. Everything else computes to the UA default `all 0s`. |
| Cards / buttons / logos / images | **No** hover, **no** active, **no** focus ring beyond the browser default, **no** transform, **no** cursor change beyond the `<a>` default. |
| `object-fit` | `fill` (default) everywhere **except** the case-study quote portrait, which is **`cover`** (§6.2) — the only `object-fit` override in set B. |
| Sticky / fixed | none (beyond the two existing `SlideOverlay`s). |
| Copy-to-clipboard on message cards | **Does not exist.** No `<button>`, no `navigator.clipboard`, zero occurrences of `copy`/`clipboard` in the delivered HTML or JS for any `/employee-recognition-messages/*` page. The message card is pure static markup. |
| A–Z jump nav / search / filter / pagination on the glossary index | **Do not exist.** No `<input>`, no letter headings, no `<nav>`, no "load more", no query params. All 30 terms render in one flat alphabetical card grid. |
| Heading anchors / table of contents | **Do not exist.** `id` count inside `<main>` is 0 (the only `id` on the document is React's `_R_`). No `#` links, no TOC block on any template. |

---

## 2. The prose container — `.marketing-rich-text` (spec'd once, used by T-LEGAL, T-DETAIL, T-PILLAR, T-STORY)

Transcribed verbatim from the site's own compiled stylesheet
(`/_next/static/chunks/2tpd2u4gatswf.css`), then verified against computed styles.

```html
<div class="marketing-rich-text mx-auto max-w-[77.78em] max-wf-tablet:w-auto"> … </div>
```

| Viewport | container width |
|---|---|
| 1280 | `max-w-[77.78em]` = **829.653px**, centred (`margin-inline: 161.19px` inside the 1152px content box) |
| 1440 | **933.36px** (margin-inline 181.33px) |
| 768 / 390 | `max-wf-tablet:w-auto` → width = min(642.333px, container) → **642.33px** @768, **343.22px** @390 |

`text-align: start` (left). Container font-size = **root em (10.6667px)** — this matters, because
`figcaption` and `figure` resolve `1em` against it, not against the paragraph size.

### 2.1 Every element the prose body can contain (computed at 1280)

```css
.marketing-rich-text p            { margin-bottom: 1.6em }
.marketing-rich-text h2           { color:#000; font-family:var(--font-headline); margin-bottom:.8em;
                                    font-size:4.5em; font-weight:600; line-height:1.2 }
.marketing-rich-text h2.rich-text-h1 { margin-bottom:.2em; font-size:6.125em; line-height:1.49 }
.marketing-rich-text h3           { color:#000; margin-bottom:.3em; font-size:2.5em;
                                    font-weight:700; line-height:1.54 }
.marketing-rich-text h4           { margin-bottom:.4em; font-size:1.88em }
.marketing-rich-text :is(ul,ol)   { margin-bottom:10px; padding-left:40px; font-size:1.75em;
                                    line-height:1.7; overflow:hidden }
.marketing-rich-text ul           { list-style: outside }
.marketing-rich-text ol           { list-style: decimal }
.marketing-rich-text :is(ul,ol) p { font-size: 1em }
.marketing-rich-text li           { margin-bottom: 0 }
.marketing-rich-text img          { max-width:100%; height:auto }
.marketing-rich-text blockquote   { background:#c3f2c5; border:2px solid #000; border-radius:10px;
                                    margin-top:1.5em; margin-bottom:1.5em;
                                    padding:1em 2em 1em 1.7em;
                                    font-size:2.3125em; font-weight:500; line-height:1.7 }
.marketing-rich-text blockquote p { font-size:1em; line-height:inherit; font-weight:inherit; margin:0 }
.marketing-rich-text figure       { max-width:60%; margin:0 auto 10px }
.marketing-rich-text figcaption   { text-align:center; margin-top:5px; font-size:1em; line-height:1.6 }
.marketing-rich-text .video-embed { max-width:none; height:0; margin-bottom:1.6em; position:relative }
.marketing-rich-text .video-embed iframe { border:0; width:100%; height:100%; position:absolute; inset:0 }
```

Resolved to px at 1280 (1em root = 10.6667px):

| Element | font-size | line-height | weight | family | colour | margins | other |
|---|---|---|---|---|---|---|---|
| `p` | **18.667px** (1.75em) | **31.733px** (1.7) | 400 | Rubik | `#000000` | `0 0 29.867px` (= 1.6 × own em) | — |
| `h2` | **48px** (4.5em) | **57.6px** (1.2) | 600 | headline serif | `#000000` | `0 0 38.4px` (= .8 × own em) | ⚠️ `line-height 1.2`, **not** the 1.48 of the standalone 4.5em display heading (§3.3). Different role. |
| `h2.rich-text-h1` | **65.333px** (6.125em) | **97.347px** (1.49) | 600 | headline serif | `#000000` | `0 0 13.067px` | not used by any page in set B; keep the rule |
| `h3` | **26.667px** (2.5em) | **41.067px** (1.54) | 700 | Rubik | `#000000` | `0 0 8px` | — |
| `h4` | **20.053px** (1.88em) | **28.07px** (1.4, from `.marketing-root :is(h1..h4)`) | 700 | Rubik | **`#333333`** (inherits root; h4 is the only heading with no colour override) | `0 0 8.021px` | not used by any page in set B; keep the rule |
| `ul` / `ol` | **18.667px** (1.75em) | **31.733px** | 400 | Rubik | `#333333` (inherits root — note `li` text is **not** forced to black) | `0 0 **10px**` (fixed px) | `padding-left: **40px**` (fixed px), `overflow:hidden`; `ul` disc outside, `ol` decimal |
| `li` | inherit 18.667px | 31.733px | 400 | Rubik | `#333333` | `0` | marker colour = text colour |
| `ul p` / `ol p` | 18.667px (1em of the list) | 31.733px | 400 | — | `#000000` (hits `.marketing-root p`) | `0 0 29.867px` | — |
| `blockquote` | **24.667px** (2.3125em) | **41.933px** (1.7) | 500 | Rubik | `#333333` | `37px 0` (= 1.5 × own em) | bg **`#c3f2c5`** (`quote-leaf`), border **2px solid #000**, radius **10px**, padding **24.667px 49.333px 24.667px 41.933px** |
| `blockquote p` | 24.667px (1em) | inherit 41.933px | inherit 500 | Rubik | `#000000` | `0` | — |
| `a` (inline link) | 18.667px (inherits p) | **18.667px** (`line-height:1` from `.marketing-root a`) | **600** | Rubik | `#000000` (inherit) | `0` | `text-decoration: underline`, **no hover change, no transition** |
| `strong` / `b` | 1em of context | inherit | **700** | Rubik | inherit | `0` | — |
| `em` | 1em | inherit | 400 | Rubik | inherit | — | italic |
| `img` | — | — | — | — | — | — | `max-width:100%; height:auto`; `object-fit:fill` |
| `figure` | **10.667px** (root em) | 17.067px | 400 | Rubik | `#333333` | `0 auto 10px` | `max-width: **60%**` of the prose column → **414.73px** on a 691.22px T-STORY column |
| `figcaption` | **10.667px** (= `1em` of the *container*, not of `p`) | **17.067px** (1.6) | 400 | Rubik | `#333333` | `5px 0 0` | `text-align: center`. This is genuinely tiny — reproduce it, do not "fix" it. |
| `hr`, `table`/`th`/`td`, `code`/`pre` | **no rules exist** | | | | | | Unstyled browser defaults. **Not used by any page in set B** (0 occurrences across all 23 sampled pages). Do not invent a table style; if you add one it will not match. |
| `.video-embed` | — | — | — | — | — | `0 0 29.867px` | aspect ratio comes from an inline `padding-bottom`; not used in set B |

### 2.2 Prose body — content shape (NOT transcribed; this is editorial prose)

| Route | prose container y / height @1280 | `p` | `h2` | `h3` | `ul` | `li` | `a` | `strong` | `blockquote` | `figure` |
|---|---|---|---|---|---|---|---|---|---|---|
| `/privacy-policy` | one `.marketing-rich-text`, **y 367.78, h 7237.83** | 48 | 2 | 18 | 2 | 8 | 6 | 7 | 0 | 0 |
| `/terms-of-service` | **y 367.78, h 2725.56** | 15 | 9 | 0 | 1 | 4 | 1 | 0 | 0 | 0 |
| `/employee-recognition/glossary/kudos` | 1 block, y 665.39, h 1388.19 | 9 | 4 | 0 | 0 | 0 | 4 | 0 | 0 | 0 |
| `/employee-recognition/for/startups` | 1 block, y 622.72, h 1697.78 | 11 | 3 | 0 | 0 | 0 | 5 | 0 | 0 | 0 |
| `/employee-recognition-messages/promotion` | 1 block, y 622.72, h 537.30 | 4 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| `/company-values/accountability` | 1 block, y 525.39, h 535.42 | 4 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| `/employee-recognition` (pillar) | **7 separate** `.marketing-rich-text` blocks interleaved with card groups (§4) | ~45 total | 9 | 16 | 0 | 0 | ~28 | ~12 | 0 | 0 |
| `/customer-success-stories/wunderdog` | 1 block in the right column, y 906.72, h 2589.14 | 9 | 2 | 2 | 0 | 0 | 2 | 0 | **2** | **1** |

- **Privacy policy** section coverage, in order (one-liners, do not transcribe): intent & scope →
  what data is collected and why → retention & security → no third-party sharing → external links →
  consequences of withholding data → consent by use → `h2` *"How is personal data processed?"* →
  then 18 `h3` sub-sections covering: data controller, purposes, legal basis, categories of data
  (with a `ul` of 8 `li`), sources, transfers, retention periods, security measures, cookies,
  rights of the data subject, complaints, changes to the policy, contact. Mostly 1–3 sentence
  paragraphs; `strong` used for a few inline labels; 5 `<br>`; 4 `<em>`.
- **Terms of service**: 9 numbered `h2` sections — `1. Terms`, `2. User License` (contains the only
  `ul`, 4 `li`), `3. Disclaimer`, `4. Limitations`, `5. Accuracy of materials`, `6. Links`,
  `7. Modifications`, `8. References`, `9. Governing Law`. 1–3 paragraphs each. One inline link,
  text `Evergreen.so` → `/`.
- Glossary / for / messages / values prose bodies: 2–4 `h2` sections of 2–3 paragraphs each,
  occasional inline links to other internal routes. Use representative copy of the same length —
  the block geometry is what matters.

### 2.3 T-LEGAL page map (1280) — `legal-privacy-1280.png`, `legal-terms-1280.png`

Only **one** `<section>`. No divider, no final CTA, no leaves anywhere in `<main>`.

```
main.relative.w-full.overflow-hidden
  section.relative.bg-cream                                     bg #fffff3
    div.mx-auto.-mt-[3em].w-full.max-w-[1920px].px-[6em].max-wf-tablet:px-[6vw].pb-[5em]
                                                                padding 0 64px 53.333px; margin-top -32px
      div.pt-[10.2em].max-wf-mini:pt-[11.8em]                    y 44.61, h 269.84
        div.relative.mx-auto.w-[108em]…                          1152px frame
          h1.mx-auto.max-w-[49ch].text-center.max-wf-mini:text-[3.9em]
          div.my-[3em]                                           margin-block 32px
            p.mx-[3em].max-w-[49ch].text-center                  "Last updated: …"
      div.mt-[5em].max-wf-mini:mt-[7.25em]                       margin-top 53.333px
        div.marketing-rich-text.mx-auto.max-w-[77.78em].max-wf-tablet:w-auto
```

| metric | `/privacy-policy` | `/terms-of-service` |
|---|---|---|
| document height @1280 | **8200px** | **3687px** |
| @1440 / @768 / @390 | 9220 / 6383 / 9742 | — |
| section height | 7644.19 | 3131.92 |
| h1 y / h | 153.41 / 97.33 | same |
| "Last updated" y | 282.72 | 282.72 |
| prose block y / h | 367.78 / 7237.83 | 367.78 / 2725.56 |

- `h1`: inherits `.marketing-root h1` → **65.333px / 97.347px / 600 / headline serif / #000**,
  `text-align:center`, full 1152px wide.
  ⚠️ `max-w-[49ch]` on an `h1` resolves `ch` against **65.333px**, giving `max-width: 1981.52px` —
  i.e. **no constraint at all**. On a `<p>` (18.667px) the same class gives **580.714px**. Do not
  "simplify" `49ch` to a px value; it behaves differently per element.
- **Last-updated meta line**: `p.mx-[3em].max-w-[49ch].text-center` → **18.667px / 31.733px / 400 /
  `#000000`**, `margin-inline: 56px`, max-width 580.714px, inside `div.my-[3em]` (margin-block 32px).
  Copy: `Last updated: 28th July 2022` (privacy) · `Last updated: 30th December 2020` (terms).
  Plain text — **not** a `<time>`, no date attribute.
- The prose block is **left-aligned** while the hero above it is centred. Keep that contrast.

---

## 3. `T-DETAIL` — the SEO detail block composer (102 routes)

Screenshots: `gloss-kudos-1280.png`, `for-startups-1280.png`, `msg-promotion-1280.png`,
`values-accountability-1280.png`.

One page shape, driven by an ordered array of blocks. Outer frame:

```
main.relative.w-full.overflow-hidden
  section.relative.bg-cream                                 #fffff3
    div.mx-auto.-mt-[3em].w-full.max-w-[1920px].px-[6em].max-wf-tablet:px-[6vw].pb-[5em]
      div.pt-[10.2em].max-wf-mini:pt-[11.8em]      ← HERO block (always first)
      … N content blocks, each a direct sibling …
  section.relative            ← leaf divider (§1)
  section.relative.bg-cream-dark  ← final CTA (§1), 1038.81px
```

Every content block is the standard `<Block>` of CLONE_SPEC §1:
`div.my-[4.2em].text-center.max-wf-mini:my-[3.5em]` → **margin-block 44.8px** @1280 (36.76px ≤479px),
plus variant utilities. Measured y/height for a full instance are in §3.10.

### 3.1 Block `HERO`
```html
<div class="pt-[10.2em] max-wf-mini:pt-[11.8em]">            <!-- padding-top 108.8px -->
  <div class="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full
              max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
    <p class="mb-[1.4em] text-center">                        <!-- margin-bottom 26.133px -->
      <a class="no-underline" href="{parentHref}">
        <span class="inline-flex items-center rounded-full border-2 border-black bg-leaf
                     text-center text-black px-[1.1em] py-[0.35em] text-[1.4375em] font-semibold
                     gap-[0.5em] transition-colors hover:bg-white">
          <img class="w-[0.9em] shrink-0" src="/assets/ever-small-leafsvg-e988d6.svg" alt="">
          {parentLabel}
        </span>
      </a>
    </p>
    <h1 class="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">{title}</h1>
    <div class="my-[4.2em] text-center max-wf-mini:my-[3.5em]">
      <p class="mx-auto max-w-[49ch] text-center">{lede}</p>
    </div>
  </div>
</div>
```
Measured (kudos, 1280): block y 44.61 h 467.72 · eyebrow `p` y 153.41 h 63.73 · h1 y 243.27 h 97.33 ·
lede wrapper y 385.39 h 126.94 · lede `p` y 385.39 w **580.70** (max-width 580.714px) x 349.64.

`T-INDEX` uses the identical HERO; so does `T-PILLAR` except it has **no eyebrow badge**.

### 3.2 NEW COMPONENT — eyebrow badge pill (`BadgeLink`)
The **only component in set B with a hover state.** Breaks the homepage rule "no hover on
buttons/cards/pills"; record it as a deliberate exception.

| prop | value @1280 |
|---|---|
| element | `a.no-underline > span.inline-flex…` inside `p.mb-[1.4em].text-center` |
| font-size | `text-[1.4375em]` **compounded**: 1.4375 × 1.75em(p) × 10.6667 = **26.833px** |
| line-height | **26.833px** (`line-height:1` from `.marketing-root a`) |
| weight / family / colour | 600 / Rubik / `#000000` |
| background | `#beedc0` (`leaf`) |
| border / radius | **2px solid #000000** / `rounded-full` → computed `3.35544e7px` |
| padding | `0.35em 1.1em` → **9.392px 29.517px** |
| gap | `0.5em` → **13.417px** |
| measured size | **377.92 x 63.73px** for the label "Recognition glossary" (width is content-driven) |
| leaf icon | `img.w-[0.9em].shrink-0` = **24.14 x 40.95px** (`ever-small-leafsvg-e988d6.svg`, intrinsic 21x36) |
| **hover** | `hover:bg-white` → background becomes **`#ffffff`**, border/text unchanged |
| **transition** | `transition-colors` → `color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-* **0.15s cubic-bezier(0.4, 0, 0.2, 1)**` |
| active / focus | none declared |

Labels and hrefs:

| Collection | `parentLabel` | `parentHref` |
|---|---|---|
| `/employee-recognition/glossary/:slug` | `Recognition glossary` | `/employee-recognition/glossary` |
| `/employee-recognition/for/:slug` | `Recognition for teams` | `/employee-recognition/for` |
| `/employee-recognition-messages/:slug` | `Recognition messages` | `/employee-recognition-messages` |
| `/company-values/:slug` | `Company values` | `/company-values` |
| all four **index** pages | `Employee recognition guide` | `/employee-recognition` |

### 3.3 Block `SECTION_HEADING` (centred display h2)
```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] flex justify-center max-wf-phone:flex-col">
  <div class="w-[70.3em] max-wf-mini:mt-[3em] max-wf-mini:w-auto mx-auto mt-0 max-wf-phone:w-auto">
    <h2 class="font-headline text-[4.5em] leading-[1.48] font-semibold text-black
               max-wf-mini:text-center max-wf-mini:text-[3.9em] text-center">{heading}</h2>
  </div>
</div>
```
Inner column `w-[70.3em]` = **749.86px**, centred (margin-inline 201.08px). h2 = **48px / 71.04px /
600 / headline serif / #000**, centred. Block height **71.03px** for one line, **142.06px** for two.
This is the §3.3 "Section display heading" role (lh 1.48) — distinct from `.marketing-rich-text h2`
(lh 1.2).

### 3.4 Block `PROSE_LEFT` (bare paragraph column, no rich-text class)
```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em]">
  <div class="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full">
    <p>…</p>            <!-- 1–2 paragraphs -->
  </div>
</div>
```
Column **749.86px**, `text-align:left`. `p` = 18.667px / 31.733px / 400 / `#000`, **margin 0**
(no `.marketing-rich-text` → no 1.6em bottom margin). Used for the glossary/values lede-after-hero
and for the values "What its absence looks like" block. Measured h 63.47 (2 lines) / 95.20 (3 lines).

### 3.5 Block `RICHTEXT`
`div.marketing-rich-text.mx-auto.max-w-[77.78em].max-wf-tablet:w-auto` — fully spec'd in §2.
829.64px wide at 1280, x 225.17.

### 3.6 Block `LEAF_BULLETS`
```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em]">
  <ul class="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full list-none">
    <li class="mb-[2em] flex items-start">
      <img class="mt-[0.4em] w-[1.26708em] shrink-0" src="/assets/ever-small-leafsvg-e988d6.svg" alt="">
      <p class="ml-[0.7em]">…</p>
    </li>
  </ul>
</div>
```
`ul` 749.86px, `list-style:none`. `li` `margin-bottom: 2em` = **21.333px**, `display:flex`,
`align-items:flex-start`. Leaf img **13.50 x 22.91px**, `margin-top 4.267px`. `p` `margin-left
13.067px`, width **723.30px**, 18.667px / 31.733px / 400 / `#000`. Typical li height 31.73 (1 line)
– 95.20 (3 lines).

### 3.7 Block `LEAF_DL` (leaf-marked definition list) — NEW
```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em]">
  <dl class="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full">
    <div class="mb-[2.4em]">                                   <!-- margin-bottom 25.6px -->
      <dt class="flex items-center text-[2em] leading-[1.5] font-bold text-black">
        <img class="mr-[0.45em] w-[0.8em] shrink-0" src="/assets/ever-small-leafsvg-e988d6.svg" alt="">
        {term}
      </dt>
      <dd class="mt-[0.3em]">                                  <!-- margin-top 3.2px -->
        <p class="text-[1.75em] leading-[1.7]">{definition}</p>
      </dd>
    </div>
  </dl>
</div>
```
NEW type role: `dt` = **21.333px (2em) / 32px (1.5) / 700 / Rubik / `#000000`**, flex row,
`align-items:center`; leaf img `w-[0.8em]` of 21.333px = **17.06 x 28.95px**, `margin-right 9.6px`.
`dd` has no type of its own (root em); its `p` is 18.667/31.733/400/#000. Row height 66.91 for a
1-line term + 1-line definition. `dl` width 749.86px.

### 3.8 Block `FAQ_DL` ("Questions people ask") — NEW
```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em]">
  <dl class="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full">
    <div class="mb-[3em]">                                     <!-- margin-bottom 32px -->
      <dt class="text-[2.5em] leading-[1.54] font-bold text-black">{question}</dt>
      <dd class="mt-[0.6em]"><p>{answer}</p></dd>              <!-- margin-top 6.4px -->
    </div>
  </dl>
</div>
```
`dt` = **26.667px / 41.067px / 700 / Rubik / `#000000`** (same metrics as the §3.3 "Big stat /
proof heading", new semantic role). `dd > p` = 18.667/31.733/400/#000. Row height 142.66 for a
1-line question + 3-line answer. 3–5 rows per page. **Plain `<dl>`, not an accordion — no
`<details>`, no JS, everything always open.** `FAQPage` JSON-LD is emitted in `<head>`; optional
for the clone.

### 3.9 Block `CARD_GRID` → see §5 (`LinkCard`) · Block `MESSAGE_GRID` → see §5.2

### 3.10 Per-collection block sequence (this is the template contract)

`/employee-recognition/glossary/:slug` — e.g. `kudos` (docH **6927**), `employee-recognition` (docH 7135)
| # | block | y @1280 | h |
|---|---|---|---|
| 1 | HERO (badge "Recognition glossary" + h1 term + lede = the one-sentence definition) | 44.61 | 467.72 |
| 2 | PROSE_LEFT (1 paragraph, the "etymology / framing" line) | 557.13 | 63.47 |
| 3 | RICHTEXT (4 `h2` + 9 `p`) | 665.39 | 1388.19 |
| 4 | SECTION_HEADING `What it looks like` | 2098.38 | 71.03 |
| 5 | LEAF_BULLETS (3 items) | 2214.20 | 296.53 |
| 6 | SECTION_HEADING `Questions people ask` | 2555.53 | 71.03 |
| 7 | FAQ_DL (3 rows) | 2671.36 | 491.94 |
| 8 | SECTION_HEADING `Related terms` | 3208.09 | 71.03 |
| 9 | CARD_GRID — 3 glossary cards | 3323.92 | 631.91 |
| 10 | SECTION_HEADING `In practice` | 4000.63 | 71.03 |
| 11 | CARD_GRID — 3 cards (messages + values) | 4116.45 | 542.45 |
| 12 | SECTION_HEADING `Further reading` | 4703.70 | 71.03 |
| 13 | CARD_GRID — 2 blog cards | 4819.53 | 361.97 |
| — | divider section | 5247.64 | 161.98 |
| — | final CTA section | 5377.64 | 1038.81 |

`/employee-recognition-messages/:slug` — e.g. `promotion` (docH **7968**), `work-anniversary` (docH 9096)
| # | block | y | h (promotion) |
|---|---|---|---|
| 1 | HERO (badge "Recognition messages" + h1 = article title + lede) | 44.61 | 533.31 |
| 2 | RICHTEXT (2 `h2` + 4 `p`) | 622.72 | 537.30 |
| 3 | SECTION_HEADING `{N} messages you can send` | 1204.81 | 71.03 |
| 4 | **MESSAGE_GRID — N message cards** (N = 10…14; 12 here) | 1320.64 | 1796.11 |
| 5 | SECTION_HEADING `What makes one land` | 3161.55 | 71.03 |
| 6 | LEAF_BULLETS (5 items) | 3277.38 | 339.19 |
| 7 | SECTION_HEADING `Questions people ask` | 3661.36 | 71.03 |
| 8 | FAQ_DL (4 rows) | 3777.19 | 882.28 |
| 9 | SECTION_HEADING `The values behind it` | 4704.27 | 71.03 |
| 10 | CARD_GRID — 1–3 company-value cards | 4820.09 | 229.14 |
| 11 | SECTION_HEADING `Where it fits` | 5094.03 | 71.03 |
| 12 | CARD_GRID — 2–3 glossary cards | 5209.86 | 314.13 |
| 13 | SECTION_HEADING `Other occasions` | 5568.78 | 71.03 |
| 14 | CARD_GRID — 3 message cards | 5684.61 | 537.98 |
| — | divider / final CTA | 6288.73 / 6418.73 | 161.98 / 1038.81 |

`/company-values/:slug` — e.g. `accountability` (docH **7728**), `gratitude` (docH 8873)
| # | block | y | h |
|---|---|---|---|
| 1 | HERO (badge "Company values" + h1 = value name + lede) | 44.61 | 435.98 |
| 2 | RICHTEXT (2 `h2` + 4 `p`) | 525.39 | 535.42 |
| 3 | SECTION_HEADING `How you would know` | 1105.61 | 71.03 |
| 4 | **LEAF_DL** (4 behaviour rows) | 1221.44 | 344.41 |
| 5 | SECTION_HEADING `{N} messages that name it` | 1610.64 | 71.03 |
| 6 | **MESSAGE_GRID — N cards** (6 here) | 1726.47 | 792.55 |
| 7 | SECTION_HEADING `What its absence looks like` | 2563.81 | 71.03 |
| 8 | PROSE_LEFT (1 paragraph) | 2679.64 | 95.20 |
| 9 | SECTION_HEADING `Recognising it well` | 2819.64 | 71.03 |
| 10 | LEAF_BULLETS (3 items) | 2935.47 | 233.06 |
| 11 | SECTION_HEADING `Questions people ask` | 3213.33 | 71.03 |
| 12 | FAQ_DL (4 rows) | 3329.16 | 644.17 |
| 13 | SECTION_HEADING `Occasions where it shows up` | 4018.13 | 71.03 |
| 14 | CARD_GRID — 3 message cards | 4133.95 | 537.98 |
| 15 | SECTION_HEADING `Where it fits` | 4716.73 | 71.03 |
| 16 | CARD_GRID — 3 cards (glossary + for) | 4832.56 | 660.23 |
| 17 | SECTION_HEADING `Related values` | 5537.59 | 71.03 |
| 18 | CARD_GRID — 2–3 value cards | 5653.42 | 328.98 |
| — | divider / final CTA | 6048.55 / 6178.55 | 161.98 / 1038.81 |

`/employee-recognition/for/:slug` — e.g. `startups` (docH **11397**), `healthcare` (docH 11411)
| # | block | y | h (startups) |
|---|---|---|---|
| 1 | HERO (badge "Recognition for teams" + h1 + lede) | 44.61 | 533.31 |
| 2 | RICHTEXT (3 `h2` + 11 `p`) | 622.72 | 1697.78 |
| 3 | SECTION_HEADING `What gets in the way` | 2365.30 | 71.03 |
| 4 | **LEAF_DL** (4 rows) | 2481.13 | 566.55 |
| 5 | SECTION_HEADING `What works` | 3092.47 | 71.03 |
| 6 | LEAF_BULLETS (5 items) | 3208.30 | 466.13 |
| 7 | SECTION_HEADING `{N} messages written for this team` | 3719.22 | 71.03 |
| 8 | **MESSAGE_GRID — 5 cards** | 3835.05 | 1066.78 |
| 9 | SECTION_HEADING `A program that fits` | 4946.63 | 71.03 |
| 10 | **LEAF_DL** (5 rows) | 5062.45 | 627.31 |
| 11 | SECTION_HEADING `Questions people ask` | 5734.56 | 71.03 |
| 12 | FAQ_DL (4 rows) | 5850.39 | 771.11 |
| 13 | SECTION_HEADING `Occasions and values that come up most` (2 lines) | 6666.30 | 142.06 |
| 14 | CARD_GRID — 6 cards | 6853.16 | 1116.89 |
| 15 | SECTION_HEADING `Further reading` | 8014.84 | 71.03 |
| 16 | CARD_GRID — 4 blog cards | 8130.67 | 755.92 |
| 17 | SECTION_HEADING `Other teams` | 8931.39 | 71.03 |
| 18 | CARD_GRID — 3 "for" cards | 9047.22 | 603.58 |
| — | divider / final CTA | 9716.94 / 9846.94 | 161.98 / 1038.81 |

Instance-to-instance variation is **only** card counts / row counts / prose length. Block *order*
and headings are fixed per collection, so they belong in the template, not the data — except the
counted headings (`{N} messages …`) and the values page's optional PROSE_LEFT.

---

## 4. `T-INDEX` and `T-PILLAR`

### 4.1 `T-INDEX` page map (1280) — all four index routes
```
section.relative.bg-cream
  div.mx-auto.-mt-[3em].w-full.max-w-[1920px].px-[6em].max-wf-tablet:px-[6vw].pb-[5em]
    HERO (badge "Employee recognition guide" → /employee-recognition, h1, lede)   y 44.61  h 435.98 / 533.31
    CARD_GRID  — the whole collection, one flat grid                              y 525.39 / 622.72
    SECTION_HEADING  — the "cross-sell" heading
    CARD_GRID  — 1–2 cross-sell cards
section.relative              divider
section.relative.bg-cream-dark  final CTA (1038.81px)
```

| Route | docH @1280 | hero h | main grid y / h | cards | cross-sell heading | cross-sell cards |
|---|---|---|---|---|---|---|
| `/employee-recognition/glossary` | **8342** | 435.98 | 525.39 / 5529.81 | **30** | `Looking for the practice rather than the vocabulary?` (y 6100, h 142.06) | 2 (y 6286.86, h 309.72) |
| `/employee-recognition/for` | **4818** | 533.31 | 622.72 / 1979.20 | **12** | `The rest of the guide` (y 2646.72, h 71.03) | 2 (y 2762.55, h 309.72) |
| `/employee-recognition-messages` | **10079** | 435.98 | 525.39 / 7318.53 | **35** | `Recognising a value rather than an occasion?` (y 7888.72, h 142.06) | 1 (y 8075.58, h 257.47) |
| `/company-values` | **6614** | 435.98 | 525.39 / 3872.55 | **25** | `Looking for the words instead?` (y 4442.73, h 71.03) | 1 (y 4558.56, h 309.72) |

Responsive (glossary index): docH **9377** @1440, **10781** @768, **11768** @390.

### 4.2 Grid geometry — `CARD_GRID`
```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] flex justify-center max-wf-phone:flex-col">
  <ul class="flex w-full flex-wrap justify-center gap-[3em]"> … <li> … </ul>
</div>
```
| Viewport | `ul` width | `gap` | card width | columns | row pitch |
|---|---|---|---|---|---|
| **1280** | 1152.03 | **32px** (`3em`) | **447.98px** (`42em`) | **2** (x = 176.02 and 655.98) | row height + 32px; rows equalise height (`align-items: stretch`) |
| 1440 | 1296.03 | 36px | 503.98 | 2 | — |
| 768 | 675.84 | 24.775px | 346.84 | **1** (two cards = 718.5 > 675.84) | — |
| 390 | 343.22 | 24.775px | 343.22 (`max-wf-mini:max-w-full` clamps) | **1** | — |

Row-pitch sample (glossary index @1280): rows start at y 525.39, 923.75, 1322.11, 1668.22, 2094.91,
2441.02, 2839.38, 3213.81, 3612.17, 3986.61, 4332.72, 4678.83, 5024.94, 5342.72, 5688.83 — heights
285.80 … 394.70 depending on the longest definition in the row.

**No ordering control, no pagination, no search, no A–Z.** Glossary cards are in plain alphabetical
order by display name; values alphabetical; `for` alphabetical; messages alphabetical by article
title (which is why `12 Messages for When Someone Went Above and Beyond` is first).

### 4.3 `T-PILLAR` — `/employee-recognition` (docH **25065** @1280) — `er-hub-1280.png`

Same frame as `T-DETAIL`, but:
1. **HERO has no eyebrow badge** — `h1` "Employee recognition" directly, then the lede block.
   Block y 44.61, h 377.86.
2. Interleaves **7** `RICHTEXT` blocks with **5** `CARD_GRID` groups and one stat row. The card
   groups sit in a `div.my-[4em]` wrapper (**margin-block 42.667px**, *not* 44.8px) instead of the
   standard `my-[4.2em]`.
3. One **stat row**, markup identical to CLONE_SPEC §5.5 (4 leaf pills `11.2528em x 5.75094em`,
   `69%` / `39%` / `14.9%` / `65%`, two `w-1/2 justify-around` halves, `mt-[6.5em]`), wrapped in
   `div.my-[4em]`. y 1637.61, h 137.59. Footnote `<sup>` links are **off-domain** (hubspot,
   apollotechnical) — keep inert.
4. A `LEAF_DL` "vocabulary" block, a `FAQ_DL`, and then a **"Reading list"** region: 8 consecutive
   `div.mt-[4em]` blocks (margin-top 42.667px), each = `h3` (26.667px/41.067px/700, centred,
   `text-[2.5em] leading-[1.54] font-bold text-black max-wf-phone:text-[2.4em] text-center`) + a
   CARD_GRID of 2–4 blog cards. Category `h3` labels, verbatim: `Why it matters` · `Getting started`
   · `Culture` · `Programs` · `Ideas and templates` · `Remote and virtual` · `Occasions` ·
   `Measuring and tools`.
5. **Final CTA section is replaced** (`section.relative.bg-cream-dark`, `pt-[18em] pb-[5em]`,
   height **1010.95px**, y 23543.48):
   - display h2 (6.125em/1.4/600) `Want to access our Practical Guide of Employee Recognition?`
     — wrapper `div.max-wf-mini:mt-[3em].max-wf-mini:w-auto.mt-0.w-auto` (note `w-auto`, not `w-[51em]`), y 23735.47 h 182.91
   - `p.mx-auto.max-w-[59ch].text-center` (**max-width 699.47px** — the only `59ch` paragraph in
     set B), y 23963.17 h 222.14, with `<br><br>` and a nested `<strong><strong>`
   - the **lead-magnet form** (§7), wrapper `div.mx-auto.mb-[1.6em].flex.w-full.max-w-[80ch].flex-col.gap-[10px]`
     (**max-width 444.02px = 80ch of the root em**), y 24230.11 h 253.94.
   - **No** 3-icon reassurance row, **no** TrialButton, **no** Slack/Teams links, **no** small print.

Block y/h table for the whole pillar page is in `_reference/recon-b/er_hub.json` (`blocks[]`).

---

## 5. New components

### 5.1 `LinkCard` (the universal listing / related card) — NEW
Used by every `CARD_GRID` on T-INDEX, T-DETAIL and T-PILLAR.

```html
<li class="relative z-[100] w-[42em] list-none rounded-[10px] border-2 border-black bg-white
           p-[2.4em] max-wf-mini:max-w-full">
  <a class="no-underline" href="{href}">
    <h2|h3 class="font-headline text-[3.5em] leading-[1.4] font-semibold text-black">{title}</h2>
    <p class="my-[1em] text-[1.5625em]">{description}</p>          <!-- OPTIONAL -->
    <p class="mt-[0.5em] text-[1.75em] font-semibold">{ctaLabel}</p>
  </a>
</li>
```

| prop | value @1280 |
|---|---|
| size | **447.98 x (auto)** — `w-[42em]`; sampled heights 285.80 – 475.09 |
| background | **`#ffffff`** ⚠️ *new surface* — the homepage's only card (testimonial) is `bg-cream`. These are pure white on cream. |
| border / radius | **2px solid #000000** / **10px** |
| padding | `2.4em` → **25.6px** (all sides); content box 392.80px |
| box-shadow | **none** · hover/active: **none** (the whole card is a plain `<a>`; the only affordance is the cursor) |
| stacking | `position:relative; z-index:100` — sits above the decorative leaves of a `MESSAGE_GRID` wrapper |
| `a` | `text-decoration:none`, inherits weight 600 / `line-height:1` from `.marketing-root a`, colour `#333333` on the anchor box but all children override to `#000` |
| heading | **37.333px (3.5em) / 52.267px (1.4) / 600 / headline serif / `#000000`**, `text-align:center` — **NEW ROLE** |
| ↳ level | `h2` on the four index pages (top-level listing); `h3` in every "related/further reading" group on detail pages and in T-PILLAR card groups |
| description | **16.667px (1.5625em) / 28.333px (1.7) / 400 / Rubik / `#000000`**, `margin-block: 16.667px` (`my-[1em]` = 1em of 16.667px) — **NEW ROLE**. Optional: present on glossary/for/values/messages cards, **absent** on blog-article cards and on some T-PILLAR cards. |
| CTA label | **18.667px / 31.733px / 600 / Rubik / `#000000`**, `margin-top: 9.333px`. Not a button, not underlined — just bold text. |
| text align | `center` (inherited from the block's `text-center`) |

`ctaLabel` by target collection (these are template constants, keyed off the link target):
| target | label |
|---|---|
| `/employee-recognition/glossary/*` | `Read the definition` |
| `/employee-recognition/for/*` | `Read the guide` |
| `/employee-recognition-messages/*` | `Read the examples` |
| `/company-values/*` | `See what to recognise` |
| `/employee-recognition-messages` (index) | `Browse the occasions` |
| `/company-values` (index) | `See the values` |
| `/employee-recognition` (pillar) | `Read the guide` |
| `/blog/*` | `Read the article` |
| `/customer-success-stories/*` | `Read full case study` |

### 5.2 `MessageCard` + `MESSAGE_GRID` — NEW
The core of the 35 message pages, the 25 value pages and the 12 "for" pages.
**There is no copy-to-clipboard control** (verified — §1 negatives).

```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] flex justify-center max-wf-phone:flex-col">
  <div class="relative mx-auto w-[87em] max-w-full">
    <span aria-hidden class="pointer-events-none"> … 6 x QUOTE_LEAVES (static) … </span>
    <ul class="flex flex-wrap justify-center gap-[3em]">
      <li class="relative z-[100] flex w-[42em] list-none flex-col rounded-[10px] border-2
                 border-black bg-white p-[2.4em] max-wf-mini:max-w-full">
        <p class="text-[1.75em] leading-[1.7]">{message}</p>
        <div class="mt-auto pt-[1.4em]">
          <span class="inline-flex items-center rounded-full border-2 border-black bg-leaf
                       text-center text-black px-[1.1em] py-[0.35em] text-[1.4375em]
                       font-semibold">{category}</span>
          <p class="mt-[0.8em] text-[1.4375em]">{note}</p>
        </div>
      </li>
    </ul>
  </div>
</div>
```

| prop | value @1280 |
|---|---|
| wrapper | `w-[87em] max-w-full` = **927.98px**, centred, `position:relative` |
| grid | `flex flex-wrap justify-center`, `gap` **32px**; 2 columns at 1280 (x 176.03 / 656.00 inside the wrapper) |
| card | **447.98px** wide, `flex-col`, bg `#ffffff`, border 2px `#000`, radius **10px**, padding **25.6px**, `z-index:100`. Heights equalise per row (`stretch`); sampled 242.86 – 337.22. |
| message `p` | **18.667px / 31.733px / 400 / Rubik / `#000000`**, `text-align:center`, width 392.80px, margin 0 |
| footer | `div.mt-auto.pt-[1.4em]` → `margin-top:auto` (pins the footer to the card bottom — this is why rows look even), `padding-top` **14.933px** |
| category badge | `text-[1.4375em]` of the `li` (10.6667px) → **15.333px / 24.533px / 600 / Rubik / `#000000`**; bg `#beedc0`; border **2px solid #000**; `rounded-full`; padding **5.367px 16.867px**; measured e.g. **102.98 x 39.23px** for "Manager". **No `transition-colors`, no `hover:bg-white`** — unlike the hero eyebrow badge (§3.2). Same visual, different behaviour: two variants of one component. |
| note `p` | **15.333px / 26.067px (1.7) / 400 / Rubik / `#000000`**, `margin-top` **12.267px**, centred |
| leaves | the 6 static `QUOTE_LEAVES` of CLONE_SPEC §7.2 verbatim (`top:-1.1em left:-5.7em rot -69 z11`, `bottom:-3.3em left:-4.7em rot -126`, `bottom:-7.6em left:-1.1em rot -160`, `bottom:-6.4em right:-2.3em rot 143`, `bottom:3.5em right:-2.8em rot 114`, `top:-5.2em right:-4.3em rot 46`) — **no animation**, no `marketing-drift-leaf` class, `pointer-events:none`, `aria-hidden` |

Card counts: messages pages **10–14** (page title states the number); company-values pages **6**;
`for` pages **5**. Two proof examples (geometry only — these are the site's editorial copy, not
transcribed en masse):
- `/employee-recognition-messages/promotion`, card 1 — message 3 lines (h 95.20 at 1440-scaled 107.06),
  category badge `Peer, overdue promotion`, note 1 line. Card 268.91px tall at 1280.
- `/company-values/accountability`, card 1 — message 3 lines, badge `Manager`, note 1 line.
  Card 242.86px tall.
  Badge vocabulary observed: `Manager`, `Peer`, `Founder, the day before launch`,
  `Ward manager, at handover`, `Manager, to a report`, `Peer, engineering`, `Peer, light`,
  `Peer, humorous`, `Peer, 1 year, light`, `Manager, 3 years` — free text, not an enum.

### 5.3 `CaseStudyMetaCard` — NEW (T-STORY)
```html
<div class="relative mx-auto flex w-[26%] items-start max-wf-tablet:mb-[5em]
            max-wf-tablet:w-[46em] max-wf-mini:w-[95%]">
  <span aria-hidden class="pointer-events-none"> … 3 x CARD_LEAVES … </span>
  <div class="relative z-[100] w-full rounded-[10px] border-2 border-black bg-white
              pt-[4.21943em] pb-[3.6875em]">
    <div class="flex flex-col items-center">
      <div class="mb-[1.5em]">                                      <!-- x6 -->
        <p class="font-semibold">{label}</p>
        <p class="mx-[3em] mb-[0.75em] max-w-[49ch] text-center max-wf-mini:mx-0">{value}</p>
        <img class="mt-[0.4em] ml-[0.7em] inline-block w-[1.26708em] max-wf-mini:mb-[0.9em]
                    max-wf-mini:w-[2em]" src="/assets/ever-small-leafsvg-e988d6.svg" alt="">
      </div>
      …
      <div class="mb-[1.5em]">
        <p class="font-semibold">Read more</p>
        <a class="mb-[1.2em] text-[1.6875em] font-medium underline" href="{website}" >Website</a>
      </div>
    </div>
  </div>
</div>
```
| prop | value @1280 |
|---|---|
| column | `w-[26%]` of 1152.03 = **299.52px**, `align-items:flex-start`, `margin-inline` 80.65px (it is a flex child of the 2-col row) |
| card | **299.52 x 790.89px**, bg `#ffffff`, border 2px `#000`, radius **10px**, padding **45.007px 0 39.333px** (`pt-[4.21943em] pb-[3.6875em]`, **zero horizontal padding**) |
| row | `div.mb-[1.5em]` → margin-bottom **16px**, content width 210.67px, height 104.63 |
| label `p` | **18.667px / 31.733px / 600 / `#000000`**, centred |
| value `p` | **18.667px / 31.733px / 400 / `#000000`**, `margin: 0 56px 14px`, `max-width 580.714px`, centred |
| trailing leaf | `ever-small-leafsvg`, `w-[1.26708em]` = **13.50 x 22.91px**, `inline-block`, `margin: 4.267px 0 0 7.467px` |
| website link | **18px / 18px / 500 / `#333333`**, `text-decoration: underline` (one of the very few underlined links outside prose), `margin-bottom 21.6px`. **Off-domain → keep inert.** |
| leaves | the 3 `CARD_LEAVES` of §7.2 verbatim (`top:-6em left:-5.1em rot -54 z11 from[7,8] 1300ms`, `top:-7.6em left:-0.6em rot 6 z11 from[1,8] 1500ms`, `top:-0.7em left:-5.6em rot -80 z13 from[10,1] 1000ms`) |

Row labels, in order, identical on all 4 instances: `Company` · `HQ Location` · `Employees` ·
`Industry` · `Trees Planted` · `Read more`.

### 5.4 `CaseStudyTeaserCard` — NEW (T-STORY "other stories")
```html
<div class="mb-[14em]">                                     <!-- margin-bottom 149.333px -->
  <div class="relative flex w-[34.4013em] flex-col items-center max-wf-mini:w-auto">
    <span aria-hidden class="pointer-events-none"> … 3 x CARD_LEAVES … </span>
    <div class="relative z-[100] flex h-full w-[42em] flex-col items-center rounded-[10px]
                border-2 border-black bg-white px-[3em] pt-[4.21943em] pb-[3.6875em]
                max-wf-mini:w-auto">
      <span class="flex justify-center"><img class="h-[4.3em]" src="…" alt="{company} logo"></span>
      <div class="my-[1.3em]"><h2 class="font-headline text-[4.5em] leading-[1.48] font-semibold text-black max-wf-mini:text-[3.9em]">{company}</h2></div>
      <div class="mb-[1.3em] flex font-semibold">
        <p class="text-center font-bold">{employees}</p>
        <p class="ml-[0.3em] text-center font-bold">Employees</p>
      </div>
      <p class="mx-auto max-w-[49ch] text-center text-[1.5625em]">{teaser}</p>
      <div class="mt-[1.3em] max-wf-mini:min-h-[4.69em]">
        <a class="flex w-full justify-center no-underline" href="/customer-success-stories/{slug}">
          <p class="mt-[0.5em] text-[1.75em] font-semibold">Read full case study</p>
        </a>
      </div>
    </div>
  </div>
</div>
```
| prop | value @1280 |
|---|---|
| outer row | `div.mt-[7em].mb-[-10em].w-[87em]` = **927.98px**, `margin: 74.667px 0 -106.667px` (the negative bottom margin pulls the divider up under the cards) |
| wrapper | `w-[34.4013em]` = 366.94px but the card inside is `w-[42em]` = **447.98px** → cards deliberately overflow their wrapper and overlap; x = 232.53 and 712.51 |
| card | **447.98 x 475.09px**, bg `#ffffff`, 2px `#000`, radius 10px, padding **45.007px 32px 39.333px** |
| logo | `h-[4.3em]` → **45.86px tall**, width auto (130.86px for `workletesvg`, 201.84px for `logo-kent-and-whitepng`) |
| company h2 | **48px / 71.04px / 600 / headline serif / `#000000`**, inside `div.my-[1.3em]` (margin-block 13.867px) |
| employees row | two bold `p` at **18.667px / 31.733px / 700 / `#000000`**, second has `margin-left 5.6px`; wrapper `mb-[1.3em]` = 13.867px |
| teaser | **16.667px / 28.333px / 400 / `#000000`**, `max-width 518.473px` (49ch of 16.667px), centred, width 380.02px |
| CTA | `div.mt-[1.3em]` → `a.flex.w-full.justify-center.no-underline` → `p.mt-[0.5em].text-[1.75em].font-semibold` = **18.667px / 31.733px / 600 / `#000000`**, label `Read full case study` |

### 5.5 `CalendlyCard` — NEW (T-PARTNER)
```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] flex justify-center max-wf-phone:flex-col">
  <div class="relative mt-[7.6em] flex w-[50.4013em] flex-col items-center max-wf-mini:w-[40em]">
    <span aria-hidden class="pointer-events-none"> … 8 x scroll-tracked HERO leaves … </span>
    <div class="relative z-[100] min-h-[25em] w-full rounded-[10px] border-2 border-black
                bg-white p-[2em] max-wf-mini:px-[1em]">
      <div class="calendly-inline-widget h-[630px] min-w-[320px] w-full [&>iframe]:h-full"
           data-url="…"></div>
    </div>
  </div>
</div>
```
Wrapper **537.61px** wide (`50.4013em`), `margin-top 81.067px`. Card **537.61 x 676.66px**,
bg `#ffffff`, 2px `#000`, radius 10px, padding **21.333px** (`2em`), `min-height 266.67px`.
Widget box **490.95 x 630px** (height is a **fixed 630px**, not em). Loads
`https://assets.calendly.com/assets/external/widget.js` → **third-party/off-domain: stub it.**
Render a 490.95 x 630 placeholder inside the card.
Leaves: the **8 scroll-tracked** entries of `HERO_LEAVES` (§7.2/§7.3) — classes
`marketing-scroll-leaf marketing-responsive-leaf`, same `--leaf-top` / `--leaf-phone-top` /
`--leaf-rotate` values and the same `useScroll` spring track as the homepage hero. The 4 pure-drift
hero leaves are **not** used here.

### 5.6 `LeadMagnetForm` — see §7.

---

## 6. `T-STORY` — case study (4 routes)

Screenshots: `story-wunderdog-1280.png`, `story-nitro-1280.png`, `story-kentwhite-1280.png`,
`story-worklete-1280.png`.

### 6.1 Section map @1280 (wunderdog; docH **5855**)
| # | role | section y / h | bg | inner padding / margin-top | columns |
|---|---|---|---|---|---|
| 1 | Hero: h1 + subtitle | 44.61 / 282.66 | `#fffff3` | `0 64px` / `-32px` | 1, centred |
| 2 | Quote + hero image, 2-col | 340.08 / 438.64 | `#fffff3` | `0 64px` / `-32px` | `flex justify-between gap-[4em]` → left `w-[44em]`=448.64, right `w-[60%]`=660.73; `max-wf-tablet:flex-col items-center gap-0` |
| 3 | Meta card + prose body, 2-col | 906.72 / 2619 | `#fffff3` | `0 64px` / `-32px` | block `div.mt-[15em].mb-[4.2em].flex` (margin **160px / 44.8px**) → left `w-[26%]`=299.52, right `w-[60%]`=691.22 `text-left`; `max-wf-tablet:flex-col` |
| 4 | "Other stories" teaser row | 3570.52 / 637.22 | `#fffff3` (`pt-[3em]` on the section) | `0 64px` / `-32px` | 2 teaser cards, `flex-wrap justify-center`; `max-wf-tablet:flex-col items-center` |
| 5 | Leaf divider | 4175.75 / 161.98 | transparent, band `bg-cream` | — | — |
| 6 | Final CTA (standard) | 4305.75 / 1038.81 | `#edede2` | `192px 64px 53.333px` / `-32px` | — |

docH: wunderdog **5855**, nitro-games **6318**, kent-white **5784**, worklete **5343**.
Responsive: wunderdog **6551** @1440, **5985** @768, **7617** @390.

Note sections 1–4 are **four separate `<section class="relative bg-cream">`**, each with its own
`-mt-[3em]` wrapper and **no bottom padding** — unlike every other template, which uses one section
with `pb-[5em]`.

### 6.2 Hero + quote block details
- `h1` = company name, standard 65.333px/97.347px/600 serif, centred, block y 44.61 h 282.66
  (wrapper `div.pt-[10.2em]` → `div.relative.mx-auto.w-[108em]…`).
- Subtitle: `div.my-[4.2em]…flex.items-center.justify-center.max-wf-mini:flex-col` →
  `p.mx-[3em].text-center.max-wf-mini:mx-0.max-wf-mini:mt-[1em].max-wf-mini:mb-[2em]` =
  18.667px/31.733px/400/#000, `margin-inline 56px`. Copy pattern:
  `How Evergreen helped {Company} with peer recognition and environmental impact`.
- Quote column (`w-[44em]` = 448.64px, `flex-col items-center`):
  - Portrait: `span.mb-[2.5em].size-[11.7918em].overflow-hidden.rounded-full.border-2.border-black.bg-leaf`
    → **125.77 x 125.77px**, radius full, border 2px `#000`, bg `#beedc0`, `margin-bottom 26.667px`;
    `img.size-full.object-cover` → **121.77 x 121.77**, **`object-fit: cover`** (the only `cover` in
    set B), `alt="Image of person quoted"`.
  - Quote `p.mx-[3em].mb-[1em].max-w-[49ch].text-center…` = 18.667/31.733/400/#000,
    `margin 0 56px 18.667px`, max-width 580.714px, measured width 336.67px.
  - Name + role: two `p.mx-auto.max-w-[49ch].text-center.font-bold` = **18.667px / 31.733px / 700 /
    `#000000`**, centred. (Two separate `<p>`, not a `<br>`.)
- Hero image column `div.w-[60%]` = 660.73px → `img.size-full` rendered **660.73 x 438.64**,
  `object-fit: fill`, `alt="Image of customer story"`.

### 6.3 Prose body column
`div.w-[60%].text-left` (691.22px) → `div.marketing-rich-text.mx-auto.max-w-[77.78em].max-wf-tablet:w-auto`
→ measured **691.22px** wide (the 60% column is narrower than 829.65px, so the column wins).
This is the only place in set B that renders `blockquote`, `figure` and `figcaption` — see §2.1 for
their exact computed values (blockquote **24.667px/41.933px/500**, bg `#c3f2c5`, 2px border, radius
10px, padding 24.667/49.333/24.667/41.933, margin-block 37px; figure max-width 60% → **414.73px**;
figcaption **10.667px/17.067px**, centred, margin-top 5px).
Wunderdog body shape: `h2` x2, `h3` x2, `p` x9, `blockquote` x2, `figure` x1, inline `a` x2 (both
off-domain). Nitro-games: `h2` x2, `h3` x2, `p` x8, `blockquote` x2, `figure` x1.

---

## 7. Forms

Both forms in set B are the **same component** (`LeadMagnetForm`): T-EBOOK's card form and
T-PILLAR's final-CTA form. Identical field list, classes and geometry.

```html
<div class="mx-auto mb-[1.6em] flex w-full max-w-[80ch] flex-col gap-[10px]">
  <form class="flex w-full flex-col justify-center gap-[10px]">
    <input type="text"   name="website"    tabindex="-1" autocomplete="off" aria-hidden="true"
           class="absolute -left-[9999px] size-px opacity-0">        <!-- honeypot -->
    <input type="hidden" name="sourcePath" value="{pathname}">
    <input type="text"   name="name"    placeholder="Name"    aria-label="Name"    required maxlength="256"
           class="h-[3em] max-w-[49ch] rounded-[7px] border-2 border-black px-[0.9em]
                  text-[1.75em] leading-[1.7] text-black placeholder:text-black/60">
    <input type="email"  name="email"   placeholder="Email"   aria-label="Email"   required maxlength="256" class="…same…">
    <input type="text"   name="company" placeholder="Company" aria-label="Company" required maxlength="256" class="…same…">
    <button type="submit"
            class="h-[3em] rounded-[10px] bg-black px-[1.4em] text-[1.75em] leading-[1.7]
                   font-bold text-white disabled:opacity-70">Download</button>
  </form>
</div>
```

| field | type | name | placeholder | aria-label | required | maxlength | geometry @1280 |
|---|---|---|---|---|---|---|---|
| honeypot | text | `website` | — | `aria-hidden="true"`, `tabindex="-1"`, `autocomplete="off"` | no | — | 1 x 1px at `left: -9999px`, `opacity: 0` |
| source | hidden | `sourcePath` | — | — | no | — | 0 x 0 |
| Name | text | `name` | `Name` | `Name` | **yes** | 256 | **444.02 x 55.98px** |
| Email | email | `email` | `Email` | `Email` | **yes** | 256 | **444.02 x 55.98px** |
| Company | text | `company` | `Company` | `Company` | **yes** | 256 | **444.02 x 55.98px** |
| Submit | button[submit] | — | — | — | — | — | **444.02 x 55.98px**, label `Download` |

- **Column width**: `max-w-[80ch]` on the wrapper → **444.02px** (80ch of the root em, 10.6667px).
  Fields are flex children with `align-items: stretch`, so they fill it; their own
  `max-w-[49ch]` = 580.71px never binds.
- **Row gap** `gap-[10px]` — a fixed 10px, not an `em` value. Wrapper `margin-bottom 17.067px` (`1.6em`).
- **Input**: height `3em` computed *after* `text-[1.75em]` → 3 x 18.667 = **55.98px**.
  `border: 2px solid #000000`, `border-radius: **7px**`, `padding: 0 16.8px` (`0.9em` of 18.667px),
  background transparent, text **18.667px / 31.733px / 400 / `#000000`**, placeholder
  **`rgba(0,0,0,0.6)`**. No shadow. No focus ring declared → browser default outline.
- **Submit**: height **55.98px**, `border-radius: **10px**` (all four corners — unlike the footer
  newsletter button's `rounded-r-[10px]`), `background #000000`, `padding: 0 26.133px`,
  label **18.667px / 31.733px / 700 / `#ffffff`**. No hover, no active, no transition.
  `disabled:opacity-70`.
- **State machine** (from the shared `useMarketingForm` hook, same as §5.12):
  | state | rendering |
  |---|---|
  | idle | as above |
  | focus | no custom style; browser default focus ring only |
  | pending | submit gets `disabled` + `opacity: 0.70`; **label text becomes `Please wait...`** |
  | success | the **whole `<form>` is replaced** by `FormDone`: `div[role="status"].rounded-[10px].border-2.border-black.bg-leaf.p-[20px].text-center > p.text-black` with text **`Thank you!`** (radius 10px, border 2px `#000`, bg `#beedc0`, padding 20px). `form.reset()` is called. |
  | error | `FormError` appended **below** the form: `div[role="alert"].mt-[1.4em].rounded-[10px].border.border-black.p-[10px] > p.text-black` — note **`border` = 1px solid #000000** (not 2px), radius 10px, padding 10px, margin-top 14.933px. Message text comes from the server action; use a neutral string such as `Something went wrong. Please try again.` and flag it as a guess. |
- The target is a **Next.js server action** (no public endpoint). **Stub the submit**: validate
  client-side (all three required, `type=email` native validation), then show `pending` for ~600ms
  and switch to `FormDone`.
- No consent checkbox, no privacy-policy copy, no reCAPTCHA — the honeypot is the only spam control.

### 7.1 `T-EBOOK` page map @1280 (docH **3347**) — `ebook-1280.png`
| # | role | y | h | notes |
|---|---|---|---|---|
| — | section 1 | 44.61 | 1655.13 | `bg-cream`; wrapper **`px-0 max-wf-tablet:px-0`** ⚠️ **breaks the §4.3 container rule** — this is the only page in set B with **zero gutter**; blocks are full-bleed 1280px and rely on their own `mx-auto` + `max-w` |
| 1 | HERO (no eyebrow badge) | 44.61 | 303.45 | `h1 > strong` → **65.333px / 97.347px / weight 700** serif (the `<strong>` bumps 600→700 — the only 700 display heading in set B). Copy: `Unlock Employee Engagement with Employee Recognition` |
| 2 | Lede block | 392.86 | 571.22 | `p.mx-auto.max-w-[60ch].text-center` → **max-width 711.08px** (60ch of 18.667px), width 711.08, x 284.46. Contains `<strong>`, 9 `<br>`, and an `<em><sub>` 5-line bullet list at **14px / line-height 0** (`sub`, vertical-align sub) — NEW role, visually a small indented list |
| 3 | Form card | 1008.88 | 433.05 | wrapper `div.relative.mx-auto.mt-[7.6em].flex.w-[50em].flex-col.items-center.max-wf-mini:w-[90%]` = **533.33px**, `margin-top 81.067px`; card `div.relative.z-[100].min-h-[25em].w-full.rounded-[10px].border-2.border-black.bg-white.px-[4em].pt-[4.21943em].pb-[3em].max-wf-mini:px-[2em]` → **533.33 x 351.98px**, padding **45.007px 42.667px 32px**, min-height 266.67px, bg `#ffffff`, border 2px `#000`, radius 10px; 3 `CARD_LEAVES` behind it (§7.2 verbatim) |
| 4 | G2 block | 1516.58 | 183.16 | identical to CLONE_SPEC §5.10 (`mt-[7em]`, G2 logo `w-[6.03104em]`, 5 stars `mx-[1.14204em] w-[3.03685em]`, `4.8 / 5 on G2 Reviews` at 26.667px/41.067px/600). Block has `mb-0`. |
| — | divider | 1667.75 | 161.98 | band `bg-cream` |
| — | final CTA (standard) | 1797.75 | 1038.81 | `#edede2` |

Responsive: docH **3761** @1440, **2632** @768, **3539** @390.

---

## 8. `T-PARTNER` — partner landing (3 routes) — `partner-50pros-1280.png`

**This is the homepage.** docH **7868** (50pros), **7868** (product-hunt), **7893**
(the-people-people-group) at 1280. Section map:

| # | section | y | h | bg | inner |
|---|---|---|---|---|---|
| 1 | Hero + social proof (homepage section C, modified) | 44.61 | 3424.19 | `#fffff3` | `0 64px` / `-32px` |
| 2 | divider | 3436.81 | 161.98 | band **`bg-cream-dark`** | — |
| 3 | "Create a positive company culture through social recognition" (= homepage section E) | 3566.81 | 1308.84 | `#edede2` | `192px 64px 53.333px` |
| 4 | divider | 4843.67 | 161.98 | band **`bg-cream-dark`** | — |
| 5 | "Support your business structure with clear reporting" (= homepage section F, 2nd row only) | 4973.67 | 1220.45 | `#fffff3` | `192px 64px 53.333px` |
| 6 | divider | 6162.14 | 161.98 | band `bg-cream` | — |
| 7 | Final CTA | 6292.14 | 1064.86 | `#edede2` | `192px 64px 53.333px` |

Hero block contents, in order (all homepage markup unless marked **NEW**):
1. **NEW** `div.my-[4.2em].text-center.max-wf-mini:my-[3.5em]` → `img.mx-auto.h-[75px].w-auto`
   (PPG: `h-[100px]`, plus `max-w-full` on Product Hunt). y 198.20. See §9 for files/sizes.
2. H1 + the 2 floating avatar pills — **verbatim** homepage markup (`a1png`, `a2png`,
   `h-[5.75094em] w-[11.2528em] rounded-[46px] border-2 border-black bg-leaf`, pill positions
   `top-[2.5em] left-[30.9em]` / `top-[11.5em] left-[62em]`). Same H1 copy and same
   `<span class="mr-[2.25em]">Recognise</span>` / `<span class="ml-[2.25em]">the planet</span>`.
3. Hero paragraph — homepage copy, **plus** `<br><br>` and **NEW** sentence:
   `Schedule a free demo and <strong>get {PCT}% off from your first year</strong> by being a {SUFFIX}`
   `p.mx-auto.max-w-[49ch].text-center` → **580.70px** wide, h 190.41, y 557.45.
4. **NEW** `CalendlyCard` (§5.5) **in place of** the homepage hero screenshot + its line/heart
   overlays. y 873.72, h 676.66.
5. `h2` `8000+ users • 100,000+ recognitions` (26.667px/41.067px/700) — note this differs from the
   homepage's `8000+ users • 300,000+ recognitions`.
6. Slack / Teams / **Mattermost "Coming soon"** row — `div.flex.justify-center.gap-[4em]`
   (gap 42.667px). ⚠️ The homepage trial modal shows **Webex** "Coming soon"; the partner page shows
   **Mattermost** (`mattermost-svg-file-ae25d1.svg`, rendered 37.06 x 37.06). The link `<a>`s here
   have **no** `mx-[3.5em]` (the gap handles spacing).
7. Display h2 `Plant trees to recognise your peers, while uniting your team around great environmental purpose.` (`w-[70.3em]`, `mt-[7.4em]`)
8. 4-stat pill row — verbatim §5.5 (`69%`, `39%`, `14.9%`, `65%`)
9. `Used by leading companies…` eyebrow (`mt-[8.9em] w-[49em]`)
10. 2 testimonial cards + 12 QUOTE_LEAVES + 2 company logos — verbatim §5.7
11. 6-logo customer strip — verbatim §5.9 (same 6 logos, same inline `em` widths)
12. G2 block — verbatim §5.10

Sections 3 and 5 are the homepage's sections E and F verbatim (value badge `Tagged Value: Grit`,
`Sue earned 3 seeds`, `sn-2png`, `+100k` / `+8k` stat column, `sn-4apng`,
`screen-report-split-2svg`). Section 3's copy block is `div.text-center.my-0.w-full` (margin 0) and
ends with an inline link `Learn more` → `/`.

Final CTA = standard, **except** the small print, which gains a third clause.

### Per-instance data (the entire difference between the 3 routes)
| slug | logo file | logo class | `{PCT}` | `{SUFFIX}` | small print | `<title>` |
|---|---|---|---|---|---|---|
| `50pros` | `50pros-logo-black-e3d976.svg` | `mx-auto h-[75px] w-auto` → **251.84 x 75** | 30 | `a 50Pros customer.` | `No credit card needed • No setup costs • Contact us for your 30% 50Pros discount` | `Evergreen x 50Pros` |
| `product-hunt` | `product-hunt-logo-copy-f0147c.webp` | `mx-auto h-[75px] w-auto max-w-full` → **416.66 x 75** | 30 | `a Product Hunt Member.` | `… • Contact us for your 30% Product Hunt discount` | `Evergreen x Product Hunt` |
| `the-people-people-group` | `tppg-dark-logo-a4eebe.webp` | `mx-auto h-[100px] w-auto` → **91.27 x 100** | 15 | `a member of The People People Group.` | `No credit card needed • No setup costs • Contact us for your 15% discount` | `The People People Group \| Evergreen Partner Page` |

Meta description pattern: `Evergreen for {Partner}: get {PCT}% off from your first year.`

---

## 9. Assets

All asset URLs are `https://www.evergreen.so/marketing/<file>` and are served locally from
`/assets/<file>`. **42 distinct images** are rendered across the sampled routes; 28 were already in
`public/assets` (shared with the homepage). **15 files were missing and have been downloaded** into
`/Users/riyaghosh/V3/evergreen/public/assets/` with their original filenames. **0 failures.**

| # | file | bytes | used by | rendered @1280 | intrinsic | fit |
|---|---|---|---|---|---|---|
| 1 | `50pros-logo-black-e3d976.svg` | 7 773 | `/partners/50pros` hero logo | 251.84 x 75 | 300 x 89 | fill |
| 2 | `product-hunt-logo-copy-f0147c.webp` | 6 646 | `/partners/product-hunt` hero logo | 416.66 x 75 | 1000 x 180 | fill |
| 3 | `tppg-dark-logo-a4eebe.webp` | 12 104 | `/partners/the-people-people-group` hero logo | 91.27 x 100 | 450 x 493 | fill |
| 4 | `mattermost-svg-file-ae25d1.svg` | 861 | all 3 partner pages, "Coming soon" row | 37.06 x 37.06 | 24 x 24 | fill |
| 5 | `t1png-d278e8.webp` | 14 538 | `/customer-success-stories/wunderdog` quote portrait | 121.77 x 121.77 | 379 x 383 | **cover** |
| 6 | `nitro-7ab98f.webp` | 14 668 | `…/nitro-games` quote portrait | 121.77 x 121.77 | 400 x 400 | **cover** |
| 7 | `james-rowley-e7e9f5.webp` | 12 656 | `…/worklete` quote portrait | 121.77 x 121.77 | — | **cover** |
| 8 | `t3png-c485a1.webp` | 10 362 | `…/kent-white` quote portrait | 121.77 x 121.77 | — | **cover** |
| 9 | `6040ebfbc5bbf0b356485b68-evergreen-customer-success-story-wu-a91174.webp` | 60 164 | wunderdog hero image | 660.73 x 438.64 | 1080 x 717 | fill |
| 10 | `6093fee595fb1027740e32ce-evergreen-customer-success-story-ni-b56302.webp` | 181 776 | nitro-games hero image | 660.73 x 456.69 | 1224 x 812 | fill |
| 11 | `604635cc5238b1400d42ff05-evergreen-customer-success-story-ke-b7b307.webp` | 79 634 | kent-white hero image | 660.73 x … | — | fill |
| 12 | `60400af600d01e2b15b060f1-evergreen-customer-success-story-wo-397b3d.webp` | 82 662 | worklete hero image | 660.73 x … | — | fill |
| 13 | `6040ec8c481409f3c3271af3-wunderdog-uses-evergreen-6e1e7c.webp` | 24 496 | wunderdog prose `figure` | 414.70 x 248.83 | 1000 x 600 | fill |
| 14 | `609404d86be6b801dd061886-nitro-games-uses-evergreen-d4e489.webp` | 22 872 | nitro-games prose `figure` | 691.19 x 414.72 | 1000 x 600 | fill |
| 15 | `webexpng-52e71f.webp` | — | trial modal "Coming soon" (flagged missing in CLONE_SPEC §6; fetched while here) | 37.06 x 37.06 | — | fill |

Already present (reused, no action): `evergreen-logosvg-216cd4.svg`, `ever-small-leafsvg-e988d6.svg`,
`ever-regular-leafsvg-1b92f2.svg`, `leaf-smallersvg-6114e8.svg`, `leaf-spikesvg-7a4672.svg`,
`icon-usersvg-f5e0ab.svg`, `icon-supportsvg-bc4096.svg`, `icon-timesvg-4c8791.svg`,
`slacksvg-1b4e41.svg`, `teamssvg-b74fd1.svg`, `icon-linkedinsvg-777cac.svg`,
`icon-twittersvg-6d6f46.svg`, `icon-emailsvg-1a80b8.svg`, `logo-g2png-c53a3f.webp`,
`star1svg-303d31.svg`, `a1png-5e2164.webp`, `a2png-f0a2cf.webp`, `t1png-cd91ac.webp`,
`t2png-2ed757.webp`, `logo-wunderdogsvg-62f3d4.svg`, `logo-acmsvg-a35036.svg`,
`logo-harvardsvg-c5efb6.svg`, `logo-nitrosvg-7a0f33.svg`, `logo-earnestsvg-2634ab.svg`,
`logo-octopussvg-a91e19.svg`, `coverwallet-logo-31e933.svg`, `logo-hifyresvg-64f8d6.svg`,
`sn-2png-f6c14a.webp`, `sn-4apng-19e16a.webp`, `screen-report-split-2svg-008209.svg`,
`workletesvg-eb3abc.svg`, `logo-kent-and-whitepng-139c7a.webp`.

Repeated-icon render sizes worth having: `ever-small-leafsvg-e988d6.svg` renders at
**13.50 x 22.91** in `LEAF_BULLETS` / meta card, **17.06 x 28.95** in `LEAF_DL`, and
**24.14 x 40.95** in the eyebrow badge (intrinsic 21 x 36). The 3-icon CTA row uses
`icon-usersvg` 31.30 x 34.61, `icon-supportsvg` 31.14 x 34.61, `icon-timesvg` 34.61 x 34.61.

`loading` attributes: the nav logo, the eyebrow leaves, all `LEAF_DL`/`LEAF_BULLETS` leaves, the
CTA-row icons, Slack/Teams/Mattermost logos, partner hero logos, case-study portraits and
case-study hero images are **eager** (`loading` attr absent → `auto`). The 12 divider leaves and
the `CARD_LEAVES` are `loading="lazy" decoding="async"`. G2 logo and stars are lazy.

Asset manifest for set B is this table; `ASSET_MANIFEST.md` is owned by another agent and was not
touched.

---

## 10. New typographic roles (not in CLONE_SPEC §3.3)

All measured at 1280 (root 10.6667px). `letter-spacing: normal` on every one — verified; no element
in set B uses a non-normal tracking.

| # | Role | Selector | em | px | lh | weight | family | colour |
|---|---|---|---|---|---|---|---|---|
| N1 | **Prose h2** | `.marketing-rich-text h2` | 4.5em | **48** | **57.6** (1.2) | 600 | headline serif | `#000000` |
| N2 | **Prose h3** | `.marketing-rich-text h3` | 2.5em | 26.667 | 41.067 | 700 | Rubik | `#000000` |
| N3 | Prose h4 (rule exists, unused) | `.marketing-rich-text h4` | 1.88em | 20.053 | 28.07 | 700 | Rubik | **`#333333`** |
| N4 | **Prose list** | `.marketing-rich-text :is(ul,ol)` / `li` | 1.75em | 18.667 | 31.733 | 400 | Rubik | **`#333333`** |
| N5 | **Blockquote** | `.marketing-rich-text blockquote` | 2.3125em | **24.667** | **41.933** | 500 | Rubik | `#333333` (its `p` → `#000000`) |
| N6 | **Figcaption** | `.marketing-rich-text figcaption` | 1em of container | **10.667** | 17.067 | 400 | Rubik | `#333333` |
| N7 | **Card heading** | `li h2\|h3.font-headline.text-[3.5em].leading-[1.4]` | 3.5em | **37.333** | **52.267** | 600 | headline serif | `#000000` |
| N8 | **Card description** | `p.my-[1em].text-[1.5625em]` | 1.5625em | **16.667** | **28.333** | 400 | Rubik | `#000000` |
| N9 | **Card CTA label** | `p.mt-[0.5em].text-[1.75em].font-semibold` | 1.75em | 18.667 | 31.733 | 600 | Rubik | `#000000` |
| N10 | **Eyebrow badge label** | `a > span.rounded-full.text-[1.4375em]` (inside `p`) | 1.4375 x 1.75em | **26.833** | **26.833** (1) | 600 | Rubik | `#000000` |
| N11 | **Message-card badge label** | `li span.rounded-full.text-[1.4375em]` | 1.4375em | **15.333** | **24.533** (1.6) | 600 | Rubik | `#000000` |
| N12 | **Message-card note** | `p.mt-[0.8em].text-[1.4375em]` | 1.4375em | 15.333 | **26.067** (1.7) | 400 | Rubik | `#000000` |
| N13 | **Leaf-DL term** | `dt.flex.text-[2em].leading-[1.5]` | 2em | **21.333** | **32** | 700 | Rubik | `#000000` |
| N14 | **FAQ question** | `dt.text-[2.5em].leading-[1.54].font-bold` | 2.5em | 26.667 | 41.067 | 700 | Rubik | `#000000` |
| N15 | **Case-study meta label** | `p.font-semibold` | 1.75em | 18.667 | 31.733 | 600 | Rubik | `#000000` |
| N16 | **Case-study name / role / employee count** | `p.text-center.font-bold` | 1.75em | 18.667 | 31.733 | **700** | Rubik | `#000000` |
| N17 | **Case-study teaser** | `p.max-w-[49ch].text-[1.5625em]` | 1.5625em | 16.667 | 28.333 | 400 | Rubik | `#000000` |
| N18 | **Case-study website link** | `a.text-[1.6875em].font-medium.underline` | 1.6875em | **18** | 18 | 500 | Rubik | `#333333`, **underlined** |
| N19 | **Ebook h1 strong** | `h1 > strong` | 6.125em | 65.333 | 97.347 | **700** | headline serif | `#000000` |
| N20 | **Ebook sub-list** | `p > em > sub` | 0.75em of 1.75em | **14** | **0** | 400 | Rubik | `#000000`, `vertical-align: sub` |
| N21 | **Pillar reading-list category h3** | `h3.text-[2.5em].leading-[1.54].font-bold.text-black` | 2.5em | 26.667 | 41.067 | 700 | Rubik | `#000000` |

`max-w-*` widths worth adding to the token list: `49ch` = **580.714px** on an 18.667px `p`,
**1981.52px** on a 65.333px `h1`, **518.473px** on a 16.667px `p`; `59ch` = **699.47px**;
`60ch` = **711.08px**; `80ch` = **444.02px** on the 10.667px root.
New column widths: `70.3em` = **749.86px**, `77.78em` = **829.65px**, `87em` = **927.98px**,
`50em` = **533.33px**, `50.4013em` = **537.61px**, `44em` = **448.64px**, `42em` = **447.98px**,
`26%` = **299.52px**, `60%` = **660.73 / 691.22px**.

---

## 11. Motion inventory (measured)

**No new motion mechanism.** Every animated element in set B reuses a constant table already in
CLONE_SPEC §7. Nothing on any of these pages animates on load; everything is either
`whileInView`-once or scroll-position-linked.

| Where | Leaf set | Class | Trigger | Property | From | Duration | Easing | Delay / stagger |
|---|---|---|---|---|---|---|---|---|
| Divider band (every template except T-LEGAL) | `DIVIDER_LEAVES` (12) — §7.2, coordinates verified identical | `marketing-drift-leaf` | `whileInView`, `once:true, amount:0` | `transform` translate | per-leaf `[0, −4…−12.5em]` | **1500ms** | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` | **none** |
| `MESSAGE_GRID` wrapper (`w-[87em]`) | `QUOTE_LEAVES` (6) — §7.2 | *(none)* | **static** — `initial === animate`, no drift class | — | — | — | — | — |
| `CaseStudyMetaCard`, `CaseStudyTeaserCard` x2, `T-EBOOK` form card | `CARD_LEAVES` (3) — §7.2 | `marketing-drift-leaf` | `whileInView`, once | translate | `[7,8]` / `[1,8]` / `[10,1]` em | **1300 / 1500 / 1000ms** | same easeInOutQuad | none |
| `T-PARTNER` `CalendlyCard` | the **8 scroll-tracked** `HERO_LEAVES` — §7.2 / §7.3 | `marketing-scroll-leaf marketing-responsive-leaf` | `useScroll` + `useSpring` (§7.3 driver, unchanged) | translate | — | n/a (position-linked) | n/a | n/a |
| Eyebrow badge (§3.2) | — | `transition-colors` | `:hover` | `background-color` (`#beedc0` → `#ffffff`) | — | **150ms** | **`cubic-bezier(0.4, 0, 0.2, 1)`** | none |

- **No listing stagger.** The index card grids have **zero** animation: no `whileInView`, no
  opacity/translate, no per-card delay. Cards are static from first paint. Measured: no `transition`
  and no inline `transform` on any `li` of any `CARD_GRID`.
- `T-PARTNER` also carries the homepage's recognition-line + heart overlays? **No** — the hero
  screenshot is replaced by the Calendly card, so `marketing-recognition-line` and
  `marketing-hero-heart` are **absent** on partner pages. Only the 8 scroll leaves remain.
- `prefers-reduced-motion` block: unchanged, reproduce §7 verbatim.

---

## 12. Data contracts

### 12.1 `GlossaryTerm` → `/employee-recognition/glossary/:slug` (30)
```ts
{
  slug: string                       // e.g. "kudos"
  name: string                       // h1 + card title, e.g. "Kudos"
  definition: string                 // hero lede AND the index card description (same string)
  intro: string                      // PROSE_LEFT, 1 paragraph
  body: RichText                     // 2–4 { h2, paragraphs[] } sections
  examplesHeading?: string           // always "What it looks like"
  examples: string[]                 // LEAF_BULLETS, 3 items
  faq: { question: string; answer: string }[]        // 3
  relatedTerms: Ref[]                // 3 → glossary
  inPractice: Ref[]                  // 3 → messages | company-values
  furtherReading: Ref[]              // 2 → blog
  seo: { title: string; description: string }
}
type Ref = { href: string; title: string; description?: string; ctaLabel: string }
```

### 12.2 `TeamGuide` → `/employee-recognition/for/:slug` (12)
```ts
{
  slug, name,                        // name = card title, e.g. "Startups" / "Healthcare teams"
  h1: string,                        // longer, e.g. "Employee Recognition for Startups: What Works"
  lede: string,
  cardDescription: string,           // index card description (differs from lede)
  body: RichText,                    // 3 h2 sections
  obstaclesHeading: string,          // "What gets in the way"
  obstacles: { term, definition }[], // LEAF_DL, 4
  worksHeading: string,              // "What works"
  works: string[],                   // LEAF_BULLETS, 5
  messagesHeading: string,           // "{N} messages written for this team"
  messages: Message[],               // 5
  programHeading: string,            // "A program that fits"
  program: { term, definition }[],   // LEAF_DL, 5
  faq: QA[],                         // 4
  related: Ref[],                    // 6 → messages | company-values
  furtherReading: Ref[],             // 4 → blog
  otherTeams: Ref[],                 // 3 → for
  seo
}
type Message = { text: string; category: string; note: string }
```

### 12.3 `MessageSet` → `/employee-recognition-messages/:slug` (35)
```ts
{
  slug, title,                       // title = h1 = index card title, includes the count
  lede: string,
  cardDescription: string,
  body: RichText,                    // 2 h2 sections
  count: number,                     // 10 | 12 | 13 | 14 — drives "{count} messages you can send"
  messages: Message[],               // length === count
  landHeading: string,               // "What makes one land"
  land: string[],                    // LEAF_BULLETS, 5
  faq: QA[],                         // 4
  values: Ref[],                     // 1–3 → company-values
  glossary: Ref[],                   // 2–3 → glossary
  otherOccasions: Ref[],             // 3 → messages
  seo
}
```

### 12.4 `CompanyValue` → `/company-values/:slug` (25)
```ts
{
  slug, name,                        // "Accountability"
  definition: string,                // hero lede + index card description
  body: RichText,                    // 2 h2 sections ("The word has been ruined", …)
  signalsHeading: string,            // "How you would know"
  signals: { term, definition }[],   // LEAF_DL, 4
  messagesHeading: string,           // "{N} messages that name it"
  messages: Message[],               // 6
  absenceHeading: string,            // "What its absence looks like"
  absence: string,                   // PROSE_LEFT, 1 paragraph  (optional on some instances)
  recogniseHeading: string,          // "Recognising it well"
  recognise: string[],               // LEAF_BULLETS, 3
  faq: QA[],                         // 4
  occasions: Ref[],                  // 3 → messages
  whereItFits: Ref[],                // 3 → glossary | for
  relatedValues: Ref[],              // 2–3 → company-values
  seo
}
```

### 12.5 `IndexPage` → the 4 T-INDEX routes
```ts
{
  route: string,
  badge: { label: "Employee recognition guide", href: "/employee-recognition" },
  h1: string, lede: string,
  items: Ref[],                      // 12 | 25 | 30 | 35, pre-sorted alphabetically
  crossSellHeading: string,
  crossSell: Ref[],                  // 1–2
  seo
}
```

### 12.6 `CaseStudy` → `/customer-success-stories/:slug` (4)
```ts
{
  slug,
  company: string,                   // h1
  subtitle: string,                  // "How Evergreen helped {company} with peer recognition and environmental impact"
  quote: string,
  quoteAuthor: { name: string; role: string; image: string },   // image → object-fit:cover
  heroImage: string,                 // 660.73 x ~440
  meta: {                            // fixed 5 labelled rows + website
    company: string; hqLocation: string; employees: string;
    industry: string; treesPlanted: string; website: string    // off-domain
  },
  body: RichText,                    // h2/h3/p + blockquote[] + figure{src, caption}
  teaser: string,                    // used when THIS story is shown as a related card
  logo: string,                      // h-[4.3em]
  employeesShort: string,            // "25" for the teaser card
  related: [slug, slug],             // exactly 2
  seo
}
```
Instance values (all four, verbatim — these are structural/UI strings):

| slug | company | employees | HQ Location | Industry | Trees Planted | author | role | logo file |
|---|---|---|---|---|---|---|---|---|
| `wunderdog` | Wunderdog | 150 | Helsinki, Finland | Technology Consulting | +1 000 | Emilia Vesa | Head of People Operations | `logo-wunderdogsvg-62f3d4.svg` |
| `nitro-games` | Nitro Games | 40 | Kotka, Finland | Games | +1 000 | Milka Tarkiainen | PeopleOps Manager | `logo-nitrosvg-7a0f33.svg` |
| `kent-white` | Kent & White | 20 | Bathurst, New Brunswick, Canada | Insurance | +450 | Brian Schryer | Co-Owner and CEO | `logo-kent-and-whitepng-139c7a.webp` |
| `worklete` | Worklete | 25 | Oakland, United States | Software | +300 | James Rowley | Chief Technology Officer | `workletesvg-eb3abc.svg` |

`related` pairs as shipped: wunderdog → [worklete, kent-white] · nitro-games → [kent-white, worklete]
· kent-white → [worklete, wunderdog] · worklete → [kent-white, wunderdog].

### 12.7 `Partner` → `/partners/:slug` (3) — see the §8 table
```ts
{ slug, name, titleTag, logo, logoHeightPx: 75|100, logoExtraClass?: "max-w-full",
  discountPct: 30|15, offerSuffix: string, ctaSmallPrintSuffix: string, calendlyUrl: string }
```

### 12.8 `LegalPage` → `/privacy-policy`, `/terms-of-service`
```ts
{ slug, h1, lastUpdated: string /* pre-formatted, e.g. "Last updated: 28th July 2022" */,
  body: RichText, seo }
```

### 12.9 `Ebook` → `/ebook/practical-guide-to-employee-recognition`
```ts
{ h1, h1Strong: true, lede: RichInline /* strong + br + em>sub list */,
  form: LeadMagnetForm, showG2: true, seo }
```

---

## 13. Links

Internal (reproduce as-is): all `/employee-recognition*`, `/employee-recognition-messages*`,
`/company-values*`, `/customer-success-stories/*`, `/partners/*`, `/blog/*`, `/alternatives`,
`/case-studies`, `/contact`, `/esg`, `/our-purpose`, `/pricing`, `/referral`, `/schedule-a-demo`,
`/privacy-policy`, `/terms-of-service`, `/`, `/ebook/practical-guide-to-employee-recognition`.

**Off-domain — keep inert (build strips the destination):**
- `https://app.evergreen.so/login` (nav)
- `https://app.evergreen.so/api/slack/install`, `…/api/teams/install` (CTA rows, trial modal)
- `https://www.linkedin.com/company/evergreenapp/`, `https://twitter.com/AppEvergreen`,
  `mailto:teemu@evergreen.so?subject=Email%20from%20website` (footer)
- `https://folksoft.notion.site/Help-Center-…` (footer "Help center")
- `https://blog.hubspot.com/marketing/11-employee-feedback-statistics` and
  `https://www.apollotechnical.com/employee-recognition-statistics/` — the 4 stat `<sup>` footnotes
  on T-PILLAR and T-PARTNER
- `https://wunderdog.fi/`, `https://www.wunderdog.fi/careers`, `https://wwf.fi/greenoffice/en/`,
  and the equivalent company/press links in the other 3 case studies (meta-card `Website` row +
  inline prose links)
- `https://assets.calendly.com/assets/external/widget.js` + the per-partner `calendly.com/…` embed URL
- the announcement-banner `arketta.app` link (already in §8 of CLONE_SPEC)

---

## 14. Verbatim structural / UI copy

Long-form prose (the SEO article bodies, the 35 message libraries, the legal text, the case-study
narratives) is **deliberately not transcribed** — see §2.2 and §5.2 for block structure, counts and
one-line summaries. What follows is the structural copy the build needs.

### 14.1 Shared
- Final CTA: `Only pay for active users who use Evergreen` · `Lots of support, with a help center and direct email options` · `Cancel at any time, so why not give us a try` · h2 `Start feeling good about work` · `For only $3.99 per active user a month. In the 14 day free trial we don’t plant real trees, but you can skip the trial if you like.` · button `Start 14 Day Trial` · `No credit card needed • No setup costs` · `add to **Slack**` · `add to **Teams**`
- Eyebrow badge labels: `Employee recognition guide` · `Recognition glossary` · `Recognition messages` · `Recognition for teams` · `Company values`
- Card CTA labels: see §5.1 table.

### 14.2 T-INDEX headings
| route | h1 | cross-sell heading | cross-sell card titles |
|---|---|---|---|
| `/employee-recognition/glossary` | `Employee recognition glossary` | `Looking for the practice rather than the vocabulary?` | `Employee recognition: the complete guide` (CTA `Read the guide`); `Recognition messages for every occasion` (CTA `Browse the occasions`) |
| `/employee-recognition/for` | `Employee recognition for your kind of team` | `The rest of the guide` | same two |
| `/employee-recognition-messages` | `Employee recognition messages` | `Recognising a value rather than an occasion?` | `Company values` (CTA `See the values`) |
| `/company-values` | `Company values, described properly` | `Looking for the words instead?` | `Employee recognition messages` (CTA `Browse the occasions`) |

### 14.3 Index card titles (navigational structure)
**Glossary (30, alphabetical):** `Appreciation versus recognition` · `Culture of recognition` ·
`Employee Appreciation Day` · `Employee of the month` · `Employee recognition` ·
`Formal recognition` · `Informal recognition` · `Intrinsic versus extrinsic motivation` · `Kudos` ·
`Monetary recognition` · `Non-cash incentives` · `Non-monetary recognition` · `Participation rate` ·
`Peer-to-peer recognition` · `Points-based recognition` · `Public versus private recognition` ·
`Recognition bias` · `Recognition budget` · `Recognition fatigue` · `Recognition frequency` ·
`Recognition platform` · `Recognition program` · `Recognition reach` · `Service award` ·
`Shoutout` · `Social recognition` · `Spot award` · `Top-down recognition` · `Total rewards` ·
`Values-based recognition`
(slugs match `routes.json` 1:1; note display names use "versus" where the slug uses `-vs-`.)

**For (12):** `Agencies` · `Customer support teams` · `Education teams` · `Engineering teams` ·
`Healthcare teams` · `Manufacturing teams` · `Nonprofits` · `Remote teams` ·
`Retail and hospitality teams` · `Sales teams` · `Small businesses` · `Startups`

**Company values (25, alphabetical, = slug capitalised):** `Accountability` `Adaptability`
`Candour` `Clarity` `Collaboration` `Courage` `Craftsmanship` `Curiosity` `Empathy` `Generosity`
`Gratitude` `Humility` `Inclusion` `Innovation` `Integrity` `Learning` `Ownership` `Patience`
`Pragmatism` `Reliability` `Resilience` `Respect` `Sustainability` `Transparency` `Trust`

**Messages (35, alphabetical by title)** — title ↔ slug:
`12 Messages for When Someone Went Above and Beyond` → `going-the-extra-mile` ·
`Complimenting a Presentation: 10 Message Examples` → `great-presentation` ·
`Congratulations on a Certification: 10 Messages` → `earning-a-certification` ·
`Employee Appreciation Messages: 13 Specific Examples` → `employee-appreciation` ·
`Employee of the Month Messages: 10 Examples` → `employee-of-the-month` ·
`End of Year Messages to Your Team: 12 Examples` → `end-of-year` ·
`Farewell Messages for a Colleague Leaving: 13 Examples` → `farewell` ·
`Farewell Messages for an Intern: 10 Examples` → `intern-farewell` ·
`Parental Leave Messages for a Colleague: 10 Examples` → `parental-leave` ·
`Project Completion Messages: 12 Ways to Mark a Launch` → `project-completion` ·
`Promotion Congratulation Messages: 12 That Aren’t Generic` → `promotion` ·
`Recognising a Deadline Met: 10 Message Examples` → `hitting-a-deadline` ·
`Recognising a Sales Win: 10 Message Examples` → `sales-target` ·
`Recognising Attention to Detail: 10 Messages` → `attention-to-detail` ·
`Recognising Behind-the-Scenes Work: 10 Messages` → `behind-the-scenes-work` ·
`Recognising Composure at Work: 10 Messages` → `staying-calm-under-pressure` ·
`Recognising Cross-Team Work: 10 Messages` → `cross-team-collaboration` ·
`Recognising Good Leadership: 10 Message Examples` → `leadership` ·
`Recognising Great Customer Service: 12 Message Examples` → `great-customer-service` ·
`Recognising Initiative at Work: 10 Message Examples` → `taking-initiative` ·
`Recognising Knowledge Sharing: 10 Message Examples` → `sharing-knowledge` ·
`Recognising Process Improvements: 10 Messages` → `improving-a-process` ·
`Recognising Remote Employees: 10 Message Examples` → `remote-team` ·
`Retirement Messages for a Colleague: 12 Examples` → `retirement` ·
`Thank You for Covering for Me: 10 Messages` → `covering-for-a-colleague` ·
`Thank You for Organising the Team Event: 10 Messages` → `organising-a-team-event` ·
`Thank You Messages for a Mentor: 12 Examples` → `mentoring` ·
`Thank You Messages for Helping a Colleague: 12 Examples` → `helping-a-colleague` ·
`Thank You Messages for Your Manager: 12 Examples` → `thanking-your-manager` ·
`Thank You Messages to the Whole Team: 12 Examples` → `thanking-the-whole-team` ·
`Thanking Someone After an Incident: 10 Messages` → `incident-response` ·
`Welcome Back Messages After Leave: 10 Examples` → `returning-from-leave` ·
`Welcome Messages for a New Team Member: 12 Examples` → `new-team-member` ·
`Work Anniversary Messages: 14 Examples for Every Milestone` → `work-anniversary` ·
`Work Birthday Messages: 12 That Are Not Just Emoji` → `employee-birthday`

### 14.4 T-DETAIL section headings (fixed per collection)
- glossary: `What it looks like` · `Questions people ask` · `Related terms` · `In practice` · `Further reading`
- messages: `{N} messages you can send` · `What makes one land` · `Questions people ask` · `The values behind it` · `Where it fits` · `Other occasions`
- company-values: `How you would know` · `{N} messages that name it` · `What its absence looks like` · `Recognising it well` · `Questions people ask` · `Occasions where it shows up` · `Where it fits` · `Related values`
- for: `What gets in the way` · `What works` · `{N} messages written for this team` · `A program that fits` · `Questions people ask` · `Occasions and values that come up most` · `Further reading` · `Other teams`

### 14.5 T-PILLAR
h1 `Employee recognition`. Stat captions (identical to homepage §5.5):
`69%` + `of employees work harder when recognised¹` · `39%` + `of employees don’t feel appreciated at work²` ·
`14.9%` + `lower turnover rates in teams with regular feedback³` · `65%` + `of employees prefer non-cash incentives⁴`.
Prose `h2` sequence: `What employee recognition is` · `Why it matters` · `The types of employee recognition`
· `How to build an employee recognition program` · `What to say` · (plus 4 more; see
`_reference/recon-b/er_hub.json`). Reading-list `h3` labels in §4.3 item 4. Final-CTA copy in §4.3 item 5.

### 14.6 T-STORY / T-LEGAL / T-EBOOK
- Meta-card labels: `Company` `HQ Location` `Employees` `Industry` `Trees Planted` `Read more` + link text `Website`.
- Teaser card: `{N}` + `Employees`, CTA `Read full case study`.
- Legal: h1 `Privacy Policy` / `Terms of Service`; `Last updated: 28th July 2022` / `Last updated: 30th December 2020`.
- Ebook: h1 `Unlock Employee Engagement with Employee Recognition`; lede contains
  `Download our Practical Guide to Employee Recognition eBook now!` and the `<sub>` list
  `-How Employee Recognition Drives Engagement` / `-The Dos and Don'ts of Employee Recognition` /
  `-Practical Strategies for Crafting an Effective Recognition Program` /
  `-Real-world Examples of Recognition` / `...and much more!`, ending `Get Started Here` + `👇`.
  Form placeholders `Name` `Email` `Company`, button `Download`.

---

## 15. Responsive summary (measured)

Engine, breakpoints and gutters are unchanged (§4). Deltas specific to set B:

| Thing | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| root em | 12px | 10.6667px | 8.25833px | 8.25833px |
| container gutter | 72px | 64px | 46.08px (`6vw`) | 23.4px (`6vw`) |
| content width | 1296.03 | 1152.03 | 675.84 | 343.22 |
| prose column (`77.78em` → `w-auto`) | 933.36 | 829.65 | 642.33 | 343.22 |
| `70.3em` column | 843.60 | 749.86 | 580.56 | → `max-w-full` 343.22 |
| card grid columns | 2 | 2 | **1** | **1** |
| card width | 503.98 | 447.98 | 346.84 | 343.22 (`max-wf-mini:max-w-full`) |
| grid gap | 36 | 32 | 24.775 | 24.775 |
| `MESSAGE_GRID` wrapper (`87em`) | 1044.0 | 927.98 | → `max-w-full` 675.84 | 343.22 |
| T-STORY 2-col rows | 2-col | 2-col | `max-wf-tablet:flex-col` → **stacked** | stacked |
| T-STORY teaser row | 2-col | 2-col | `flex-col items-center` | stacked |
| T-PARTNER Calendly card | 605 wide | 537.61 | `max-wf-mini:w-[40em]` below 480 → 330.33 | 330.33 |
| hero `pt` | `10.2em` | 108.8 | 84.24 | `max-wf-mini:pt-[11.8em]` → 97.45 |
| docH `/privacy-policy` | 9220 | 8200 | 6383 | 9742 |
| docH `/employee-recognition/glossary` | 9377 | 8342 | 10781 | 11768 |
| docH `/employee-recognition-messages/promotion` | 8955 | 7968 | 8090 | 9742 |
| docH `/customer-success-stories/wunderdog` | 6551 | 5855 | 5985 | 7617 |
| docH `/ebook/...` | 3761 | 3347 | 2632 | 3539 |
| docH `/employee-recognition/glossary/kudos` | 7789 | 6927 | 6175 | 8082 |

---

## 16. Creative reinterpretation / risk notes

1. **Display serif substitution.** The original uses `ivypresto-headline` 600 (Typekit). This clone
   self-hosts **Gloock** with `size-adjust: 92.44%`. Expect ≤1.2% advance-width drift. The fragile
   wraps in set B, ranked by risk:
   - **`LinkCard` heading** (N7, 37.333px in a 392.80px box): the long message titles are the worst
     case — `Promotion Congratulation Messages: 12 That Aren’t Generic` wraps to 2 lines at 1280 with
     ~10px of slack; `Work Anniversary Messages: 14 Examples for Every Milestone` likewise. A 1.2%
     widening can push either to 3 lines, which changes every row height in the grid and therefore
     the whole page height. Verify these two cards specifically.
   - **T-PILLAR final-CTA h2** `Want to access our Practical Guide of Employee Recognition?` at
     65.333px in a `w-auto` wrapper — wraps to 3 lines at 1280, measured h 182.91.
   - **T-INDEX h1** `Employee recognition for your kind of team` (65.333px) — 2 lines at 1280, close
     to the 1152px edge.
   - `.marketing-rich-text h2` at 48px / line-height **1.2** has the tightest leading of any serif
     role; a taller substitute's ascenders may clip visually. Do not "fix" it to 1.48.
2. **Row-height coupling.** Both `CARD_GRID` and `MESSAGE_GRID` are `flex-wrap` with default
   `align-items: stretch`, so each row's height = its tallest card. Document heights above will only
   reproduce if the copy length per card matches. If the build uses representative (not identical)
   copy, treat the docH figures as targets ±5%, and match the *per-card* geometry exactly instead.
3. **`ch` units.** `max-w-[49ch]` / `[59ch]` / `[60ch]` / `[80ch]` resolve against the element's own
   font-size and the Rubik `0` advance. With Rubik loaded from Google Fonts the values above should
   reproduce to <0.5px; with a fallback face they will not. Preload Rubik.
4. **Calendly.** Third-party embed; stub with a 490.95 x 630 placeholder inside the white card.
5. **Server actions.** Both the lead-magnet form and the footer newsletter post to Next.js server
   actions with no public endpoint. Stub as described in §7.
6. **The one new hover.** `hover:bg-white` on the eyebrow badge is real and measured. Do not fold it
   into the "no hover anywhere" rule from the homepage spec — and equally, do **not** copy it onto
   the message-card badge, which is the same visual with no hover.
7. **T-EBOOK's `px-0` container.** Genuinely breaks the `px-[6em]` container contract. Keep it; the
   page relies on each block's own `mx-auto` + `max-w`.
8. **T-PILLAR's CTA swap.** The only page in set B without the shared trial CTA. Don't let a shared
   layout component force it back in.
9. **Nitro-games prose contains a `<strong>` at blockquote size** (24.667px / weight 700) —
   `On average every employee gives 3,75 unique recognitions to each other per month.` — that is a
   `strong` inside a `blockquote`, not a new role.
