Source: https://www.evergreen.so/ — routes `/pricing`, `/esg`, `/our-purpose`

# Evergreen core pages A — build spec (measurement-backed)

Companion to **`CLONE_SPEC.md`** (homepage). That file is the normative design system: the `.marketing-root` em engine (§4.1), container contract (§4.3), colour tokens (§2), the 25 typographic roles (§3.3), components (§5), leaf motion (§7). **Everything in this file is a delta.** Where a thing is unchanged it is referenced, not restated. Anything stated here as "NEW" is not in `CLONE_SPEC.md`.

Measured live 2026-10-09 with an isolated Playwright/Chromium instance. Primary viewport **1280 × 900**; cross-checked at **1440 / 768 / 390**. Computed styles via `getComputedStyle` + `getBoundingClientRect`; SSR inline styles and class strings read from the served HTML of each route.

Screenshots (1280, full-page + per-section crops) in `/Users/riyaghosh/V3/evergreen/_reference/screenshots/`, prefixes `pricing-`, `esg-`, `purpose-`.

---

## 0. Global deltas that apply to ALL THREE pages

| Thing | Finding |
|---|---|
| **Announcement banner** | **ABSENT on all three routes.** The black `py-[10px]` banner (CLONE_SPEC §5.1) is homepage-only. On these routes the nav sits at `y = 0` and the nav box is `0 → 76.59px`. **This breaks the homepage convention — do not render the banner on these routes.** |
| Nav | Byte-identical to CLONE_SPEC §5.2 (same links, same order, same hrefs, same `Schedule a demo` pill at 175.72 × 39.92). Still `position: relative`, still not sticky. There is **no active/current-route styling** — `/pricing` does not highlight the "Pricing" nav link. |
| Mobile nav | Identical to §5.3 (same `MOBILE_NAV_LINKS`, same `SlideOverlay`). |
| Footer | Byte-identical to §5.13 on all three pages, including the newsletter form (§5.12), honeypot, social chips and all 15 link hrefs. |
| Section-overlap rule | Holds everywhere: every section wrapper is `mx-auto -mt-[3em] w-full max-w-[1920px] px-[6em] max-wf-tablet:px-[6vw]`. |
| Divider band | Same component as §7.2 DIVIDER_LEAVES + `div.relative.z-[200].h-[15em]` + `div.relative.z-[201].h-[2px].bg-black`. **NEW: the cream bar is recoloured to match the section ABOVE it** — see §0.1. |
| **Gradients** | **ZERO** on all three pages (`background-image: none` on every element). Convention holds. |
| **Box-shadows** | **ZERO** on all three pages (`box-shadow: none` on every element). Convention holds. |
| **Hover / active states** | Only `hover:underline`, on desktop nav link labels, footer nav links and the two footer legal links. **No hover on buttons, cards, pills, logos, the price card, the SDG columns or any image.** Convention holds. |
| Declared CSS transitions | Only the two hamburger bars (`transform/translate/scale/rotate .2s cubic-bezier(0.4,0,0.2,1)`), exactly as §7.5. Nothing else on any of the three pages has a non-UA-default `transition`. |
| Scroll-tracked motion | **None.** No `marketing-scroll-leaf`, no `marketing-recognition-line`, no `marketing-hero-heart` on any of these routes. The `useScroll`/`useSpring` driver of §7.3 is **homepage-only**. |
| `letter-spacing` | `normal` on every element on all three pages. Verified. |
| Pure white | `bg-white` appears **twice on `/pricing`**: the price card (§1.4 — NEW, breaks the homepage "white is only for overlays" rule) and the `SlideOverlay` panel. Zero occurrences on `/esg` and `/our-purpose`. |

### 0.1 Divider-band colour rule (NEW, generalises §1-D/G)

`div.relative.z-[200].h-[15em].bg-<X>` where `<X>` matches the **preceding** section's background, so the divider reads as a continuation of the section above, with a 2px black rule underneath it:

| Page | Divider | Band class | Computed |
|---|---|---|---|
| pricing | between hero and testimonials | `bg-cream` | `#fffff3` |
| esg | after hero | `bg-cream` | `#fffff3` |
| esg | after SOCIAL | `bg-cream-dark` | `#edede2` |
| esg | after GOVERNANCE | `bg-cream` | `#fffff3` |
| esg | after SDG | `bg-cream-dark` | `#edede2` |
| our-purpose | after "Goals By 2027" | **`bg-leaf`** → `#beedc0` | **NEW colour for the divider band** |
| our-purpose | after SDG | `bg-cream-dark` | `#edede2` |

Everything else about the divider is unchanged: outer `section.relative[aria-hidden]`, inner `div.relative.mx-auto.-mt-[3em].w-[120em]` (1279.98px @1280), band height `15em` = 159.98px, black rule `h-[2px]` full-bleed at the band's bottom edge, total section height **161.98px @1280** (181.98 @1440, 125.96 @768/390).

### 0.2 Correction to CLONE_SPEC §5.13

Footer nav link `a.block.mb-[1.2em].text-[1.6875em]` — the `1.2em` resolves **after** `text-[1.6875em]`, so `margin-bottom = 1.2 × 18px = ` **21.6px**, not the 12.8px stated in CLONE_SPEC §5.13. Measured on all three pages (`<li>` height 39.59 = 18 + 21.6). Same cascade trap as §10.5.

### 0.3 Document heights (measured)

| Page | 1280 | 1440 | 768 | 390 |
|---|---|---|---|---|
| `/pricing` | **3115px** | 3503 | 2991 | 4023 |
| `/esg` | **7043px** | 7848 | 5684 | 7840 |
| `/our-purpose` | **3838px** | 4317 | 3103 | 5076 |

Root font-size confirmed identical to §4.1 on all three: 10.6667 / 12 / 8.25833 / 8.25833px.

---

# PART 1 — `/pricing`

Screenshots: `pricing-1280-full.png`, `pricing-1280-01-hero.png`, `pricing-1280-02-divider.png`, `pricing-1280-03-social.png`, `pricing-1280-04-footer.png`.

Head: `<title>Evergreen | Pricing</title>`, canonical `https://www.evergreen.so/pricing`, og:image `https://www.evergreen.so/marketing/og/evergreen-so-meta-image-fdd6cf.jpg`.
JSON-LD in `<main>`: `SoftwareApplication` with `offers.price = "3.99"`, `priceCurrency "USD"`, `unitText "active user"`, `referenceQuantity.unitCode "MON"`. (Reproduce verbatim if SEO parity matters; otherwise inert.)

**There is NO tier-card grid, NO monthly/annual toggle, NO FAQ accordion, NO comparison table.** The page is a single flat price. Build agents: do not invent tiers.

## 1.1 Section map (DOM order, 1280)

| # | Role | Element | y | height | Background | Wrapper padding | Inner width | Columns |
|---|---|---|---|---|---|---|---|---|
| — | Nav | `div.relative.z-[999999998]` | 0 | 76.59 | transparent (cream) | `18.13px 30.93px` | full bleed | logo \| links \| CTA |
| A | **Hero + price card + reassurance trio** | `section.relative.bg-cream` | 44.61 | **1280.80** | `#fffff3` | `0 64px` (no `py`) | 1152px | stacked, last block is 3-col |
| B | Divider | `section.relative` | 1293.42 | **161.98** | band `bg-cream` | — | `120em` = 1279.98 | 1 |
| C | **Testimonials + logo strip + G2** | `section.relative.bg-cream-dark` | 1423.42 | **1180.84** | `#edede2` | **`pt-[15em] pb-[10em]`** = `160px 64px 106.667px` (NEW combo — homepage uses 18em/5em) | 1152px | 2-col testimonials, 6-col logo row, centred G2 |
| D | Footer | `section.relative.bg-cream` | 2572.28 | **542.81** | `#fffff3` | `53.33px 64px` | 1152px | per §5.13 |

Total document height **3115px**.

## 1.2 Section A — block list (direct children of the wrapper)

| idx | Block class | y | height | margin |
|---|---|---|---|---|
| 0 | `pt-[10.2em] max-wf-mini:pt-[11.8em]` → `div.relative.mx-auto.w-[108em]…` → `h1` | 44.61 | 206.13 | `padding-top 108.8px` |
| 1 | `my-[4.2em] text-center max-wf-mini:my-[3.5em]` → `p.mx-auto.max-w-[60ch].text-center` | 295.53 | 31.73 | `44.8px 0` |
| 2 | `my-[4.2em] … flex justify-center max-wf-phone:flex-col` → **price card** (§1.4) | 372.06 | 325.41 | `44.8px 0` |
| 3 | `my-[4.2em] … flex flex-col items-center justify-center` → TrialButton + small print | 742.27 | 124.47 | `44.8px 0` |
| 4 | `my-[4.2em] … mt-0 max-wf-mini:mt-0 flex justify-center max-wf-phone:flex-col` → Slack/Teams | 911.53 | 37.06 | `0 0 44.8px` |
| 5 | `my-[4.2em] … mb-0 max-wf-mini:mb-0 mt-[8em] flex justify-around max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:mt-[8em]` → 3 reassurance columns (§1.5) | 1033.92 | 291.48 | `85.333px 0 0` |

- H1 `h1.mx-auto.max-w-[49ch].text-center.max-wf-mini:text-[3.9em]` — 65.333px/97.347px serif 600, **1 line**, measured text width 765.2px in a 1152px frame (386.8px headroom — robust to the Gloock substitution).
- Block 1 paragraph uses **`max-w-[60ch]`** → computed **711.079px @1280** (NEW max-width; homepage only uses 49ch). Rendered on one line, 31.73px tall.
- Small print paragraph uses `max-w-[49ch] text-[1.4375em]` → `max-width` computes to **477.082px** (because `49ch` is measured at 15.333px, not 18.667px). 2 lines, 52.09px.

## 1.3 Section C — block list

| idx | Block | y | height | margin |
|---|---|---|---|---|
| 0 | `my-[4.2em] …` → `div.mt-[14.7433em].flex.w-full.justify-center.max-wf-tablet:flex-wrap` → 2 testimonial cards | 1740.66 | 376.36 | `44.8px 0` |
| 1 | `my-[4.2em] … mt-[7.7em] flex items-center justify-between pl-[3em] …` → 6-logo strip | 2199.14 | 40.66 | `82.133px 0 44.8px` |
| 2 | `my-[4.2em] … mb-0 max-wf-mini:mb-0` → `div.mt-[7em].flex.flex-col.items-center` → G2 block | 2314.45 | 183.16 | `44.8px 0 0` |

Testimonial cards: **structurally identical to CLONE_SPEC §5.7** (card 417.17 × 297.14, `rounded-[10px] border-2 border-black bg-cream`, `padding 64px 14.933px 32px`, avatar `size-[11.7918em]` = 125.77px at `-top-[13.4em]` = −142.933px, QUOTE_LEAVES ×6 static). Deltas:
- Avatar images are **new assets**, and card 1's image carries a **static scale transform** — `img.ml-[1.4em].h-[90%].scale-[1.2]` on `t3png-ee95a1.webp`, rendered **146.12 × 131.49** inside the 125.77px circle with `overflow:hidden` (deliberately over-scaled + nudged right by `1.4em` = 14.93px). Card 2 is the normal `img.h-auto.w-full` → `t4png-f92ff9.webp` at **121.77 × 112.03**.
- Company logo below each card uses **`w-[19.4941em]` = 207.92px** (homepage uses `w-[7.96em]` = 85px). Wrapper unchanged: `div.mx-auto.mt-[3em].flex.justify-center`. Logos: `logo-kent-and-whitepng-e559b5.webp` (rendered 207.92 × 47.23) and `logo-coverwalletsvg-be24e9.svg` (207.92 × 42.08).

Logo strip: same component as §5.9, same six inline `style="width:…em"` values in the same order, **but the 5th logo is swapped**: Harvard `17.1909em` (183.36 × 36.17) · Nitro `11.5931em` (123.66 × 40.66) · Earnest `8.79133em` (93.77 × 37.64) · Octopus `19.4863em` (207.84 × 28.45) · **Fraktio `11.6417em` (124.17 × 33.36, `logo-fraktiosvg-19b008.svg`, alt `Fraktio logo`)** · Hifyre `13.6854em` (145.97 × 37.3). Still a static `justify-between` row, no greyscale, no hover.

G2 block: identical to §5.10 (64.33px logo, 5 stars `mx-[1.14204em] w-[3.03685em]` = 32.39 × 30.83, caption 26.667px/41.067px semibold).

## 1.4 NEW COMPONENT — `PriceCard`

The only genuinely new composite on these three pages. Full verbatim markup:

```html
<div class="relative mx-auto mt-[7.6em] flex w-[50.4013em] flex-col items-center
            max-wf-mini:w-[40em] max-wf-mini:max-w-full">
  <span aria-hidden="true" class="pointer-events-none">
    <!-- CARD_LEAVES ×3, verbatim CLONE_SPEC §7.2 -->
  </span>
  <div class="relative z-[100] w-full rounded-[10px] border-2 border-black bg-white
              pt-[4.21943em] pb-[3.6875em]">
    <p class="mx-auto max-w-[49ch] text-center text-[1.5625em]"><em>only</em></p>
    <h2 class="text-center font-headline text-[4.5em] leading-[1.48] font-semibold text-black
               max-wf-mini:text-[3.9em]">$3.99</h2>
    <p class="mx-auto max-w-[49ch] text-center text-[1.5625em]">per active user per month.<br/>For Enterprise pricing: <a href="/contact">contact us</a></p>
    <span class="absolute -top-[4.7em] left-[28%] z-[2] flex size-[8.36539em] items-end justify-center
                 overflow-hidden rounded-full border-2 border-black bg-leaf">
      <img src="/assets/a-price-1png-5e6ffc.webp" alt="" aria-hidden="true" class="w-full"/>
    </span>
    <span class="absolute -top-[4.7em] left-[49%] z-[1] flex size-[8.36539em] items-end justify-center
                 overflow-hidden rounded-full border-2 border-black bg-leaf">
      <img src="/assets/a-price-2png-1bdf4a.webp" alt="" aria-hidden="true" class="w-full"/>
    </span>
  </div>
</div>
```

Measured geometry @1280 (`1em = 10.6667px`):

| Property | Value |
|---|---|
| Outer frame | `w-[50.4013em]` = **537.61px**, `margin-top: 7.6em = 81.067px`, `mx-auto`, `position: relative` |
| Card box | **537.61 × 244.34px**, absolute page position **x 371.20, y 453.13** |
| Card background | **`#ffffff`** — ⚠️ the only white *content* surface in the whole clone. Breaks the homepage rule that white is overlay-only. Do not substitute cream. |
| Border | `2px solid #000000` |
| Border-radius | **10px** (`radius-card`) |
| Padding | `4.21943em 0 3.6875em` = **45.0072px top / 0 inline / 39.3333px bottom** (no horizontal padding — children are `mx-auto`) |
| Box-shadow | **none** |
| `z-index` | 100 (sits above the CARD_LEAVES at z 11/11/13) |
| "only" line | `p.text-[1.5625em]` wrapping `<em>` → **16.667px / 28.333px**, weight 400, **`font-style: italic`**, colour `#000000`, centred. y 500.13, h 28.33. ⚠️ Rubik ships no italic in the original's `next/font` set — the browser synthesises an oblique. Replicate with synthetic italic (do NOT load Rubik Italic, it changes the shape). |
| Price | `h2.font-headline.text-[4.5em].leading-[1.48]` → **48px / 71.04px**, serif 600, `#000000`. y 528.45, h 71.03, text width 106.4px. |
| Sub-line | `p.text-[1.5625em]` → 16.667px / 28.333px, 2 lines (`<br/>`), y 599.48, h 56.66. `max-w-[49ch]` computes **518.473px** here (49ch at 16.667px). |
| "contact us" link | inherits `.marketing-root a` → 16.667px, **weight 600**, `line-height: 1` (16.667px), `text-decoration: underline`, `#000000`, href **`/contact`** (internal). No hover change. |
| Avatar circles | `size-[8.36539em]` = **89.22 × 89.22px**, `border-radius: 9999px` (computed 3.35544e7px), `border: 2px solid #000`, `background: #beedc0`, `overflow: hidden`, `align-items: flex-end`, `justify-content: center`. Positioned `-top-[4.7em]` = **−50.133px** relative to the card, `left: 28%` → 149.406px and `left: 49%` → 261.453px. z-index **2** and **1** (left one overlaps the right one). |
| Avatar images | `img.w-full` (no `h-auto`): `a-price-1png-5e6ffc.webp` rendered **85.22 × 84.89** (intrinsic 272 × 271), `a-price-2png-1bdf4a.webp` rendered **85.22 × 82.73** (intrinsic 276 × 268). `object-fit: fill`. **Not** `loading=lazy` — eagerly loaded. |
| Leaves | CARD_LEAVES (3), anchored to the **outer frame**, not the card: `{top:-6em,left:-5.1em,rotate:-54,z:11,from:[7,8],dur:1300}`, `{top:-7.6em,left:-0.6em,rotate:6,z:11,from:[1,8],dur:1500}`, `{top:-0.7em,left:-5.6em,rotate:-80,z:13,from:[10,1],dur:1000}`. Drift motion exactly per §7.2. |

States: **none.** No hover, no focus ring beyond the UA default on the link, no selected/unselected variant, no pricing toggle anywhere in the DOM.

Responsive (measured card widths): **1440 → 604.81 × 274.39**; **768 → 416.22 × 190.08** (`50.4013em × 8.25833`); **390 → 330.33 × 182.75** (`max-wf-mini:w-[40em]` = 330.33, under the 343.2px content box so `max-w-full` does not bite). Avatars: 100.38 / 69.08 / 69.08px.

## 1.5 NEW COMPONENT — `IconFeatureColumn` (serif variant)

Used in pricing block 5 (3 columns). **Not** the same as the homepage's `25em/29em/25em` icon trio (§8-H) — that one has no heading and uses fixed em widths; this one is percentage-width and has a serif sub-heading.

```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] mb-0 max-wf-mini:mb-0 mt-[8em]
            flex justify-around max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:mt-[8em]">
  <div class="flex w-[30%] flex-col items-center max-wf-phone:mb-[4.6em] max-wf-phone:w-full">
    <span class="mb-[1em] flex h-[3.24544em] items-center justify-center">
      <img src="/assets/icon-usersvg-f5e0ab.svg" alt="" class="h-full w-auto"/>
    </span>
    <h2 class="my-[0.5em] max-w-[11ch] text-center font-headline text-[3.125em] leading-[1.29]
               font-semibold text-black max-wf-mini:text-[3.9em]">Only pay for active users</h2>
    <p class="mx-auto max-w-[49ch] text-center">active users are only those who have interacted with Evergreen. Admins can manage these users from the dashboard.</p>
  </div>
  …×3
</div>
```

- Row: `justify-around`, `margin: 85.333px 0 0` (`mt-[8em]`, `mb-0`), y 1033.92, height 291.48.
- Column: `width: 30%` → **345.61px** @1280 (388.8 @1440, 202.75 @768, 343.22 @390 where `max-wf-phone:w-full` applies). Column x positions 83.17 / 467.19 / 851.19.
- Icon wrapper `h-[3.24544em]` = **34.61px** tall, `mb-[1em]` = 10.667px. Icons `h-full w-auto`: `icon-usersvg-f5e0ab.svg` 31.30 × 34.61, `icon-supportsvg-bc4096.svg` 31.14 × 34.61, `icon-timesvg-4c8791.svg` 34.61 × 34.61. `alt=""`, eagerly loaded.
- Heading: **NEW type role** (§4 below). `max-w-[11ch]` computes **226.944px**; all three headings wrap to **2 lines**, height 85.97px, `margin: 16.667px 0`.
- Paragraph: default body `p` (18.667/31.733), `max-w-[49ch]` = 580.714px but constrained by the 345.61px column. Heights 126.94 / 95.20 / 95.20.

## 1.6 Typography deltas on `/pricing`

All roles are from CLONE_SPEC §3.3 except the two flagged NEW in §4 below (`Serif sub-heading 3.125em`, `Card body 1.5625em`) plus the italic variant of the latter.

## 1.7 Motion on `/pricing`

| Element | Trigger | Property | From → To | Duration | Easing | Delay |
|---|---|---|---|---|---|---|
| 3 CARD_LEAVES around the price card | `whileInView`, `{once:true, amount:0}` (IntersectionObserver, fires on first pixel) | `transform` translate | `translateX(7em) translateY(8em)` → 0 / `translateX(1em) translateY(8em)` → 0 / `translateX(10em) translateY(1em)` → 0 (rotation constant) | **1300 / 1500 / 1000 ms** | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` | **0, no stagger** |
| 12 DIVIDER_LEAVES (§7.2 table, verbatim) | same | `transform` translateY | `translateY(-10em…-4em)` → 0 | **1500 ms** (all) | same | 0 |
| 12 QUOTE_LEAVES (6 per testimonial card) | — | — | — | — | — | **static, no animation** (no `marketing-drift-leaf` class, `initial === animate`) |
| Nav / footer links | `:hover` inside `@media (hover:hover)` | `text-decoration` | none → underline | instant, no transition | — | — |
| Hamburger bars (≤991px) | click | `transform` | per §5.3 | 200ms | `cubic-bezier(0.4,0,0.2,1)` | — |
| Trial modal + mobile menu (`SlideOverlay`) | click | `y` | `-110vh` → `0vh` | open **1000ms** / close **500ms** | open `cubic-bezier(0.455,0.03,0.515,0.955)`, close `cubic-bezier(0.55,0.085,0.68,0.53)` | — |

Nothing else animates. Reduced-motion block of §7 applies unchanged.

## 1.8 Interactive behaviour on `/pricing`

- **`Start 14 Day Trial`** button (§5.4 primary pill, 212.92 × 56.39) → opens the Trial modal (§5.11). Unchanged.
- **Newsletter form** in the footer (§5.12) → Next.js server action, no public endpoint. Build the four states (idle / pending `disabled opacity .70` + "Please wait..." / done → `FormDone` "Thank you!" / error → `FormError`) with a stubbed submit.
- No other interactive element. No tabs, no accordion, no toggle, no modal besides the two `SlideOverlay`s.

## 1.9 Text content — `/pricing` (verbatim)

- H1: `Fair pricing, massive impact`
- Sub: `Active user-only pricing, top support, and always striving for fair pricing`
- Card: `only` *(italic)* · `$3.99` · `per active user per month.` `<br>` `For Enterprise pricing: ` + link `contact us`
- Button: `Start 14 Day Trial`
- Small print: `No credit card needed • No setup costs • During trial we don’t plant real trees, but you can skip your trial from the admin dashboard.`
- Platform links: `add to **Slack**` · `add to **Teams**`
- Column 1: `Only pay for active users` / `active users are only those who have interacted with Evergreen. Admins can manage these users from the dashboard.`
- Column 2: `Contact us any time` / `We’re always at hand here at Evergreen. If you still have questions please visit our help centre or email us directly`
- Column 3: `Always striving to be fair` / `Cancel your subscription at any time, no credit card needed for signup, and no setup costs.`
- Testimonial 1: `“We already had a very close team but Evergreen has brought us closer.”` — `Brian Schryer` `<br>` `CEO`
- Testimonial 2: `“Evergreen quickly helped transition us to a good peer recognition culture”` — `Sakir Temel` `<br>` `CTO`
- Logo strip alts: `Harvard University Employees Credit Union logo`, `Nitro logo`, `Earnest Ice Cream logo`, `Octopus Energy logo`, `Fraktio logo`, `Hifyre logo`
- G2: alt `G2 logo`, caption `4.8 / 5 on G2 Reviews`

## 1.10 Links — `/pricing`

| href | Where | On/off domain |
|---|---|---|
| `/`, `/esg`, `/pricing`, `/case-studies`, `/employee-recognition`, `/our-purpose`, `/schedule-a-demo` | nav | internal |
| `https://app.evergreen.so/login` | nav Login | **off-domain → keep inert** |
| `/contact` | price card "contact us" | internal |
| `https://app.evergreen.so/api/slack/install` | "add to Slack" | **off-domain → inert** |
| `https://app.evergreen.so/api/teams/install` | "add to Teams" | **off-domain → inert** |
| footer set (§5.13) | footer | `https://folksoft.notion.site/…`, `https://www.linkedin.com/company/evergreenapp/`, `https://twitter.com/AppEvergreen`, `mailto:teemu@evergreen.so?subject=Email%20from%20website` are **off-domain → inert**; the rest internal |

---

# PART 2 — `/esg`

Screenshots: `esg-1280-full.png`, `esg-1280-01-hero-environmental.png`, `esg-1280-02-social.png`, `esg-1280-03-governance.png`, `esg-1280-04-sdg.png`, `esg-1280-05-cta.png`, `esg-1280-06-footer.png`.

Head: `<title>Evergreen | ESG</title>`, canonical `https://www.evergreen.so/esg`.

The page is a three-act E / S / G structure, each act introduced by the same leaf-green tick badge, then the UN SDG block, then the standard final CTA.

## 2.1 Section map (DOM order, 1280)

| # | Role | Element | y | height | Background | Wrapper padding | Inner width | Columns |
|---|---|---|---|---|---|---|---|---|
| — | Nav | — | 0 | 76.59 | cream | `18.13px 30.93px` | full bleed | — |
| A | **Hero / ENVIRONMENTAL** | `section.relative.bg-cream` | 44.61 | **1254.55** | `#fffff3` | `0 64px` (no `py`); inner `flex flex-col items-center pt-[10.2em]` = 108.8px | 1152px | 1 centred |
| B | Divider (band `bg-cream`) | `section.relative` | 1267.17 | **161.98** | — | — | 1279.98 | 1 |
| C | **SOCIAL** | `section.relative.bg-cream-dark` | 1397.17 | **1401.38** | `#edede2` | `pt-[18em] pb-[5em]` = `192px 64px 53.333px` | 1152px | badge/head/para stacked, then 2-col |
| D | Divider (band `bg-cream-dark`) | `section.relative` | 2766.56 | **161.98** | — | — | 1279.98 | 1 |
| E | **GOVERNANCE** | `section.relative.bg-cream` | 2896.56 | **1312.98** | `#fffff3` | `pt-[18em] pb-[5em]` | 1152px | stacked, then 2-col |
| F | Divider (band `bg-cream`) | `section.relative` | 4177.56 | **161.98** | — | — | 1279.98 | 1 |
| G | **UN SDG block** | `section.relative.bg-cream-dark` | 4307.56 | **1087.30** | `#edede2` | **`pt-[18em]`, no `pb`** = `192px 64px 0` | 1152px | stacked, then **4-col `justify-between`** |
| H | Divider (band `bg-cream-dark`) | `section.relative` | 5362.88 | **161.98** | — | — | 1279.98 | 1 |
| I | **Reassurance trio + final CTA** | `section.relative.bg-cream-dark` | 5492.88 | **1038.81** | `#edede2` | `pt-[18em] pb-[5em]` | 1152px | 3-col then centred stack |
| J | Footer | `section.relative.bg-cream` | 6499.70 | **542.81** | `#fffff3` | `53.33px 64px` | 1152px | §5.13 |

Total document height **7043px**. ⚠️ Sections G→H→I are all `#edede2` with a `bg-cream-dark` divider band between them: visually the divider reads only as the 2px black rule plus the leaves.

## 2.2 Section A (hero / ENVIRONMENTAL) — block list

The whole hero is one flex column (`flex flex-col items-center pt-[10.2em] max-wf-mini:pt-[11.8em]`), not the usual series of `my-[4.2em]` blocks:

| idx | Element | y | height | spacing |
|---|---|---|---|---|
| 0 | `div.relative.mx-auto.w-[108em].max-wf-tablet:w-[80em].max-wf-phone:w-full` → `h1.mx-auto.max-w-[49ch].text-center.max-wf-mini:text-[3.9em]` | 153.41 | **194.66** (2 lines) | — |
| 1 | `div.mt-[9.93203em]` → tick badge (§2.5) | 454.00 | 47.73 | `margin-top: 105.942px` |
| 2 | `div.my-[4.2em] … w-full` → `h2` display | 546.53 | 71.03 (1 line) | `44.8px 0` |
| 3 | `div.text-center.my-0.w-full.max-wf-mini:my-0` → `p.mx-auto.max-w-[40ch].text-center` | 662.36 | 63.47 (2 lines) | `0` |
| 4 | `img.mt-[40px].w-[800px].max-w-full` | 765.83 | **533.33** | `margin-top: 40px` |

- H1 `We’ll help you meet your Environmental, Social and Governance commitments` — 65.333px/97.347px serif 600, **2 lines**, longest line **1114.6px** inside a 1152px frame → only **37.4px (3.2%) headroom**. ⚠️ **Fragile wrap point** — see §5.
- Block 3 uses **`max-w-[40ch]`** → computed **474.053px** (NEW max-width).
- ⚠️ Block 4 is the **only px-sized element on any of the three pages**: `mt-[40px] w-[800px] max-w-full`, with HTML `width="800" height="533"`. Rendered **800 × 533.33** @1280 and @1440 (does NOT scale with the em engine), then clamped by `max-w-full` to **675.84 × 450.56** @768 and **343.22 × 228.81** @390. Reproduce as literal px — this deliberately breaks the em convention.

## 2.3 Section C (SOCIAL) — block list

| idx | Block | y | height | margin |
|---|---|---|---|---|
| 0 | `my-[4.2em] … flex w-full flex-col items-center justify-center` → tick badge `SOCIAL` (124.84 × 47.73) | 1633.95 | 47.73 | `44.8px 0` |
| 1 | `my-[4.2em] …` → `div.w-[70.3em].mx-auto.mt-0.max-wf-phone:w-auto.max-wf-mini:mt-[3em].max-wf-mini:w-auto` → `h2` | 1726.48 | 142.06 (2 lines, explicit `<br/>`) | `44.8px 0` |
| 2 | `text-center my-0 w-full max-wf-mini:my-0` → `p.mx-auto.max-w-[49ch]` (5 lines, 2 `<br/>`, ends with a `Learn more` link) | 1913.34 | 158.67 | 0 |
| 3 | `my-[4.2em] … mt-[9.5em] flex items-stretch justify-center max-wf-phone:flex-col max-wf-phone:items-center` → 2-col | 2173.34 | 527.08 | `101.333px 0 44.8px` |

Block 3 two-column geometry (**NEW gap value**):
- Left: `div.relative.flex.w-[34.4013em].flex-col.items-center` = **366.94px** wide, x 277.84. Contains CARD_LEAVES ×3, then `img.relative.z-20.w-full` → `sn-2png-f6c14a.webp` (366.94 × 394.16, alt `A screen showing an employee being recognised`, eager), then the value badge `div.my-[2.02566em].rounded-[10px].border-2.border-black.bg-leaf.px-[1.5em].py-[0.8em]` (**188.92 × 47.73**, `Tagged Value: Grit`), then `div.flex.items-center` with `ever-small-leafsvg` + `Sue earned 3 seeds`. Identical to CLONE_SPEC §5.8.
- Right: `div.ml-[6.91014em].flex.flex-col.items-center` → `margin-left: ` **73.708px** (**NEW** — homepage's 2-col gap is `9.91014em` = 105.71px), width 283.67px, x 718.48.
  - Stat 1 `div.mb-[5em].flex.flex-col.items-center`: `p.font-headline.text-[4.5em].leading-[1.48].font-semibold` = `+100k` (48px/71.04, 125.45px wide) + `p.text-center` `peer-to-peer<br>recognitions so far` (2 lines, 63.47). Block 134.5 tall, `margin-bottom 53.333px`.
  - Stat 2 same pattern: `+8k` + `Evergreen users` (1 line). Block 102.77 tall.
  - G2 sub-block `div.flex.flex-col.items-center` identical to §5.10 but alt is `G2 review logo` and the images are **eager** (no `loading=lazy`). Height 183.16.
- Row is `items-stretch`, so the two columns are equal height (527.08).

## 2.4 Section E (GOVERNANCE) — block list

| idx | Block | y | height | margin |
|---|---|---|---|---|
| 0 | tick badge `GOVERNANCE` (180.11 × 47.73) | 3133.34 | 47.73 | `44.8px 0` |
| 1 | `div.w-[70.3em]` → `h2` (2 lines) | 3225.88 | 142.06 | `44.8px 0` |
| 2 | `p.mx-auto.max-w-[49ch]` (2 lines) | 3412.73 | 63.47 | 0 |
| 3 | `mt-[9.5em] flex items-stretch justify-center` → 2-col | 3577.53 | 533.89 | `101.333px 0 44.8px` |

- Left column identical shell (`relative flex w-[34.4013em] flex-col items-center`, 366.94px, x 235.69) with CARD_LEAVES ×3 and `img.relative.z-20.w-full` → `sn-4apng-19e16a.webp` (**366.94 × 525.84**, intrinsic 1106 × 1585, alt `Screen showing individual and team recognition as a report`, eager). No badge/seed line here.
- Right column: `div.ml-[6.91014em].flex.h-full.w-[34.5em].flex-col.items-center.justify-between.max-wf-phone:mt-[5em].max-wf-phone:ml-0` → **367.98px** wide, x 676.33, `justify-content: space-between`.
  - `div.mb-[5em].w-[27.25em].max-w-full` (**290.66px**) → `p.text-center`, 4 lines, 126.94 tall.
  - `img.mt-[13.9em].w-full.max-wf-phone:mt-0` → `screen-report-split-2svg-008209.svg`, **367.98 × 205.36**, `margin-top: 148.267px`, intrinsic 504 × 281, eager.

## 2.5 NEW COMPONENT — `TickBadge`

A variant of the §5.8 value badge with a leading tick glyph. Three instances (`ENVIRONMENTAL`, `SOCIAL`, `GOVERNANCE`).

```html
<div class="flex rounded-[10px] border-2 border-black bg-leaf px-[1.5em] py-[0.8em]">
  <img src="/assets/ticksvg-589d98.svg" alt="A tick showing environmental commitments are being addressed" class="mr-[0.4em] w-[2em]"/>
  <p class="text-[1.625em] leading-[1.54] font-semibold">ENVIRONMENTAL</p>
</div>
```

| Property | Value @1280 |
|---|---|
| Background | `#beedc0` |
| Border | `2px solid #000000` |
| Border-radius | **10px** |
| Padding | `0.8em 1.5em` = **8.533px 16px** |
| Height | **47.73px** (all three) |
| Widths | ENVIRONMENTAL **207.69**, SOCIAL **124.84**, GOVERNANCE **180.11** (shrink-to-fit) |
| Tick icon | `mr-[0.4em] w-[2em]` → **21.33 × 26.67px**, `margin-right 4.267px`, intrinsic 209 × 150, `object-fit: fill` (so the tick is deliberately squashed to a 0.8 aspect) |
| Label | `p.text-[1.625em].leading-[1.54].font-semibold` → **17.333px / 26.693px**, weight 600, `#000000`. Text is literally uppercase in the source — **no `text-transform`** (`textTransform: none`). |
| Box-shadow | none. No hover. |
| @768/390 | 161.64 × 37.84 (root freezes at 8.25833px) |

## 2.6 NEW COMPONENT — `SdgGoalColumn` (4-up row)

Shared verbatim by `/esg` section G and `/our-purpose` section D (the two DOM subtrees are byte-identical).

```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] mb-0 max-wf-mini:mb-0 mt-[5.5em]
            flex justify-between max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:mt-[5.5em]">
  <div class="mx-[0.5em] flex w-[20%] flex-col items-center
              max-wf-phone:mb-[5em] max-wf-phone:w-[80%] max-wf-mini:w-[90%]">
    <span class="mb-[1em] flex h-[3.24544em] items-center justify-center">
      <img src="/assets/icon-povertysvg-375091.svg" alt="No poverty icon" class="h-full w-auto"/>
    </span>
    <p class="mb-[0.7em] text-center text-[1.7em] leading-[1.75] font-bold">GOAL 1<br/>NO POVERTY</p>
    <p class="mx-auto max-w-[49ch] text-center">No Poverty. More than 700m people live in extreme poverty. We help to employ people to plant trees.</p>
  </div>
  …×4
</div>
```

- Row: `justify-between`, `margin: 58.667px 0 0`, height **311.83px**, y 5083.03 (esg) / 1878.64 (purpose).
- Column: `width: 20%` → **230.41px** @1280, `margin-inline: 0.5em` = 5.333px. x positions **69.31 / 372.97 / 676.63 / 980.28**.
- Icon wrapper `h-[3.24544em]` = 34.61px, `mb-[1em]` = 10.667px. Icons (all `h-full w-auto`, eager): poverty **43.02 × 34.61** (intrinsic 66 × 53), youth **31.97 × 34.61** (58 × 63), environment **35.47 × 34.61** (59 × 57), tree **34.58 × 34.61** (60 × 60).
- Goal label: **NEW type role** — `text-[1.7em] leading-[1.75] font-bold` → **18.1333px / 31.7333px**, weight **700**, colour `#000000`, centred, `margin-bottom: 0.7em = 12.693px`. Two lines via `<br/>`, height 63.47.
- Body paragraph: default `p` 18.667/31.733, `max-w-[49ch]` (580.714px, constrained by the 230.41px column). Heights 158.67 / 158.67 / 190.41 / 190.41.
- Responsive: `w-[20%]` → 259.2 @1440, 135.16 @768, and at ≤479 `max-wf-mini:w-[90%]` = **308.89px** with the row stacked by `max-wf-phone:flex-col` and each column `mb-[5em]`.

## 2.7 Section I — reassurance trio + final CTA

**Byte-identical** (classes, text, geometry) to CLONE_SPEC §1-H / §5 / §8-H, and byte-identical to `/our-purpose` section E — verified by DOM diff over the last 103 nodes of both pages.

| Block | y | height | margin |
|---|---|---|---|
| 3-icon reassurance row (`w-[25em]` / `w-[29em]` / `w-[25em]` = 266.66 / 309.33 / 266.66, `justify-around`) | 5684.86 | 108.73 | `0 0 44.8px` |
| `div.mt-[7.4em].mx-auto.w-[51em]` → `h2.font-headline.text-[6.125em].leading-[1.4]` `Start feeling good about work` (543.98px frame, 2 lines, 182.91) | 5838.39 | 261.83 | `0 0 44.8px` |
| Paragraph `For only $3.99 …` (2 lines) | 6145.02 | 63.47 | `44.8px 0` |
| TrialButton + small print | 6253.28 | 98.42 | `44.8px 0` |
| Slack/Teams links | 6396.50 | 37.06 | `0 0 44.8px` |

## 2.8 Motion on `/esg`

| Element | Count | Trigger | From → To | Duration | Easing |
|---|---|---|---|---|---|
| DIVIDER_LEAVES (4 dividers × 12) | 48 | `whileInView {once:true, amount:0}` | `translateY(-4em … -12.5em)` → 0 | **1500ms** | `cubic-bezier(0.455,0.03,0.515,0.955)` |
| CARD_LEAVES (SOCIAL visual, GOVERNANCE visual) | 2 × 3 = 6 | same | `translateX/Y` per §7.2 | **1300 / 1500 / 1000ms** | same |
| Total `marketing-drift-leaf` | **54** | | | | zero delay, zero stagger |

No scroll-tracked leaves, no recognition lines, no hearts, no opacity fades, no IntersectionObserver on anything other than the drift leaves. Hover/overlay/hamburger motion as §0.

Exact DIVIDER_LEAVES SSR inline styles (confirmed identical to §7.2; z-indexes as actually served):
```
{leaf,  top:10.3em, left:3.5em,     rotate:151,  z:11, from:[0,-10]}
{small, top:12.7em, left:17.1193em, rotate:146,  z:1,  from:[0,-12.5]}
{leaf,  top:10.3em, left:31.6585em, rotate:-149, z:11, from:[0,-8]}
{spike, top:10.7em, left:43.52em,   rotate:-20,  z:1,  from:[0,-4]}
{spike, top:11.9em, left:48.7em,    rotate:17,   z:1,  from:[0,-4]}
{leaf,  top:7.8em,  left:53.9641em, rotate:-166, z:11, from:[0,-6]}
{leaf,  top:11.3em, left:59.3641em, rotate:166,  z:12, from:[0,-9]}
{small, top:11.9em, left:72.8875em, rotate:-149, z:1,  from:[0,-12.5]}
{leaf,  top:12em,   left:87.0737em, rotate:-151, z:12, from:[0,-10]}
{leaf,  top:9.1em,  left:93.9737em, rotate:177,  z:13, from:[0,-7]}
{spike, top:10.7em, left:106.62em,  rotate:0,    z:1,  from:[0,-4]}
{leaf,  top:11em,   left:110.525em, rotate:-169, z:11, from:[0,-9]}
```

## 2.9 Interactive behaviour on `/esg`

Trial modal (from the final-CTA button) + footer newsletter form only. No tabs, accordion, toggle or other form.

## 2.10 Text content — `/esg` (verbatim)

**Hero / ENVIRONMENTAL**
- H1: `We’ll help you meet your Environmental, Social and Governance commitments`
- Badge: `ENVIRONMENTAL` (tick alt `A tick showing environmental commitments are being addressed`)
- H2: `Over 500 000 trees planted by teams`
- Paragraph: `Evergreen plants trees through ` + link `veritree.com` + `. Learn more about Veritree on their website.`
- Image `img-6223-7511ba.webp`, `alt=""` `aria-hidden="true"`

**SOCIAL**
- Badge: `SOCIAL` (alt `A tick showing social commitments are being addressed`)
- H2: `Create a positive company culture` `<br>` `through social recognition`
- Paragraph: `Evergreen is the ` **`only`** ` peer-to-peer recognition app that lets teams recognise a job well done, while planting trees for the planet. For the ultimate positive, feel-good team culture.` `<br><br>` link `Learn more`
- Left visual badge: `Tagged Value: Grit` · seed line: `Sue earned 3 seeds`
- Stats: `+100k` / `peer-to-peer` `<br>` `recognitions so far` — `+8k` / `Evergreen users` — `4.8 / 5 on G2 Reviews`

**GOVERNANCE**
- Badge: `GOVERNANCE` (alt `A tick showing governance commitments are being addressed`)
- H2: `Support your business structure with clear reporting`
- Paragraph: `Administators and managers have access to extensive reports to understand their teams performance.` *(“Administators” and the missing apostrophe in “teams” are typos in the original — reproduce verbatim.)*
- Right paragraph: `See who is giving and receiving the most recognitions. Tag company values to ensure they stay visible and real.`

**UN SDG block**
- H2: `Take action across four categories in the UN Sustainable Development Goal Framework`
- Paragraph: `The Sustainable Development Goals are the blueprint to achieve a better and more sustainable future for all. They address the global challenges we face, including poverty, inequality, climate change, environmental degradation, peace and justice. Joining Evergreen ensures you are helping across four categories.` `<br><br>` link `See all UN goals`
- Col 1 — `GOAL 1` `<br>` `NO POVERTY` / `No Poverty. More than 700m people live in extreme poverty. We help to employ people to plant trees.` (icon alt `No poverty icon`)
- Col 2 — `GOAL 8` `<br>` `YOUTH EMPLOYMENT` / `One-fifth of young people are not in education, employment or training. Paying them to plant trees couldn’t be more positive.` (alt `Youth employment icon`)
- Col 3 — `GOAL 13` `<br>` `CLIMATE ACTION` / `Global emissions of carbon dioxide C02 have increased by almost 50% since 1990. We need reforestation on a massive scale.` (alt `Climate action icon`)
- Col 4 — `GOAL 15` `<br>` `PLANT A TREE` / `Plant a tree and help protect the environment. Forests are home to more than 80% of all terrestrial species of animals, plants and insects.` (alt `Plant a tree icon`)

**Final CTA** — identical strings to CLONE_SPEC §8-H.

## 2.11 Links — `/esg`

| href | Where | On/off domain |
|---|---|---|
| `https://veritree.com` (`target=_blank rel=noreferrer`) | hero paragraph | **off-domain → inert** |
| `/` | SOCIAL paragraph "Learn more" | internal |
| `https://www.un.org/sustainabledevelopment/sustainable-development-goals/` (`target=_blank rel=noreferrer`) | SDG paragraph "See all UN goals" | **off-domain → inert** |
| `https://app.evergreen.so/api/slack/install`, `…/teams/install` | final CTA | **off-domain → inert** |
| nav + footer set | — | as §1.10 |

---

# PART 3 — `/our-purpose`

Screenshots: `purpose-1280-full.png`, `purpose-1280-01-hero.png`, `purpose-1280-02-goals-2027.png`, `purpose-1280-03-sdg.png`, `purpose-1280-04-cta.png`, `purpose-1280-05-footer.png`.

Head: `<title>Evergreen | Purpose</title>`, canonical `https://www.evergreen.so/our-purpose`.

⚠️ **There is no long-form editorial prose on this page.** Despite the name it is a short 5-section page: a one-line H1, a 2-sentence intro paragraph flanked by decorative leaf wreaths, a leaf-green "Goals By 2027" stat band, the shared UN SDG block, and the shared final CTA. Total body copy is **3 short paragraphs + 3 stat captions**. Everything is recorded verbatim below.

## 3.1 Section map (DOM order, 1280)

| # | Role | Element | y | height | Background | Wrapper padding | Inner width | Columns |
|---|---|---|---|---|---|---|---|---|
| — | Nav | — | 0 | 76.59 | cream | `18.13px 30.93px` | full bleed | — |
| A | **Hero** | `section.relative.bg-cream` | 44.61 | **507.72** | `#fffff3` | **`pb-[5em]`** = `0 64px 53.333px`; inner `pt-[10.2em]` = 108.8px | 1152px | h1, then leaf \| paragraph \| leaf (3-col flex) |
| B | **"Goals By 2027" band** | `section.relative.bg-leaf` | 520.34 | **484.81** | **`#beedc0`** — NEW: first full-bleed leaf-green section anywhere in the clone | `0 64px` (no `py`) | 1152px | heading, then 3-col `justify-around` |
| C | Divider (band **`bg-leaf`**) | `section.relative` | 973.17 | **161.98** | `#beedc0` | — | 1279.98 | 1 |
| D | **UN SDG block** | `section.relative.bg-cream-dark` | 1103.17 | **1087.30** | `#edede2` | `pt-[18em]`, no `pb` = `192px 64px 0` | 1152px | stacked then 4-col |
| E | Divider (band `bg-cream-dark`) | `section.relative` | 2158.48 | **161.98** | `#edede2` | — | 1279.98 | 1 |
| F | **Reassurance trio + final CTA** | `section.relative.bg-cream-dark` | 2288.48 | **1038.81** | `#edede2` | `pt-[18em] pb-[5em]` | 1152px | 3-col then centred |
| G | Footer | `section.relative.bg-cream` | 3295.31 | **542.81** | `#fffff3` | `53.33px 64px` | 1152px | §5.13 |

Total document height **3838px**. Sections D and F are byte-identical to `/esg` sections G and I respectively (DOM-diffed).

## 3.2 Section A — hero

```html
<div class="pt-[10.2em] max-wf-mini:pt-[11.8em]">
  <div class="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full
              max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">

    <!-- phone-only leaf pair, display:none above 767px -->
    <div class="mb-[2em] hidden justify-center max-wf-phone:flex">
      <img src="/assets/leaf-smaller-reflectsvg-c42957.svg" alt="" aria-hidden="true" class="w-[5em]"/>
      <img src="/assets/leaf-smallersvg-6114e8.svg"        alt="" aria-hidden="true" class="ml-[4em] w-[5em]"/>
    </div>

    <h1 class="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">Our Purpose</h1>

    <div class="mt-[4.2em] mb-[4.2em] flex justify-center text-center
                max-wf-phone:flex-col max-wf-mini:mt-[2em] max-wf-mini:mb-[3.5em]">
      <span class="flex items-center max-wf-phone:hidden">
        <img src="/assets/leaf-smaller-reflectsvg-c42957.svg" alt="leaf wreath on left"
             class="h-[14.7087em] w-[8.34021em]"/>
      </span>
      <p class="mx-[3em] max-w-[49ch] text-center max-wf-mini:mx-0 max-wf-mini:mt-[1em] max-wf-mini:mb-[2em]">…</p>
      <span class="flex items-center max-wf-phone:hidden">
        <img src="/assets/leaf-smallersvg-6114e8.svg" alt="leaf wreath on right"
             class="h-[14.7087em] w-[8.34021em]"/>
      </span>
    </div>
  </div>
</div>
```

| Element | y | geometry |
|---|---|---|
| H1 `Our Purpose` | 153.41 | 1152 × 97.33 (1 line), text width 353.4px, 65.333px/97.347px serif 600 |
| Flanked row | 295.53 | 1151.98 × 158.67, `margin-block: 44.8px`, `justify-content: center` |
| Left leaf wreath | 295.53 | **88.95 × 156.89**, x 204.70 (`h-[14.7087em] w-[8.34021em]`, vertically centred by `items-center`) |
| Paragraph | 295.53 | **580.70 × 158.67**, x 349.64, `margin-inline: 3em = 56px`, `max-w-[49ch]` = 580.714px, 5 lines (two `<br/>`) |
| Right leaf wreath | 295.53 | 88.95 × 156.89, x 986.33 |

- **These two wreath leaves are NOT animated** — no `marketing-drift-leaf` class, no inline transform, no `--leaf-rotate`. Static decorative images, `position: static` inside flex spans. They have real `alt` text (`leaf wreath on left` / `leaf wreath on right`), unlike every other leaf on the site.
- `leaf-smaller-reflectsvg-c42957.svg` is a **NEW asset** — the horizontal mirror of `leaf-smallersvg-6114e8.svg` (same 86 × 150 intrinsic).
- ≤767px: the flanking spans go `display:none` and the phone-only pair above the H1 becomes `display:flex` — two `w-[5em]` (41.29px) leaves, the right one with `ml-[4em]` = 33.03px, wrapper `mb-[2em]` = 16.52px. The paragraph row becomes `flex-col`.
- @390 the flanking wreaths measure 0 × 0 (hidden); @768 they are 62.14 × 121.47 (still visible, since `max-wf-phone` is `≤767.98px`).

## 3.3 Section B — "Goals By 2027" band (NEW section pattern)

```html
<section class="relative bg-leaf">
  <div class="mx-auto -mt-[3em] w-full max-w-[1920px] px-[6em] max-wf-tablet:px-[6vw]">
    <div class="bg-leaf pt-[11.5322em] text-center">
      <h2 class="font-headline text-[6.125em] leading-[1.4] font-semibold text-black
                 max-wf-mini:text-[5.1em]">Goals By 2027</h2>
    </div>
    <div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] mb-0 max-wf-mini:mb-0 mt-[8em]
                flex justify-around max-wf-phone:flex-col max-wf-phone:items-center">
      …3 × IconFeatureColumn (serif variant, §1.5)…
    </div>
  </div>
</section>
```

| | Value |
|---|---|
| Section background | **`#beedc0`** (`bg-leaf`) — the leaf token used as a full-bleed section fill for the first time |
| Heading block | `bg-leaf pt-[11.5322em] text-center` → `padding-top: ` **123.01px**, block 1152.03 × 214.45, y 520.34 |
| H2 | 65.333px / 91.467px serif 600, `#000000`, 1 line (text width 386.9px), y 643.34, h 91.45 |
| Stat row | `mt-[8em]` = **85.333px**, `justify-around`, y 820.13, h **185.03** |
| Columns | `flex w-[30%] flex-col items-center max-wf-phone:mb-[4.6em] max-wf-phone:w-full` → **345.61px** each, x 83.17 / 467.19 / 851.19 |
| Icon | `span.mb-[1em].flex.h-[3.24544em]` → 34.61px tall; `icon-treesvg-fb7494.svg` 34.58 × 34.61 (alt `Planting tree logo`), `company-1ddd00.svg` 34.61 × 34.61 (alt `Organisation logo`), `checked-a91d37.svg` 34.61 × 34.61 (alt `User recognition logo`) |
| Figure | `h2.my-[0.5em].max-w-[11ch].text-center.font-headline.text-[3.125em].leading-[1.29].font-semibold` → **33.333px / 43px** serif 600, 1 line each (119.39 / 97.73 / 136.92px wide), `margin-block 16.667px` |
| Caption | default `p`, 18.667/31.733, 2 lines each (63.47) |
| Section height | **484.81px** (@1440 545, @768 400, @390 783 — the columns stack) |

Same `IconFeatureColumn` component as `/pricing` §1.5 (identical class strings), only the content and icons differ.

## 3.4 Motion on `/our-purpose`

| Element | Count | Trigger | From → To | Duration | Easing |
|---|---|---|---|---|---|
| DIVIDER_LEAVES (2 dividers × 12) | 24 | `whileInView {once:true, amount:0}` | `translateY(-4em … -12.5em)` → 0 | **1500ms** | `cubic-bezier(0.455,0.03,0.515,0.955)` |
| Hero wreath leaves (4 imgs: 2 desktop + 2 phone) | 4 | — | — | — | **static, never animate** |
| Total `marketing-drift-leaf` | **24** | | | | zero delay, zero stagger |

No CARD_LEAVES, no QUOTE_LEAVES, no scroll-linked motion on this page. Hover/overlay/hamburger as §0.

## 3.5 Interactive behaviour on `/our-purpose`

Trial modal (from the final-CTA button) + footer newsletter form only.

## 3.6 Text content — `/our-purpose` (verbatim, complete)

- H1: `Our Purpose`
- Intro paragraph (one `<p>`, two `<br/>`): `For us, our purpose defines everything we do.` `<br><br>` `We help organizations live happier and have healthier company culture, and help our planet be happier and healthier at the same time.`
- H2: `Goals By 2027`
- Stat 1: `1 million` / `Trees planted by our users through Evergreen.`
- Stat 2: `+1,000` / `Organizations use Evergreen to enhance their company culture.`
- Stat 3: `+100,000` / `Users give constant recognition to their colleagues.`
- UN SDG block: identical strings to §2.10.
- Final CTA: identical strings to CLONE_SPEC §8-H.

## 3.7 Links — `/our-purpose`

| href | Where | On/off domain |
|---|---|---|
| `https://www.un.org/sustainabledevelopment/sustainable-development-goals/` (`target=_blank rel=noreferrer`) | SDG paragraph | **off-domain → inert** |
| `https://app.evergreen.so/api/slack/install`, `…/teams/install` | final CTA | **off-domain → inert** |
| nav + footer set | — | as §1.10 |

No other links in the page body.

---

# 4. NEW typographic roles (additions to CLONE_SPEC §3.3)

Measured at 1280 (`1em = 10.6667px`). All `letter-spacing: normal`, all `color: #000000`, all `text-align: center`.

| Role | Selector | em | px @1280 | Weight | line-height | Family | Used by |
|---|---|---|---|---|---|---|---|
| **Serif sub-heading** | `.font-headline.text-[3.125em].leading-[1.29].font-semibold` (+ `my-[0.5em] max-w-[11ch]`) | 3.125em | **33.3333px** | 600 | 1.29 → **43px** | headline serif | pricing reassurance trio (§1.5), "Goals By 2027" stats (§3.3) |
| ↳ @ ≤479px | `max-wf-mini:text-[3.9em]` | 3.9em | 32.21px | 600 | 1.29 | serif | — |
| **Card body / caption** | `p.text-[1.5625em]` | 1.5625em | **16.6667px** | 400 | 1.7 (inherited) → **28.3333px** | Rubik | price-card "only" line and sub-line |
| ↳ italic variant | `p.text-[1.5625em] > em` | 1.5625em | 16.6667px | 400, **`font-style: italic`** (synthesised oblique) | 28.3333px | Rubik | price-card "only" |
| ↳ inline link | `p.text-[1.5625em] > a` | 1em of the above | 16.6667px | **600** | **1 → 16.6667px** | Rubik | "contact us" |
| **SDG goal label** | `p.mb-[0.7em].text-center.text-[1.7em].leading-[1.75].font-bold` | 1.7em | **18.1333px** | **700** | 1.75 → **31.7333px** | Rubik | 4 SDG columns (§2.6) |
| **Stat figure (inline serif `<p>`)** | `p.font-headline.text-[4.5em].leading-[1.48].font-semibold` | 4.5em | 48px | 600 | 1.48 → 71.04px | serif | ESG SOCIAL `+100k` / `+8k`. Same metrics as the §3.3 "Section display heading" but on a `<p>`, not an `<h2>` — keep the tag so `.marketing-root p` colour/reset applies. |

New max-width tokens observed (keep the `ch` unit — they are font-dependent):

| Class | Computed @1280 | Where |
|---|---|---|
| `max-w-[60ch]` | **711.079px** | pricing hero sub-paragraph |
| `max-w-[59ch]` | 699.228px | (sibling route `/case-studies`; listed for completeness, unused on these three) |
| `max-w-[40ch]` | **474.053px** | ESG hero veritree paragraph |
| `max-w-[11ch]` | **226.944px** | serif sub-heading (`3.125em` context) |
| `max-w-[49ch]` on `text-[1.5625em]` | **518.473px** | price-card paragraphs |
| `max-w-[49ch]` on `text-[1.4375em]` | **477.082px** | small print under CTAs |
| `max-w-[49ch]` on `h1` (serif) | 1981.52px | effectively unconstrained |

New spacing increments (em, so they scale):

| em | px @1280 | Where |
|---|---|---|
| `0.4em` | 4.267 | tick icon → label gap (§2.5) |
| `0.7em` | 12.693 | SDG goal label `mb` (resolves at 18.1333px, **not** 10.667px) |
| `1.4em` | 14.933 | t3 avatar `ml` on `/pricing` |
| `2em` | 21.333 | our-purpose phone leaf pair `mb` |
| `3.6875em` | 39.333 | price-card `pb` |
| `4.21943em` | 45.007 | price-card `pt` |
| `4.7em` | 50.133 | price-card avatar `-top` |
| `5.5em` | 58.667 | SDG row `mt` |
| `6.91014em` | **73.708** | ESG 2-col gap (vs 9.91014em on the homepage) |
| `7.6em` | 81.067 | price-card frame `mt` |
| `9.5em` | 101.333 | ESG 2-col row `mt` |
| `9.93203em` | 105.942 | ESG hero badge `mt` |
| `10em` | 106.667 | pricing section C `pb` |
| `11.5322em` | 123.010 | "Goals By 2027" heading `pt` |
| `13.9em` | 148.267 | ESG governance report image `mt` |
| `15em` | 160 | pricing section C `pt` |
| `19.4941em` | 207.92 | pricing testimonial company-logo width |
| `27.25em` | 290.66 | ESG governance right paragraph width |
| `34.5em` | 367.98 | ESG governance right column width |
| `50.4013em` | 537.61 | price-card frame width |
| `40em` | 330.33 (@390, root 8.25833) | price-card frame width ≤479px |

Named column widths carried over unchanged: `34.4013em` (366.94) visual column, `70.3em` (749.86) heading frame, `51em` (543.98) final-CTA heading, `108em` (1151.98) hero frame, `25em`/`29em` reassurance columns, `39.1109em` (417.17) testimonial card, `120em` (1279.98) divider.

---

# 5. Creative-reinterpretation notes & fragile wrap points

The display serif is **Gloock**, self-hosted, `size-adjust: 92.44%`, standing in for the Typekit-bound `ivypresto-headline`. Expect ≤1.2% advance-width differences. Headings measured at 1280 with the original face, longest-line width vs available width:

| Page | Heading | Lines | Longest line | Frame | Headroom | Risk |
|---|---|---|---|---|---|---|
| esg | H1 `We’ll help you meet your Environmental, Social and Governance commitments` | 2 | **1114.6px** | 1152px | **37.4px (3.2%)** | ⚠️ **Tightest on the three pages.** A +1.2% face adds ~13px → ~1128px, still fits, but there is no margin for a wider substitute. If it reflows to 3 lines the hero grows ~97px and every downstream y shifts. **Verify visually against `esg-1280-01-hero-environmental.png`.** |
| esg / purpose | H2 `Take action across four categories in the UN Sustainable Development Goal Framework` | 3 | 728.6px | 749.86px (`w-[70.3em]`) | 21.3px (2.8%) | ⚠️ Second tightest. +1.2% → ~737px. Fits, but check. |
| esg | H2 `Start feeling good about work` | 2 | 485.7px | 544px (`w-[51em]`) | 58.3px | safe |
| esg | H2 `Create a positive company culture<br>through social recognition` | 2 (forced `<br/>`) | 685.1px | 749.86px | 64.8px | safe (break is explicit) |
| esg | H2 `Support your business structure with clear reporting` | 2 | 650.3px | 749.86px | 99.6px | safe |
| pricing | H1 `Fair pricing, massive impact` | 1 | 765.2px | 1152px | 386.8px | safe |
| pricing | H2 `Contact us any time` | 2 | 207.9px | 226.94px (`max-w-[11ch]`) | 19.0px | moderate — `11ch` is itself serif-metric-dependent, so the frame and the text scale together; re-measure after the swap |
| pricing | H2 `Always striving to be fair` | 2 | 209.2px | 226.94px | 17.7px | moderate, same caveat |
| purpose | H1 `Our Purpose`, H2 `Goals By 2027` | 1 | 353.4 / 386.9px | 1152px | huge | safe |

Other reinterpretation notes:
1. **`max-w-[11ch]`** on the serif sub-heading is measured in the *substitute* serif's `ch`, so the frame changes with the font. If the 2-line wrap of the three pricing headings breaks, pin it with an explicit `max-w-[21.27em]` (= 226.944px @1280) rather than changing the font size.
2. **The price card's `<em>only`** relies on a synthesised oblique of Rubik. Gloock/Rubik substitutions must not introduce a real italic face — the original has none.
3. **`img-6223-7511ba.webp` is literally `w-[800px]`**, not em-based. It is the only fixed-px dimension on these pages. Keep it in px or the hero's 533.33px block height will drift with viewport.
4. **`ticksvg-589d98.svg`** is rendered at 21.33 × 26.67 from a 209 × 150 intrinsic — `object-fit: fill`, so the tick is squashed to 0.8 of its natural aspect. This is intentional; do not add `object-contain`.
5. **`t3png-ee95a1.webp` is `scale-[1.2]` + `ml-[1.4em]`** inside its clipping circle, so the portrait is deliberately cropped off-centre. Reproduce the transform; don't re-crop the asset.
6. The ESG/our-purpose UN SDG block and the ESG/our-purpose final-CTA block are byte-identical DOM subtrees — build them once as shared components (`<SdgSection/>`, `<FinalCtaSection/>`) and render them on both routes.

---

# 6. Asset inventory & download report

All image assets rendered by the three pages. **18 were missing from `/Users/riyaghosh/V3/evergreen/public/assets/` and have been downloaded into it; 0 failures (all HTTP 200).** Original filenames preserved. Serve as `/assets/<filename>`.

### 6.1 Newly downloaded (18)

| Original URL | Local filename | Intrinsic | Used on | Rendered @1280 | object-fit | loading |
|---|---|---|---|---|---|---|
| `https://www.evergreen.so/marketing/a-price-1png-5e6ffc.webp` | `a-price-1png-5e6ffc.webp` | 272 × 271 | pricing — price-card avatar 1 | 85.22 × 84.89 (`w-full`) | fill | eager |
| `…/a-price-2png-1bdf4a.webp` | `a-price-2png-1bdf4a.webp` | 276 × 268 | pricing — price-card avatar 2 | 85.22 × 82.73 (`w-full`) | fill | eager |
| `…/t3png-ee95a1.webp` | `t3png-ee95a1.webp` | 444 × 380 | pricing — testimonial 1 avatar | 146.12 × 131.49 (`h-[90%] scale-[1.2] ml-[1.4em]`, clipped to a 125.77px circle) | fill | lazy |
| `…/t4png-f92ff9.webp` | `t4png-f92ff9.webp` | 413 × 380 | pricing — testimonial 2 avatar | 121.77 × 112.03 (`h-auto w-full`) | fill | lazy |
| `…/logo-kent-and-whitepng-e559b5.webp` | `logo-kent-and-whitepng-e559b5.webp` | 625 × 142 | pricing — logo under testimonial 1 | 207.92 × 47.23 (`w-[19.4941em]`) | fill | lazy |
| `…/logo-coverwalletsvg-be24e9.svg` | `logo-coverwalletsvg-be24e9.svg` | 340 × 69 | pricing — logo under testimonial 2 | 207.92 × 42.08 (`w-[19.4941em]`) | fill | lazy |
| `…/logo-fraktiosvg-19b008.svg` | `logo-fraktiosvg-19b008.svg` | 186 × 50 | pricing — logo strip, 5th slot | 124.17 × 33.36 (inline `width:11.6417em`) | fill | lazy |
| `…/ticksvg-589d98.svg` | `ticksvg-589d98.svg` | 209 × 150 | esg — ×3 TickBadge | 21.33 × 26.67 (`w-[2em]`) | fill | eager |
| `…/img-6223-7511ba.webp` | `img-6223-7511ba.webp` | 1200 × 800 | esg — hero photo | **800 × 533.33** (`w-[800px] max-w-full`) | fill | eager |
| `…/sn-4apng-19e16a.webp` | `sn-4apng-19e16a.webp` | 1106 × 1585 | esg — GOVERNANCE visual | 366.94 × 525.84 (`w-full` of `w-[34.4013em]`) | fill | eager |
| `…/screen-report-split-2svg-008209.svg` | `screen-report-split-2svg-008209.svg` | 504 × 281 | esg — GOVERNANCE report graph | 367.98 × 205.36 (`w-full`) | fill | eager |
| `…/icon-povertysvg-375091.svg` | `icon-povertysvg-375091.svg` | 66 × 53 | esg + purpose — SDG col 1 | 43.02 × 34.61 (`h-full w-auto`) | fill | eager |
| `…/icon-youthsvg-db3447.svg` | `icon-youthsvg-db3447.svg` | 58 × 63 | esg + purpose — SDG col 2 | 31.97 × 34.61 | fill | eager |
| `…/icon-environmentsvg-89f589.svg` | `icon-environmentsvg-89f589.svg` | 59 × 57 | esg + purpose — SDG col 3 | 35.47 × 34.61 | fill | eager |
| `…/icon-treesvg-fb7494.svg` | `icon-treesvg-fb7494.svg` | 60 × 60 | esg + purpose — SDG col 4; purpose — Goals stat 1 | 34.58 × 34.61 | fill | eager |
| `…/company-1ddd00.svg` | `company-1ddd00.svg` | 96 × 96 | purpose — Goals stat 2 | 34.61 × 34.61 | fill | eager |
| `…/checked-a91d37.svg` | `checked-a91d37.svg` | 96 × 96 | purpose — Goals stat 3 | 34.61 × 34.61 | fill | eager |
| `…/leaf-smaller-reflectsvg-c42957.svg` | `leaf-smaller-reflectsvg-c42957.svg` | 86 × 150 | purpose — hero wreath left (desktop) + phone pair | 88.95 × 156.89 desktop / 41.29px wide phone | fill | eager |

### 6.2 Already present, reused (22)

`ever-regular-leafsvg-1b92f2.svg` (all 3, drift + quote leaves) · `leaf-smallersvg-6114e8.svg` (all 3; also purpose hero wreath right at 88.95 × 156.89) · `leaf-spikesvg-7a4672.svg` (all 3, dividers) · `ever-small-leafsvg-e988d6.svg` (nav 13.5 × 22.91; footer prompt 13.5 × 36.8; esg seed line 13.5px wide) · `evergreen-logosvg-216cd4.svg` (nav 143.69 × 40.34, footer 171.70 × 48.20) · `slacksvg-1b4e41.svg` 37.06 × 37.06 · `teamssvg-b74fd1.svg` 37.06 × 36.16 · `icon-usersvg-f5e0ab.svg` 31.30 × 34.61 · `icon-supportsvg-bc4096.svg` 31.14 × 34.61 · `icon-timesvg-4c8791.svg` 34.61 × 34.61 · `icon-linkedinsvg-777cac.svg` 17.81 × 17.81 · `icon-twittersvg-6d6f46.svg` 20.78 × 17.81 · `icon-emailsvg-1a80b8.svg` 22.27 × 17.81 · `logo-g2png-c53a3f.webp` 64.33 × 64.33 · `star1svg-303d31.svg` 32.39 × 30.83 ×5 · `logo-harvardsvg-c5efb6.svg` 183.36 × 36.17 · `logo-nitrosvg-7a0f33.svg` 123.66 × 40.66 · `logo-earnestsvg-2634ab.svg` 93.77 × 37.64 · `logo-octopussvg-a91e19.svg` 207.84 × 28.45 · `logo-hifyresvg-64f8d6.svg` 145.97 × 37.30 · `sn-2png-f6c14a.webp` 366.94 × 394.16 (esg SOCIAL visual; note the alt differs from the homepage: `A screen showing an employee being recognised` vs `A screen of an employee being recognised`).

**No video, no `<canvas>`, no inline `<svg>`, no `srcset`, no `picture`, no CSS background images on any of the three pages.** Every image is a plain `<img>` with `object-fit: fill` (the default) and is constrained on exactly one axis.

### 6.3 Fonts

No new fonts. Rubik (400/500/600/700) + the headline serif, exactly as CLONE_SPEC §3.1. The `<em>` in the price card needs synthetic italic only.

---

# 7. Responsive summary (measured)

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| root font-size | 12px | 10.6667px | 8.25833px | 8.25833px |
| container gutter | 72px | 64px | 46.08px (`6vw`) | 23.4px (`6vw`) |
| content width | 1296px | 1152px | 675.84px | 343.2px |
| divider section height | 181.98 | 161.98 | 125.96 | 125.96 |
| pricing doc height | 3503 | 3115 | 2991 | 4023 |
| esg doc height | 7848 | 7043 | 5684 | 7840 |
| purpose doc height | 4317 | 3838 | 3103 | 5076 |
| price card | 604.81 × 274.39 | 537.61 × 244.34 | 416.22 × 190.08 | 330.33 × 182.75 |
| price-card avatar | 100.38 | 89.22 | 69.08 | 69.08 |
| serif sub-heading frame (`11ch`) | 255.27 | 226.94 | 175.67 | 219.23 (`text-[3.9em]`) |
| esg hero photo | 800 × 533.33 | 800 × 533.33 | 675.84 × 450.56 | 343.22 × 228.81 |
| esg 2-col gap (`6.91014em`) | 82.92 | 73.71 | 57.06 | n/a (`ml-0`, stacked) |
| SDG column | 259.20 | 230.41 | 135.16 | 308.89 (`w-[90%]`, stacked) |
| purpose hero wreath | 100.08 × 176.50 | 88.95 × 156.89 | 62.14 × 121.47 | hidden (phone pair shown instead) |
| purpose `bg-leaf` section | 545 | 484.81 | 400 | 783 (3 columns stacked) |

Breakpoint behaviour specific to these pages (on top of CLONE_SPEC §9):
- **≤991px (`max-wf-tablet`)**: pricing testimonial row gets `flex-wrap`; logo strip `w-[56em] max-w-full flex-wrap pl-0`; hero text frames `w-[80em]`.
- **≤767px (`max-wf-phone`)**: pricing price-card block becomes `flex-col`; pricing reassurance columns `w-full` + `mb-[4.6em]`; ESG 2-col rows become `flex-col items-center` with the right column `mt-[5em] ml-0` and the governance report image `mt-0`; SDG columns `w-[80%] mb-[5em]`; our-purpose hero flanking wreaths hide and the phone leaf pair appears; purpose Goals columns `w-full mb-[4.6em]`.
- **≤479px (`max-wf-mini`)**: price card `w-[40em] max-w-full`; price `text-[3.9em]`; serif sub-headings `text-[3.9em]`; hero `pt-[11.8em]`; SDG columns `w-[90%]`; blocks' `my` → `3.5em`; purpose intro paragraph `mx-0 mt-[1em] mb-[2em]`; hero frames `flex flex-col items-center w-auto`.

---

# 8. Build checklist for these three routes

1. **Do not render the announcement banner** on `/pricing`, `/esg`, `/our-purpose`.
2. Build `<PriceCard/>` with `bg-white` — it is the one sanctioned white content surface. Everything else stays flat cream / cream-dark / leaf + 2px black strokes.
3. Build `<TickBadge icon label/>`, `<IconFeatureColumn icon heading body/>`, `<SdgGoalColumn icon goal title body/>` as reusable components; `<SdgSection/>` and `<FinalCtaSection/>` are shared verbatim between `/esg` and `/our-purpose`.
4. Divider band colour is a **prop**, not a constant: `cream | cream-dark | leaf`, matching the section above.
5. `/our-purpose` section B is `bg-leaf` on both the `<section>` and the inner heading `<div>` — keep both (the inner one is what gives the heading band its own fill when the wrapper's negative margin overlaps the previous section).
6. The ESG hero photo stays `w-[800px] max-w-full mt-[40px]` in px.
7. Re-check the two flagged heading wrap points (§5) after the Gloock swap and adjust nothing but the frame width if they break.
8. 18 assets were added to `public/assets/`; `ASSET_MANIFEST.md` is owned by another agent and has **not** been touched — fold §6.1 into it when that agent next runs.
9. Correct the footer-link `mb-[1.2em]` value to 21.6px (§0.2) wherever the footer is implemented.
10. No gradients, no shadows, no hover states beyond `hover:underline`. Resist adding any.
