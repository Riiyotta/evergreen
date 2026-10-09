Source: https://www.evergreen.so/

# Evergreen — build spec, pages B: `/case-studies`, `/contact`, `/schedule-a-demo`, `/referral`

Companion to **`CLONE_SPEC.md`** (homepage). That file is the normative design system: the `.marketing-root`
em engine, the container contract, every colour token, all 25 typographic roles, buttons/cards/badges, and the
leaf-motion system. **This file records only what is new or different on these four routes.** Every reference
of the form "per §x.y" points into `CLONE_SPEC.md`.

Measured live 2026-10-09 with Playwright/Chromium at **1280 × 900** (primary), spot-checked at 768 and 390.
Markup transcribed from the server-rendered HTML of each route; component behaviour decoded from the real
Turbopack chunks (`043iauolx97i1.js` → `FormDone` / `FormError` / `Honeypot` / `LabelledField` /
`SubmitButton` / `useMarketingForm`; `2k9hxg-_me3an.js` → `ContactForm`; `1kx6far93rjjz.js` → `ReferralForm`;
`07am6sqndc0ei.js` → `CalendlyEmbed`).

Screenshots (all verified 1280-wide, full page):
`_reference/screenshots/cases-00-fullpage-1280.png`, `contact-00-fullpage-1280.png`,
`demo-00-fullpage-1280.png`, `referral-00-fullpage-1280.png`, plus
`demo-02-calendly-embed.png` (the live third-party embed, 492 × 631, captured as the reference for the
static placeholder specced in §D-3).

---

## 0. Things that are true on ALL FOUR pages (read this first)

### 0.1 ⚠️ There is NO announcement banner
The homepage's black `py-[10px]` announcement banner (§5.1) is **absent** on all four routes. The nav is the
first thing in `.marketing-root`:

| | homepage | these four pages |
|---|---|---|
| banner | y 0, h 52 | **not rendered** |
| nav | y 52, h 77 | **y 0, h 76.59** |
| `<main>` | y 129 | **y 77** |
| first section (`-mt-[3em]`) | y 96 | **y 45** |

So every y-offset in this file is 51px lower than the equivalent homepage offset. Build the banner as a
homepage-only component.

### 0.2 Shared chrome
- **Nav** — byte-identical to §5.2, including hrefs and the `Login` label. Height 76.59px at 1280.
- **Mobile nav / `SlideOverlay`** — identical to §5.3 + §7.6.
- **Footer** — identical to §5.13. Measured height **542.81px** on every one of the four pages.
- **Final-CTA section** ("Start feeling good about work") — byte-identical to homepage section H (§8 H) on
  `/case-studies`, `/contact`, `/schedule-a-demo`. Measured **1038.81–1039px** tall, `pt-[18em] pb-[5em]`,
  `bg-cream-dark`. **`/referral` does NOT have this section** — see §R-1.
- **Leaf divider band** — byte-identical to homepage section D/G (§7.2 `DIVIDER_LEAVES`, all 12, same
  coordinates, same `from`, same 1500 ms / `cubic-bezier(0.455, 0.03, 0.515, 0.955)`). Measured 161.98px tall.
- **G2 rating block** — byte-identical to §5.10. Measured **183.16px** tall, in a
  `my-[4.2em] … mb-0 max-wf-mini:mb-0` block whose inner has `mt-[7em]`.
- **Pricing-reassurance 3-icon row** — byte-identical to §8 H (icons `icon-usersvg-f5e0ab.svg`,
  `icon-supportsvg-bc4096.svg`, `icon-timesvg-4c8791.svg`; column widths `25em / 29em / 25em`).

### 0.3 The homepage negatives all still hold — verified
- **ZERO gradients.** `background-image: none` on every measured element on all four pages.
- **ZERO box-shadows.** `box-shadow: none` on every card, input, button, pill and logo measured.
- **ZERO hover states.** Grepping the server HTML of all four `<main>` elements returns **0 occurrences of
  `hover`**. Even the new "Read full case study" link is `no-underline` with no hover rule. The only hover on
  these pages is the shared nav/footer `hover:underline` (§7.4).
- **ZERO focus styles.** Grepping all four `<main>` elements returns **0 occurrences of `focus`**. The
  compiled stylesheet does ship `focus:` / `focus-visible:` utilities (`ring-primary-green`,
  `outline-primary-green`, …) but **none of them are applied to any element on these routes** — they are
  generated for the logged-in app. Confirmed by computed style on every form control:
  `outline: <currentcolor> none 3px`, `box-shadow: none`. **So the forms use the browser's default UA focus
  ring and nothing else.** Do not invent a focus ring. (This is an accessibility weakness of the original; if
  the project decides to add one, it is a deliberate deviation and must be flagged, not slipped in.)
- **No transitions** declared anywhere in `<main>` on these pages.

### 0.4 New shared container variant — ⚠️ breaks the homepage container rule
`/contact` and `/referral` give their **first** section wrapper **`px-0 max-wf-tablet:px-0`** instead of
`px-[6em] max-wf-tablet:px-[6vw]`:

```html
<!-- contact + referral, section 1 only -->
<div class="mx-auto -mt-[3em] w-full max-w-[1920px] px-0 max-wf-tablet:px-0">
```

Measured: inner width **1280px** (no gutter) at 1280, `padding: 0`. The content still *looks* gutter-ed
because every child is `mx-auto` with its own `w-[108em]` / `max-w-[Nch]` / `w-[50em]`. Reproduce the `px-0`
verbatim — if you leave `px-[6em]` on, the h1 and the hero paragraph will be 128px narrower and will re-wrap.
`/case-studies` and `/schedule-a-demo` keep the normal `px-[6em]` wrapper.

Every section wrapper still carries `-mt-[3em]` (−32px) — the overlap rule from §1 is intact everywhere.

### 0.5 New shared hero block (all four)
```html
<div class="pt-[10.2em] max-wf-mini:pt-[11.8em]">
  <div class="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full
              max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
    <h1 class="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">…</h1>
  </div>
</div>
```
Measured identically on all four at 1280: block **y 45, h 206.13**; h1 **y 153, w 1151.98, h 97.33**,
`65.333px / 600 / 97.3466px / normal / #000000` — i.e. the plain base `h1` rule (§3.2), one line on all four.
No avatar pills, no floating decoration. `max-w-[49ch]` computes to 1981.52px here (49ch measured in the
65.33px display face) so it never binds at 1280; it only bites below ~480px.

> **Serif substitution risk (Gloock @ `size-adjust: 92.44%` standing in for `ivypresto-headline`).**
> All four h1s are single-line at 1280 with comfortable slack, so they are safe. The one fragile heading is
> the `/referral` section-2 h2 (§R-3) — it wraps to exactly **2 lines inside a 749.86px frame** with little
> room; verify it does not spill to 3 lines after the font swap.

### 0.6 Measured `ch` constant (needed for the new `max-w-[Nch]` values)
Measured directly: `max-w-[60ch]` on a 18.667px Rubik paragraph = **711.079px** → **1ch = 11.85132px @1280**.
Therefore:

| class | px @1280 | used by |
|---|---|---|
| `max-w-[49ch]` | 580.71 | existing (§4.4) |
| `max-w-[59ch]` | **699.23** | `/case-studies` hero paragraph — **new** |
| `max-w-[60ch]` | **711.08** | `/contact`, `/schedule-a-demo`, `/referral` hero + footnote paragraphs — **new** |

Keep the `ch` unit (per §10.4); do not hard-code the px.

### 0.7 Document heights at 1280

| route | total document height | `<main>` height | footer y |
|---|---|---|---|
| `/case-studies` | **3253** | 2665.61 | 2710 |
| `/contact` | **3063** | 2475.67 | 2520 |
| `/schedule-a-demo` | **3130** | 2543.03 | 2588 |
| `/referral` | **4007** | 3331.56 | 3464 |

---

# PART C — `/case-studies`

`<title>` `Evergreen | Customer Success Stories`
`<link rel="canonical" href="https://www.evergreen.so/case-studies">`
meta description: `Discover the impact of employee recognition with our customer success stories. Read real-world examples of how Evergreen have helped to increase employee engagement, retention and productivity.`
Screenshot: `cases-00-fullpage-1280.png`.

## C-1. Section map (DOM order, 1280)

| # | Role | Element / wrapper | y | height | bg | vertical padding | inner max-width / gutter | columns |
|---|---|---|---|---|---|---|---|---|
| 0 | Nav | `div.relative.z-[999999998]…` | 0 | 76.59 | transparent (`#fffff3` shows) | `py-[1.7em]` = 18.13 | full-bleed, `px-[2.9em]` = 30.93 | logo \| links \| CTA |
| A | **Hero + case-study grid** | `section.relative.bg-cream` → `div.mx-auto.-mt-[3em].w-full.max-w-[1920px].px-[6em].max-wf-tablet:px-[6vw]` | **45** | **1516** | `#fffff3` | wrapper `-32px` top margin, no padding | 1920 / **64px** → content 1152 | stacked; grid is 2-col |
| B | Leaf divider band | `section.relative[aria-hidden]` (§0.2) | 1573 | 161.98 | transparent + `h-[15em]` cream bar + 2px black rule | — | inner `w-[120em]` = 1280 | 1 |
| C | **Final CTA** (identical to homepage §8 H) | `section.relative.bg-cream-dark` | 1703 | 1039 | `#edede2` | `pt-[18em] pb-[5em]` = 192 / 53.33 | 1920 / 64 | 3-col icon row, then centred stack |
| D | Footer (§5.13) | `section.relative.bg-cream` | 2710 | 542.81 | `#fffff3` | `py-[5em]` | 1920 / 64 | as §5.13 |

### C-1.1 Section A inner blocks

| idx | content | y | height | margin |
|---|---|---|---|---|
| 0 | hero `pt-[10.2em]` + h1 "Customer Success Stories" | 45 | 206.13 | 0 |
| 1 | sub-paragraph (`max-w-[59ch]`) | 296 | 32 | `44.8px 0` |
| 2 | case-study grid | 372 | 1189 | `44.8px 0` |

Block 1 markup: `div.my-[4.2em].text-center.max-wf-mini:my-[3.5em]` >
`p.mx-auto.max-w-[59ch].text-center` → body `p` per §3.3 (18.667 / 31.73 / 400 / `#000`), width 699.23px, one line.

## C-2. NEW component — **case-study card grid**

```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] flex justify-center max-wf-phone:flex-col">
  <div class="mt-[7em] mb-[-10em] flex w-[87em] flex-wrap justify-between gap-y-[14em] pb-[14em]
              max-wf-tablet:w-auto max-wf-tablet:flex-col max-wf-tablet:items-center max-wf-tablet:justify-center">
    … 4 × CaseStudyCard …
  </div>
</div>
```

Grid, measured @1280: **x 176, y 447, w 927.98** (`87em`), `margin-top 74.6666px` (`7em`),
`margin-bottom -106.667px` (`-10em`), `padding-bottom 149.333px` (`14em`), `row-gap 149.333px` (`14em`),
`column-gap: normal`, `justify-content: space-between`, `flex-wrap: wrap`. Two per row.

### C-2.1 CaseStudyCard

```html
<div class="relative flex w-[34.4013em] flex-col items-center max-wf-mini:w-auto">
  <span aria-hidden="true" class="pointer-events-none"> … 3 × CARD_LEAVES (§7.2) … </span>
  <div class="relative z-[100] flex h-full w-[42em] flex-col items-center rounded-[10px]
              border-2 border-black bg-white px-[3em] pt-[4.21943em] pb-[3.6875em] max-wf-mini:w-auto">
    <span class="flex justify-center"><img src="/assets/<logo>" alt="<Name> logo" class="h-[4.3em]"></span>
    <div class="my-[1.3em]">
      <h2 class="font-headline text-[4.5em] leading-[1.48] font-semibold text-black max-wf-mini:text-[3.9em]">Name</h2>
    </div>
    <div class="mb-[1.3em] flex font-semibold">
      <p class="text-center font-bold">25</p>
      <p class="ml-[0.3em] text-center font-bold">Employees</p>
    </div>
    <p class="mx-auto max-w-[49ch] text-center text-[1.5625em]">…blurb…</p>
    <div class="mt-[1.3em] max-wf-mini:min-h-[4.69em]">
      <a class="flex w-full justify-center no-underline" href="/customer-success-stories/<slug>">
        <p class="mt-[0.5em] text-[1.75em] font-semibold">Read full case study</p>
      </a>
    </div>
  </div>
</div>
```

⚠️ **The card is wider than its own flex item.** Outer item `w-[34.4013em]` = **366.94px**; the white card
inside is `w-[42em]` = **447.98px** and, because the item is `flex flex-col items-center`, it overhangs
**40.52px on each side**. This is intentional and must be reproduced — it is what makes the two columns sit
closer than `space-between` on 927.98px would otherwise produce.

| property | measured @1280 |
|---|---|
| card box | **447.98 × 475.09** (row 1) / **447.98 × 446.77** (row 2) — `h-full` equalises within a row |
| card x | **135.48** (col 1) / **696.53** (col 2) |
| outer item x | 176 / 737.05 |
| background | **`#ffffff`** — ⚠️ pure white, a **new surface colour for marketing pages**. The homepage's only white surfaces are the two `SlideOverlay` panels (§10.9). Token: `white` (§2). |
| border | **2px solid `#000000`** |
| border-radius | **10px** (`radius-card`, §2) |
| padding | **45.0072px 32px 39.3333px** (`pt-[4.21943em] px-[3em] pb-[3.6875em]`) |
| box-shadow | **none** |
| background-image | **none** |
| hover / active | **none** |

Row geometry inside the card (row 1 / first card, y relative to page):

| element | y | h | w | x | notes |
|---|---|---|---|---|---|
| logo `img.h-[4.3em]` | 494 | **45.86** | intrinsic-ratio | centred | `h-[4.3em]` = 45.87px, width auto, `object-fit: fill`, no crop |
| h2 | 553 | 71.03 | — | centred | wrapper `my-[1.3em]` = **13.8667px** |
| stat row | 638 | 31.73 | — | centred | wrapper `mb-[1.3em]` = 13.8667px |
| blurb `p` | 684 | 141.64 / 113.31 / 113.31 / 84.98 | 380.02 | — | `max-w-[49ch]` of a **16.667px** font → **518.473px**, so the 380.02px content box binds |
| link | 839 | 41.06 | 183.44 | centred | wrapper `mt-[1.3em]` = 13.8667px |

Logo rendered sizes (all `h-[4.3em]` = 45.86px tall, width from intrinsic ratio):

| card | file | intrinsic | rendered |
|---|---|---|---|
| Worklete | `workletesvg-eb3abc.svg` | 300 × 105 | **130.86 × 45.86** |
| Kent & White | `logo-kent-and-whitepng-139c7a.webp` | 625 × 142 | **201.84 × 45.86** |
| Wunderdog | `logo-wunderdogsvg-a66a50.svg` | 134 × 127 | **48.16 × 45.86** |
| Nitro Games | `logo-nitrosvg-4caa4a.svg` | 185 × 61 | **139.42 × 45.86** |

### C-2.2 Card leaves (motion)
Each card carries exactly the **`CARD_LEAVES` set from §7.2**, verbatim, unchanged:
```js
[ {top:'-6em',   left:'-5.1em', rotate:-54, z:11, from:[7,8],  duration:1300},
  {top:'-7.6em', left:'-0.6em', rotate:6,   z:11, from:[1,8],  duration:1500},
  {top:'-0.7em', left:'-5.6em', rotate:-80, z:13, from:[10,1], duration:1000} ]
```
Verified against the shipped SSR inline styles (`transform: translateX(7em) translateY(8em) rotate(-54deg)` etc.).
`class="marketing-drift-leaf"`, `whileInView { once:true, amount:0 }`, ease
`cubic-bezier(0.455, 0.03, 0.515, 0.955)`, **no delay, no stagger**. 4 cards × 3 = 12 card leaves; plus the
12 divider leaves = **24 `marketing-drift-leaf` elements on the page** (counted in the server HTML).
Leaves are positioned relative to the **outer `w-[34.4013em]` item**, not the white card.

## C-3. New typographic roles on this page

| Role | Selector | em | px @1280 | weight | line-height | letter-spacing | colour |
|---|---|---|---|---|---|---|---|
| **Card blurb** | `p.text-[1.5625em]` | 1.5625em | **16.667px** | 400 | 1.7 (inherited) → **28.333px** | normal | `#000000` |
| **Card stat figure + unit** | `p.font-bold` inside `div.mb-[1.3em].flex.font-semibold` | 1.75em (base `p`) | **18.667px** | **700** | 1.7 → 31.733px | normal | `#000000` |
| **"Read full case study"** | `p.mt-[0.5em].text-[1.75em].font-semibold` inside `a.no-underline` | 1.75em | **18.667px** | 600 | 1.7 → 31.733px | normal | `#000000`, **no underline, no hover** |

The card `h2` reuses the existing "Section display heading" role (§3.3): 48px / 600 / 71.04px / `#000000`,
`font-headline`.

## C-4. Verbatim copy

- h1: `Customer Success Stories`
- sub: `Real examples of Evergreen making a positive impact`
- Card link label (×4): `Read full case study`
- Stat unit (×4): `Employees`

| card | h2 | stat | blurb (verbatim — these are short functional strings, ≤190 chars) |
|---|---|---|---|
| 1 | `Worklete` | `25` | `One of the things Worklete loves about Evergreen is how easy it is to use. Implementing the app was very simple, and within just a few days, their entire team had embraced using Evergreen.` |
| 2 | `Kent & White` | `20` | `Kent & White is currently one of the fastest growing insurance brokerages in Atlantic Canada. However, fast growth comes with its own set of challenges.` |
| 3 | `Wunderdog` | `150` | `Wunderdog wanted to take their employee recognition program to virtual form. (It's called "Doggomedals" – And we love it as it's so unique.)` |
| 4 | `Nitro Games` | `40` | `Nitro Games have been one of the most active teams on Evergreen since the day they integrated Evergreen to their culture.` |

(Note card 3 uses a straight apostrophe `'` and straight double quotes `"` in the source, and an en-dash `–`.
Reproduce as-is.)

Alt text: `Worklete logo`, `Kent & White logo`, `Wunderdog logo`, `Nitro Games logo`.
Final-CTA copy: identical to §8 H.

## C-5. Links

| href | kind | note |
|---|---|---|
| `/customer-success-stories/worklete` | internal | card 1 |
| `/customer-success-stories/kent-white` | internal | card 2 |
| `/customer-success-stories/wunderdog` | internal | card 3 |
| `/customer-success-stories/nitro-games` | internal | card 4 |
| `https://app.evergreen.so/api/slack/install` | **external — keep inert** | CTA section |
| `https://app.evergreen.so/api/teams/install` | **external — keep inert** | CTA section |

The four `/customer-success-stories/*` routes are **not in scope** for this build; render the links as real
internal `<a href>`s pointing at them (they will 404 in the clone unless someone builds them later).

## C-6. Responsive (measured)

| | 1280 | 768 | 390 |
|---|---|---|---|
| root font-size | 10.6667px | 8.25833px | 8.25833px |
| doc height | **3253** | **3456** | — |
| h1 | 65.33px | **50.58px** | 32.21px (`max-wf-mini:text-[3.9em]`) |
| hero `p` | 18.667px, w 699.23 | 14.45px, w **541.47** (59ch) | 14.45px |
| grid | `w-[87em]` 927.98, 2 cols, row-gap 149.33 | **`flex-col items-center justify-center`, w 284.09**, row-gap **115.617px**, pb 115.617, mb −82.58 | same, card `w-auto` |
| card | 447.98 × 475.09 | **346.84 × 368.73** (`42em` @8.25833 root), x 210.58 (still overhangs the 284.09 item by 31.4 each side) | `max-wf-mini:w-auto` → card fills the item |
| card y (1/2/3/4) | 447 / 447 / 1071 / 1071 | **364 / 848 / 1311 / 1773** | — |
| horizontal overflow | none | none (`main` is `overflow-hidden`) | none |

At 1440 everything scales linearly (root 12px, gutter 72px) per §4.1 — no new breakpoint behaviour.

---

# PART T — `/contact`

`<title>` `Evergreen | Contact`
`<link rel="canonical" href="https://www.evergreen.so/contact">`
meta description: `Get in touch with our team at Evergreen to learn more about our employee recognition solution. Contact us today and start boosting morale, productivity, and retention in your organization!`
Screenshot: `contact-00-fullpage-1280.png`.

## T-1. Section map (DOM order, 1280)

| # | Role | Element / wrapper | y | height | bg | vertical padding | inner width / gutter | columns |
|---|---|---|---|---|---|---|---|---|
| 0 | Nav | — | 0 | 76.59 | — | `py-[1.7em]` | `px-[2.9em]` | — |
| A | **Hero + contact form + G2** | `section.relative.bg-cream` → `div.mx-auto.-mt-[3em].w-full.max-w-[1920px].px-0.max-wf-tablet:px-0` | **45** | **1370.83** | `#fffff3` | wrapper `-32px` margin, **padding 0** ⚠️§0.4 | **1280 (no gutter)** | 1 col, centred |
| B | Leaf divider band (§0.2) | `section.relative[aria-hidden]` | 1383 | 161.98 | transparent | — | `w-[120em]` = 1280 | 1 |
| C | **Final CTA** (= homepage §8 H) | `section.relative.bg-cream-dark` | 1513 | 1038.81 | `#edede2` | `pt-[18em] pb-[5em]` = 192 / 53.33 | 1920 / **64** | 3-col icon row + stack |
| D | Footer (§5.13) | `section.relative.bg-cream` | 2520 | 542.81 | `#fffff3` | `py-[5em]` | 1920 / 64 | as §5.13 |

### T-1.1 Section A inner blocks

| idx | content | y | height | margin-block |
|---|---|---|---|---|
| 0 | `pt-[10.2em]` + h1 "Contact us" | 45 | 206.13 | 0 |
| 1 | intro paragraph (`max-w-[60ch]`, 2 lines) | 296 | 63.47 | 44.8 / 44.8 |
| 2 | form card block (`flex justify-center max-wf-phone:flex-col`) | 404 | 753.83 | 44.8 / 44.8 |
| 3 | G2 block (`mb-0 max-wf-mini:mb-0`) | 1232 | 183.16 | 44.8 / 0 |

## T-2. NEW component — **white form card** (shared with `/referral` and `/schedule-a-demo`)

```html
<div class="relative mx-auto mt-[7.6em] flex w-[50em] flex-col items-center max-wf-mini:w-[90%]">
  <span aria-hidden="true" class="pointer-events-none"> … 3 × CARD_LEAVES (§7.2) … </span>
  <div class="relative z-[100] min-h-[25em] w-full rounded-[10px] border-2 border-black bg-white
              px-[4em] pt-[4.21943em] pb-[3em] max-wf-mini:px-[2em]">
    <ContactForm/>
  </div>
</div>
```

| property | measured @1280 |
|---|---|
| wrapper | `w-[50em]` = **533.33px**, `margin-top 81.0666px` (`7.6em`), x **373.34**, `mx-auto` |
| card box | **533.33 × 672.77**, y **485** |
| background | **`#ffffff`** (same new white surface as the case-study card) |
| border | **2px solid `#000000`** · radius **10px** |
| padding | **45.0072px 42.6666px 32px 42.6666px** (`pt-[4.21943em] px-[4em] pb-[3em]`) |
| min-height | **266.667px** (`25em`) |
| box-shadow / background-image | **none / none** |
| z-index | 100 (sits above the leaves) |

Variant table across the three pages that use it:

| page | wrapper width | `max-wf-mini` width | card padding | card box @1280 |
|---|---|---|---|---|
| `/contact` | `w-[50em]` = 533.33 | `w-[90%]` | `px-[4em] pt-[4.21943em] pb-[3em] max-wf-mini:px-[2em]` | 533.33 × **672.77** |
| `/referral` | `w-[50em]` = 533.33 | `w-[90%]` | identical | 533.33 × **1053.48** |
| `/schedule-a-demo` | `w-[50.4013em]` = **537.61** | `w-[40em]` = 330.33 | **`p-[2em]` = 21.3333 all round**, `max-wf-mini:px-[1em]` | 537.61 × **676.66** |

Card leaves: the **exact `CARD_LEAVES` set from §7.2** (same 3 entries, same `from`, same 1300/1500/1000 ms,
same easing), positioned relative to the `w-[50em]` wrapper.

## T-3. FORM — `ContactForm`

Server action: `submitContactRequest` (`createServerReference` id `4092416713f8c685e7ef7b93d5e77114a9073106ee`).
**No public endpoint — stub the submit.**

```html
<form class="mb-[15px] flex flex-col">                 <!-- measured 444.02 × 576.78 at x 418, y 532 -->
  <!-- honeypot, identical to §5.12 -->
  <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"
         class="absolute -left-[9999px] size-px opacity-0">
  … 4 × LabelledField …
  <button type="submit" class="mt-[0.5em] self-center rounded-[30px] bg-black px-[1.4em] py-[9px]
          text-[1.75em] leading-[1.7] font-bold text-white disabled:opacity-70">Contact us</button>
</form>
```

### T-3.1 `LabelledField` — the new shared form control
Source (verbatim from the chunk):
```js
const base = "mb-[1.6em] block w-full rounded-[7px] border-[1.5px] border-black px-[0.9em] " +
             "text-[1.75em] leading-[1.7] text-black placeholder:text-[#999]";
<label htmlFor={name} className="mb-[0.5em] block text-left text-[1.75em] leading-[1.7] font-bold">{label}</label>
{textarea ? <textarea id name required maxLength={5000} placeholder className={`${base} h-[3.54em]`}/>
          : <input    id name type required maxLength={256}  placeholder className={`${base} h-[3em]`}/>}
```

Measured geometry @1280 (identical for every field on both `/contact` and `/referral`):

| | label | input | textarea |
|---|---|---|---|
| box | 444.02 × **31.73** | 444.02 × **55.98** | 444.02 × **66.08** |
| font-size / line-height / weight | **18.667px / 31.733px / 700** | 18.667 / 31.733 / 400 | 18.667 / 31.733 / 400 |
| colour | ⚠️ **`#333333`** (inherits `.marketing-root`; a `<label>` is **not** covered by the `p { color:#000 }` rule) | text `#000000` | text `#000000` |
| placeholder colour | — | **`#999999`** (`placeholder:text-[#999]`) ⚠️ not the homepage's `rgba(0,0,0,0.6)` | **`#999999`** |
| text-align | **left** (`text-left`) | left | left |
| padding | 0 | **`0 16.8px`** (`px-[0.9em]`, em = 18.667) | `0 16.8px` |
| border | none | **declared `border-[1.5px] solid #000`** (Chromium reports `1px` in computed style at dpr 1; keep the `1.5px` declaration) ⚠️ the homepage newsletter input is `border-2` | same |
| border-radius | — | **7px** all round (`rounded-[7px]`) ⚠️ homepage newsletter input is `rounded-l-[7px]` only | 7px |
| background | transparent | **transparent** (`rgba(0,0,0,0)`) — the card's white shows through | transparent |
| margin-bottom | **9.33333px** (`mb-[0.5em]`, em = 18.667) | **29.8667px** (`mb-[1.6em]`, em = 18.667) | 29.8667px |
| height source | content | `h-[3em]` → 3 × 18.667 = **56px** (§10.5 gotcha applies) | `h-[3.54em]` → 3.54 × 18.667 = **66.08px** |
| resize | — | — | **`vertical`** (UA default; not overridden) |
| box-shadow / outline | none / UA default | none / UA default | none / UA default |
| box-sizing | border-box | border-box | border-box |

⚠️ **Em-cascade gotcha:** `mb-[1.6em]`, `mb-[0.5em]`, `px-[0.9em]`, `h-[3em]` and `h-[3.54em]` all resolve
against the element's **own** `text-[1.75em]` = 18.667px, **not** the 10.6667px root. Keep `text-[1.75em]` on
the same element as the spacing classes.

### T-3.2 Field inventory — `/contact`

| # | label text | `for`/`id`/`name` | tag | type | required | maxlength | placeholder | y @1280 (label / control) |
|---|---|---|---|---|---|---|---|---|
| 0 | — (honeypot) | `website` | input | text | no | — | — | off-screen at x −9623.66, 1 × 1, `opacity 0`, `tabindex="-1"`, `aria-hidden="true"`, `autocomplete="off"` |
| 1 | `Name` | `name` | input | `text` | **yes** | 256 | `Full Name` | 532 / **573** |
| 2 | `Email` | `email` | input | `email` | **yes** | 256 | `Email Address` | 659 / **700** |
| 3 | `Company` | `company` | input | `text` | **yes** | 256 | `Company` | 786 / **827** |
| 4 | `Message` | `message` | **textarea** | — | **yes** | 5000 | `Example Text` | 913 / **954** |

### T-3.3 `SubmitButton`
```html
<button type="submit" disabled={pending}
        class="mt-[0.5em] self-center rounded-[30px] bg-black px-[1.4em] py-[9px]
               text-[1.75em] leading-[1.7] font-bold text-white disabled:opacity-70">
  {pending ? "Please wait..." : children}
</button>
```
`/contact` label: **`Contact us`**. Measured **154.33 × 49.73**, y 1059, x 562.84 (centred by `self-center`).
`border-radius 30px`, `border: none`, `padding 9px 26.1333px`, `background #000000`,
label 18.667 / 31.733 / **700** / `#ffffff`, `margin-top 9.33333px`, `box-shadow none`, **no hover/active**.
This is the `SubmitButton` already catalogued in §5.4 — now actually in use.

### T-3.4 Form state machine (`useMarketingForm` — decoded source)
```js
function useMarketingForm(action, { successMessage }) {
  const [state, setState]   = useState('idle');          // 'idle' | 'done' | { error: string }
  const [pending, start]    = useTransition();
  return { state, pending, successMessage, onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    start(async () => {
      const res = await action(data);
      res.ok ? (setState('done'), form.reset()) : setState({ error: res.reason });
    });
  }};
}
```

| state | what renders | exact markup / copy |
|---|---|---|
| **idle** | the `<form>` as specced above | — |
| **focus** | **nothing changes.** No `focus:` class anywhere. Browser UA focus ring only (§0.3). |
| **pending** | the same form; `<button disabled>` → `opacity: 0.70`; label text swaps to **`Please wait...`** (literal, three dots, not an ellipsis) | `<button type="submit" disabled class="… disabled:opacity-70">Please wait...</button>` |
| **done** | the **whole form is unmounted** and replaced by `FormDone` | `<div role="status" class="rounded-[10px] border-2 border-black bg-leaf p-[20px] text-center"><p class="text-black">Thank you! We’ll be in touch</p></div>` |
| **error** | the form **stays mounted** (values preserved) and `FormError` is appended **after** it | `<div role="alert" class="mt-[1.4em] rounded-[10px] border border-black p-[10px]"><p class="text-black">{reason}</p></div>` |

- `FormDone`: radius 10px, **`border-2`** (2px solid `#000`), **`bg-leaf` `#beedc0`**, `padding 20px` (literal
  px, not em), `text-center`, inner `<p>` = body `p` role (18.667 / 31.73 / 400) forced to `#000`.
  Success copy **`Thank you! We’ll be in touch`** — note the **curly apostrophe `’`** in the rendered JSX
  (the `successMessage` option string uses a straight `'`; the rendered child uses `’`. Render the curly one).
- `FormError`: `mt-[1.4em]` (= 14.93px at root em — this one *is* root-relative, the div has no `text-[…]`),
  radius 10px, **`border`** = **1px solid `#000`** (thinner than everything else — the single 1px border in the
  system, per §2), `padding 10px`, no background, inner `<p>` black.
- The error string is **server-supplied** (`res.reason`) and is **not present in any client bundle** — it
  cannot be measured. For the stub, use a neutral sentence of similar length, e.g.
  `Something went wrong. Please try again.`, and note in code that the real copy is unknown.
- `form.reset()` is called on success (before unmount) — keep it so the stub behaves identically if the done
  panel is dismissed.
- Validation is **native HTML only** (`required`, `type="email"`, `maxlength`). There is **no custom
  client-side validation, no inline per-field error message, no `aria-invalid`, no `aria-describedby`**.
  The browser's own validation bubble is the entire field-level error UX.

### T-3.5 Stub guidance
Wire the submit to a local promise: set `pending` for ~900 ms, then resolve to `done`. Expose a way to
exercise the error branch (e.g. a dev-only query flag) so the `FormError` markup is reachable and testable.
Do **not** POST anywhere.

## T-4. Third-party embeds
**None on `/contact`.** (The brief flagged this route as a possible scheduler/chat host — it is not. The only
scheduler is on `/schedule-a-demo`, §D-3.) No chat widget, no iframe, no third-party script in `<main>`.

## T-5. New typographic roles on this page

| Role | Selector | em | px @1280 | weight | line-height | letter-spacing | colour |
|---|---|---|---|---|---|---|---|
| **Form field label** | `label.text-[1.75em].leading-[1.7].font-bold.text-left` | 1.75em | **18.667px** | **700** | 1.7 → **31.733px** | normal | ⚠️ **`#333333`** |
| **Form input text** | `input/textarea.text-[1.75em].leading-[1.7].text-black` | 1.75em | 18.667px | 400 | 31.733px | normal | `#000000` |
| **Form placeholder** | `placeholder:text-[#999]` | 1.75em | 18.667px | 400 | 31.733px | normal | ⚠️ **`#999999`** |
| **Inline body link** | `a` inside a `p` (base `.marketing-root a` rule, §3.2) | 1em of 1.75em | 18.667px | **600** | **1** → 18.667px | normal | `#000000`, **underlined** |

The last one matters here: the intro paragraph's three links take the bare base `a` rule — 600 weight and
`text-decoration: underline`, with `line-height: 1` (so they sit tighter than the surrounding 1.7 text).
Measured on the `teemu@evergreen.so` link: `18.6667px | 600 | 18.6667px | normal | rgb(0,0,0)`, `underline`.

## T-6. Verbatim copy

- h1: `Contact us`
- Intro paragraph (`p.mx-auto.max-w-[60ch].text-center`), with inline links and one `<br/>`:
  > Or send us a message via the form directly to [teemu@evergreen.so](mailto:teemu@evergreen.so?subject=Email%20from%20website)`<br/>`You might also like to [schedule a demo](/schedule-a-demo) or visit our [help center](https://folksoft.notion.site/Help-Center-defd1351f1a64b6fabe5040f1c2697a5?pvs=4)`<br/>`

  Exact text nodes, in order:
  `Or send us a message via the form directly to ` · link `teemu@evergreen.so` · `<br/>` ·
  `You might also like to ` · link `schedule a demo` · ` or visit our ` · link `help center` · `<br/>`
  (the trailing `<br/>` is real and contributes to the 63.47px block height — two lines).
- Labels: `Name` · `Email` · `Company` · `Message`
- Placeholders: `Full Name` · `Email Address` · `Company` · `Example Text`
- Submit: `Contact us` (pending `Please wait...`)
- Success: `Thank you! We’ll be in touch`
- G2 caption: `4.8 / 5 on G2 Reviews`; alt `G2 logo`
- Final CTA: identical to §8 H.

## T-7. Links

| href | kind |
|---|---|
| `mailto:teemu@evergreen.so?subject=Email%20from%20website` | mailto — **keep inert** (external scheme) |
| `/schedule-a-demo` | internal |
| `https://folksoft.notion.site/Help-Center-defd1351f1a64b6fabe5040f1c2697a5?pvs=4` | **external — keep inert**; has `target="_blank" rel="noreferrer"` |
| `https://app.evergreen.so/api/slack/install` | **external — keep inert** |
| `https://app.evergreen.so/api/teams/install` | **external — keep inert** |

## T-8. Motion
- 3 × `CARD_LEAVES` on the form card (§7.2, verbatim).
- 12 × `DIVIDER_LEAVES` in the divider band (§7.2, verbatim).
- **15 `marketing-drift-leaf` elements total** (counted in the server HTML). No scroll-tracked leaves, no
  recognition lines, no hearts, no `useScroll`/`useSpring` on this page.
- Nothing else animates. Reduced-motion block per §7 applies unchanged.

---

# PART D — `/schedule-a-demo`

`<title>` `Evergreen | Schedule a Demo`
`<link rel="canonical" href="https://www.evergreen.so/schedule-a-demo">`
meta description: `Book you demo for our employee recognition software and make a positive impact on both your employees and the environment.` *(sic — "Book you demo" is a typo in the original; reproduce verbatim.)*
Screenshots: `demo-00-fullpage-1280.png`, `demo-02-calendly-embed.png`.

## D-1. Section map (DOM order, 1280)

| # | Role | Element / wrapper | y | height | bg | vertical padding | inner width / gutter |
|---|---|---|---|---|---|---|---|
| 0 | Nav | — | 0 | 76.59 | — | `py-[1.7em]` | `px-[2.9em]` |
| A | **Hero + scheduler embed + G2** | `section.relative.bg-cream` → standard wrapper **`px-[6em] max-wf-tablet:px-[6vw]`** (normal gutter here) | **45** | **1438.19** | `#fffff3` | `-32px` margin, no padding | 1920 / **64** → content 1152 |
| B | Leaf divider band (§0.2) | `section.relative[aria-hidden]` | 1451 | 161.98 | transparent | — | `w-[120em]` = 1280 |
| C | **Final CTA** (= homepage §8 H) | `section.relative.bg-cream-dark` | 1581 | 1038.81 | `#edede2` | `pt-[18em] pb-[5em]` | 1920 / 64 |
| D | Footer (§5.13) | `section.relative.bg-cream` | 2588 | 542.81 | `#fffff3` | `py-[5em]` | 1920 / 64 |

### D-1.1 Section A inner blocks

| idx | content | y | height | margin-block |
|---|---|---|---|---|
| 0 | `pt-[10.2em]` + h1 "Pick a time for a free demo" | 45 | 206.13 | 0 |
| 1 | intro paragraph (`max-w-[60ch]`, 4 lines incl. a blank line) | 296 | 126.94 | 44.8 / 44.8 |
| 2 | scheduler card block | 467 | 757.72 | 44.8 / 44.8 |
| 3 | G2 block (`mb-0`) | 1300 | 183.16 | 44.8 / 0 |

## D-2. Scheduler card
Same white form card as §T-2, with the demo-page variant values:

```html
<div class="relative mx-auto mt-[7.6em] flex w-[50.4013em] flex-col items-center max-wf-mini:w-[40em]">
  <span aria-hidden="true" class="pointer-events-none"> … 3 × CARD_LEAVES (§7.2) … </span>
  <div class="relative z-[100] min-h-[25em] w-full rounded-[10px] border-2 border-black bg-white
              p-[2em] max-wf-mini:px-[1em]">
    <SchedulerPlaceholder/>   <!-- was <CalendlyEmbed/> -->
  </div>
</div>
```

| property | measured @1280 |
|---|---|
| wrapper | `w-[50.4013em]` = **537.61px**, x **371.2**, `margin-top 81.0666px` |
| card box | **537.61 × 676.66**, y **548** |
| padding | **21.3333px all round** (`p-[2em]`) |
| background / border / radius | `#ffffff` / 2px solid `#000` / **10px** |
| min-height | 266.667px (`25em`) |
| box-shadow / background-image | none / none |

## D-3. ⚠️ Third-party embed — **Calendly** (replace with a static placeholder)

### What the original actually does
```jsx
// chunk 07am6sqndc0ei.js → "CalendlyEmbed"
<>
  <div className="calendly-inline-widget h-[630px] min-w-[320px] w-full [&>iframe]:h-full"
       data-url="https://calendly.com/joinevergreenapp/evergreen-demo?hide_event_type_details=1&hide_gdpr_banner=1&text_color=0b2f04&primary_color=34b11e" />
  <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
</>
```
The Calendly `widget.js` then injects, inside that div:
```html
<div class="calendly-spinner"><div class="calendly-bounce1"></div><div class="calendly-bounce2"></div><div class="calendly-bounce3"></div></div>
<iframe src="https://calendly.com/joinevergreenapp/evergreen-demo?embed_domain=www.evergreen.so&embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1&text_color=0b2f04&primary_color=34b11e"
        width="100%" height="100%" frameborder="0" title="Select a Date &amp; Time - Calendly"></iframe>
```

### Measured embed geometry

| | 1280 | 390 |
|---|---|---|
| container box | **490.95 × 630** at x 394.53, y 572 | **320 × 630** at x 40.08 |
| computed | `height: 630px` (literal px, **not** em — it does not scale with the root), `min-width: 320px`, `width: 100%`, `position: relative`, `overflow: visible` | `width` clamped by `min-width: 320px` |
| iframe | fills it exactly: 490.95 × 630, `border: 0`, `display: block`, `[&>iframe]:h-full` | 320 × 630 |

**Reflow:** the box is fluid in width (`w-full` inside the card's content box) and **fixed at 630px tall at
every viewport**. At 390 the card content box is only **309.81px** wide (330.33 card − 4px borders − 16.52px
`px-[1em]`), so `min-w-[320px]` makes the embed **overhang the card's right edge by ≈10.2px**. The page does
not scroll horizontally because `<main>` is `overflow-hidden`. Reproduce this overhang — it is the original's
real behaviour.

### 🚩 THIS CLONE DOES NOT LOAD CALENDLY
Per the project rule that all external-domain requests are stripped, **do not** add
`assets.calendly.com/assets/external/widget.js`, and **do not** render a `calendly.com` iframe.
Build a **static, non-functional placeholder that occupies the identical box**:

```html
<div class="calendly-inline-widget h-[630px] min-w-[320px] w-full"
     role="img" aria-label="Calendly scheduling widget (placeholder)">
  … static markup below …
</div>
```
Hard requirements: `height: 630px` exactly, `min-width: 320px`, `width: 100%`, no border, no shadow, no
gradient, white background (it sits on the white card).

**What the real widget looks like** (from `demo-02-calendly-embed.png`, 492 × 631, so ≈1:1 with the measured
box). Reproduce this as flat static markup — it is Calendly's own design language, not Evergreen's, so it
intentionally uses a different type scale and the two brand colours passed in the URL:

- Palette, taken from the embed URL parameters (authoritative): text `#0b2f04` (`text_color`), accent
  `#34b11e` (`primary_color`). Surface: `#ffffff`.
- Vertical order inside the 630px box:
  1. Heading **`Select a Day`** — centred, bold, ≈22px, `#0b2f04`, baseline ≈41px from the top.
  2. Month nav row at ≈113px: left chevron `‹`, centred bold label **`October 2026`** in `#1a7a1a`-ish green,
     right chevron `›` in the accent green. (Use a fixed month — the clone has no calendar logic.)
  3. Weekday header row at ≈157px: `Mon Tue Wed Thu Fri Sat Sun`, 7 equal columns, small (~12px) grey-green.
  4. 5 date rows at ≈190 / 238 / 286 / 334 / 382px, 7 columns, numerals ~15px.
     - Unavailable dates: plain `#0b2f04` numeral on white.
     - Available dates: numeral in accent green inside a **filled light-green circle** (≈36px diameter,
       `border-radius: 9999px`, fill ≈`#e8f7e4`). In the reference capture the available days are
       12–16, 19–23 and 26–30 (weekdays only).
     - "Today" (the 9th) carries a tiny accent dot centred ~8px below the numeral.
  5. **`Time zone`** label at ≈436px, bold, small, `#0b2f04`, left-aligned.
  6. Timezone row at ≈463px: a small globe glyph + `India Standard Time (3:32pm)` + a caret `▾`.
     ⚠️ That string is **locale- and clock-dependent** — it was captured from the measuring machine, it is not
     site content. Use a neutral fixed string in the clone (e.g. `Coordinated Universal Time`) or omit the
     parenthetical time.
  7. ~150px of empty white below.

State this in a code comment: *"Static placeholder standing in for the live Calendly inline widget
(`calendly.com/joinevergreenapp/evergreen-demo`). The real embed is not loaded because this clone strips all
external-domain requests. Box geometry (630px tall, min-width 320px, w-full) matches the measured original."*

No other third-party embeds, scripts or iframes exist on this route.

## D-4. Verbatim copy

- h1: `Pick a time for a free demo`
- Intro paragraph (`p.mx-auto.max-w-[60ch].text-center`), exact nodes:
  `A short walk-through of Evergreen, and time to ask any questions you have.` · `<br/>` · `<br/>` ·
  `If you can't find a suitable time please email ` · link `teemu@evergreen.so` ·
  ` with your preferred time, and we'll make it happen.`
  (Straight apostrophes in the source; the double `<br/>` makes the 126.94px block height — 4 line-boxes.)
- G2 caption: `4.8 / 5 on G2 Reviews`
- Final CTA: identical to §8 H.

## D-5. Links

| href | kind |
|---|---|
| `mailto:teemu@evergreen.so?subject=Email%20from%20website` | mailto — **keep inert** |
| `https://app.evergreen.so/api/slack/install` | **external — keep inert** |
| `https://app.evergreen.so/api/teams/install` | **external — keep inert** |
| `https://calendly.com/joinevergreenapp/evergreen-demo?…` | **external — NOT rendered**, replaced by the placeholder (§D-3) |
| `https://assets.calendly.com/assets/external/widget.js` | **external script — NOT loaded** |

## D-6. Motion
3 × `CARD_LEAVES` + 12 × `DIVIDER_LEAVES` = **15 `marketing-drift-leaf` elements**, all §7.2 verbatim.
No scroll-tracking, no lines, no hearts. The Calendly spinner animation is third-party and is **not**
reproduced (the placeholder is static).

## D-7. Responsive (measured at 390)

| | 1280 | 390 |
|---|---|---|
| root font-size | 10.6667px | 8.25833px |
| doc height | 3130 | **3510** |
| section A inner padding | `0 64px` | `0 23.4px` (`6vw`) |
| h1 | 65.333 / 97.347 | **32.2075 / 47.9892** (`max-wf-mini:text-[3.9em]`) |
| intro `p` | 18.667px, w 711.08 (60ch) | 14.4521px, w 343.22 (`max-w-[60ch]` = 550.648 does not bind) |
| card wrapper | `w-[50.4013em]` 537.61 | **`w-[40em]` 330.33** |
| card padding | 21.3333 all round | **16.5167 / 8.25833** (`p-[2em]` → 16.52 vertical, `max-wf-mini:px-[1em]` → 8.26 horizontal) |
| embed | 490.95 × 630 | **320 × 630**, overhangs card right edge by ≈10.2px |
| horizontal page overflow | none | none |

---

# PART R — `/referral`

`<title>` `Evergreen | Referral Program`
`<link rel="canonical" href="https://www.evergreen.so/referral">`
meta description: `Join our referral program and help your friends boost their team's morale while planting trees with our employee recognition software. Learn more about Evergreen!`
Screenshot: `referral-00-fullpage-1280.png`.

## R-1. Section map (DOM order, 1280) — ⚠️ different section recipe

| # | Role | Element / wrapper | y | height | bg | vertical padding | inner width / gutter |
|---|---|---|---|---|---|---|---|
| 0 | Nav | — | 0 | 76.59 | — | `py-[1.7em]` | `px-[2.9em]` |
| A | **Hero + referral form + footnote** | `section.relative.bg-cream` → `div…px-0 max-wf-tablet:px-0` ⚠️§0.4 | **45** | **1633.73** | `#fffff3` | `-32px` margin, **padding 0** | **1280 (no gutter)** |
| B | **Earnings tiers** | `section.relative.bg-cream` → `div…px-[6em] max-wf-tablet:px-[6vw] pb-[5em]` | **1691** | **526.03** | `#fffff3` | **`padding: 0 64px 53.3333px`** — ⚠️ **no top padding**, only `pb-[5em]` | 1920 / 64 → content 1152 |
| C | Leaf divider band (§0.2) | `section.relative[aria-hidden]` | 2185 | 161.98 | transparent | — | `w-[120em]` = 1280 |
| D | **Testimonials + logo strip + G2** | `section.relative.bg-cream-dark` → `div…px-[6em] max-wf-tablet:px-[6vw] pt-[15em] pb-[10em]` | **2315** | **1180.84** | `#edede2` | ⚠️ **`pt-[15em] pb-[10em]` = 160px / 106.667px** — a **new** padding pair (homepage dark sections are `18em / 5em`) | 1920 / 64 |
| E | Footer (§5.13) | `section.relative.bg-cream` | **3464** | 542.81 | `#fffff3` | `py-[5em]` | 1920 / 64 |

⚠️ **There is NO "Start feeling good about work" final-CTA section on `/referral`**, and no 3-icon pricing
reassurance row. The page ends on social proof. It is the only one of the four that breaks that pattern.
⚠️ Two consecutive `bg-cream` sections (A then B) sit flush with no divider — the `-mt-[3em]` overlap still
applies, so there is no seam.

### R-1.1 Block tables

**Section A**

| idx | content | y | height | margin-block |
|---|---|---|---|---|
| 0 | `pt-[10.2em]` + h1 "Evergreen referral program" | 45 | 206.13 | 0 |
| 1 | intro paragraph (`max-w-[60ch]`, 3 lines) | 296 | 95.2 | 44.8 / 44.8 |
| 2 | referral form card | 436 | 1134.55 | 44.8 / 44.8 |
| 3 | footnote paragraph (`max-w-[60ch]`, 2 lines) | 1615 | 63.47 | 44.8 / 44.8 |

**Section B**

| idx | content | y | height | margin |
|---|---|---|---|---|
| 0 | h2 block (`mt-0`, `flex justify-center max-wf-phone:flex-col`) | 1691 | 220.98 | `0 / 44.8` |
| 1 | 4 earnings-tier pills (`mt-[6.5em] flex justify-around`) | 1981 | 137.59 | `69.3333 / 44.8` |

**Section D** (measured with all lazy images resolved)

| idx | content | y | height | margin-top |
|---|---|---|---|---|
| 0 | 2 testimonial cards + avatars + company logos | 2632 | 376.36 | 44.8 |
| 1 | 6-logo customer strip (`mt-[7.7em] … pl-[3em]`) | 3091 | 40.66 | 82.1333 |
| 2 | G2 block (`mb-0`) | 3206 | 183.16 | 44.8 |

## R-2. FORM — `ReferralForm` (the biggest form in the build)

Card: the shared white form card, `/referral` variant (§T-2) — wrapper `w-[50em]` = **533.33px**,
`mt-[7.6em]` = 81.0666px, x 373.34, card box **533.33 × 1053.48** at y **517**,
padding `45.0072px 42.6666px 32px 42.6666px`, white, 2px black border, radius 10px, no shadow.
3 × `CARD_LEAVES` (§7.2) behind it.

Server action: `submitReferral` (`createServerReference` id `40f6f299307542e23cfe27de4d8e27a8fd86f667a1`).
**No public endpoint — stub the submit.**

Form element: `form.mb-[15px].flex.flex-col`, measured **444.02 × 957.5** at x 418, y 564.

### R-2.1 Field inventory
All fields are `LabelledField`s with the exact geometry and computed type given in §T-3.1 — labels
18.667/31.733/**700**/**`#333333`**/left, controls 18.667/31.733/400/`#000`, placeholder **`#999999`**,
`rounded-[7px]`, `border-[1.5px] border-black`, `px-[0.9em]` = 16.8px, `mb-[1.6em]` = 29.8667px,
inputs `h-[3em]` = **55.98px**, textarea `h-[3.54em]` = **66.08px**, `resize: vertical`, transparent
background, no shadow, no custom focus ring.

| # | label text (verbatim) | `id`/`name` | tag | type | required | maxlength | placeholder (verbatim) | y: label / control |
|---|---|---|---|---|---|---|---|---|
| 0 | — (honeypot) | `website` | input | text | no | — | — | off-screen, 1 × 1, `tabindex="-1"` `aria-hidden="true"` `autocomplete="off"` |
| 1 | `Your Name *` | `referrerName` | input | `text` | **yes** | 256 | `Your Full Name` | 564 / **605** |
| 2 | `Your Email *` | `referrerEmail` | input | `email` | **yes** | 256 | `Your Email Address` | 691 / **732** |
| 3 | `Your Referral's First Name *` | `referralFirstName` | input | `text` | **yes** | 256 | `Your Referral's First Name` | 817 / **858** |
| 4 | `Your Referral's Last Name *` | `referralLastName` | input | `text` | **yes** | 256 | `Your Referral's Last Name` | 944 / **985** |
| 5 | `Your Referral's Email *` | `referralEmail` | input | `email` | **yes** | 256 | `Your Referral's Email Address` | 1071 / **1112** |
| 6 | `Your Referral's Company *` | `referralCompany` | input | `text` | **yes** | 256 | `Your Referral's Company Name` | 1198 / **1239** |
| 7 | `Send greetings` | `greeting` | **textarea** | — | **no** (`required={false}`) | 5000 | `Optional greetings for your referral..` | 1325 / **1366** |

Notes:
- All apostrophes in labels/placeholders are **straight** `'` in the source (`&#x27;`), not curly.
- The `*` required markers are part of the **label string**, not separate elements, and are the same
  18.667px/700/`#333333` as the label. There is no `aria-required` beyond the native `required` attribute.
- `Send greetings` is the only optional field and the only one **without** a `*`.
- The trailing `..` in the greeting placeholder is two dots in the original. Reproduce.

### R-2.2 Submit button
Identical `SubmitButton` (§T-3.3). Label **`Submit Referral`**.
Measured **199.58 × 49.73**, y **1471**, x 540.22, radius 30px, `padding 9px 26.1333px`, bg `#000000`,
label 18.667/31.733/700/`#ffffff`, `margin-top 9.33333px`, `self-center`, no hover/active, no shadow.
Pending label: **`Please wait...`** with `opacity: .70`.

### R-2.3 State machine
Exactly as §T-3.4, with the referral copy:

| state | result |
|---|---|
| idle | form as above |
| focus | no change; UA focus ring only |
| pending | button `disabled`, `opacity .70`, label `Please wait...` |
| **done** | form unmounted → `<div role="status" class="rounded-[10px] border-2 border-black bg-leaf p-[20px] text-center"><p class="text-black">Thank you! We’ll let you know if your referral takes action.</p></div>` — note the **curly `’`** |
| **error** | form stays mounted; `<div role="alert" class="mt-[1.4em] rounded-[10px] border border-black p-[10px]"><p class="text-black">{server reason}</p></div>` appended after it (1px border) |

Same stubbing guidance as §T-3.5. Same "no custom validation / no inline field errors" note.

## R-3. Earnings-tier row (section B)

Heading block:
```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] mt-0 max-wf-mini:mt-0 flex justify-center max-wf-phone:flex-col">
  <div class="mt-[7.4em] w-[70.3em] max-wf-phone:w-full max-wf-mini:mt-[3em] max-wf-mini:w-auto">
    <h2 class="font-headline text-[4.5em] leading-[1.48] font-semibold text-black
               max-wf-mini:text-center max-wf-mini:text-[3.9em] text-center">…</h2>
  </div>
</div>
```
Measured: frame **`w-[70.3em]` = 749.86px** at x 265.06, y 1770; h2 **142.06px** tall = **exactly 2 line-boxes**
of 71.04px. Type = existing "Section display heading" role (§3.3): 48px / 600 / 71.04px / `#000000`.
🚩 **Fragile wrap** — this is the one heading on these four routes with no vertical slack. With Gloock at
`size-adjust: 92.44%` the advance widths differ by up to ~1.2%; verify it still breaks into 2 lines and does
not become 3. (In the original it breaks after "…amount of users".)

Pill row — **reuses the homepage stat-pill component (§5.5) unchanged**, with a different wrapper:
```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] flex justify-around max-wf-phone:flex-col
            mt-[6.5em] max-wf-mini:mt-[6.5em]
            max-wf-phone:grid max-wf-phone:grid-cols-2 max-wf-phone:items-start
            max-wf-phone:gap-x-0 max-wf-phone:gap-y-[3em]">
  <div class="flex w-[25em] flex-col items-center max-wf-phone:mb-[4.6em] max-wf-phone:w-[16em]">
    <span class="mb-[1.2em] flex h-[5.75094em] w-[11.2528em] items-center justify-center
                 rounded-[46px] border-2 border-black bg-leaf">
      <span class="text-[2.5em] leading-[1.54] font-bold text-black max-wf-phone:text-[2.4em] text-center">350$</span>
    </span>
    <p class="mx-auto max-w-[49ch] text-center">If your referral has 50 users you can earn up to 350$</p>
  </div>
  … ×4 …
</div>
```
⚠️ **New responsive variant:** at ≤767px this becomes a **2-column CSS grid** (`grid-cols-2`,
`gap-x-0 gap-y-[3em]`, `items-start`) rather than the homepage's two `w-1/2` halves. This is a genuinely new
layout mode for the stat pill — the homepage version (§5.5) never uses `grid`.

Measured @1280 (all four identical):

| | value |
|---|---|
| pill | **120.02 × 61.33**, `border-radius 46px`, `border 2px solid #000`, `background #beedc0`, `margin-bottom 12.8px` |
| pill label | **26.667px / 700 / 41.067px / normal / `#000000`** (existing "Big stat" role, §3.3) |
| column | `w-[25em]` = **266.66px**, `flex flex-col items-center` |
| column x | 74.66 / 362.67 / 650.67 / 938.69 (`justify-around` across 1152) |
| pill x | 147.97 / 435.98 / 723.98 / 1012 |
| row y | 1981 |
| caption | body `p` role, `max-w-[49ch]` |

Figures and captions:

| pill | caption |
|---|---|
| `350$` | `If your referral has 50 users you can earn up to 350$` |
| `1800$` | `If your referral has 250 users you can earn up to 1800$` |
| `3500$` | `If your referral has 500 users you can earn up to 3500$` |
| `8100$` | `If your referral has 1500 users you can earn up to 8100$` |

(Dollar sign **after** the number in all four — that is the original.)

## R-4. Testimonials (section D)

Structure is the homepage testimonial pair (§5.7) **with three deltas**:
1. The row wrapper is `div.mt-[14.7433em].flex.w-full.justify-center.max-wf-tablet:flex-wrap`
   (homepage uses the same `14.7433em`).
2. The avatar images and company logos are **different files**, and avatar 1 carries extra image classes.
3. The company logos are **much wider**: `w-[19.4941em]` = **207.92px** (homepage uses `w-[7.96em]` = 85px).

Measured @1280:

| | card 1 | card 2 |
|---|---|---|
| card box | **417.17 × 297.14** at x **124.17**, y **2632** | 417.17 × 297.14 at x **738.66** |
| card | `rounded-[10px] border-2 border-black bg-cream`, `padding 64px 14.9333px 32px`, no shadow | same |
| avatar ring | **125.77 × 125.77** at x 269.86, y **2492** (`-top-[13.4em]`), `size-[11.7918em]`, `rounded-full`, `border-2 border-black`, `bg-leaf`, `overflow-hidden`, `items-end` | 125.77 × 125.77 at x 884.34 |
| avatar img | `t3png-ee95a1.webp`, intrinsic 444 × 380, class **`ml-[1.4em] h-[90%] scale-[1.2]`** → rendered **146.12 × 109.578**, `margin-left 14.9333px`, CSS `scale: 1.2` (Tailwind v4 sets the `scale` property, so `transform` computes to `none`) | `t4png-f92ff9.webp`, intrinsic 413 × 380, class `h-auto w-full` → rendered **121.77 × 112.031** |
| quote `p` | y 2698, 383.33 × 113.30 — existing role (§3.3): 24.533 / 600 / 37.78 / `#000` | same geometry |
| attribution `p` | y 2837, h 58.28 — existing role: 20.667 / 400 / 29.14 / `#000`, `<br>`-separated | same |
| company logo | `logo-kent-and-whitepng-e559b5.webp`, intrinsic 625 × 142, `w-[19.4941em]` → **207.92 × 47.23** at y 2962, x 228.8, wrapper `mx-auto mt-[3em] flex justify-center` | `logo-coverwalletsvg-be24e9.svg`, intrinsic 340 × 69, → **207.92 × 42.08** at x 843.28 |
| quote leaves | 6 × `QUOTE_LEAVES` per card (§7.2) — **static, no `marketing-drift-leaf` class, no animation** | same |

Copy:
> card 1 — “We already had a very close team but Evergreen has brought us closer.” / `Brian Schryer`<br>`CEO`
> card 2 — “Evergreen quickly helped transition us to a good peer recognition culture” / `Sakir Temel`<br>`CTO`

(Curly quotes `“ ”`. Card 2's quote has **no** closing full stop — reproduce.)
Both avatar images and both company logos carry `alt=""` + `aria-hidden="true"` in the original.

## R-5. Customer logo strip (section D)

Same component as §5.9 — same wrapper classes, same `pl-[3em]`, same `justify-between`, no greyscale, no
opacity change, no hover, no marquee. **One logo differs from the homepage**: slot 5 is **Fraktio**, not
CoverWallet.

| slot | file | alt | inline width | rendered @1280 | x |
|---|---|---|---|---|---|
| 1 | `logo-harvardsvg-c5efb6.svg` | `Harvard University Employees Credit Union logo` | `17.1909em` | **183.36 × 36.17** | 95.97 |
| 2 | `logo-nitrosvg-7a0f33.svg` | `Nitro logo` | `11.5931em` | **123.66 × 40.66** | 327.58 |
| 3 | `logo-earnestsvg-2634ab.svg` | `Earnest Ice Cream logo` | `8.79133em` | **93.77 × 37.64** | 499.50 |
| 4 | `logo-octopussvg-a91e19.svg` | `Octopus Energy logo` | `19.4863em` | **207.84 × 28.45** | 641.52 |
| 5 | **`logo-fraktiosvg-19b008.svg`** | **`Fraktio logo`** | `11.6417em` | **124.17 × 33.36** | 897.63 |
| 6 | `logo-hifyresvg-64f8d6.svg` | `Hifyre logo` | `13.6854em` | **145.97 × 37.30** | 1070.05 |

Row y 3091, height 40.66, `object-fit: fill` (no crop), `h-auto`.

## R-6. Verbatim copy

- h1: `Evergreen referral program`
- Intro paragraph (`p.mx-auto.max-w-[60ch].text-center`, ends with a `<br/>`):
  > Know an organization looking to improve their company culture? Share their contact info and when they become customer, you’ll get some side cash. We pay you **30% of the revenue** your referral brings during the first 6 months.

  (`30% of the revenue` is wrapped in `<strong>` → weight 700 per §3.2. Note the curly `’` in "you’ll" and the
  original's grammatical slip "become customer" — reproduce verbatim.)
- Footnote paragraph (`p.mx-auto.max-w-[60ch].text-center`, ends with a `<br/>`):
  > Payments will be made quarterly. Only applies to new introductions made and the introduction is valid for 6 months.
- Section-B h2:
  > Your earnings will be based on the amount of users your referral has
- Pills / captions / testimonials / logo alts: see §R-3, §R-4, §R-5.
- Form labels, placeholders, submit and success copy: §R-2.
- G2 caption: `4.8 / 5 on G2 Reviews`

## R-7. Links
**`<main>` on `/referral` contains ZERO `<a>` elements.** Every link on the page lives in the shared nav and
footer. No external links to neutralise inside the page body.

## R-8. Motion
- 3 × `CARD_LEAVES` on the form card (§7.2).
- 12 × `DIVIDER_LEAVES` (§7.2).
- **15 `marketing-drift-leaf` elements total.**
- 12 × `QUOTE_LEAVES` (6 per testimonial card, §7.2) — **static**, no animation class, `initial === animate`.
- No scroll-tracked leaves, no recognition lines, no hearts, no `useScroll`/`useSpring`.

---

# 9. Asset manifest delta

Every image used by these four routes, with the local file. **All are now present in
`/Users/riyaghosh/V3/evergreen/public/assets/`** — serve from `/assets/<filename>`.
Original URL pattern: `https://www.evergreen.so/marketing/<filename>`.

### 9.1 Newly downloaded in this pass (4 files, 4 successes, 0 failures)

| original URL | local file | used by | rendered @1280 | intrinsic | object-fit |
|---|---|---|---|---|---|
| `…/marketing/workletesvg-eb3abc.svg` | `workletesvg-eb3abc.svg` | `/case-studies` card 1 logo | **130.86 × 45.86** (`h-[4.3em]`) | 300 × 105 | fill |
| `…/marketing/logo-kent-and-whitepng-139c7a.webp` | `logo-kent-and-whitepng-139c7a.webp` | `/case-studies` card 2 logo | **201.84 × 45.86** | 625 × 142 | fill |
| `…/marketing/logo-wunderdogsvg-a66a50.svg` | `logo-wunderdogsvg-a66a50.svg` | `/case-studies` card 3 logo | **48.16 × 45.86** | 134 × 127 | fill |
| `…/marketing/logo-nitrosvg-4caa4a.svg` | `logo-nitrosvg-4caa4a.svg` | `/case-studies` card 4 logo | **139.42 × 45.86** | 185 × 61 | fill |

⚠️ `logo-wunderdogsvg-a66a50.svg` and `logo-nitrosvg-4caa4a.svg` are **different artwork** from the
homepage's `logo-wunderdogsvg-62f3d4.svg` / `logo-nitrosvg-7a0f33.svg` (different aspect ratios — 134 × 127
vs. the homepage mark, 185 × 61 vs. 185 × 61 but a different file hash). Keep both; do not dedupe.

### 9.2 Already present, newly used on these routes

| local file | used by | rendered @1280 | intrinsic |
|---|---|---|---|
| `t3png-ee95a1.webp` | `/referral` testimonial 1 avatar | 146.12 × 109.578 (`ml-[1.4em] h-[90%] scale-[1.2]`) | 444 × 380 |
| `t4png-f92ff9.webp` | `/referral` testimonial 2 avatar | 121.77 × 112.031 (`h-auto w-full`) | 413 × 380 |
| `logo-kent-and-whitepng-e559b5.webp` | `/referral` testimonial 1 company logo | 207.92 × 47.23 (`w-[19.4941em]`) | 625 × 142 |
| `logo-coverwalletsvg-be24e9.svg` | `/referral` testimonial 2 company logo | 207.92 × 42.08 | 340 × 69 |
| `logo-fraktiosvg-19b008.svg` | `/referral` logo strip slot 5 | 124.17 × 33.36 (`width:11.6417em` inline) | 186 × 50 |

### 9.3 Already present, already specced (unchanged usage)
`ever-regular-leafsvg-1b92f2.svg`, `leaf-smallersvg-6114e8.svg`, `leaf-spikesvg-7a4672.svg` (all leaves);
`logo-g2png-c53a3f.webp`, `star1svg-303d31.svg` (G2 block); `icon-usersvg-f5e0ab.svg`,
`icon-supportsvg-bc4096.svg`, `icon-timesvg-4c8791.svg` (CTA icons); `slacksvg-1b4e41.svg`,
`teamssvg-b74fd1.svg` (platform links); `evergreen-logosvg-216cd4.svg`, `ever-small-leafsvg-e988d6.svg`
(nav/footer); `icon-linkedinsvg-777cac.svg`, `icon-twittersvg-6d6f46.svg`, `icon-emailsvg-1a80b8.svg`
(footer social); `logo-harvardsvg-c5efb6.svg`, `logo-nitrosvg-7a0f33.svg`, `logo-earnestsvg-2634ab.svg`,
`logo-octopussvg-a91e19.svg`, `logo-hifyresvg-64f8d6.svg` (logo strip).

**No videos, no `<canvas>`, no sprite sheets, no new fonts on any of the four routes.**
Loading attributes: everything inside `<main>` on these pages is `loading="lazy" decoding="async"` **except**
the `/case-studies` card logos and the `/schedule-a-demo` CTA icons/G2 assets, which are eager (no `loading`
attribute in the server HTML). `object-fit` is `fill` (the default) everywhere — nothing is cropped.

---

# 10. Consolidated NEW component & role index

## 10.1 New components (not in `CLONE_SPEC.md` §5)

| # | Component | Where | Spec |
|---|---|---|---|
| B.1 | **CaseStudyCard** + wrapping flex-wrap grid | `/case-studies` | §C-2 |
| B.2 | **White form card** (3 size variants) | `/contact`, `/referral`, `/schedule-a-demo` | §T-2 |
| B.3 | **`LabelledField`** (label + input / textarea) | `/contact`, `/referral` | §T-3.1 |
| B.4 | **`FormDone`** success panel | both forms | §T-3.4 |
| B.5 | **`FormError`** alert panel (the system's only 1px border) | both forms | §T-3.4 |
| B.6 | **`SubmitButton`** — catalogued in §5.4 but unused on the homepage; now live | both forms | §T-3.3 |
| B.7 | **Scheduler placeholder** (stands in for the Calendly inline widget) | `/schedule-a-demo` | §D-3 |
| B.8 | **Earnings-tier pill row** — §5.5 stat pill in a new `grid-cols-2` mobile mode | `/referral` | §R-3 |

## 10.2 New typographic roles (not in `CLONE_SPEC.md` §3.3)

| Role | em | px @1280 | weight | line-height @1280 | letter-spacing | colour |
|---|---|---|---|---|---|---|
| Case-study card blurb | 1.5625em | **16.667px** | 400 | 28.333px (1.7) | normal | `#000000` |
| Case-study stat figure + unit | 1.75em | 18.667px | **700** | 31.733px | normal | `#000000` |
| "Read full case study" link label | 1.75em | 18.667px | 600 | 31.733px | normal | `#000000`, no underline |
| **Form field label** | 1.75em | 18.667px | **700** | 31.733px | normal | ⚠️ **`#333333`** |
| Form input / textarea text | 1.75em | 18.667px | 400 | 31.733px | normal | `#000000` |
| **Form placeholder** | 1.75em | 18.667px | 400 | 31.733px | normal | ⚠️ **`#999999`** |
| Inline body link (base `a` rule, first real use) | 1em of 1.75em | 18.667px | 600 | **18.667px (lh 1)** | normal | `#000000`, underlined |

No element on any of the four pages uses a non-`normal` `letter-spacing` (verified via `getComputedStyle`).

## 10.3 New colour / token facts
- **`#ffffff` becomes a content surface.** On the homepage, white existed only as the `SlideOverlay`
  background (§10.9). Here it is the fill of every card: case-study cards and all three form cards.
- **`#999999`** — new placeholder colour. Add a token (e.g. `placeholder: '#999999'`) or keep the arbitrary
  value `placeholder:text-[#999]` verbatim. It does **not** replace the homepage newsletter's
  `placeholder:text-black/60`, which stays as-is in the footer.
- New border width: **`1.5px`** (`border-[1.5px]`) on form inputs/textareas. The system now has three:
  **1px** (`FormError`), **1.5px** (form fields), **2px** (everything else).
- New radius usage: **`rounded-[7px]` on all four corners** (homepage only used `rounded-l-[7px]`).

## 10.4 Things that break a homepage convention (summary for review)
1. **No announcement banner** on any of the four routes (§0.1) — every y-offset shifts by −51px.
2. **`px-0 max-wf-tablet:px-0`** container on `/contact` and `/referral` section 1 (§0.4) — the only places
   the 6em gutter is dropped.
3. **`pt-[15em] pb-[10em]`** on `/referral`'s dark section (§R-1) — a new padding pair; every homepage dark
   section is `18em / 5em`.
4. **`/referral` has no final-CTA section** and no pricing-reassurance row (§R-1).
5. **White (`#ffffff`) card surfaces** in page content (§10.3).
6. **1.5px borders** and a **`#999` placeholder** on form controls (§10.3) — the homepage newsletter input
   uses 2px and `black/60`.
7. **Form labels are `#333333`, not `#000000`** (§T-3.1) — a `<label>` escapes the `p { color:#000 }` rule.
8. **`/referral` tier row uses a CSS grid** (`max-wf-phone:grid grid-cols-2`) where the homepage stat row
   uses two `w-1/2` flex halves (§R-3).
9. **A case-study card is wider than its own flex item** and overhangs by 40.52px per side (§C-2.1).
10. **A live third-party iframe** (Calendly) exists on `/schedule-a-demo` — the only external embed in the
    whole site so far; replaced by a static placeholder here (§D-3).

Everything else — the em engine, the `-mt-[3em]` overlap, the flat/no-shadow/no-gradient/no-hover/no-focus
language, the leaf motion constants, the nav, the footer, the final-CTA section, the G2 block — is identical
to `CLONE_SPEC.md` and must not be re-derived.

## 10.5 Items that could not be measured
- **The exact error-state copy** for both forms. It is returned by the server action (`res.reason`) and does
  not appear in any client bundle. Spec'd as a placeholder string (§T-3.4).
- **The inside of the Calendly iframe** is cross-origin, so its computed styles could not be read. The
  placeholder in §D-3 is reconstructed from the screenshot plus the two brand-colour URL parameters, and is
  explicitly an approximation of a third-party surface — it is the one area of these four pages that needs
  creative reinterpretation rather than reproduction.
- `getComputedStyle().borderWidth` reports **`1px`** for the `border-[1.5px]` inputs at dpr 1 (Chromium
  rounds); the declared value is 1.5px and that is what should be written.
