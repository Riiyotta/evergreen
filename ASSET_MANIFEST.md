Source: https://www.evergreen.so/

# Asset manifest — Evergreen homepage

Local root: `/Users/riyaghosh/V3/evergreen/public/assets/` → serve as `/assets/<filename>`.
Original root: `https://www.evergreen.so/marketing/<filename>`.
Rendered sizes are measured at **1280px** viewport (root em = 10.6667px). `object-fit` is the default `fill` on every image — nothing is cropped; sizing is always `w-full h-auto`, `h-full w-auto`, or an explicit `em` width with auto height.

## Present in `public/assets` (all 32 homepage images)

| # | Local filename | Original URL (prefix `https://www.evergreen.so/marketing/`) | Intrinsic | Rendered @1280 | Used in | Sizing classes / attrs |
|---|---|---|---|---|---|---|
| 1 | `evergreen-logosvg-216cd4.svg` | `evergreen-logosvg-216cd4.svg` | 216 x 61 | 144 x 40 (nav); footer wrapper `16.0983em` = 171.7px | Nav logo link `/`; Footer logo link `/` | `h-auto w-full` inside `a.w-[13.471em]` (nav) / `a.w-[16.0983em]` (footer). Eager + preloaded. alt `Evergreen` |
| 2 | `ever-small-leafsvg-e988d6.svg` | `ever-small-leafsvg-e988d6.svg` | 21 x 36 | 14 x 23 | **10 instances**: nav ESG link, section-E "Sue earned 3 seeds", 7 feature bullets (3 in E, 4 in F), footer newsletter prompt. Also mobile-menu ESG row. | `mr-[0.7em] w-[1.26708em]` (nav/seed); `mt-[0.4em] w-[1.26708em] shrink-0 max-wf-mini:mb-[0.9em] max-wf-mini:w-[2em]` (bullets); `mt-[0.4em] ml-[0.7em] w-[1.26708em] …` (footer). Eager + preloaded. `aria-hidden` |
| 3 | `ever-regular-leafsvg-1b92f2.svg` | `ever-regular-leafsvg-1b92f2.svg` | 116 x 199 | `7.10621em x 12.308em` = 75.8 x 131.3 | **44 instances**: 12 hero leaves, 2 x 9 divider leaves, 2 x 3 card leaves, 2 x 6 quote leaves | inline `width:7.10621em;height:12.308em;position:absolute` + per-leaf top/left/right/bottom/z/rotate (see CLONE_SPEC §7). `loading=lazy decoding=async aria-hidden` |
| 4 | `leaf-smallersvg-6114e8.svg` | `leaf-smallersvg-6114e8.svg` | 86 x 150 | `8.34021em x 14.7087em` = 89 x 156.9 | 4 instances (2 per divider band, `art:'small'`) | inline `width:8.34021em;height:14.7087em` |
| 5 | `leaf-spikesvg-7a4672.svg` | `leaf-spikesvg-7a4672.svg` | (no intrinsic; viewBox-only) | `1.20175em x 7.32222em` = 12.8 x 78.1 | 6 instances (3 per divider band, `art:'spike'`) | inline `width:1.20175em;height:7.32222em` |
| 6 | `a1png-5e2164.webp` | `a1png-5e2164.webp` | 361 x 324 | 116 x 104 | Hero avatar pill 1 (`top-[2.5em] left-[30.9em]`) | `h-auto w-full` + `width=361 height=324`. Eager + preloaded. alt `Person being recognised for good work` |
| 7 | `a2png-f0a2cf.webp` | `a2png-f0a2cf.webp` | 362 x 324 | 116 x 104 | Hero avatar pill 2 (`top-[11.5em] left-[62em]`, hidden ≤767px) | `h-auto w-full` + `width=362 height=324`, `loading=lazy decoding=async`. alt `Another person being recognised for good work` |
| 8 | `evergreen-recognition-demo-view-185a06.webp` | `evergreen-recognition-demo-view-185a06.webp` | 1600 x 1136 | **867 x 615** | Hero product screenshot | `relative z-20 w-full` + `width=1600 height=1136`, inside `div.w-[81.25em]`. Eager + preloaded. alt `A screenshot of a team using Evergreen to recognise each other while planting trees` |
| 9 | `green-heartsvg-200bb6.svg` | `green-heartsvg-200bb6.svg` | 42 x 37 | 28 x 25 | 2 hero recognition-heart overlays | `marketing-hero-heart absolute z-[202] h-[2.31476em] w-[2.64134em]` + inline `opacity:0`. Eager + preloaded. `aria-hidden` |
| 10 | `slacksvg-1b4e41.svg` | `slacksvg-1b4e41.svg` | 56 x 56 | 37 x 37 | 2 instances: hero platform links, final-CTA platform links (+ trial modal) | `h-auto w-full` inside `span.w-[3.47539em]`. Eager + preloaded. `aria-hidden` |
| 11 | `teamssvg-b74fd1.svg` | `teamssvg-b74fd1.svg` | 58 x 57 | 37 x 36 | same as above | `h-auto w-full` inside `span.w-[3.47539em]`. Eager + preloaded. `aria-hidden` |
| 12 | `t1png-cd91ac.webp` | `t1png-cd91ac.webp` | (webp, square portrait) | 122 wide, h auto, clipped by a 126x126 circle | Testimonial 1 avatar (Emilia Vesa) | `h-auto w-full` inside `span.size-[11.7918em].overflow-hidden.rounded-full.border-2.border-black.bg-leaf.items-end`, `loading=lazy decoding=async` |
| 13 | `t2png-2ed757.webp` | `t2png-2ed757.webp` | — | 122 wide | Testimonial 2 avatar (Andrew Wilson) | same as #12 |
| 14 | `logo-wunderdogsvg-62f3d4.svg` | `logo-wunderdogsvg-62f3d4.svg` | — | **85** wide | Company logo under testimonial 1 | `w-[7.96em]`, `loading=lazy decoding=async aria-hidden` |
| 15 | `logo-acmsvg-a35036.svg` | `logo-acmsvg-a35036.svg` | — | **85** wide | Company logo under testimonial 2 | `w-[7.96em]`, lazy, `aria-hidden` |
| 16 | `logo-harvardsvg-c5efb6.svg` | `logo-harvardsvg-c5efb6.svg` | — | **183 x 36** | Logo strip #1 | inline `style="width:17.1909em"`, lazy. alt `Harvard University Employees Credit Union logo` |
| 17 | `logo-nitrosvg-7a0f33.svg` | `logo-nitrosvg-7a0f33.svg` | — | **124 x 41** | Logo strip #2 | inline `style="width:11.5931em"`, lazy. alt `Nitro logo` |
| 18 | `logo-earnestsvg-2634ab.svg` | `logo-earnestsvg-2634ab.svg` | — | **94 x 38** | Logo strip #3 | inline `style="width:8.79133em"`, lazy. alt `Earnest Ice Cream logo` |
| 19 | `logo-octopussvg-a91e19.svg` | `logo-octopussvg-a91e19.svg` | — | **208 x 28** | Logo strip #4 | inline `style="width:19.4863em"`, lazy. alt `Octopus Energy logo` |
| 20 | `coverwallet-logo-31e933.svg` | `coverwallet-logo-31e933.svg` | — | **124 x 25** | Logo strip #5 | inline `style="width:11.6417em"`, lazy. alt `CoverWallet logo` |
| 21 | `logo-hifyresvg-64f8d6.svg` | `logo-hifyresvg-64f8d6.svg` | — | **146 x 37** | Logo strip #6 | inline `style="width:13.6854em"`, lazy. alt `Hifyre logo` |
| 22 | `logo-g2png-c53a3f.webp` | `logo-g2png-c53a3f.webp` | 194 x 194 | **64 x 64** | G2 rating block | `w-[6.03104em]`, lazy. alt `G2 logo` |
| 23 | `star1svg-303d31.svg` | `star1svg-303d31.svg` | 49 x 46 | **32 x 31** | 5 instances in the G2 star row | `mx-[1.14204em] w-[3.03685em]`, lazy, `aria-hidden` |
| 24 | `sn-2png-f6c14a.webp` | `sn-2png-f6c14a.webp` | 1105 x 1187 | **367 x 394** | Section E left visual | `relative z-20 w-full` inside `div.w-[34.4013em]`, lazy + preloaded. alt `A screen of an employee being recognised` |
| 25 | `sn-3png-556d34.webp` | `sn-3png-556d34.webp` | — | **417** wide | Section F left visual (reporting) | `relative z-20 w-full` inside `div.w-[39.1132em]`, lazy. alt `A screen showing a report of employee engagement` |
| 26 | `ever-badgepng-6b8d93.webp` | `ever-badgepng-6b8d93.webp` | — | **219** wide | Section F second row ("Fulfill your CSR…") | `-mt-[0.8em] w-[20.4952em]`, lazy. alt `A badge showing 20,000 trees planted` |
| 27 | `icon-usersvg-f5e0ab.svg` | `icon-usersvg-f5e0ab.svg` | 54 x 60 | **31 x 35** | Pricing column 1 ("Only pay for active users…") | `h-full w-auto` inside `span.h-[3.24544em]`. Eager + preloaded. `aria-hidden` |
| 28 | `icon-supportsvg-bc4096.svg` | `icon-supportsvg-bc4096.svg` | 52 x 57 | **31 x 35** | Pricing column 2 | same. Eager + preloaded |
| 29 | `icon-timesvg-4c8791.svg` | `icon-timesvg-4c8791.svg` | 52 x 52 | **35 x 35** | Pricing column 3 | same. Eager + preloaded |
| 30 | `icon-linkedinsvg-777cac.svg` | `icon-linkedinsvg-777cac.svg` | 27 x 27 | **18 x 18** | Footer social chip 1 | `h-[1.67015em] w-auto` inside `a.size-[4em].rounded-full.border-2.border-black.bg-cream-dark` (43x43). Eager + preloaded. `aria-hidden` |
| 31 | `icon-twittersvg-6d6f46.svg` | `icon-twittersvg-6d6f46.svg` | 31 x 27 | **21 x 18** | Footer social chip 2 | same. Eager + preloaded |
| 32 | `icon-emailsvg-1a80b8.svg` | `icon-emailsvg-1a80b8.svg` | 30 x 24 | **22 x 18** | Footer social chip 3 | same. Eager + preloaded |

## MISSING from `public/assets` — download these

| What | Full URL | Needed for | Suggested local name |
|---|---|---|---|
| Favicon | `https://www.evergreen.so/icon.png?icon.1rjukf3ieuvra.png` | `<link rel="icon">` | `public/icon.png` |
| Webex logo | `https://www.evergreen.so/marketing/webexpng-52e71f.webp` | "Coming soon" row inside the trial modal (`img.h-auto.w-full` in `span.w-[3.47539em]`, alt `Webex logo`) | `public/assets/webexpng-52e71f.webp` |
| Rubik latin woff2 — **only if self-hosting** instead of using Google Fonts | `https://www.evergreen.so/_next/static/media/c9f6ebf08ddd616b-s.p.0sv86lbjkn8rn.woff2` | body font, weights 400/500/600/700 all map to this latin subset file | `public/fonts/rubik-latin.woff2` |

Other Rubik subsets (Arabic, Cyrillic, Cyrillic-ext, Hebrew, latin-ext) exist at `https://www.evergreen.so/_next/static/media/{098850a6eb1f8577-s.1e7lfzpvfrh7f, 6dac7af80352e41b-s.1-avrnevmoafi, 21445b8bd0ec5702-s.1n1ntp5se85-_, 87c7f5b5afcd23bd-s.0kf5m0zv7sxld, d25394c5b8ff78eb-s.0ongx-zmnmtio}.woff2` — not needed for English content.

## Fonts

| Family | Source on the original | Weights used | Clone plan |
|---|---|---|---|
| **Rubik** | self-hosted woff2 via `next/font/google`, `font-display: swap` | 400, 500, 600, 700 | Google Fonts `family=Rubik:wght@400;500;600;700&display=swap`, or self-host the woff2 above |
| **Rubik Fallback** | generated metric-override face, `src: local("Arial")`, `ascent-override:89.06%`, `descent-override:23.81%`, `line-gap-override:0%`, `size-adjust:104.98%` | — | copy the `@font-face` verbatim (CLONE_SPEC §3.1) |
| **ivypresto-headline** | **Adobe Typekit**, kit-bound: `https://use.typekit.net/af/1382d4/00000000000000007735e5ad/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3`, `font-display: optional`, weight 600, `font-stretch:100%` | 600 | **Not redistributable.** Substitute a free high-contrast serif (Playfair Display 600 or EB Garamond 600) behind the `--font-headline` token. Declared fallback chain on the original: `ui-serif, Georgia, serif` |

## Not needed (preloaded by the live page for other routes)

`workletesvg-eb3abc.svg`, `logo-wunderdogsvg-a66a50.svg` (different hash from the homepage's `62f3d4`), `logo-kent-and-whitepng-139c7a.webp`, `logo-nitrosvg-4caa4a.svg` (homepage uses `7a0f33`), `a-price-1png-5e6ffc.webp`, `a-price-2png-1bdf4a.webp`, `ticksvg-589d98.svg`, `img-6223-7511ba.webp`, `sn-4apng-19e16a.webp`, `screen-report-split-2svg-008209.svg`, `icon-povertysvg-375091.svg`, `icon-youthsvg-db3447.svg`, `icon-environmentsvg-89f589.svg`, `icon-treesvg-fb7494.svg`, `leaf-smaller-reflectsvg-c42957.svg`, `company-1ddd00.svg`, `checked-a91d37.svg`.

## Reference screenshots

`/Users/riyaghosh/V3/evergreen/_reference/screenshots/`

| File | Contents |
|---|---|
| `1280-fullpage.png` | whole page at 1280 |
| `1280-01-banner.png` | announcement banner |
| `1280-02-nav.png` | desktop nav |
| `1280-03-hero-section.png` | hero + social-proof section (3151px tall) |
| `1280-04-divider.png` | leaf divider band |
| `1280-05-seeds.png` | "Publicly recognise your peers…" section |
| `1280-06-report-csr.png` | "Report on employee engagement…" + "Fulfill your CSR…" |
| `1280-07-cta.png` | pricing reassurance + final CTA |
| `1280-08-footer.png` | footer |
| `1280-09-stats.png` | four stat pills row |
| `1280-10-testimonials.png` | two testimonial cards + quote leaves |
| `1280-11-logostrip.png` | six-logo customer strip |
| `1280-12-g2.png` | G2 logo + stars + rating line |
| `390-fullpage.png` | whole page at 390 |
| `390-mobile-menu-open.png` | mobile nav overlay, open state |
