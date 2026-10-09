import LeafDivider from '../components/LeafDivider.jsx'
import TrialButton from '../components/TrialButton.jsx'
import PriceCard from '../components/PriceCard.jsx'
import IconFeatureColumn from '../components/IconFeatureColumn.jsx'
import Testimonials from '../components/Testimonials.jsx'
import LogoStrip from '../components/LogoStrip.jsx'
import G2Block from '../components/G2Block.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { BLOCK } from '../lib/classes.js'

// Route "/pricing" — CLONE_SPEC_CORE_A Part 1. Doc height 3115 @1280.
//
// Section map (CORE_A §1.1):
//   A  hero + price card + reassurance trio   y   44.61  h 1280.80  bg #fffff3
//   B  leaf divider, band `bg-cream`          y 1293.42  h  161.98
//   C  testimonials + logo strip + G2         y 1423.42  h 1180.84  bg #edede2
//                                             padding pt-[15em] pb-[10em]
//   D  footer — rendered by Layout, NOT here.
//
// NO announcement banner on this route (CORE_A §0) — Layout's BANNER_ROUTES
// already excludes /pricing; nav starts at y=0.
//
// There is NO tier grid, NO monthly/annual toggle, NO FAQ, NO comparison table
// (CORE_A Part 1 preamble). Single flat price.
//
// NO gradients, NO box-shadows, NO hover/active/focus states anywhere except
// the `hover:underline` that Nav/Footer already own (CORE_A §0).
//
// Motion: left in initial state for the Animation agent — 3 CARD_LEAVES
// (1300/1500/1000ms) inside <PriceCard/> and 12 DIVIDER_LEAVES (1500ms) inside
// <LeafDivider/>, all `marketing-drift-leaf`. The 12 QUOTE_LEAVES behind the
// testimonial cards are STATIC and must never animate. No scroll-tracked
// motion, no recognition line, no heart on this route (CORE_A §1.7).

// CORE_A §1.5 — the three reassurance columns, copy verbatim from §1.9.
const FEATURE_COLUMNS = [
  {
    icon: '/assets/icon-usersvg-f5e0ab.svg',
    heading: 'Only pay for active users',
    body: 'active users are only those who have interacted with Evergreen. Admins can manage these users from the dashboard.',
  },
  {
    icon: '/assets/icon-supportsvg-bc4096.svg',
    heading: 'Contact us any time',
    body: 'We’re always at hand here at Evergreen. If you still have questions please visit our help centre or email us directly',
  },
  {
    icon: '/assets/icon-timesvg-4c8791.svg',
    heading: 'Always striving to be fair',
    body: 'Cancel your subscription at any time, no credit card needed for signup, and no setup costs.',
  },
]

// Slack / Teams install links. Both hrefs are app.evergreen.so (off-domain) and
// are therefore stripped — anchors render with NO href, markup otherwise intact.
const PLATFORM_LINKS = [
  { key: 'slack', src: '/assets/slacksvg-1b4e41.svg', label: 'Slack' },
  { key: 'teams', src: '/assets/teamssvg-b74fd1.svg', label: 'Teams' },
]

// CORE_A §1.3 — same component as the homepage, different people/logos, and the
// company logo is `w-[19.4941em]` (207.92px) instead of `w-[7.96em]` (85px).
// Card 1's avatar keeps its static `scale-[1.2] ml-[1.4em]` crop (CORE_A §9/§5).
const TESTIMONIALS = [
  {
    avatar: '/assets/t3png-ee95a1.webp',
    imgClassName: 'ml-[1.4em] h-[90%] scale-[1.2]',
    quote: '“We already had a very close team but Evergreen has brought us closer.”',
    name: 'Brian Schryer',
    role: 'CEO',
    logo: '/assets/logo-kent-and-whitepng-e559b5.webp',
    columnExtra: '',
  },
  {
    avatar: '/assets/t4png-f92ff9.webp',
    quote: '“Evergreen quickly helped transition us to a good peer recognition culture”',
    name: 'Sakir Temel',
    role: 'CTO',
    logo: '/assets/logo-coverwalletsvg-be24e9.svg',
    columnExtra: 'max-wf-tablet:mt-[14.4em] max-wf-tablet:mb-[5em]',
  },
]

// CORE_A §1.3 — same six-slot strip as the homepage, same inline em widths and
// order, but slot 5 is Fraktio instead of CoverWallet.
const LOGOS = [
  {
    src: '/assets/logo-harvardsvg-c5efb6.svg',
    alt: 'Harvard University Employees Credit Union logo',
    width: '17.1909em',
  },
  { src: '/assets/logo-nitrosvg-7a0f33.svg', alt: 'Nitro logo', width: '11.5931em' },
  { src: '/assets/logo-earnestsvg-2634ab.svg', alt: 'Earnest Ice Cream logo', width: '8.79133em' },
  { src: '/assets/logo-octopussvg-a91e19.svg', alt: 'Octopus Energy logo', width: '19.4863em' },
  { src: '/assets/logo-fraktiosvg-19b008.svg', alt: 'Fraktio logo', width: '11.6417em' },
  { src: '/assets/logo-hifyresvg-64f8d6.svg', alt: 'Hifyre logo', width: '13.6854em' },
]

export default function Pricing() {
  return (
    <>
      {/* ===== A — hero + price card + reassurance trio. y 44.61, h 1280.80 ===== */}
      <section className="relative bg-cream">
        {/* wrapper padding is `0 64px` — no py on this section (CORE_A §1.1) */}
        <div className={SECTION_WRAPPER}>
          {/* block 0 — H1 only. y 44.61, h 206.13 (108.8px pad + 1 line @97.35) */}
          <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
            <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:flex max-wf-phone:w-full max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:w-auto">
              <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
                Fair pricing, massive impact
              </h1>
            </div>
          </div>

          {/* block 1 — sub-paragraph, `max-w-[60ch]` = 711.08px. y 295.53, h 31.73 */}
          <div className={BLOCK}>
            <p className="mx-auto max-w-[60ch] text-center">
              Active user-only pricing, top support, and always striving for fair pricing
            </p>
          </div>

          {/* block 2 — price card (§1.4). y 372.06, h 325.41 */}
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <PriceCard />
          </div>

          {/* block 3 — TrialButton + small print. y 742.27, h 124.47 */}
          <div className={`${BLOCK} flex flex-col items-center justify-center`}>
            <TrialButton />
            <div className="mt-[1.5em]">
              <p className="mx-auto max-w-[49ch] text-center text-[1.4375em]">
                No credit card needed • No setup costs • During trial we don’t plant real trees,
                but you can skip your trial from the admin dashboard.
              </p>
            </div>
          </div>

          {/* block 4 — Slack / Teams install links. y 911.53, h 37.06 */}
          <div
            className={`${BLOCK} mt-0 max-wf-mini:mt-0 flex justify-center max-wf-phone:flex-col`}
          >
            <div className="flex items-center justify-center max-wf-mini:flex-col">
              {PLATFORM_LINKS.map((link) => (
                <a
                  key={link.key}
                  /* external install link removed */
                  className="mx-[3.5em] flex items-center font-normal no-underline max-wf-mini:mb-[2.2em] max-wf-mini:text-[1.3em]"
                >
                  <span className="mr-[1em] flex w-[3.47539em] items-center justify-center">
                    <img src={link.src} alt="" aria-hidden="true" className="h-auto w-full" />
                  </span>
                  <span className="text-[1.4375em]">
                    add to <strong className="font-bold">{link.label}</strong>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* block 5 — 3 serif IconFeatureColumns (§1.5). y 1033.92, h 291.48 */}
          <div
            className={`${BLOCK} mb-0 max-wf-mini:mb-0 mt-[8em] flex justify-around max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:mt-[8em]`}
          >
            {FEATURE_COLUMNS.map((col) => (
              <IconFeatureColumn key={col.heading} {...col} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== B — leaf divider. Band matches the section ABOVE → bg-cream ===== */}
      <LeafDivider band="bg-cream" />

      {/* ===== C — testimonials + logo strip + G2. y 1423.42, h 1180.84.
           Padding is `pt-[15em] pb-[10em]`, NOT the homepage's 18em/5em. ===== */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pt-[15em] pb-[10em]`}>
          <Testimonials items={TESTIMONIALS} logoWidth="w-[19.4941em]" />
          <LogoStrip logos={LOGOS} />
          <G2Block />
        </div>
      </section>
    </>
  )
}
