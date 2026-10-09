import { useParams } from 'react-router-dom'
import CalendlyCard from '../components/CalendlyCard.jsx'
import StatRow from '../components/StatRow.jsx'
import Testimonials from '../components/Testimonials.jsx'
import LogoStrip from '../components/LogoStrip.jsx'
import G2Block from '../components/G2Block.jsx'
import LeafLayer from '../components/LeafLayer.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import CtaSection from '../components/CtaSection.jsx'
import { CARD_LEAVES } from '../lib/leaves.js'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { BLOCK } from '../lib/classes.js'
import { PARTNERS } from '../data/partners.js'

// T-PARTNER — /partners/50pros, /partners/product-hunt,
// /partners/the-people-people-group.
//
// THIS IS THE HOMEPAGE with exactly four substitutions (CLONE_SPEC_CONTENT_B
// §0, §8):
//   1. a partner logo block above the H1,
//   2. a CalendlyCard where the hero product screenshot is,
//   3. one offer sentence appended to the hero paragraph,
//   4. one discount clause appended to the final-CTA small print.
// Plus two measured deltas the spec calls out: the hero h2 reads
// `8000+ users • 100,000+ recognitions` (the homepage says 300,000+), and the
// platform row gains a third item — **Mattermost** "Coming soon" (the homepage
// trial modal shows Webex) — with `gap-[4em]` on the row instead of
// `mx-[3.5em]` on each link.
//
// REUSE NOTE: Hero.jsx is owned by another agent and was NOT edited. This file
// is a sibling composition that reuses Hero's children (Testimonials,
// LogoStrip, G2Block, LeafLayer) and re-states the four blocks that live inline
// inside Hero (the H1 + avatar pills, the hero paragraph, the display h2, the
// eyebrow paragraph) plus its stat row (now StatRow.jsx). What I would want
// factored out of Hero.jsx later: `StatPill`/`STATS`, the `LOGOS` and
// `TESTIMONIALS` data arrays, the H1-with-avatar-pills block and the
// Slack/Teams platform row — Hero would then be a thin composition and this
// page a second configuration of it.
//
// Measured @1280 (50pros): docH 7868 (7868 / 7868 / 7893 across the three
// routes). Sections: hero 44.61 h 3424.19 · divider 3436.81 (band
// **bg-cream-dark**) · feature A 3566.81 h 1308.84 (bg-cream-dark) · divider
// 4843.67 (band **bg-cream-dark**) · feature B 4973.67 h 1220.45 (bg-cream) ·
// divider 6162.14 (band bg-cream) · CTA 6292.14 h 1064.86.
//
// MOTION: no recognition-line / heart overlays on this template (§11) — the
// hero image they sit on is replaced by the Calendly card. The only leaf layers
// are the hero set behind the Calendly card, the divider bands, the static
// QUOTE_LEAVES inside Testimonials and 3 CARD_LEAVES per feature visual.

// §3.3 "Big stat / proof heading".
const PROOF_HEADING =
  'text-[2.5em] leading-[1.54] font-bold text-black max-wf-phone:text-[2.4em]'

// §5.9 / §8 C — the same six-logo customer strip as the homepage, same inline
// `em` widths. (Duplicated from Hero.jsx's LOGOS — see the reuse note.)
const LOGOS = [
  {
    src: '/assets/logo-harvardsvg-c5efb6.svg',
    alt: 'Harvard University Employees Credit Union logo',
    width: '17.1909em',
  },
  { src: '/assets/logo-nitrosvg-7a0f33.svg', alt: 'Nitro logo', width: '11.5931em' },
  { src: '/assets/logo-earnestsvg-2634ab.svg', alt: 'Earnest Ice Cream logo', width: '8.79133em' },
  { src: '/assets/logo-octopussvg-a91e19.svg', alt: 'Octopus Energy logo', width: '19.4863em' },
  { src: '/assets/coverwallet-logo-31e933.svg', alt: 'CoverWallet logo', width: '11.6417em' },
  { src: '/assets/logo-hifyresvg-64f8d6.svg', alt: 'Hifyre logo', width: '13.6854em' },
]

// §5.7 / §8 C — the same two testimonials as the homepage.
const TESTIMONIALS = [
  {
    avatar: '/assets/t1png-cd91ac.webp',
    quote:
      '“Evergreen brings positive feedback into our everyday work lives, with green values.”',
    name: 'Emilia Vesa',
    role: 'Head Of People & Culture',
    logo: '/assets/logo-wunderdogsvg-62f3d4.svg',
    columnExtra: '',
  },
  {
    avatar: '/assets/t2png-2ed757.webp',
    quote: '“Casual, fun, positive with recognition that makes a real world difference.”',
    name: 'Andrew Wilson',
    role: 'Chief Of Staff',
    logo: '/assets/logo-acmsvg-a35036.svg',
    columnExtra: 'max-wf-tablet:mt-[14.4em] max-wf-tablet:mb-[5em]',
  },
]

// Slack / Teams / Mattermost row. All three install links are off-domain (§13)
// and render with NO href; Mattermost has no link at all — it is a
// "Coming soon" label. NOTE the links carry no `mx-[3.5em]` here: the row's
// `gap-[4em]` (42.667px) does the spacing (§8 item 6).
function PlatformRow() {
  return (
    <div className={`${BLOCK} mt-0 flex justify-center max-wf-mini:mt-0 max-wf-phone:flex-col`}>
      <div className="flex justify-center gap-[4em] max-wf-mini:flex-col">
        {[
          { src: '/assets/slacksvg-1b4e41.svg', alt: 'Slack logo', label: 'Slack' },
          { src: '/assets/teamssvg-b74fd1.svg', alt: 'Teams logo', label: 'Teams' },
        ].map((platform) => (
          <a
            key={platform.label}
            className="flex items-center font-normal no-underline max-wf-mini:mb-[2.2em] max-wf-mini:text-[1.3em]"
          >
            <span className="mr-[1em] flex w-[3.47539em] items-center justify-center">
              <img src={platform.src} alt={platform.alt} className="h-auto w-full" />
            </span>
            <span className="text-[1.4375em]">
              add to <strong className="font-bold">{platform.label}</strong>
            </span>
          </a>
        ))}
        {/* Mattermost — 37.06 x 37.06, no link, label "Coming soon" (§8). */}
        <div className="flex items-center max-wf-mini:mb-[2.2em] max-wf-mini:text-[1.3em]">
          <span className="mr-[1em] flex w-[3.47539em] items-center justify-center">
            <img
              src="/assets/mattermost-svg-file-ae25d1.svg"
              alt="Mattermost logo"
              className="h-auto w-full"
            />
          </span>
          <p className="text-[1.4375em]">Coming soon</p>
        </div>
      </div>
    </div>
  )
}

// The bare G2 rating group used inside feature section A's stat column.
// ⚠️ NOT <G2Block/>: that component carries the block wrapper
// (`my-[4.2em] mb-0`) plus `mt-[7em]`, which would add 119.47px here. The
// measured column (527.08px: 134.54 + 53.33 + 102.77 + 53.33 + 183.2) only fits
// the inner group, so the inner markup is restated. Factoring G2Block's inner
// out as its own export would remove this duplicate.
function G2Rating() {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/assets/logo-g2png-c53a3f.webp"
        alt="G2 review logo"
        loading="lazy"
        decoding="async"
        className="w-[6.03104em]"
      />
      <div className="mt-[1.95218em] mb-[2.45003em] flex">
        {[0, 1, 2, 3, 4].map((index) => (
          <img
            key={index}
            src="/assets/star1svg-303d31.svg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="mx-[1.14204em] w-[3.03685em]"
          />
        ))}
      </div>
      <p className="w-full text-center text-[2.5em] font-semibold leading-[1.54]">
        4.8 / 5 on G2 Reviews
      </p>
    </div>
  )
}

export default function PartnerPage() {
  const { slug } = useParams()
  const partner = PARTNERS[slug]
  if (!partner) return null

  return (
    <>
      {/* ── SECTION 1 — hero + social proof (homepage section C, modified) ── */}
      <section className="relative bg-cream">
        <div className={SECTION_WRAPPER}>
          <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
            {/* 1 — NEW: partner logo block. y 198.20. */}
            <div className={BLOCK}>
              <img src={partner.logo} alt={partner.logoAlt} className={partner.logoClass} />
            </div>

            {/* 2 — H1 + the 2 floating avatar pills, verbatim homepage markup. */}
            <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:flex max-wf-phone:w-full max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:w-auto">
              <span className="absolute top-[2.5em] left-[30.9em] flex h-[5.75094em] w-[11.2528em] items-end rounded-[46px] border-2 border-black bg-leaf max-wf-phone:static max-wf-phone:mb-[1.5em]">
                <img
                  src="/assets/a1png-5e2164.webp"
                  alt="Person being recognised for good work"
                  width="361"
                  height="324"
                  className="h-auto w-full"
                />
              </span>
              <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
                <span className="mr-[2.25em] max-wf-phone:mr-0">Recognise</span> good work in
                your team while doing good for{' '}
                <span className="ml-[2.25em] max-wf-phone:ml-0">the planet</span>
              </h1>
              <span className="absolute top-[11.5em] left-[62em] flex h-[5.75094em] w-[11.2528em] items-end rounded-[46px] border-2 border-black bg-leaf max-wf-tablet:top-[20.7em] max-wf-tablet:left-[25.1em] max-wf-phone:hidden">
                <img
                  src="/assets/a2png-f0a2cf.webp"
                  alt="Another person being recognised for good work"
                  width="362"
                  height="324"
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full"
                />
              </span>
            </div>

            {/* 3 — hero paragraph + <br><br> + the NEW offer sentence.
                 Measured 580.70 x 190.41 (6 lines). Note this page says
                 "recognition app" where the homepage says
                 "recognition software" — measured, not a typo. */}
            <div className={BLOCK}>
              <p className="mx-auto max-w-[49ch] text-center">
                Evergreen is the <strong>only</strong> peer-to-peer recognition app that lets
                teams recognise a job well done, while planting trees for the planet. For the
                ultimate positive, feel-good team culture.
                <br />
                <br />
                Schedule a free demo and{' '}
                <strong>get {partner.discountPct}% off from your first year</strong> by being{' '}
                {partner.offerSuffix}
              </p>
            </div>

            {/* 4 — NEW: Calendly card in place of the hero screenshot. */}
            <CalendlyCard />

            {/* 5 — h2 (not h3 as on the homepage) with the 100,000+ figure. */}
            <div className={`${BLOCK} mt-0 max-wf-mini:mt-0`}>
              <h2 className={PROOF_HEADING}>8000+ users • 100,000+ recognitions</h2>
            </div>

            {/* 6 — Slack / Teams / Mattermost row. */}
            <PlatformRow />

            {/* 7 — display h2, inner `mt-[7.4em] w-[70.3em]` (3 lines, 213.1px). */}
            <div
              className={`${BLOCK} mt-0 flex justify-center max-wf-mini:mt-0 max-wf-phone:flex-col`}
            >
              <div className="mt-[7.4em] w-[70.3em] max-wf-phone:w-full max-wf-mini:mt-[3em] max-wf-mini:w-auto">
                <h2 className="font-headline text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-center max-wf-mini:text-[3.9em]">
                  Plant trees to recognise your peers, while uniting your team around great
                  environmental purpose.
                </h2>
              </div>
            </div>

            {/* 8 — 4-stat pill row (§5.5 verbatim). */}
            <StatRow />

            {/* 9 — eyebrow paragraph, inner `mt-[8.9em] w-[49em]`. */}
            <div className={BLOCK}>
              <div className="mx-auto mt-[8.9em] w-[49em] max-wf-mini:w-auto">
                <p className="text-center text-[2.5em] font-semibold leading-[1.54]">
                  Used by leading companies wanting to improve team culture while furthering
                  their environmental and social programs
                </p>
              </div>
            </div>

            {/* 10 / 11 / 12 — testimonials, logo strip, G2 block: verbatim. */}
            <Testimonials items={TESTIMONIALS} />
            <LogoStrip logos={LOGOS} />
            <G2Block />
          </div>
        </div>
      </section>

      {/* ⚠️ §1/§11: the first TWO divider bands are bg-cream-dark on this
          template (they follow a cream-dark section), the third is bg-cream. */}
      <LeafDivider band="bg-cream-dark" />

      {/* ── SECTION 3 — "Create a positive company culture…" ─────────────── */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          <FeatureSection
            heading="Create a positive company culture through social recognition"
            copy={FEATURE_A_COPY}
            copyLink={{ href: '/', label: 'Learn more' }}
            image={{
              src: '/assets/sn-2png-f6c14a.webp',
              alt: 'A screen showing an employee being recognised',
            }}
            badge="Tagged Value: Grit"
            seedLine="Sue earned 3 seeds"
            right="stats"
          />
        </div>
      </section>

      <LeafDivider band="bg-cream-dark" />

      {/* ── SECTION 5 — "Support your business structure with clear reporting" */}
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          <FeatureSection
            heading="Support your business structure with clear reporting"
            copy="Administators and managers have access to extensive reports to understand how recognition is spreading across the team."
            image={{
              src: '/assets/sn-4apng-19e16a.webp',
              alt: 'Screen showing individual and team recognition',
            }}
            right="report"
          />
        </div>
      </section>

      <LeafDivider band="bg-cream" />

      {/* ── SECTION 7 — final CTA + the partner discount clause ──────────── */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          <CtaSection smallPrintSuffix={partner.ctaSmallPrintSuffix} />
        </div>
      </section>
    </>
  )
}

// ── The two mid-page feature sections ──────────────────────────────────────
// ⚠️ REINTERPRETATION, flagged in the handoff: CONTENT_B §8 prose says these
// are "the homepage's sections E and F verbatim". The raw measurement
// (_reference/recon-b/partner_50pros.json, blocks 3-5 and 8-10) shows a
// DIFFERENT arrangement of the same assets and copy: a centred display heading
// block, then a centred copy block (`div.text-center my-0 w-full`), then a
// two-column `mt-[9.5em] flex items-stretch justify-center` visual row — not
// the homepage's heading-in-the-right-column layout (SeedsSection /
// ReportCsrSection). The measurement is followed here, so SeedsSection and
// ReportCsrSection are NOT reused.
//
// Measured: heading block h 142.06 (2 lines) · copy block h 158.67 (5 lines, A)
// / 63.47 (2 lines, B) · visual row h 527.08 (A) / 533.89 (B).

// Homepage section E/F copy (§8 E/F of CLONE_SPEC); the exact partner-page
// wording beyond the first ~70 characters was truncated in the measurement, so
// the tail of each paragraph is representative. Marked, replaceable.
const FEATURE_A_COPY =
  'Evergreen is the only peer-to-peer recognition app that lets teams recognise a job well done while planting real trees for the planet. Timely recognition is posted to a public team channel, every member can distribute seeds each month, and company values can be tagged so you can see who is living them.'

function FeatureSection({ heading, copy, copyLink, image, badge, seedLine, right }) {
  return (
    <>
      {/* Centred display heading, inner column `w-[70.3em]` (749.86px). */}
      <div className={BLOCK}>
        <div className="mx-auto mt-0 w-[70.3em] max-wf-phone:w-auto max-wf-mini:mt-[3em] max-wf-mini:w-auto">
          <h2 className="font-headline text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-center max-wf-mini:text-[3.9em]">
            {heading}
          </h2>
        </div>
      </div>

      {/* Copy block — margin 0 (`my-0`), full width, centred. */}
      <div className="my-0 w-full text-center max-wf-mini:my-0">
        <p className="mx-auto max-w-[49ch] text-center">
          {copy}
          {copyLink ? (
            <>
              {' '}
              <a className="underline" href={copyLink.href}>
                {copyLink.label}
              </a>
            </>
          ) : null}
        </p>
      </div>

      {/* Two-column visual row. */}
      <div
        className={`${BLOCK} mt-[9.5em] flex items-stretch justify-center max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:mt-[9.5em]`}
      >
        {/* Left visual column — 34.4013em = 366.94px, 3 CARD_LEAVES behind it
            (initial pre-drift state; the drift is the Animation agent's). */}
        <div className="relative flex w-[34.4013em] flex-col items-center">
          <LeafLayer leaves={CARD_LEAVES} />
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="relative z-20 w-full"
          />
          {badge ? (
            <div className="my-[2.02566em] rounded-[10px] border-2 border-black bg-leaf px-[1.5em] py-[0.8em]">
              <p className="text-[1.625em] font-semibold leading-[1.54]">{badge}</p>
            </div>
          ) : null}
          {seedLine ? (
            <div className="flex items-center">
              <img
                src="/assets/ever-small-leafsvg-e988d6.svg"
                alt=""
                aria-hidden="true"
                className="mr-[0.7em] w-[1.26708em]"
              />
              <p className="text-[1.625em] font-semibold leading-[1.54]">{seedLine}</p>
            </div>
          ) : null}
        </div>

        {/* Right column — `ml-[6.91014em]` = 73.71px gap. */}
        <div className="ml-[6.91014em] flex flex-col items-center max-wf-phone:mt-[5em] max-wf-phone:ml-0">
          {right === 'stats' ? (
            <>
              {[
                { figure: '+100k', caption: 'peer-to-peer recognitions so far' },
                { figure: '+8k', caption: 'Evergreen users' },
              ].map((stat) => (
                <div key={stat.figure} className="mb-[5em] flex flex-col items-center">
                  {/* Display-size <p>, not a heading, in the original. */}
                  <p className="font-headline text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-[3.9em]">
                    {stat.figure}
                  </p>
                  {/* 162.13px = the measured caption box (162.1 x 63.5, i.e.
                      2 lines). ⚠️ `8.686em` here is em of the p's OWN 18.667px
                      font-size, not of the 10.667px root — every other `em` on
                      the page is root-em. The original's wrap source could not
                      be identified in the recon (its caption p carries no
                      max-width and the column measures 283.67px), so the
                      measured box is reproduced directly. */}
                  <p className="w-[8.686em] text-center">{stat.caption}</p>
                </div>
              ))}
              <G2Rating />
            </>
          ) : (
            <>
              {/* `w-[27.25em]` = 290.67px, measured 4 lines (126.9px). */}
              <div className="mb-[5em] w-[27.25em] max-w-full">
                <p>
                  Administators and managers have access to extensive reports to understand how
                  recognition is spreading.
                </p>
              </div>
              {/* Measured 367.98 x 205.36. `w-full` alone collapses this SVG
                  (it is sized by its width/height attributes, 504.24 x 281.40),
                  so the measured box is set explicitly: 34.5em = 368.0px. */}
              <img
                src="/assets/screen-report-split-2svg-008209.svg"
                alt="Image showing graph of team report"
                loading="lazy"
                decoding="async"
                className="mt-[13.9em] h-auto w-[34.5em] max-w-full max-wf-phone:mt-0"
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}
