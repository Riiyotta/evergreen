Source: https://www.evergreen.so/

# CLONE_SPEC_CONTENT_A — four content templates (blog index, article, alternatives index, comparison)

Measured live 2026-10-09, Playwright/Chromium, **primary viewport 1280 × 900**, spot-checked 1440 / 768 / 390.
Every number below was read with `getComputedStyle` / `getBoundingClientRect` inside a 1280px-wide same-origin iframe, so the `.marketing-root` `0.833333vw` engine resolved to exactly **10.6667px** (verified) — identical to CLONE_SPEC §4.1.

**This file records only what is NEW.** The em engine (§4.1), container contract (§4.3), colour tokens (§2), the 25 typographic roles (§3.3), nav (§5.2/5.3), announcement banner (§5.1), footer (§5.13), primary/secondary pills (§5.4), newsletter form (§5.12), leaf art + drift motion (§7.1/7.2) and the reduced-motion block (§7) are all **unchanged** and must be reused verbatim from `CLONE_SPEC.md`. Where a template breaks a homepage rule it is flagged **⚠ BREAKS §x**.

Screenshots (in `_reference/screenshots/`):
`blog-1280-top.png`, `post-1280-top.png`, `post-1280-body-blockquote.png`, `post-1280-cta-related.png`, `alts-1280-top.png`, `alt-1280-top-glance.png`, `alt-1280-faq-sources.png`.

---

## 0. What is shared by all four templates

### 0.1 Page chrome

| | `/blog` | `/blog/*` | `/alternatives` | `/alternatives/*` |
|---|---|---|---|---|
| Announcement banner (§5.1) | **absent** ⚠ | **present** | **absent** ⚠ | **absent** ⚠ |
| Nav (§5.2) | present, identical | identical | identical | identical |
| `main` y-origin | 76.59 | 128.33 (banner pushes it down 51.74) | 76.59 | 76.59 |
| Leaf divider band (§1 D) | **absent** ⚠ | present | present | present |
| Final cream-dark section | **absent** ⚠ | lead-magnet variant (§2.9) | homepage CTA (§1 H) verbatim | homepage CTA (§1 H) verbatim |
| Footer (§5.13) | present | present | present | present |

`.marketing-root` children in DOM order (articles): `script`, banner `div`, nav `div`, `main`, footer `section`.
On `/blog`, `/alternatives`, `/alternatives/*` the banner `div` is simply **not rendered** — treat the banner as a per-route flag, default `false`, `true` only on `/blog/*`.

### 0.2 Section wrapper variants used by these templates

All are the §4.3 container with extra padding utilities:

```
mx-auto -mt-[3em] w-full max-w-[1920px] px-[6em] max-wf-tablet:px-[6vw]            // /blog  (no pb)
mx-auto -mt-[3em] w-full max-w-[1920px] px-[6em] max-wf-tablet:px-[6vw] pb-[5em]   // /blog/*, /alternatives, /alternatives/*
mx-auto -mt-[3em] w-full max-w-[1920px] px-[6em] max-wf-tablet:px-[6vw] pt-[18em] pb-[5em]  // final cream-dark
```
Measured padding @1280: `0 64px` / `0 64px 53.3333px` / `192px 64px 53.3333px`. Content box 1152.03px.

### 0.3 The shared page-head block (all four templates)

```html
<div class="pt-[10.2em] max-wf-mini:pt-[11.8em]">                         <!-- padding-top 108.8px -->
  <div class="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full
              max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
    <p class="mb-[1.4em] text-center"> … EyebrowBadge (§4.1) … </p>       <!-- optional -->
    <h1 class="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">…</h1>
    … DateLine (articles) OR subtitle Block (alternatives) …
  </div>
</div>
```
h1 computed @1280: **65.3333px / 97.3466px / 600 / ivypresto-headline / #000 / letter-spacing normal**, `max-width: 1981.52px` (`49ch` of the serif — note it resolves much wider than the Rubik `49ch` of 580.714px, so the h1 is effectively full-width at 1152px). Identical to §3.3 Hero H1.

### 0.4 Universal negatives — re-verified on all four templates

Scanned every element under `main` on `/blog`, `/blog/employee-recognition-in-slack`, `/blog/35-creative-ideas-on-how-to-recognize-employees`, `/blog/evergreen-product-update-q1-2023`, `/alternatives`, `/alternatives/bonusly`, `/alternatives/heytaco`:

- **gradients: 0** on every page (`background-image` never contains `gradient`).
- **box-shadows: 0** on every page (`box-shadow: none` everywhere).
- The complete set of hover/transition/animation utility classes present in the DOM of these pages is exactly:
  `hover:underline`, `transition-transform`, `duration-200`, **`transition-colors`**, **`hover:bg-white`**.
  `transition-transform duration-200` is only the hamburger (§5.3). `hover:underline` is only nav/footer links (§7.4).
- **Listing cards have NO hover state.** Measured on the blog card and on the `li` cards: `transform: none`, `cursor: auto`, `box-shadow: none`, `transition` resolves to the UA `all` (no duration), no `hover:` class anywhere on card, image, title or wrapper. Do **not** add lift/scale/shadow/border-colour hover.
- The **only** new hover in this whole content surface is `transition-colors hover:bg-white` on the **EyebrowBadge** (§4.1). That is the single documented exception to §7.4.

---

## 1. TEMPLATE A — Blog index (`/blog`)

`<title>` `Evergreen | Blog` · canonical `https://www.evergreen.so/blog`
meta description: `Explore our blog for insights on creating a positive work culture through recognition. From employee appreciation to ESG, our articles will help you build a happier, and stronger company culture.`

Screenshot: `blog-1280-top.png`.

### 1.1 Section map (DOM order, 1280)

Total document height @1280: **29100px**. `main` = 1280 × 28512.23 at y 76.59. One section only.

| # | Role | Element | y | height | bg | padding | inner width | cols |
|---|---|---|---|---|---|---|---|---|
| A | Nav | §5.2 | 0 | 77 | cream | — | — | — |
| B | Page head | `section.relative.bg-cream` → wrapper (no `pb`) → `div.pt-[10.2em]` | 44.61 | 206.13 | `#fffff3` | `padding-top 108.8px`, wrapper `margin-top -32px` | 1152.03 | 1 |
| B1 | `h1` "Evergreen Blog" | `h1.mx-auto.max-w-[49ch].text-center` | 153.41 | 97.33 | — | — | 1151.98 | centred |
| C | Card list | `div.my-[4.2em].text-center.max-wf-mini:my-[3.5em].flex.justify-center.max-wf-phone:flex-col` → bare `div` | 295.53 | 28248.5 | — | `margin-block 44.8px` | 1015.69 (the inner div shrink-wraps to the card width) | **1 column** |
| D | Footer | §5.13 | 28588.8 | ~511 | cream | — | — | — |

**There is no eyebrow badge, no intro paragraph, no divider band, no final CTA on `/blog`.** h1 → cards → footer.

### 1.2 The listing grid — it is a single column of full-width rows

⚠ **BREAKS the "grid" assumption**: `/blog` is **not** a multi-column card grid. It is one vertical stack of 53 wide split cards (image left / copy right).

Row wrapper (one per post), verbatim:
```html
<div class="relative mt-[5em] mb-[9.5em] flex w-[95.2213em] flex-col items-center max-wf-tablet:w-full">
  <span class="pointer-events-none"> …3 CARD_LEAVES (§7.2)… </span>
  <div class="relative z-[100] flex w-full items-center overflow-hidden rounded-[10px] border-2 border-black bg-white
              max-wf-tablet:w-[var(--blog-card-tablet-width)] max-wf-tablet:max-w-full max-wf-tablet:flex-col max-wf-mini:w-full">
    <div class="relative h-[40em] w-1/2 flex-1 border-r-2 border-black
                max-wf-tablet:w-full max-wf-tablet:border-r-0 max-wf-mini:h-auto max-wf-mini:flex-none">
      <img src="/assets/<heroImage>" alt="" class="size-full object-cover max-wf-mini:h-auto" loading="lazy" decoding="async">
    </div>
    <div class="w-1/2 p-[4em] text-left max-wf-tablet:w-full max-wf-tablet:text-center">
      <h2 class="font-headline text-[3.5em] leading-[1.4] font-semibold text-black">{title}</h2>
      <p class="my-[1.5em] w-full text-[1.5625em] max-wf-tablet:mx-auto max-wf-tablet:w-[31.115em] max-wf-tablet:max-w-full">{excerpt}</p>
      <a href="/blog/{slug}" class="flex w-full justify-center">
        <img src="/assets/ever-small-leafsvg-e988d6.svg" alt="" class="mt-[0.4em] mr-[0.7em] w-[1.26708em] max-wf-mini:mb-[0.9em] max-wf-mini:w-[2em]">
        <p class="mt-[0.5em] text-[1.75em] font-semibold">Keep reading</p>
      </a>
    </div>
  </div>
</div>
```

Measured geometry @1280:

| thing | value |
|---|---|
| row wrapper | `w-[95.2213em]` = **1015.69px**, `margin: 53.3333px 0 101.3333px` (`mt-[5em] mb-[9.5em]`) |
| row pitch (card top → next card top) | **531.98px** — constant for all 53 |
| card box | **1015.69 × 430.66**, `border-radius 10px`, `border 2px solid #000`, `background #ffffff`, `overflow: hidden`, `box-shadow none` |
| card bg | ⚠ **`#ffffff` — pure white, not `cream`.** This is the first white surface outside the two SlideOverlays (§5.14 item 9). |
| image column | `h-[40em] w-1/2 flex-1` → **505.84 × 426.66** box; `border-right: 2px solid #000` |
| image | **503.84 × 426.66**, `object-fit: cover`, `size-full`, `loading=lazy decoding=async`, `alt=""` (decorative — the title carries the meaning) |
| image aspect at 1280 | 503.84 / 426.66 = **1.181 : 1**; it is *not* a fixed ratio — height is `40em` and width is half the row, so the ratio drifts with viewport. Source files are 1224–1600px wide, 0.63–0.72 aspect ratio, all cropped by `object-cover` |
| copy column | `w-1/2 p-[4em]` → padding **42.6666px** all round, content width **420.53px**, vertically centred (`items-center` on the card) |
| card h2 | `text-[3.5em] leading-[1.4]` → **37.3333px / 52.2666px**, weight 600, `font-headline`, `#000`, `text-align: left`, margin 0 |
| card excerpt `p` | `text-[1.5625em]` → **16.6667px / 28.3333px**, weight 400, `#000`, `margin: 25px 0` (`my-[1.5em]` of 16.6667px) |
| "Keep reading" row | `a.flex.w-full.justify-center` 420.53 × 41.06, `text-decoration: underline` (inherited from `.marketing-root a`) |
| ↳ leaf icon | `ever-small-leafsvg-e988d6.svg` rendered **13.5 × 36.8**, `margin: 4.26666px 7.46666px 0 0` |
| ↳ label | `text-[1.75em] font-semibold` → **18.6667px / 31.7333px**, weight 600, `#000`, `margin-top 9.33333px` |

**Long vs short title:** the **card height is constant at 430.66px** regardless of title length, because the image column `h-[40em]` (426.66px) is the tallest child and the copy column is `items-center`-centred and shorter (measured 337.5 / 365.83 / 418.08px for 2-, 3- and 4-line titles). A title must wrap to **≥6 lines** before it would exceed the image height; the longest real title (61 chars) wraps to 3 lines. Card height is therefore safe to treat as fixed at desktop.
**Only the "Keep reading" link is clickable** — the image and the `h2` are *not* wrapped in an anchor. ⚠ Do not make the whole card a link.

**Pagination / load-more / filters / tag chips: NONE.** All 53 posts are server-rendered in one list. No category chips, no search, no sort, no "load more" button, no infinite scroll, no `<nav aria-label="pagination">`. Confirmed by DOM: `main` contains exactly `h1` + 53 row wrappers.

### 1.3 Responsive (measured)

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| root font-size | 12px | 10.6667px | 8.25833px | 8.25833px |
| gutter | 72px | 64px | 46.08px | 23.4px |
| row wrapper | 1142.64 (`95.2213em`) | 1015.69 | **675.83** (`w-full`) | **343.22** (`w-full`) |
| card direction | row | row | **column** | **column** |
| card height | 483.98 | 430.66 | 735.30 | 623.31 |
| image | 567.33 × 479.98 | 503.84 × 426.66 | 671.83 × 448.02 (`h-[40em]`=330.3? no — `h-auto` path not taken; measured 448.02) | 339.22 × 226.20 (`max-wf-mini:h-auto`, natural aspect) |
| h1 | 73.5 / 109.515 | 65.333 / 97.347 | 50.582 / 75.368 | **32.2075** (`max-wf-mini:text-[3.9em]`) / 47.989 |
| nav | links | links | hamburger | hamburger |
| doc height | 32710 | **29100** | 20209 | 24189 |

Note: `--blog-card-tablet-width` is **never defined** in the stylesheet, so at ≤991px `width: var(--blog-card-tablet-width)` is invalid and the card falls back to `max-w-full` / `w-full`. Reproduce by simply using `w-full` below 992px.

### 1.4 Motion on the index

Per row, three absolutely-positioned leaves in a `span.pointer-events-none`. Their inline styles are **byte-identical to CLONE_SPEC §7.2 `CARD_LEAVES`**:

```js
[ {art:'leaf', top:'-6em',   left:'-5.1em', rotate:-54, z:11, from:[7,8], duration:1300},
  {art:'leaf', top:'-7.6em', left:'-0.6em', rotate:6,   z:11, from:[1,8], duration:1500},
  {art:'leaf', top:'-0.7em', left:'-5.6em', rotate:-80, z:13, from:[10,1],duration:1000} ]
```
Rendered size `7.10621em × 12.308em` = **75.7969 × 131.281px**; source `/assets/ever-regular-leafsvg-1b92f2.svg` (116×199), `loading=lazy decoding=async`, `aria-hidden`.
Trigger / easing / delay are §7.2 exactly: `whileInView`, `{once:true, amount:0}`, ease `cubic-bezier(0.455,0.03,0.515,0.955)`, **delay 0**.

**Card stagger: NONE.** The card boxes themselves have no `initial`/`animate`, no opacity/translate entrance, no `transition` with a duration. Each row's three leaves fire independently on their own IntersectionObserver entry, so what *reads* as a stagger down the page is purely scroll position — there is no `staggerChildren`, no index-based `delay`. Verified: every row's leaf inline `style` is identical, with no `transition-delay` and no per-index value.

### 1.5 Data the index needs

It renders `slug`, `title`, `excerpt`, `heroImage` per post, in a fixed hand-ordered array (newest-ish first; **not** sorted by the `date` shown on the article). Full ordered list — slug, title (navigational structure, reproduce verbatim), hero image file, excerpt word count:

| # | slug | title | heroImage | excerpt words |
|---|---|---|---|---|
| 1 | `employee-recognition-in-slack` | Employee Recognition in Slack: A Practical Setup Guide | `employee-recognition-5c8c5b.webp` | 23 |
| 2 | `employee-recognition-metrics` | Employee Recognition Metrics That Don’t Create Bad Incentives | `beta-evergreen-so-reporting-1-c89f9b.webp` | 25 |
| 3 | `35-creative-ideas-on-how-to-recognize-employees` | 35 creative employee recognition ideas | `ideas-employee-recognition-ca3a7d.webp` | 17 |
| 4 | `how-to-move-from-physical-to-virtual-recognition-program` | Moving a recognition program from in-person to virtual | `virtual-recognition-program-2-cf0a14.webp` | 14 |
| 5 | `15-creative-ways-to-give-shoutout-to-coworkers` | 15 ways to give a coworker a shoutout (with templates) | `photo-1552664688-cf412ec27db2-eeea02.webp` | 14 |
| 6 | `how-ai-can-revolutionize-human-resources-applications-and-benefits` | How AI Can Revolutionize Human Resources: Benefits & Uses | `luis-villasmil-4v8umzx8fya-unsplash-ad2c74.webp` | 10 |
| 7 | `how-to-build-a-great-and-succesful-employer-brand-tips-examples` | How to Build a Succesful Employer Brand? Tips & Examples | `employer-brand-2ebc35.webp` | 11 |
| 8 | `5-things-you-need-to-know-about-employee-recognition` | Employee recognition 101: five things to know first | `employee-recognition-5c8c5b.webp` | 17 |
| 9 | `how-recognition-promotes-dei-in-the-workplace` | How employee recognition supports DEI at work | `diversity-equity-inclusion-81e0bf.webp` | 21 |
| 10 | `how-to-create-employee-recognition-program-step-by-step-guide` | Creating an employee recognition program: step by step | `how-to-create-a-employee-recognition-program-5b22de.webp` | 18 |
| 11 | `how-to-be-a-great-team-leader-tips-for-new-managers` | Top 5 Tips On How to Be a Great Team Leader in 2023 | `image-8-584426.webp` | 23 |
| 12 | `what-are-the-effects-of-the-employee-recognition` | Effects of employee recognition on retention and morale | `snowball-effect-84a4d6.webp` | 14 |
| 13 | `5-companies-with-the-best-employee-recognition-programs` | 5 companies with the best employee recognition programs | `employee-recognition-programs-1345f0.webp` | 20 |
| 14 | `reasons-why-employee-recognition-programs-fail-and-how-to-ensure-its-success` | Why recognition programs fail (and how to fix them) | `employee-recognition-fails-e9b555.webp` | 20 |
| 15 | `creating-a-culture-of-appreciation-peer-to-peer-recognition-templates-and-examples` | What is peer-to-peer recognition? Examples and templates | `peer-to-peer-recognition-1-499dcd.webp` | 14 |
| 16 | `how-does-dei-impact-employee-engagement-in-organizations` | How to improve employee engagement in organizations with D&I | `dei-69738b.webp` | 24 |
| 17 | `easy-guide-to-identify-a-not-engaged-employee` | Easy guide to identify a not engaged employee | `image-1-507462.webp` | 21 |
| 18 | `employee-retention-5-strategies-for-retaining-top-talent` | Employee Retention: 5 Strategies for Retaining Top Talent | `employee-retention-1-fa463f.webp` | 17 |
| 19 | `15-team-building-activities-to-increase-employee-motivation` | 15 Team Building Activities to Increase Employee Motivation | `teambuilding-6a611f.webp` | 13 |
| 20 | `15-tips-to-create-employee-well-being-strategy-for-workforce-engagement` | 15 tips to Create a Great Employee Well-being Strategy | `well-being-employee-da53fe.webp` | 18 |
| 21 | `how-to-identify-the-talent-engagement-in-your-team-template-test` | How to identify talent engagement in the team? |Test Template | `jeshoots-com-2vd8lihdnw-unsplash-afa87c.webp` | 16 |
| 22 | `creating-a-great-workplace-culture-with-psychological-safety` | Creating a Great Workplace Culture with Psychological Safety | `employee-experience-2-bdc29a.webp` | 14 |
| 23 | `how-to-create-a-positive-employee-experience` | How to create a positive Employee Experience | `employee-experience-office-d43bbd.webp` | 15 |
| 24 | `evergreen-product-update-q1-2023` | Evergreen Product Update Q1/2023 | `kopio-product-update-aad3c9.webp` | 10 |
| 25 | `a-guide-to-employee-retention-strategies-tips-and-best-practices` | Easy Guide to Employee Retention: Strategies,Tips | `employee-retention-8cedcf.webp` | 19 |
| 26 | `12-ways-to-celebrate-earth-day` | 12 ways to celebrate Earth day | `kopio-kopio-carbon-neutrality-e51f93.webp` | 12 |
| 27 | `steps-to-be-a-carbon-neutral-company` | 5 Steps how to be a Carbon-Neutral Company | `carbon-neutrality-ade6df.webp` | 21 |
| 28 | `how-to-increase-motivation-at-work` | 7 tips on how to increase employee motivation | `motivate-employees-eed2dc.webp` | 17 |
| 29 | `what-is-employee-appreciation-day-and-why-recognizing-your-employees-matters` | Employee Appreciation Day: what it is and how to mark it | `appreciation-day-67c901.webp` | 17 |
| 30 | `how-to-develop-and-implement-a-great-esg-strategy` | How to Develop and Implement a Great ESG Strategy? | `sustainability-9f7647.webp` | 18 |
| 31 | `how-to-show-appreciation-for-employees-after-layoffs` | How to show appreciation to employees after layoffs | `layoff-0ad72b.webp` | 22 |
| 32 | `10-templates-notes-to-thank-your-team-for-great-work` | 10 thank-you note templates for your team | `thank-you-e78cec.webp` | 20 |
| 33 | `6-esg-examples-driving-success-in-business` | 6 ESG examples driving success in business | `untitled-3aae37.webp` | 20 |
| 34 | `why-does-talent-engagement-matter` | 10 Reasons Why Talent Engagement is Important | `teamwork-culture-1-5d7b4f.webp` | 16 |
| 35 | `9-strategies-for-building-and-sustaining-a-successful-teamwork-culture` | The 9 Best Strategies to Build a Teamwork Culture | `kopio-teamwork-culture-3a2a24.webp` | 16 |
| 36 | `how-to-motivate-employees-and-avoid-quiet-quitting` | How to motivate employees and avoid quiet quitting? | `motivation-quiet-quitting-6189fe.webp` | 21 |
| 37 | `9-tips-to-boost-your-talent-engagement` | 9 Tips to increase Employee Engagement in 2023 | `samsung-uk-uzp2t-kkmdm-unsplash-b161a2.webp` | 17 |
| 38 | `evergreen-product-update-h2-2022` | Evergreen Product Update H2/2022 🌳 | `evergreen-product-update-h2-2022-009d0a.webp` | 20 |
| 39 | `employee-motivations-importance-in-the-workplace` | Why is employee motivation important? | `employee-motivation-importance-in-the-workplace-evergreen-31e7dc.webp` | 11 |
| 40 | `evergreen-product-update-q3-2021` | Evergreen product update Q3/2021 | `617a5ad96fbc2dc4316a0ab0-evergreen-product-update-q3-2021-79fe0d.webp` | 19 |
| 41 | `15-excellent-ideas-to-increase-motivation-in-the-workplace` | 15 Ideas to Increase Motivation in the Workplace | `614d9ad1eba882d71260bdcd-15-excellent-ideas-to-increase-moti-e4d2e3.webp` | 18 |
| 42 | `why-employee-recognition-program-is-important` | Benefits of an employee recognition program | `6140682be54a3672f1cac3aa-why-employee-recognition-program-is-51ef12.webp` | 12 |
| 43 | `setting-the-trend-5-simple-ways-to-lead-by-example` | 5 Simple Ways to Lead by Example in the Workplace | `607031e359ab5e4aff9988fa-evergreen-5-simple-ways-to-lead-by--5d7991.webp` | 16 |
| 44 | `evergreen-product-update-q1-2021` | Evergreen product update 🌳 Q1/2021 | `606d728872f4e20d945e9b63-1-duocqqfo3sxj46gsy3-znq-9c7717.webp` | 17 |
| 45 | `4-tips-on-how-to-give-recognition-at-work` | How to build a culture of recognition: 4 habits | `6046042168e4a67c594c519f-why-is-employee-recognition-so-impo-24a963.webp` | 17 |
| 46 | `why-is-employee-recognition-so-important` | Why employee recognition matters: three reasons | `603429d37fb4e377c1531e03-why-is-employee-recognition-so-impo-bb6138.webp` | 21 |
| 47 | `4-pandemic-proof-ideas-for-virtual-employee-appreciation` | 8 virtual employee recognition ideas for remote teams | `602a7f3635d51a60bf058cda-evergreen-virtual-employee-apprecia-e57e48.webp` | 16 |
| 48 | `evergreen-2-0-has-been-released` | Evergreen 2.0 has been released! 🎉 | `5feb49aeab0dffb8605b169e-1-gizi2g6lo7ov-fjuxb3qww-61b002.webp` | 17 |
| 49 | `how-can-a-culture-of-gratitude-improve-employee-experience` | How a culture of appreciation improves employee experience | `5fa129b25e89979ec330054a-fraktio-gratitude-culture-88a55a.webp` | 19 |
| 50 | `how-to-manage-a-remote-team-in-2020` | 5 Tips on How to Manage a Remote Team | `5f8206cd96c87060e354c330-evergreen-how-to-manage-remote-team-c76507.webp` | 16 |
| 51 | `guide-to-better-company-culture` | 3 ways to cultivate a strong Company Culture | `5f8205eab8fd53d60769c94c-evergreen-guide-to-better-company-c-111446.webp` | 21 |
| 52 | `what-is-carbon-neutrality-and-why-does-it-matter` | Your Ultimate Guide to Achieve Carbon Neutrality | `5f820239e8bfd034298ffee3-evergreen-what-is-carbon-neutrality-e9f572.webp` | 16 |
| 53 | `guide-to-employee-recognition` | How to give employee recognition: a short guide | `5f8200e571a3e459effdeeea-evergreen-guide-to-employee-recogni-3449dc.webp` | 22 |
Notes for the build data file:
- `title` lengths run **30 – 61 chars**; longest wraps to 3 lines at 1280. Titles are navigational and are reproduced verbatim above.
- `excerpt` is **10 – 25 words** (mean 17.4), always exactly 2–4 lines at 420.53px. Build with representative copy of that length — do not transcribe the originals.
- `heroImage` reuses the same file twice: `employee-recognition-5c8c5b.webp` is used by #1 and #8. 52 unique files for 53 posts.
- `alt=""` on every card image.

---

## 2. TEMPLATE B — Article (`/blog/{slug}`, 53 routes)

Sampled: `/blog/employee-recognition-in-slack` (new-style, 2026), `/blog/35-creative-ideas-on-how-to-recognize-employees` (legacy Webflow import), `/blog/evergreen-product-update-q1-2023` (image-heavy release note).
Screenshots: `post-1280-top.png`, `post-1280-body-blockquote.png`, `post-1280-cta-related.png`.

`<title>` = `{title} | Evergreen`, canonical `https://www.evergreen.so/blog/{slug}`,
`<meta property="og:image" content="https://www.evergreen.so/marketing/og/{heroImageBasename}.jpg">` (note: a **separate `/marketing/og/*.jpg`** derivative, not the webp).

### 2.1 Section map (DOM order, 1280) — instance `/blog/employee-recognition-in-slack`

Document height **9265px**; `main` 1280 × 8626.23 at y 128.33.

| # | Role | Element | y | height | bg | padding |
|---|---|---|---|---|---|---|
| A | Announcement banner §5.1 | `div.bg-black.py-[10px]` | 0 | 51.74 | `#000` | `10px 0` |
| B | Nav §5.2 | | 51.74 | 76.59 | cream | |
| C | **Article section** | `section.relative.bg-cream` → wrapper `… pb-[5em]` | 96.34 | 7549.25 | `#fffff3` | `0 64px 53.3333px`, wrapper `mt -32px` |
| C0 | Page head: badge + h1 + date | `div.pt-[10.2em]` | 96.34 | 463.70 | | `pt 108.8px` |
| C1 | **Prose body** | `div.marketing-rich-text.mx-auto.max-w-[77.78em]` | 613.38 | 4745.75 | | `margin: 0 161.203px 0 161.188px` |
| C2 | Arketta black CTA panel (§4.2) | `div.…bg-black.rounded-[8px]` | 5388.98 | 557.58 | `#000` | `100px 140px` |
| C3 | "Part of the … guide" heading | `div.my-[4.2em]…flex.justify-center` → `div.w-[70.3em]` → `h2` | 5991.36 | 142.06 | | `margin-block 44.8px` |
| C4 | Guide-cluster card grid (4 cards) | `div.my-[4.2em]…` → `ul.flex.w-full.flex-wrap.justify-center.gap-[3em]` | 6178.22 | 812.58 | | |
| C5 | "More articles" + 2 cards | `div.my-[4.2em]…` → `div.mt-[7em].flex.w-full.flex-wrap.justify-between` | 7035.59 | 511.88 | | `mt 74.6666px` |
| D | Leaf divider band | identical to §1 D / §7.2 `DIVIDER_LEAVES` | 7613.61 | 161.98 | transparent + 1279.98×159.98 cream bar + 2px black rule | wrapper `w-[120em]`, `-mt-[3em]` |
| E | **Lead-magnet CTA** (cream-dark) | `section.relative.bg-cream-dark` → wrapper `pt-[18em] pb-[5em]` | 7743.61 | 1010.95 | `#edede2` | `192px 64px 53.3333px` |
| F | Footer §5.13 | | 8754.56 | ~511 | cream | |

Instance heights for the other two samples: `35-creative-ideas…` doc **12518px** (rich text 8055.98px tall, blocks C3/C4 present, C5 present); `evergreen-product-update-q1-2023` doc **6470px** (rich text 3075.58px, **C3+C4 absent**, C5 present).
→ **C3 + C4 are optional** (driven by `guideCluster`); C2 and C5 and E are always present.

### 2.2 Page head (C0)

```html
<div class="pt-[10.2em] max-wf-mini:pt-[11.8em]">
  <div class="relative mx-auto w-[108em] …">
    <p class="mb-[1.4em] text-center">
      <a href="/blog" class="no-underline"> <EyebrowBadge label="Blog"/> </a>
    </p>
    <h1 class="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">{title}</h1>
    <div class="my-[5em] flex w-full items-center justify-center">
      <span class="flex flex-col items-start">
        <time datetime="2026-09-07" class="text-left">7 September 2026</time>
      </span>
    </div>
  </div>
</div>
```
- Badge block `p` is **1151.98 × 63.73**, `margin-bottom 26.1333px`.
- h1 at 1280 occupies 194.66px (2 lines) for this instance.
- **Date line**: wrapper `my-[5em]` = **margin-block 53.3333px**, height 17.06px.
  `<time>` computed: **font-size 10.6667px (1em, inherited root), line-height 17.0667px, weight 400, colour `#333333`, `text-align: left`**, width 91.05px. ⚠ This is the smallest type on the whole site and it inherits the `#333` root colour rather than `#000` — deliberate, keep it.
  Format: `D Month YYYY` (`7 September 2026`), `datetime` attribute `YYYY-MM-DD`.
- **No author block. No avatar. No read-time. No share row. No tag list. No table of contents.** Verified across all three samples.
- **No hero image on the article** — the `heroImage` is only used by the index card and the OG image.

### 2.3 The prose container (`.marketing-rich-text`) — the critical spec

Container:
```html
<div class="marketing-rich-text mx-auto max-w-[77.78em] max-wf-tablet:w-auto"> … </div>
```
| viewport | computed `max-width` | measured width | x |
|---|---|---|---|
| 1440 | 933.36px | 933.36 | 253.31 |
| **1280** | **829.653px** | **829.64** | **225.17** |
| 768 | 642.333px | 642.33 | 62.83 |
| 390 | 642.333px | **343.22** (capped by the 343.2px content box) | 23.39 |

`77.78em` is the unit the original uses — keep it in `em`, do not hard-code px. Horizontal margin is `auto` (measured `0 161.203px 0 161.188px` @1280).

**All element styles come from one authored base layer. Reproduce it verbatim** (transcribed from the live stylesheet's `@layer base`):

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
.marketing-rich-text .video-embed        { max-width:none; height:0; margin-bottom:1.6em; position:relative }
.marketing-rich-text .video-embed iframe { border:0; width:100%; height:100%; position:absolute; inset:0 }
```

Resolved at 1280 (`1em` of the container = 10.6667px; `p` inherits the §3.2 `p` rule = 1.75em = 18.6667px, so `p`'s own `margin-bottom:1.6em` = 1.6 × 18.6667):

| element | font-size | line-height | weight | family | colour | margins | padding | other |
|---|---|---|---|---|---|---|---|---|
| `p` | **18.6667px** | **31.7333px** | 400 | Rubik | `#000000` | `0 0 29.8667px` | 0 | measured heights 31.73 / 63.47 / 95.20 / 126.94 / 158.67 / 190.41 (1–6 lines) |
| `h2` | **48px** | **57.6px** (1.2) | 600 | ivypresto-headline | `#000000` | `0 0 38.4px` | 0 | 1-line 57.59, 2-line 115.19 |
| `h2.rich-text-h1` | **65.3333px** | 97.35 (1.49) | 600 | serif | `#000` | `0 0 13.0667px` | 0 | optional "title inside body" variant |
| `h3` | **26.6667px** | **41.0667px** (1.54) | **700** | Rubik | `#000000` | `0 0 8px` | 0 | ⚠ h3 is **sans**, not serif |
| `h4` | **20.0533px** (1.88em) | 28.07 (1.4 from §3.2) | 700 | Rubik | `#000` | `0 0 8.02px` | 0 | not observed in the 3 samples; rule exists |
| `ul` / `ol` | **18.6667px** | **31.7333px** | 400 | Rubik | `#333333` (root colour — ⚠ *not* `#000`) | `0 0 10px` | `0 0 0 40px` | `overflow:hidden`; markers outside/decimal |
| `li` | 18.6667px (inherit) | 31.7333px | 400 | Rubik | `#333333` | `0` | 0 | one line = 31.73px; 4-item list = 126.94px |
| `li > p` | `1em` → 18.6667px | 31.7333px | 400 | Rubik | `#000` | 0 | 0 | the nested-`p`-in-list override |
| **`blockquote`** | **24.6667px** (2.3125em) | **41.9333px** (1.7) | **500** | Rubik | `#333333` on the box, `#000` on the inner `p` | `37px 0` (1.5em of 24.6667) | **`24.6667px 49.3333px 24.6667px 41.9333px`** | **bg `#c3f2c5`** (the `quote-leaf` token from §2, first real use), `border: 2px solid #000`, `border-radius: 10px`, width 829.64, inner `p` width 734.39 |
| inline `a` | 18.6667px | **18.6667px** (`line-height:1` from §3.2) | **600** | Rubik | `#000000` | 0 | 0 | `text-decoration: underline`. ⚠ the `line-height:1` makes inline links sit 22px tall inside a 31.73px line — reproduce, do not "fix" |
| `code` | 18.6667px (1em, inherits) | 31.7333px | 400 | **`ui-monospace`** (UA default mono stack) | `#000` | 0 | 0 | **no background, no padding, no border, no radius** — bare monospace swap |
| `figure` | — | — | — | — | — | **`0 auto 10px`** | 0 | **`max-width: 60%`** → **497.78px** @1280 (60% of 829.64) |
| `figure > img` | — | — | — | — | — | 0 | 0 | `max-width:100%; height:auto` → rendered 497.75–497.77px wide, height from intrinsic aspect (observed 132.22 – 354.97px) |
| `figcaption` | **10.6667px** (`1em` of the container, NOT of the paragraph) | 17.0667px (1.6) | 400 | Rubik | `#333333` | `5px 0 0` | 0 | `text-align: center`. ⚠ Captions are tiny (10.67px) — that is correct, measured. |
| `table` | — | — | — | — | — | — | — | **No rule exists and no `<table>` appears in any sampled article.** If one occurs it renders with pure UA defaults (`border-collapse: separate`, no borders). Treat as unstyled; flag to the content owner. |
| `hr` | — | — | — | — | — | — | — | **No rule, none observed.** UA default (`1px inset` groove, `margin-block .5em`). |

**Observed block vocabulary across the three samples** (`.marketing-rich-text` direct children):
- `/blog/employee-recognition-in-slack`: `p` ×26, `h2` ×7, `ul` ×2, `ol` ×1, `blockquote` ×2, inline `code` ×3, inline `a` ×9. Order: p,p,p, h2, p, ul(4), p, h2, p,p,p(code), h2, p, ol(4), p, blockquote, blockquote, p, p, h2, p,p,p, h2, p,p,p, h2, p,p,p,p, h2, p,p,p,p, h2, p, ul(4), p, p. Paragraphs 14–87 words (mean ≈ 33). Sections cover: framing recognition as a behaviour; choosing channels; a writing rule; seeding before launch; prompt timing; reward size; participation gaps; a seven-day plan.
- `/blog/35-creative-ideas…`: `p` ×80, `h2` ×1, `figure` ×1, `blockquote` ×1. Legacy import — pseudo-headings are `<p><strong>` rather than real `h2`/`h3`. Rich text 8055.98px tall.
- `/blog/evergreen-product-update-q1-2023`: `p` ×13, `figure` ×8, `h3` ×1. Figures are screenshots 1538–1600px wide, rendered 497.75–497.77px, one with a `figcaption`.

→ The data contract must allow a **free-form ordered block array**, not a fixed slot schema.

### 2.4 Guide-cluster block (C3 + C4) — optional

Heading block:
```html
<div class="my-[4.2em] text-center max-wf-mini:my-[3.5em] flex justify-center max-wf-phone:flex-col">
  <div class="w-[70.3em] max-wf-mini:mt-[3em] max-wf-mini:w-auto mx-auto mt-0 max-wf-phone:w-auto">
    <h2 class="font-headline text-[4.5em] leading-[1.48] font-semibold text-black max-wf-mini:text-center max-wf-mini:text-[3.9em] text-center">
      Part of the employee recognition guide</h2>
  </div>
</div>
```
`w-[70.3em]` = **749.86px**; h2 **48px / 71.04px / 600 / serif / #000**, centred, block height 142.06 (2 lines).

Card list = `ul.flex.w-full.flex-wrap.justify-center.gap-[3em]` (gap **32px** both axes), full 1152.03 wide, **2 per row** at 1280 (4 cards → 2×2, 812.58px tall). Card = the shared `LinkCard` (§4.3). In this block the heading inside each card is an `<h3>`; the CTA label is per-card (`Read the full guide`, `Read the article` ×3). Cards observed: 4.

### 2.5 "More articles" block (C5) — always present

```html
<div class="my-[4.2em] … flex justify-center max-wf-phone:flex-col">
  <div class="mt-[7em] flex w-full flex-wrap justify-between">
    <h2 class="font-headline text-[4.5em] leading-[1.48] font-semibold text-black … mx-auto max-w-[49ch] text-center">More articles</h2>
    <div class="mt-[3em] flex w-full items-stretch justify-around max-wf-tablet:flex-col max-wf-tablet:items-center">
      … 2 × RelatedCard …
    </div>
  </div>
</div>
```
- block `mt-[7em]` = **74.6666px**; h2 263.67 × 71.03 centred (`margin: 0 444.172px 0 444.188px`).
- inner row `mt-[3em]` = 32px, 1152.03 × 334.20, `justify-around` → cards at x 128 and x 704.
- **RelatedCard** (different from LinkCard — it carries leaves and no excerpt):
```html
<div>
  <div class="relative mt-[7.6em] flex h-full w-[42em] flex-col items-center max-wf-tablet:mb-[6em]">
    <span class="pointer-events-none"> …3 CARD_LEAVES (§7.2)… </span>
    <div class="relative z-[100] mb-[30px] flex size-full flex-col items-center justify-center
                rounded-[10px] border-2 border-black bg-white px-[2em] max-wf-tablet:py-[4em]">
      <div class="mb-[2em]"><h2 class="font-headline text-[3.5em] leading-[1.4] font-semibold text-black">{title}</h2></div>
      <a href="/blog/{slug}" class="flex justify-center w-auto">
        <img src="/assets/ever-small-leafsvg-e988d6.svg" class="mt-[0.4em] mr-[0.7em] w-[1.26708em] …">
        <p class="mt-[0.5em] text-[1.75em] font-semibold">Read blog</p>
      </a>
    </div>
  </div>
</div>
```
| | value @1280 |
|---|---|
| outer | `mt-[7.6em]` = **81.0666px**, `w-[42em]` = **447.98px**, height 334.20 |
| card | **447.98 × 304.20**, `border-radius 10px`, `border 2px solid #000`, **bg `#ffffff`**, `padding-inline 21.3333px` (`px-[2em]`), `margin-bottom 30px`, content centred both axes |
| title | `text-[3.5em] leading-[1.4]` = 37.3333 / 52.2666, 600, serif, `#000`, centred; wrapper `mb-[2em]` = **21.3333px** |
| CTA | leaf 13.5 × 36.8 + `Read blog` 18.6667px/31.7333px weight 600, underlined |
| count | exactly **2** |

### 2.6 EyebrowBadge, LinkCard, Arketta CTA
See §4 (new components).

### 2.7 Lead-magnet CTA section (E) — cream-dark, article-only

⚠ **BREAKS §1 H**: on articles the final cream-dark section is **not** the homepage "Start feeling good about work" CTA. It is a gated-PDF form.

```
section.relative.bg-cream-dark
└ div.mx-auto.-mt-[3em].w-full.max-w-[1920px].px-[6em].max-wf-tablet:px-[6vw].pt-[18em].pb-[5em]
  ├ div.my-[4.2em].text-center.…mt-0.flex.justify-center.max-wf-phone:flex-col   [1152.03 × 182.91 @ y 7935.59]
  │ └ div.…mt-0.w-auto > h2.font-headline.text-[6.125em].leading-[1.4].font-semibold.text-black.max-wf-mini:text-[5.1em].text-center
  │     "Want to access our Practical Guide of Employee Recognition?"   65.3333px / 91.4666px / 600 / serif
  ├ div.my-[4.2em].text-center.max-wf-mini:my-[3.5em]                            [1152.03 × 222.14 @ y 8163.30]
  │ └ p.mx-auto.max-w-[59ch].text-center   699.22 × 222.14, 18.6667/31.7333, #000
  │     (2 paragraphs separated by <br><br>; ~44 words; second sentence is wrapped in <strong>.
  │      Content: an offer summary plus "fill in the form and we'll email you a PDF". Write
  │      equivalent copy of the same length — do not transcribe.)
  └ div.mx-auto.mb-[1.6em].flex.w-full.max-w-[80ch].flex-col.gap-[10px]          [541.63 × 253.94 @ y 8430.23]
    └ form.flex.w-full.flex-col.justify-center.gap-[10px]
```
⚠ Note `max-w-[59ch]` on the paragraph — a **new container width** (699.22px @1280), not the `49ch`/580.714px of §4.4.
⚠ Note `max-w-[80ch]` on the form column — resolves to **541.63px** @1280.

**Lead-magnet form** (new; the §5.12 newsletter form is *also* present, in the footer):
| field | type | name | placeholder = aria-label | required |
|---|---|---|---|---|
| honeypot | text | `website` | — | no (`absolute -left-[9999px] size-px opacity-0`, `tabindex=-1`, `aria-hidden`) |
| source | **hidden** | `sourcePath` | — | — |
| 1 | text | `name` | `Name` | **yes** |
| 2 | email | `email` | `Email` | **yes** |
| 3 | text | `company` | `Company` | **yes** |
| submit | button | — | label **`Download`** | — |

Input class (all three visible fields identical):
`h-[3em] max-w-[49ch] rounded-[7px] border-2 border-black px-[0.9em] text-[1.75em] leading-[1.7] text-black placeholder:text-black/60`
→ measured **541.63 × 55.98**, `border-radius 7px` (all four corners, unlike the split newsletter field), `border 2px solid #000`, `padding-inline 16.8px`, text 18.6667/31.7333, placeholder `rgba(0,0,0,0.6)`. Note `max-w-[49ch]` = 580.714px is wider than the 541.63px column, so it never clips.
Submit: `h-[3em] rounded-[10px] bg-black px-[1.4em] text-[1.75em] leading-[1.7] font-bold text-white disabled:opacity-70` → **541.63 × 55.98**, radius **10px all round**, bg `#000`, label 18.6667/31.7333 weight 700 `#fff`.
Column gap between fields: `gap-[10px]` = **10px**. Wrapper `mb-[1.6em]` = 17.0667px.
States: reuse §5.12 `useMarketingForm` (pending → disabled + `opacity .70` + `Please wait...`; done → `FormDone` leaf panel "Thank you!"; error → 1px-border `FormError`).

### 2.8 Responsive (article, measured)

| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| root | 12px | 10.6667px | 8.25833px | 8.25833px |
| prose container | 933.36 | 829.64 | 642.33 | **343.22** (hits the content box) |
| h1 | 73.5 / 109.515, 219px tall | 65.333 / 97.347, 194.66 | 50.582 / 75.368, 150.72 | 32.2075 / 47.989, 143.91 |
| LinkCard | 503.98 × 438.64 | 447.98 × 390.30 | 346.84 × 303.13 (`42em` of the frozen 8.25833px root) | 343.22 × 303.13 (`max-wf-mini:max-w-full`) |
| doc height | 10372 | **9265** | 8592 | 11067 |

⚠ At 768 the `w-[42em]` cards are **346.84px** and the `gap-[3em]` flex-wrap row still fits only one per line (content box 675.84) — so the 4-card cluster becomes 1 column with a 24.77px gap, centred.

### 2.9 Motion (article)
- Divider band: §7.2 `DIVIDER_LEAVES`, unchanged (12 leaves, 1500ms, ease `cubic-bezier(0.455,0.03,0.515,0.955)`, from `[0,yEm]`, no stagger).
- RelatedCard: §7.2 `CARD_LEAVES`, unchanged.
- Nothing else animates. No scroll-linked progress bar, no sticky TOC, no reveal on the prose. No `useScroll` on this route.

### 2.10 Links on the article template
Internal (keep): `/blog` (badge), every in-prose `/blog/{slug}`, `/employee-recognition`, `/employee-recognition-messages/{topic}`, `/employee-recognition/glossary`, `/company-values`, `/pricing`, `/schedule-a-demo`, `/contact`.
Off-domain (**strip / render inert**): `https://app.evergreen.so/api/slack/install`, `https://app.evergreen.so/api/teams/install`, `https://arketta.app/?utm_source=evergreen&utm_medium=blog-cta&utm_campaign=waitlist` (the C2 CTA, `target=_blank`), plus the banner's `https://arketta.app/?…utm_medium=banner…`.

---

## 3. TEMPLATE C — Alternatives index (`/alternatives`)

`<title>` `Evergreen as an Alternative to Other Recognition Tools | Evergreen` · canonical `https://www.evergreen.so/alternatives`
meta description: `Fair, dated comparisons of Evergreen with Bonusly, Nectar, HeyTaco, Kudos and other employee recognition platforms: pricing, strengths, gaps and who each suits.`
Screenshot: `alts-1280-top.png`.

### 3.1 Section map (1280). Document height **5774px**; `main` 1280 × 5186.86 at y 76.59.

| # | Role | Element | y | height | bg | padding |
|---|---|---|---|---|---|---|
| A | Nav | §5.2 | 0 | 76.59 | cream | — |
| B | Hero section | `section.relative.bg-cream` → wrapper `…pb-[5em]` | 44.61 | 4082.02 | `#fffff3` | `0 64px 53.3333px` |
| B0 | badge + h1 + intro | `div.pt-[10.2em]` | 44.61 | 435.98 | | `pt 108.8px` |
| B1 | **Comparison card grid** (15 cards) | `div.my-[4.2em]…flex.justify-center` → `ul.flex.w-full.flex-wrap.justify-center.gap-[3em]` | 525.39 | **3032.77** | | `margin-block 44.8px` |
| B2 | "What Evergreen is" heading | `div.my-[4.2em]…` → `div.w-[70.3em]` → `h2` | 3602.95 | 71.03 | | |
| B3 | 2-card link grid (`/pricing`, `/employee-recognition`) | `ul.flex…gap-[3em]` | 3718.78 | 309.72 | | |
| C | Leaf divider band | §7.2 DIVIDER_LEAVES | 4094.64 | 161.98 | — | `w-[120em]`, `-mt-[3em]` |
| D | Final CTA (cream-dark) | identical to homepage §1 H | 4224.64 | 1038.81 | `#edede2` | `192px 64px 53.3333px` |
| E | Footer §5.13 | | 5263.45 | ~511 | cream | |

Section D is byte-for-byte the homepage final CTA: 3 icon columns (`icon-usersvg-f5e0ab.svg` 31.30×34.61, `icon-supportsvg-bc4096.svg` 31.14×34.61, `icon-timesvg-4c8791.svg` 34.61×34.61, each in `span.mb-[1em].flex.h-[3.24544em]`), `h2` "Start feeling good about work" (65.3333/91.4666, `w-[51em]`=543.98), small-print `p.text-[1.4375em]` "No credit card needed • No setup costs", `Start 14 Day Trial` pill 212.92×56.39 radius 40.5px, Slack/Teams links. **Reuse §1 H / §5.4 / §8 H unchanged.**

### 3.2 Head block strings
- Badge: **`Employee recognition guide`** → `/employee-recognition` (badge span 465.86 × 63.73).
- `h1`: **`Comparing recognition tools`** — 65.3333 / 97.3466 / 600 / serif, 1151.98 × 97.33.
- Intro paragraph block `div.my-[4.2em]` → `p.mx-auto.max-w-[49ch].text-center`, **580.70 × 95.20**, 18.6667 / 31.7333 / 400 / `#000`, 31 words / 3 lines:
  > One page per platform. Each names what the other product does well, where it falls short, how Evergreen differs, and the date the pricing was read. Nothing here is a ranking.

### 3.3 Listing grid

`ul.flex.w-full.flex-wrap.justify-center.gap-[3em]` — **gap 32px row and column**, container 1152.03 wide.
Card = the shared **LinkCard** (§4.3): `li.relative.z-[100].w-[42em].list-none.rounded-[10px].border-2.border-black.bg-white.p-[2.4em].max-wf-mini:max-w-full`.

| | value @1280 |
|---|---|
| card width | `w-[42em]` = **447.98px** |
| columns | **2** at 1280 and 1440; **1** at 768 and 390 |
| row gap / col gap | **32px / 32px** (`gap-[3em]`) |
| card padding | **25.6px** (`p-[2.4em]`) |
| card border / radius / bg | `2px solid #000` / `10px` / **`#ffffff`** |
| card heights (variable, content-driven) | 338.05 (2-line title) · 390.30 (3-line title) · 309.72 (short) · 200.75 (no excerpt) |
| row pitch | card height + 32 |
| **no leaves** | the alternatives-index cards have **no** `pointer-events-none` leaf span (unlike the blog rows and RelatedCards) |
| last row | 15 cards → 7 full rows of 2 + 1 centred card (`justify-center` → x 416) |

Card internals (all centred, `text-align: center`):
| part | spec |
|---|---|
| `a.no-underline` | wraps the whole card content; `text-decoration: none` |
| `h2` (index) / `h3` (when inside an article) | `font-headline text-[3.5em] leading-[1.4] font-semibold text-black` → **37.3333 / 52.2666 / 600 / serif / #000**, width 392.80, 2 lines 104.50 / 3 lines 156.75 |
| excerpt `p` | `my-[1em] text-[1.5625em]` → **16.6667 / 28.3333 / 400 / #000**, `margin-block 16.6667px`, 3 lines 113.31 / 4 lines 84.98 |
| CTA `p` | `mt-[0.5em] text-[1.75em] font-semibold` → **18.6667 / 31.7333 / 600 / #000**, `margin-top 9.33333px`, label **`Read the comparison`** (31.73px tall) |
| hover | **none** (see §0.4) |

**Pagination / load-more / filters / tags: NONE.** 15 cards rendered in one list, alphabetical by slug.

### 3.4 Card list (verbatim titles + hrefs + CTA label)

| # | href | card title | CTA |
|---|---|---|---|
| 1 | `/alternatives/achievers` | Achievers Alternative: Evergreen vs Achievers | Read the comparison |
| 2 | `/alternatives/assembly` | Assembly Alternative: Evergreen vs Assembly | Read the comparison |
| 3 | `/alternatives/awardco` | Awardco Alternative: Evergreen vs Awardco | Read the comparison |
| 4 | `/alternatives/bonusly` | Bonusly Alternative: Evergreen vs Bonusly | Read the comparison |
| 5 | `/alternatives/bucketlist` | Bucketlist Alternative: Evergreen vs Bucketlist Rewards | Read the comparison |
| 6 | `/alternatives/cooleaf` | Cooleaf Alternative: Evergreen vs Cooleaf | Read the comparison |
| 7 | `/alternatives/guusto` | Guusto Alternative: Evergreen vs Guusto | Read the comparison |
| 8 | `/alternatives/heytaco` | HeyTaco Alternative: Evergreen vs HeyTaco | Read the comparison |
| 9 | `/alternatives/karma-bot` | Karma Alternative: Evergreen vs Karma | Read the comparison |
| 10 | `/alternatives/kudos` | Kudos Alternative: Evergreen vs Kudos | Read the comparison |
| 11 | `/alternatives/matter` | Matter Alternative: Evergreen vs Matter | Read the comparison |
| 12 | `/alternatives/motivosity` | Motivosity Alternative: Evergreen vs Motivosity | Read the comparison |
| 13 | `/alternatives/nectar` | Nectar Alternative: Evergreen vs Nectar | Read the comparison |
| 14 | `/alternatives/workhuman` | Workhuman Alternative: Evergreen vs Workhuman | Read the comparison |
| 15 | `/alternatives/worktango` | WorkTango Alternative: Evergreen vs WorkTango | Read the comparison |

Card excerpts are 23–31 words (mean ≈ 26) — write equivalent copy, do not transcribe.

Section B2/B3 ("What Evergreen is"): h2 **`What Evergreen is`** (`w-[70.3em]`=749.86, 48/71.04), then 2 LinkCards:
| href | title | excerpt words | CTA |
|---|---|---|---|
| `/pricing` | Pricing | 22 | See pricing |
| `/employee-recognition` | Employee recognition: the complete guide | 21 | Read the guide |

### 3.5 Responsive (index)
| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| card width | 503.98 | 447.98 | 346.84 | 343.22 |
| columns | 2 | 2 | 1 | 1 |
| h1 | 73.5/109.515 | 65.333/97.347 | 50.582/75.368 | 32.2075/47.989 |
| doc height | 6491 | **5774** | 6749 | 7674 |

### 3.6 Motion (index)
Only the divider band's 12 `DIVIDER_LEAVES` (§7.2). **The cards do not animate and are not staggered** — no leaf span, no transform, no opacity.

---

## 4. TEMPLATE D — Comparison detail (`/alternatives/{competitor}`, 15 routes)

Sampled: `/alternatives/bonusly` (doc **9086px**), `/alternatives/heytaco` (doc **9103px**). Structure identical.
Screenshots: `alt-1280-top-glance.png`, `alt-1280-faq-sources.png`.

### 4.0 ⚠ There is no comparison `<table>`

**The "comparison table" does not exist as a table.** No `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` anywhere on any sampled `/alternatives/*` page, and no `.marketing-table` CSS rule exists in the stylesheet. There are **no tick/cross icons**, **no zebra striping**, **no row borders**, **no column widths**.
What plays that role is a pair of components:
- a **SpecList** (`<dl>`) — leaf-bulleted term/definition rows (§4.4), used twice (competitor at-a-glance; how Evergreen differs);
- a **LeafBulletList** (`<ul>`) — leaf-bulleted statements (§4.5), used twice (strengths; shortfalls).

**There are also no competitor logos.** The only images on these routes are the three shared pricing icons, the Slack/Teams marks, and the leaf SVGs — all already in `public/assets`. Nothing to download for the 15 comparison pages.

### 4.1 Section map (DOM order, 1280) — `/alternatives/bonusly`

`main` 1280 × 8498.11 at y 76.59.

| # | Role | Element / class | y | height |
|---|---|---|---|---|
| A | Nav | §5.2 | 0 | 76.59 |
| B | **Cream section** | `section.relative.bg-cream` → wrapper `…pb-[5em]` | 44.61 | **7393.27** |
| B0 | Head: badge `Alternatives` → `/alternatives`, h1, subtitle | `div.pt-[10.2em]` | 44.61 | 435.98 |
| B1 | H2 `{Competitor} at a glance` | `…flex.justify-center` → `div.w-[70.3em]` → `h2` | 525.39 | 71.03 |
| B2 | **SpecList** (`dl`, 3 rows) | `div.my-[4.2em]` → `dl.mx-auto.w-[70.3em].text-left` | 641.22 | 378.84 |
| B3 | **Prose body** | `div.marketing-rich-text.mx-auto.max-w-[77.78em]` | 1064.86 | 1767.13 |
| B4 | H2 `Where {Competitor} is strong` | heading block | 2876.78 | 71.03 |
| B5 | **LeafBulletList** (5 items) | `div.my-[4.2em]` → `ul.mx-auto.w-[70.3em].text-left.list-none` | 2992.61 | 402.66 |
| B6 | H2 `Where it falls short` | heading block | 3440.06 | 71.03 |
| B7 | LeafBulletList (4 items) | same | 3555.89 | 317.86 |
| B8 | H2 `How Evergreen differs` | heading block | 3918.55 | 71.03 |
| B9 | **SpecList** (`dl`, 4 rows) | same as B2 | 4034.38 | 534.81 |
| B10 | H2 `Verdict` | heading block | 4613.98 | 71.03 |
| B11 | Verdict paragraph | `div.my-[4.2em]` → `div.mx-auto.w-[70.3em].text-left` → `p` | 4729.81 | 158.67 |
| B12 | H2 `Questions people ask` | heading block | 4933.28 | 71.03 |
| B13 | **FAQ list** (`dl`, 3 rows) | `div.my-[4.2em]` → `dl.mx-auto.w-[70.3em].text-left` | 5049.11 | 843.91 |
| B14 | H2 `Sources` | heading block | 5937.81 | 71.03 |
| B15 | **Sources list + note** | `div.mx-auto.w-[70.3em].text-left` → `ul.list-none` + `p.text-[1.4375em]` | 6053.64 | 221.66 |
| B16 | H2 `Where recognition happens` | heading block | 6320.09 | 71.03 |
| B17 | 2 LinkCards (`/pricing`, `/employee-recognition`) | `ul.flex…gap-[3em]` | 6435.92 | 309.72 |
| B18 | H2 `Other comparisons` | heading block | 6790.44 | 71.03 |
| B19 | 3 LinkCards → sibling `/alternatives/*` | `ul.flex…gap-[3em]` | 6906.27 | 433.48 |
| C | Leaf divider band | §7.2 | 7405.89 | 161.98 |
| D | Final CTA (cream-dark) | **identical to homepage §1 H** | 7535.89 | 1038.81 |
| E | Footer §5.13 | | 8574.70 | ~511 |

Every heading block is the same wrapper:
`div.my-[4.2em].text-center.max-wf-mini:my-[3.5em].flex.justify-center.max-wf-phone:flex-col > div.w-[70.3em].max-wf-mini:mt-[3em].max-wf-mini:w-auto.mx-auto.mt-0.max-wf-phone:w-auto > h2.font-headline.text-[4.5em].leading-[1.48].font-semibold.text-black.max-wf-mini:text-center.max-wf-mini:text-[3.9em].text-center`
→ **749.86 × 71.03** (1 line) / 142.06 (2 lines); h2 **48px / 71.04px / 600 / serif / #000**, centred.

Head block strings:
- Badge **`Alternatives`** → `/alternatives` (263.45 × 63.73).
- `h1` = `{Competitor} Alternative: Evergreen vs {CompetitorFull}` (65.3333 / 97.3466; 1 line for Bonusly, 2 for HeyTaco at 768).
- Subtitle `div.my-[4.2em]` → `p.mx-auto.max-w-[49ch].text-center`, **580.70 × 95.20**, 18.6667 / 31.7333, 23–27 words, 3 lines.
- **No date element** on the comparison template — the "as read on {date}" is written inline inside the Pricing spec row.

### 4.2 Prose body (B3)
Exactly the same `.marketing-rich-text` container and CSS as §2.3 (829.64px @1280). Content observed: **4 × `h2` + 8 × `p`** on both samples, strictly alternating `h2, p, p` groups. Section headings, verbatim (structural):
`What {Competitor} is` · `Who it suits` · `How the two products treat a thank-you` · `What switching involves`
Paragraphs 54–87 words. Inline links: 1–2 per section, internal (`/employee-recognition`, `/pricing`, `/company-values`, `/esg`, `/employee-recognition-messages`), styled per §2.3 inline `a` (18.6667px, lh 1, weight 600, underline).

### 4.3 Verdict / Sources
- **Verdict** block: `div.mx-auto.w-[70.3em].text-left.max-wf-mini:max-w-full` → single `p` **749.86 × 158.67**, 18.6667 / 31.7333 / 400 / `#000`, `text-align: left`, 62 words / 5 lines.
- **Sources** block: `div.mx-auto.w-[70.3em].text-left` containing
  - `ul.list-none` (749.86 × 158.91) of `li.mb-[1em]` (**margin-bottom 10.6667px**, each 749.86 × 31.73) → `p` → `a[href=<external>]` 18.6667px / lh 18.6667 / weight 600, **underlined**, `#000`. 4 items on Bonusly, 3 on HeyTaco. All **off-domain** (competitor marketing pages) → keep inert in the clone.
  - then `p.mx-auto.max-w-[49ch].text-center.text-[1.4375em]` **477.08 × 52.09**, **15.3333px / 26.0667px / 400 / #000**, centred — a short "spotted something out of date? → `evergreen.so/contact`" note containing an internal `a[href="/contact"]` (15.3333px, lh 15.3333, weight 600, underlined).

### 4.4 Related blocks (B16–B19)
Both are `ul.flex.w-full.flex-wrap.justify-center.gap-[3em]` of LinkCards (§5.3 below), identical geometry to the alternatives index (447.98px wide, 25.6px padding, 32px gap, white, 2px black, 10px radius, no hover, no leaves).
- `Where recognition happens` → 2 cards: `/pricing` ("Evergreen pricing" / `See pricing`), `/employee-recognition` ("Employee recognition: the complete guide" / `Read the guide`). Heading tag inside the card here is **`h3`**. Cards 309.72 tall.
- `Other comparisons` → **3 cards**, titles = sibling comparison titles, CTA `Read the comparison`, **no excerpt paragraph** → cards only **200.75** tall; 3 cards wrap 2 + 1 (third centred at x 416).

### 4.5 Responsive (comparison)
| | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| prose container | 933.36 | 829.64 | 642.33 | 343.22 |
| `w-[70.3em]` column (SpecList / bullets / verdict / FAQ) | 843.59 | **749.86** | **580.55** | **343.22** (`max-wf-mini:max-w-full`) |
| h1 | 73.5/109.515 | 65.333/97.347 | 50.582/75.368 (2 lines) | 32.2075/47.989 |
| LinkCard | 503.98 wide | 447.98 | 346.84 | 343.22 |
| doc height | 10218 | **9086** | 7551 | 10356 |

### 4.6 Motion (comparison)
Only the divider band (§7.2 `DIVIDER_LEAVES`). No card leaves, no stagger, no scroll-linked anything.

---

## 5. NEW components (not in CLONE_SPEC §5)

### 5.1 `EyebrowBadge` — ⚠ the only new hover state on the whole site

Used on `/blog/*` (label `Blog` → `/blog`), `/alternatives` (`Employee recognition guide` → `/employee-recognition`), `/alternatives/*` (`Alternatives` → `/alternatives`).

```html
<p class="mb-[1.4em] text-center">
  <a href="{href}" class="no-underline">
    <span class="inline-flex items-center rounded-full border-2 border-black bg-leaf text-center text-black
                 px-[1.1em] py-[0.35em] text-[1.4375em] font-semibold gap-[0.5em]
                 transition-colors hover:bg-white">
      <img src="/assets/ever-small-leafsvg-e988d6.svg" alt="" class="w-[0.9em] shrink-0">
      {label}
    </span>
  </a>
</p>
```
| prop | measured @1280 |
|---|---|
| span font-size | `text-[1.4375em]` of the surrounding `p` (18.6667px) → **26.8333px** |
| line-height | 26.8333px (1) | 
| weight / colour | **600** / `#000000` |
| background | `#beedc0` (`bg-leaf`) |
| border | **2px solid #000000** |
| border-radius | `rounded-full` → computed `3.35544e7px` (use `9999px`) |
| padding | `0.35em 1.1em` of 26.8333px → **9.39166px 29.5167px** |
| gap | `0.5em` = 13.42px |
| leaf icon | `w-[0.9em]` → rendered **24.14 × 40.95** (overflows the 63.73px box; `items-center`) |
| measured sizes | `Blog` 159.48 × 63.73 · `Alternatives` 263.45 × 63.73 · `Employee recognition guide` 465.86 × 63.73 |
| wrapping `p` | `mb-[1.4em]` = **margin-bottom 26.1333px**, full width, centred |
| anchor | `no-underline` → `text-decoration: none` |
| **hover** | `transition-colors hover:bg-white` → `background-color: #ffffff` on hover, transition = Tailwind default **150ms `cubic-bezier(0.4, 0, 0.2, 1)`** on colour properties only. Inside `@media (hover:hover)`. |

### 5.2 `ArkettaCtaPanel` (blog articles only) — ⚠ breaks several §5 conventions

```html
<div class="flex min-h-[400px] flex-col items-center justify-center gap-[15px] rounded-[8px] bg-black
            px-[140px] py-[100px] text-center max-wf-mini:min-h-0 max-wf-mini:px-[20px] max-wf-mini:py-[40px]">
  <h2 class="font-headline text-[3em] leading-[2] font-semibold text-cream
             max-wf-mini:text-center max-wf-mini:text-[2.5em] max-wf-mini:leading-[1.5]">
    Tired of juggling multiple workplace apps?</h2>
  <div class="text-center text-[1.5em] leading-[1.8] text-cream"> … 6 <br>-separated lines … </div>
  <a href="https://arketta.app/?utm_source=evergreen&utm_medium=blog-cta&utm_campaign=waitlist" target="_blank"
     class="mt-[20px] rounded-[4px] bg-cream px-[40px] py-[9px] text-[1.5em] leading-[1.5] text-black no-underline">
    Read more</a>
</div>
```
| prop | value @1280 |
|---|---|
| panel | **1152.03 × 557.58** (full content width), `min-height: 400px`, bg `#000000` |
| radius | ⚠ **8px** — a new radius token, not 10px |
| padding | ⚠ **`100px 140px`** — **fixed px, not `em`**. Only place in the design system that does this. ≤479px: `40px 20px`. |
| gap | 15px (fixed px) |
| `h2` | `text-[3em] leading-[2]` → **32px / 64px**, weight 600, serif, colour **`#fffff3` (cream on black)**, 573.42 × 64, centred |
| body `div` | `text-[1.5em] leading-[1.8]` → **16px / 28.8px**, weight 400, Rubik, `#fffff3`, 727.86 × 201.58. Six short lines separated by `<br>`; ~55 words of Arketta cross-promo. Summarise, don't transcribe. |
| CTA `a` | **163.28 × 42**, `border-radius` ⚠ **4px**, bg **`#fffff3`**, padding `9px 40px` (fixed px), label **16px / 24px / weight 600 / `#000000`**, `no-underline`, `margin-top 20px` |
| hover | **none** on the panel or the button |
| off-domain | yes — `target="_blank"`; strip/inert in the clone, keep the label and geometry |
| ≤479px | `min-h-0`, padding `40px 20px`, h2 `2.5em`/`1.5` |

### 5.3 `LinkCard` (shared by B/C/D templates)

```html
<li class="relative z-[100] w-[42em] list-none rounded-[10px] border-2 border-black bg-white p-[2.4em] max-wf-mini:max-w-full">
  <a href="{href}" class="no-underline">
    <h2|h3 class="font-headline text-[3.5em] leading-[1.4] font-semibold text-black">{title}</h2>
    <p class="my-[1em] text-[1.5625em]">{excerpt}</p>          <!-- optional -->
    <p class="mt-[0.5em] text-[1.75em] font-semibold">{ctaLabel}</p>
  </a>
</li>
```
| prop | value @1280 |
|---|---|
| width | `w-[42em]` = **447.98px** |
| padding | `p-[2.4em]` = **25.6px** |
| radius / border / bg | **10px** / **2px solid #000000** / **#ffffff** |
| shadow | none |
| content width | **392.80px**; all text centred |
| title | 37.3333 / 52.2666 / 600 / ivypresto-headline / `#000` |
| excerpt | 16.6667 / 28.3333 / 400 / `#000`, `margin-block 16.6667px`; omit entirely for the "Other comparisons" variant |
| CTA | 18.6667 / 31.7333 / **600** / `#000`, `margin-top 9.33333px`; the anchor is `no-underline` so the CTA line is **not** underlined (unlike "Keep reading" / "Read blog", which are) |
| grid | parent `ul.flex.w-full.flex-wrap.justify-center.gap-[3em]`, gap **32px** |
| heights observed | 200.75 (title only) · 309.72 · 338.05 · 390.30 |
| hover / active | **none** |
| whole card clickable? | yes — the `<a>` wraps all three text nodes (but not the `li` padding box) |

### 5.4 `SpecList` (`<dl>`) — the "at a glance" / "how Evergreen differs" rows

```html
<dl class="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full">
  <div class="mb-[2.4em]">
    <dt class="flex items-center text-[2em] leading-[1.5] font-bold text-black">
      <img src="/assets/ever-small-leafsvg-e988d6.svg" alt="" class="mr-[0.45em] w-[0.8em] shrink-0">
      {term}
    </dt>
    <dd class="mt-[0.3em]"><p class="text-[1.75em] leading-[1.7]">{definition}</p></dd>
  </div>
  …
</dl>
```
| prop | value @1280 |
|---|---|
| list | `w-[70.3em]` = **749.86px**, `text-align: left`, `margin: 0 201.094px 0 201.078px` (auto-centred in the 1152.03 box) |
| row | `mb-[2.4em]` = **margin-bottom 25.6px** |
| `dt` | `text-[2em] leading-[1.5]` → **21.3333px / 32px**, weight **700**, Rubik, `#000000`; row box 749.86 × 31.98 |
| `dt` leaf | `w-[0.8em]` of 21.3333 → rendered **17.06 × 28.95**, `margin-right 9.6px` (`mr-[0.45em]`), `shrink-0` |
| `dd` | `mt-[0.3em]` = **margin-top 3.2px** |
| `dd > p` | `text-[1.75em] leading-[1.7]` → **18.6667px / 31.7333px**, weight 400, `#000000`, full 749.86 wide |
| rows observed | **3** on the competitor glance list (`Pricing`, `Best for`, `Website`) · **4** on "How Evergreen differs" (free-text terms) |
| borders / zebra / dividers | **none** |

Row labels, verbatim, for the "at a glance" list on every `/alternatives/*`:
`Pricing` · `Best for` · `Website`
(`Website` always resolves to a bare domain string, e.g. `bonusly.com`, rendered as plain text, **not** a link. `Pricing` ends with `(as read on {D Month YYYY})`.)

### 5.5 `LeafBulletList` (`<ul>`) — strengths / shortfalls

```html
<ul class="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full list-none">
  <li class="mb-[2em] flex items-start">
    <img src="/assets/ever-small-leafsvg-e988d6.svg" alt="" class="mt-[0.4em] w-[1.26708em] shrink-0">
    <p class="ml-[0.7em]">{statement}</p>
  </li>
  …
</ul>
```
| prop | value @1280 |
|---|---|
| list | 749.86 wide, `list-style: none`, left-aligned |
| `li` | `mb-[2em]` = **margin-bottom 21.3333px**, `display:flex; align-items:flex-start`, height 63.47 (2 lines) |
| leaf | `w-[1.26708em]` → **13.5 × 22.91**, `margin-top 4.26666px` |
| `p` | **18.6667 / 31.7333 / 400 / `#000`**, `margin-left 13.0667px` (`ml-[0.7em]`), width 723.30 |
| items observed | 5 (strong) and 4 (falls short) on Bonusly; 15–24 words each |

### 5.6 `FaqList` (`<dl>`) — "Questions people ask"

```html
<dl class="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full">
  <div class="mb-[3em]">
    <dt class="text-[2.5em] leading-[1.54] font-bold text-black">{question}</dt>
    <dd class="mt-[0.6em]"><p>{answer}</p></dd>
  </div>
  …
</dl>
```
| prop | value @1280 |
|---|---|
| row | `mb-[3em]` = **margin-bottom 32px**; row heights 174.39 / 183.72 / 215.45 |
| `dt` | `text-[2.5em] leading-[1.54]` → **26.6667px / 41.0667px**, weight **700**, Rubik, `#000000` — no leaf icon, 1 line 41.06 / 2 lines 82.13 |
| `dd` | `mt-[0.6em]` = **margin-top 6.4px** |
| `dd > p` | **18.6667 / 31.7333 / 400 / `#000`**, 36–59 words |
| rows | **3** per page |
| accordion? | **no** — fully expanded static `<dl>`, no `<details>`, no JS toggle, no icons |

### 5.7 `SourcesList`
`ul.list-none` → `li.mb-[1em]` (**margin-bottom 10.6667px**, 31.73 tall) → `p` → external `a` (18.6667px, lh 18.6667, weight 600, underlined, `#000`). Followed by the 15.3333px centred contact note (§4.3).

### 5.8 `DateLine`
See §2.2. `div.my-[5em].flex.w-full.items-center.justify-center > span.flex.flex-col.items-start > time.text-left`, time **10.6667px / 17.0667px / 400 / `#333333`**.

### 5.9 `LeadMagnetForm`
See §2.7.

---

## 6. New typographic roles (not in CLONE_SPEC §3.3)

All at 1280 (`1em` = 10.6667px). `letter-spacing: normal` on every one (verified).

| Role | Selector | em | px @1280 | line-height | weight | family | colour |
|---|---|---|---|---|---|---|---|
| Card title (LinkCard / blog card / RelatedCard) | `.font-headline.text-[3.5em].leading-[1.4]` | 3.5em | **37.3333** | 52.2666 | 600 | headline serif | `#000000` |
| Card excerpt | `p.text-[1.5625em]` | 1.5625em | **16.6667** | 28.3333 | 400 | Rubik | `#000000` |
| Card CTA label | `p.mt-[0.5em].text-[1.75em].font-semibold` | 1.75em | 18.6667 | 31.7333 | 600 | Rubik | `#000000` |
| Rich-text `h2` | `.marketing-rich-text h2` | 4.5em | **48** | **57.6 (1.2)** | 600 | headline serif | `#000000` |
| Rich-text `h2.rich-text-h1` | same | 6.125em | 65.3333 | 97.35 (1.49) | 600 | serif | `#000000` |
| Rich-text `h3` | `.marketing-rich-text h3` | 2.5em | **26.6667** | 41.0667 (1.54) | **700** | **Rubik** | `#000000` |
| Rich-text `h4` | `.marketing-rich-text h4` | 1.88em | 20.0533 | 28.07 (1.4) | 700 | Rubik | `#000000` |
| Rich-text list item | `.marketing-rich-text :is(ul,ol)` | 1.75em | 18.6667 | 31.7333 | 400 | Rubik | **`#333333`** |
| **Blockquote** | `.marketing-rich-text blockquote` | 2.3125em | **24.6667** | **41.9333 (1.7)** | **500** | Rubik | `#000000` (inner `p`) |
| Inline `code` | `.marketing-rich-text code` | 1em | 18.6667 | 31.7333 | 400 | **`ui-monospace`** | `#000000` |
| Figure caption | `.marketing-rich-text figcaption` | 1em of container | **10.6667** | 17.0667 (1.6) | 400 | Rubik | `#333333` |
| Article date | `time` | 1em | **10.6667** | 17.0667 | 400 | Rubik | **`#333333`** |
| Eyebrow badge label | `span.text-[1.4375em].font-semibold` | 1.4375em (of a 1.75em `p`) | **26.8333** | 26.8333 (1) | 600 | Rubik | `#000000` |
| SpecList term | `dt.text-[2em].leading-[1.5].font-bold` | 2em | **21.3333** | 32 | 700 | Rubik | `#000000` |
| FAQ question | `dt.text-[2.5em].leading-[1.54].font-bold` | 2.5em | 26.6667 | 41.0667 | 700 | Rubik | `#000000` |
| Arketta CTA heading | `h2.font-headline.text-[3em].leading-[2]` | 3em | **32** | **64 (2)** | 600 | headline serif | **`#fffff3`** |
| Arketta CTA body | `div.text-[1.5em].leading-[1.8]` | 1.5em | **16** | 28.8 | 400 | Rubik | **`#fffff3`** |
| Arketta CTA button label | `a.text-[1.5em].leading-[1.5]` | 1.5em | 16 | 24 | 600 (from §3.2 `a`) | Rubik | `#000000` |
| Sources contact note | `p.text-[1.4375em]` | 1.4375em | 15.3333 | 26.0667 | 400 | Rubik | `#000000` |

New width tokens: **`max-w-[77.78em]`** (prose, 829.653px @1280), **`max-w-[59ch]`** (699.22px @1280, lead-magnet paragraph), **`max-w-[80ch]`** (541.63px @1280, lead-magnet form column), **`w-[95.2213em]`** (1015.69px, blog row), **`w-[42em]`** (447.98px, LinkCard), **`w-[70.3em]`** (749.86px, SpecList/bullets/FAQ/verdict + all comparison h2 blocks — already a homepage token, reused).
New radii: **8px** (Arketta panel), **4px** (Arketta button). Everything else is 10px / 7px / 40.5px / 30px / 9999px as per §2.

---

## 7. Motion inventory (measured, all four templates)

| Element | Route(s) | Trigger | Property | From → To | Duration | Easing | Delay / stagger |
|---|---|---|---|---|---|---|---|
| Blog row leaves (3/row × 53) | `/blog` | `whileInView {once:true, amount:0}` | `transform` translate | §7.2 `CARD_LEAVES` `from:[7,8]`/`[1,8]`/`[10,1]` em → `0,0` | **1300 / 1500 / 1000 ms** | `cubic-bezier(0.455,0.03,0.515,0.955)` | **0, none** |
| RelatedCard leaves (3/card × 2) | `/blog/*` | same | same | same | same | same | **0, none** |
| Divider-band leaves (12) | `/blog/*`, `/alternatives`, `/alternatives/*` | same | same | §7.2 `DIVIDER_LEAVES`, `from:[0,yEm]` | **1500 ms** | same | **0, none** |
| EyebrowBadge | all content routes | `:hover` inside `@media (hover:hover)` | `background-color` | `#beedc0` → `#ffffff` | **150 ms** (Tailwind `--default-transition-duration`) | `cubic-bezier(0.4,0,0.2,1)` | 0 |
| Nav/footer links | all | `:hover` | `text-decoration` | none → underline | instant | — | — |
| Hamburger bars (≤991) | all | state | `transform` | §5.3 | 200 ms | `cubic-bezier(0.4,0,0.2,1)` | — |
| Mobile menu overlay | all | open/close | `translateY` | §7.6 | 1000 / 500 ms | §7.6 OPEN/CLOSE_EASE | — |

**Explicitly absent on all four templates:** listing-grid card stagger, card entrance animation, scroll-progress bar, sticky TOC, parallax, `useScroll`/`useSpring` (the hero scroll track of §7.3 is homepage-only), accordion transitions, image fades, marquee.
Reduced-motion block from §7 applies unchanged.

---

## 8. Assets

**Downloaded this run: 61 files, 0 failures**, all into `/Users/riyaghosh/V3/evergreen/public/assets/` with original filenames, fetched from `https://www.evergreen.so/marketing/<filename>`. Folder went 36 → 119 files (5.6 MB).

| group | count | usage | rendered size / fit |
|---|---|---|---|
| Blog hero images | **52 unique** (53 cards; `employee-recognition-5c8c5b.webp` used twice) | `/blog` card image column, and the `og:image` source name on `/blog/{slug}` | **503.84 × 426.66 @1280, `object-fit: cover`**; intrinsics 1224–1600 px wide, aspect 0.63–0.72 |
| In-article figure images | **9** (`untitled-9…18`, `ideas-employee-recognition-ca3a7d.webp`) | `.marketing-rich-text figure > img` | **497.75–497.77px wide** (`figure{max-width:60%}`), height from intrinsic aspect, `object-fit: fill` (default) |
| Already present, reused | `ever-small-leafsvg-e988d6.svg`, `ever-regular-leafsvg-1b92f2.svg`, `leaf-smallersvg-6114e8.svg`, `leaf-spikesvg-7a4672.svg`, `icon-usersvg-f5e0ab.svg`, `icon-supportsvg-bc4096.svg`, `icon-timesvg-4c8791.svg`, `slacksvg-1b4e41.svg`, `teamssvg-b74fd1.svg`, `evergreen-logosvg-216cd4.svg` | nav, leaves, final CTA, SpecList/LeafBullet markers | per §5 / §7.1 |

Per-file URL → local → usage mapping is the blog table in §1.5 (`heroImage` column); source URL = `https://www.evergreen.so/marketing/<heroImage>`, local path = `/assets/<heroImage>`.

**Not downloadable / not present:**
- **Competitor logos: none exist.** No `/alternatives/*` page renders any competitor mark. Do not invent them.
- `og:image` derivatives live at `https://www.evergreen.so/marketing/og/{basename}.jpg` and are never rendered in the page — fetch only if the build emits real OG tags.
- No video, no `.video-embed` instance occurred in the three sampled articles (the CSS hook exists; support it but no asset is needed).

Rendering attributes to replicate: blog card images `loading="lazy" decoding="async" alt=""`; leaves `loading="lazy" decoding="async" aria-hidden alt=""`; `ever-small-leafsvg` inside badges/CTAs/bullets is **eager** (`loading` resolves to `auto`).

---

## 9. Data contracts

### 9.1 `BlogPost` (53 instances)

```ts
type BlogPost = {
  slug: string;              // required, kebab-case, route = `/blog/${slug}`
  title: string;             // required, 30–61 chars; used in <h1>, index card <h2>, related-card <h2>, <title> = `${title} | Evergreen`
  excerpt: string;           // required, 10–25 words; index card + related-link copy only
  heroImage: string;         // required, "<file>.webp" in /assets; index card + og:image basename
  heroImageAlt: string;      // always "" in the original
  date: string;              // required, ISO "YYYY-MM-DD" -> rendered "D Month YYYY" (en-GB)
  metaDescription: string;   // required, 1 sentence
  showBanner: true;          // articles always render the announcement banner
  body: Block[];             // required, ordered, free-form
  guideCluster?: {           // OPTIONAL (absent on e.g. /blog/evergreen-product-update-q1-2023)
    heading: string;         // e.g. "Part of the employee recognition guide"
    cards: LinkCardData[];   // 4 observed
  };
  moreArticles: {            // always present
    heading: "More articles";
    cards: { slug: string; title: string; ctaLabel: "Read blog" }[];  // exactly 2
  };
  // NOT present anywhere in the original: author, authorAvatar, readTime,
  // category, tags, tableOfContents, shareLinks, updatedAt.
};

type Block =
  | { t:'h2';   text:string; variant?:'rich-text-h1' }
  | { t:'h3'|'h4'; text:string }
  | { t:'p';    html:string }                       // may contain <a>, <strong>, <code>, <br>
  | { t:'ul'|'ol'; items:string[] }                 // items are html strings
  | { t:'blockquote'; html:string }
  | { t:'figure'; src:string; alt:string; caption?:string }
  | { t:'table'; … }                                // UNSTYLED in the original — avoid
  | { t:'hr' }                                      // UNSTYLED in the original — avoid
  | { t:'videoEmbed'; html:string };                // .video-embed hook exists, unused
```
Constants (not per-instance): the eyebrow badge (`Blog` → `/blog`), the Arketta CTA panel, the lead-magnet section — all identical on every article.

### 9.2 `BlogIndex`
```ts
{ h1: "Evergreen Blog";
  metaDescription: string;
  posts: Array<Pick<BlogPost,'slug'|'title'|'excerpt'|'heroImage'>>;  // 53, hand-ordered
  showBanner: false; showDivider: false; showFinalCta: false; }
```

### 9.3 `Alternative` (15 instances)

```ts
type Alternative = {
  slug: string;                  // "bonusly" … route `/alternatives/${slug}`
  competitor: string;            // "Bonusly"     — used in headings
  competitorFull?: string;       // "Bucketlist Rewards" when the title differs from `competitor`
  title: string;                 // "Bonusly Alternative: Evergreen vs Bonusly"  (h1 + index card + <title>)
  subtitle: string;              // 23–27 words, max-w-[49ch] centred
  metaDescription: string;
  cardExcerpt: string;           // 23–31 words, index card only
  glance: SpecRow[];             // exactly 3: term "Pricing" | "Best for" | "Website"
  body: Block[];                 // 4 h2 + 8 p; headings are fixed:
                                 //   "What {competitor} is", "Who it suits",
                                 //   "How the two products treat a thank-you", "What switching involves"
  strengths: string[];           // LeafBulletList, 4–5 items, heading "Where {competitor} is strong"
  shortfalls: string[];          // LeafBulletList, 4 items, heading "Where it falls short"
  differs: SpecRow[];            // SpecList, 4 rows, heading "How Evergreen differs"
  verdict: string;               // single paragraph, ~62 words, heading "Verdict"
  faq: { q: string; a: string }[];       // 3, heading "Questions people ask"
  sources: { label: string; href: string }[];  // 3–4, ALL off-domain
  relatedComparisons: string[];  // 3 sibling slugs, heading "Other comparisons"
  showBanner: false;
  // NOT present: competitorLogo, comparisonTable, ratings, pricing matrix, tick/cross cells.
};
type SpecRow = { term: string; definition: string };  // definition may contain inline <a>
```
Fixed strings shared by all 15: section headings above; CTA labels `Read the comparison`, `See pricing`, `Read the guide`; `Where recognition happens` block (2 fixed LinkCards → `/pricing`, `/employee-recognition`); the final homepage CTA section.

### 9.4 `AlternativesIndex`
```ts
{ badge: { label: "Employee recognition guide", href: "/employee-recognition" },
  h1: "Comparing recognition tools",
  intro: string,                        // 31 words, verbatim in §3.2
  items: Array<Pick<Alternative,'slug'|'title'|'cardExcerpt'>>,  // 15, alphabetical by slug
  trailing: { heading: "What Evergreen is", cards: [ {href:'/pricing',title:'Pricing',cta:'See pricing'},
                                                      {href:'/employee-recognition',title:'Employee recognition: the complete guide',cta:'Read the guide'} ] },
  showBanner: false; showDivider: true; showFinalCta: 'homepage'; }
```

---

## 10. Links inventory

**Internal (keep live):** `/`, `/blog`, `/blog/{53 slugs}`, `/alternatives`, `/alternatives/{15 slugs}`, `/employee-recognition`, `/employee-recognition/glossary`, `/employee-recognition-messages`, `/employee-recognition-messages/project-completion`, `/employee-recognition-messages/helping-a-colleague`, `/employee-recognition-messages/incident-response`, `/employee-recognition-messages/sharing-knowledge`, `/company-values`, `/pricing`, `/esg`, `/contact`, `/schedule-a-demo`, `/case-studies`, `/our-purpose`, `/referral`, `/terms-of-service`, `/privacy-policy`.

**Off-domain (strip / render inert, keep the visible label and geometry):**
`https://app.evergreen.so/api/slack/install` · `https://app.evergreen.so/api/teams/install` · `https://app.evergreen.so/login` ·
`https://arketta.app/?utm_source=evergreen&utm_medium=banner&utm_campaign=waitlist` (banner) ·
`https://arketta.app/?utm_source=evergreen&utm_medium=blog-cta&utm_campaign=waitlist` (article CTA) ·
`https://www.linkedin.com/company/evergreenapp/` · `https://twitter.com/AppEvergreen` · `mailto:teemu@evergreen.so?subject=Email%20from%20website` ·
`https://folksoft.notion.site/Help-Center-…` ·
per-competitor Sources links, e.g. `https://bonusly.com/pricing`, `https://bonusly.com/features/product-overview`, `https://bonusly.com/product/rewards`, `https://bonusly.com/integrations/slack`, `https://heytaco.com/pricing`, `https://heytaco.com/how`, `https://heytaco.com/`.

---

## 11. Creative-reinterpretation notes & fragile spots

1. **Display serif.** The original is `ivypresto-headline` 600 (Typekit, kit-bound). The clone uses self-hosted **Gloock** with `size-adjust: 92.44%`; expect ≤1.2% advance-width drift. Fragile wraps to eyeball after build:
   - `/blog` card `h2` at **37.3333px in a 420.53px column** — 10 of the 53 titles sit within ~3% of a line break (worst: #5 "15 ways to give a coworker a shoutout (with templates)" and #14). A 1.2% widening flips some 2-line titles to 3 lines. Card height is image-driven so **layout will not break**, only the copy block's vertical centring shifts.
   - LinkCard `h3` at 37.3333px in **392.80px** — "Bucketlist Alternative: Evergreen vs Bucketlist Rewards" and "Employee recognition: the complete guide" are both near a break; card heights here *are* content-driven, so row heights in the flex-wrap grid will shift. Acceptable; the grid is `flex-wrap`, not a fixed `grid-template`.
   - Comparison `h1` at 65.3333px with `max-w-[49ch]` (1981.52px of serif → effectively unconstrained): "Bucketlist Alternative: Evergreen vs Bucketlist Rewards" is the longest and already wraps to 2 lines at 1280.
   - Rich-text `h2` at **48px / line-height 1.2** inside the 829.64px prose column — tight leading means a serif swap can visibly change 2-line heading block heights (57.59 → 115.19).
2. **`49ch` behaves differently on serif vs sans.** `h1.max-w-[49ch]` computes to **1981.52px** because `ch` is measured in the *headline serif*; the same class on a `<p>` gives 580.714px. Keep the `ch` unit and let the font decide — do not substitute px.
3. **Server actions.** Both the lead-magnet form (`name`/`email`/`company`/`sourcePath`) and the footer newsletter post to Next.js server actions with no public endpoint. Build client-side with the four §5.12 states and a stub submit.
4. **`--blog-card-tablet-width`** is referenced but never defined. Implement the ≤991 card as plain `w-full`.
5. **`<table>` and `<hr>` in rich text are unstyled** in the original. If the build's representative copy introduces either, it will render with raw UA defaults — matching the original, but ugly. Prefer not to use them.
6. **Two routes deliberately drop the announcement banner** (`/blog`, `/alternatives`, `/alternatives/*`). This shifts every y-offset by 51.74px relative to `/blog/*`. Do not "normalise" it.
7. The **`#ffffff` card background** is new to the content templates and is the strongest visual difference from the homepage's cream-on-cream cards (§5.7). Keep it white.
