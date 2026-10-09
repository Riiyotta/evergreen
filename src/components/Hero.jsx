import { useRef } from 'react'
import TrialButton from './TrialButton.jsx'
import LeafLayer from './LeafLayer.jsx'
import Testimonials from './Testimonials.jsx'
import LogoStrip from './LogoStrip.jsx'
import G2Block from './G2Block.jsx'
import { HERO_LEAVES } from '../lib/leaves.js'
import { BLOCK } from '../lib/classes.js'

// Section C — hero + social proof. 3151px tall @1280.
//
// Spec: CLONE_SPEC §1 row C + §1.1 (the 13-block inner list), §5.4 TrialButton,
// §5.5 stat pills, §5.6 hero avatar pills, §5.7 testimonial cards, §5.9 logo
// strip, §5.10 G2 block, §7.2 HERO_LEAVES / QUOTE_LEAVES, §7.3 scroll track,
// §8 "C — Hero + social proof".
//
// Every class string is transcribed verbatim from the saved original
// (_reference/Evergreen _ Give recognition and plant trees.html), which is the
// authority for markup structure. All lengths stay in `em` / `ch`.
//
// Section wrapper geometry (the -3em overlap + max-w-[1920px] px-[6em] container)
// is supplied by App.jsx; this component owns the inner pt-[10.2em] block.
//
// v3 TRANSLATION NOTES (original is Tailwind v4):
//  - `size-[11.7918em]` (testimonial avatar) exists in Tailwind v3.4 too, so it
//    is kept verbatim rather than expanded to h-/w- pairs.
//  - Logo-strip and leaf widths are inline `style` in the original (not classes);
//    kept as inline styles so the generated CSS matches.
// NO hover states, NO transitions, NO shadows, NO gradients anywhere (§2, §7.4).

// §3.3 "Big stat / proof heading" — h2/h3/stat-pill numbers.
const PROOF_HEADING =
  'text-[2.5em] leading-[1.54] font-bold text-black max-wf-phone:text-[2.4em]'

const HUBSPOT = null

// §8 C stats table — pill / caption / footnote href, in DOM order.
const STATS = [
  { pill: '69%', caption: 'of employees work harder when recognised', note: '1', href: HUBSPOT },
  { pill: '39%', caption: 'of employees don’t feel appreciated at work', note: '2', href: HUBSPOT },
  {
    pill: '14.9%',
    caption: 'lower turnover rates in teams with regular feedback',
    note: '3',
    href: HUBSPOT,
  },
  {
    pill: '65%',
    caption: 'of employees prefer non-cash incentives',
    note: '4',
    href: null,
  },
]

// §5.9 / §8 C — six-logo customer strip. Widths are inline em, alt text verbatim.
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

// §8 C — the two testimonials (§5.7 geometry).
const TESTIMONIALS = [
  {
    avatar: '/assets/t1png-cd91ac.webp',
    quote:
      '“Evergreen brings positive feedback into our everyday work lives, with green values.”',
    name: 'Emilia Vesa',
    role: 'Head Of People & Culture',
    logo: '/assets/logo-wunderdogsvg-62f3d4.svg',
    // Cards stack ≤991px; the second one gets the stacking margins (§5.7, §9).
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

// §5.5 — stat pill + caption column.
function StatPill({ pill, caption, note, href }) {
  return (
    <div className="flex w-[25em] flex-col items-center max-wf-phone:mx-[1em] max-wf-phone:w-[16em] max-wf-mini:mb-[4.6em]">
      <span className="mb-[1.2em] flex h-[5.75094em] w-[11.2528em] items-center justify-center rounded-[46px] border-2 border-black bg-leaf">
        <span className={`${PROOF_HEADING} text-center`}>{pill}</span>
      </span>
      <p className="mx-auto max-w-[49ch] text-center">
        {caption}
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="ml-[0.2em] no-underline"
        >
          <sup>{note}</sup>
        </a>
      </p>
    </div>
  )
}

export default function Hero() {
  // §7.3 — SCROLL TRACK HOOK FOR THE ANIMATION AGENT.
  // This ref is attached to the hero-image wrapper (block 4) and is the element
  // the original measures with:
  //   useScroll({ target: heroScrollTrackRef, offset: ['start end', 'end start'] })
  //   useSpring(scrollYProgress, { stiffness: 144, damping: 24, mass: 1 })
  // The wrapper also carries `data-scroll-track="hero"` as a secondary hook.
  // It drives: the 6 `.marketing-scroll-leaf` leaves, the 2
  // `.marketing-recognition-line` spans and the 2 `.marketing-hero-heart` imgs.
  const heroScrollTrackRef = useRef(null)

  return (
    <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
      {/* ---- block 0 — H1 + 2 floating avatar pills (§5.6). y 205, h 195 ---- */}
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
          <span className="mr-[2.25em] max-wf-phone:mr-0">Recognise</span> good work in your team
          while doing good for <span className="ml-[2.25em] max-wf-phone:ml-0">the planet</span>
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

      {/* ---- block 1 — sub-paragraph. y 445, h 95 ---- */}
      <div className={BLOCK}>
        <p className="mx-auto max-w-[49ch] text-center">
          Evergreen is the <strong>only</strong> peer-to-peer recognition software that lets teams
          recognise a job well done, while planting trees for the planet. For the ultimate
          positive, feel-good team culture.
        </p>
      </div>

      {/* ---- block 2 — "Start 14 Day Trial" (§5.4). y 585, h 56 ---- */}
      <div className={BLOCK}>
        <TrialButton />
      </div>

      {/* ---- block 3 — H2 trees planted. y 686, mb-0 ---- */}
      <div className={`${BLOCK} mb-0 max-wf-mini:mb-0`}>
        <h2 className={PROOF_HEADING}>+500 000 trees planted by teams</h2>
      </div>

      {/* ---- block 4 — hero product screenshot + 12 leaves + 2 line/heart pairs.
           y 743, h 615. This wrapper IS the scroll track (§7.3) and also the em
           context for the overlays (§10.8): max-wf-phone:text-[0.6em] rescales
           the whole layer, so the lines/hearts must stay children of this div. */}
      <div
        ref={heroScrollTrackRef}
        data-scroll-track="hero"
        className="relative mx-auto my-[1.5em] w-[81.25em] text-center max-wf-phone:my-[3.9em] max-wf-phone:text-[0.6em] max-wf-mini:my-[9.2em] max-wf-mini:w-[56em]"
      >
        {/* 12 HERO_LEAVES: 6 `marketing-drift-leaf` (whileInView), 6
            `marketing-scroll-leaf` (driven by the ref above). Rendered here in
            their initial transforms — the animation agent animates x/y → 0. */}
        <LeafLayer leaves={HERO_LEAVES} />

        <img
          src="/assets/evergreen-recognition-demo-view-185a06.webp"
          alt="A screenshot of a team using Evergreen to recognise each other while planting trees"
          width="1600"
          height="1136"
          className="relative z-20 w-full"
        />

        {/* Pair 1 — line draw [0.35, 0.45], heart reveal 0.40 (§7.3).
            Initial state (scaleX(0) / opacity 0) comes from .marketing-recognition-line
            and .marketing-hero-heart in index.css — no inline style needed. */}
        <span
          aria-hidden="true"
          className="marketing-recognition-line absolute z-[201] block h-[1.5px] origin-left bg-black max-wf-tablet:h-px top-[7.5em] left-[38.0042em] w-[26.9152em] max-wf-mini:top-[5em] max-wf-mini:left-[26.2em] max-wf-mini:w-[18.5em]"
        />
        <img
          src="/assets/green-heartsvg-200bb6.svg"
          alt=""
          aria-hidden="true"
          className="marketing-hero-heart absolute z-[202] h-[2.31476em] w-[2.64134em] top-[6.5em] left-[50.123em] max-wf-mini:top-[4em] max-wf-mini:left-[34.223em]"
        />

        {/* Pair 2 — line draw [0.42, 0.52], heart reveal 0.47 (§7.3). */}
        <span
          aria-hidden="true"
          className="marketing-recognition-line absolute z-[201] block h-[1.5px] origin-left bg-black max-wf-tablet:h-px top-[34.5765em] left-[38.0042em] w-[26.9152em] max-wf-mini:top-[22.8765em] max-wf-mini:left-[26.2em] max-wf-mini:w-[18.5em]"
        />
        <img
          src="/assets/green-heartsvg-200bb6.svg"
          alt=""
          aria-hidden="true"
          className="marketing-hero-heart absolute z-[202] h-[2.31476em] w-[2.64134em] top-[33.5383em] left-[50.123em] max-wf-mini:top-[22.0383em] max-wf-mini:left-[34.223em]"
        />
      </div>

      {/* ---- block 5 — H3 users/recognitions. y 1374, mt-0 ---- */}
      <div className={`${BLOCK} mt-0 max-wf-mini:mt-0`}>
        <h3 className={PROOF_HEADING}>8000+ users • 300,000+ recognitions</h3>
      </div>

      {/* ---- block 6 — Slack / Teams install links. y 1460, h 37 ---- */}
      <div className={`${BLOCK} mt-0 max-wf-mini:mt-0 flex justify-center max-wf-phone:flex-col`}>
        <div className="flex items-center justify-center max-wf-mini:flex-col">
          <a
            /* external install link removed */
            className="mx-[3.5em] flex items-center font-normal no-underline max-wf-mini:mb-[2.2em] max-wf-mini:text-[1.3em]"
          >
            <span className="mr-[1em] flex w-[3.47539em] items-center justify-center">
              <img
                src="/assets/slacksvg-1b4e41.svg"
                alt=""
                aria-hidden="true"
                className="h-auto w-full"
              />
            </span>
            <span className="text-[1.4375em]">
              add to <strong className="font-bold">Slack</strong>
            </span>
          </a>
          <a
            /* external install link removed */
            className="mx-[3.5em] flex items-center font-normal no-underline max-wf-mini:mb-[2.2em] max-wf-mini:text-[1.3em]"
          >
            <span className="mr-[1em] flex w-[3.47539em] items-center justify-center">
              <img
                src="/assets/teamssvg-b74fd1.svg"
                alt=""
                aria-hidden="true"
                className="h-auto w-full"
              />
            </span>
            <span className="text-[1.4375em]">
              add to <strong className="font-bold">Teams</strong>
            </span>
          </a>
        </div>
      </div>

      {/* ---- block 7 — display H2. y 1542, h 292, inner mt-[7.4em] w-[70.3em] ---- */}
      <div className={`${BLOCK} mt-0 max-wf-mini:mt-0 flex justify-center max-wf-phone:flex-col`}>
        <div className="mt-[7.4em] w-[70.3em] max-wf-phone:w-full max-wf-mini:mt-[3em] max-wf-mini:w-auto">
          <h2 className="font-headline text-[4.5em] leading-[1.48] font-semibold text-black max-wf-mini:text-center max-wf-mini:text-[3.9em] text-center">
            Plant trees to recognise your peers, while uniting your team around great environmental
            purpose.
          </h2>
        </div>
      </div>

      {/* ---- block 8 — 4 stat pills as 2 halves x 2 (§5.5). y 1903, mt-[6.5em] ---- */}
      <div
        className={`${BLOCK} flex justify-around max-wf-phone:flex-col max-wf-phone:items-center mt-[6.5em] max-wf-mini:mt-[6.5em]`}
      >
        <div className="flex w-1/2 justify-around max-wf-phone:w-full">
          {STATS.slice(0, 2).map((stat) => (
            <StatPill key={stat.note} {...stat} />
          ))}
        </div>
        <div className="flex w-1/2 justify-around max-wf-phone:w-full max-wf-phone:mt-[7em] max-wf-mini:mt-[3em]">
          {STATS.slice(2).map((stat) => (
            <StatPill key={stat.note} {...stat} />
          ))}
        </div>
      </div>

      {/* ---- block 9 — eyebrow paragraph. y 2136, inner mt-[8.9em] w-[49em] ---- */}
      <div className={BLOCK}>
        <div className="mx-auto mt-[8.9em] w-[49em] max-wf-mini:w-auto">
          <p className="text-[2.5em] leading-[1.54] font-semibold text-center">
            Used by leading companies wanting to improve team culture while furthering their
            environmental and social programs
          </p>
        </div>
      </div>

      {/* ---- block 10 — 2 testimonial cards (each with 6 static quote leaves) +
           2 company logos (§5.7). y 2457, inner mt-[14.7433em]. Shared with
           /pricing via <Testimonials/>. ---- */}
      <Testimonials items={TESTIMONIALS} />

      {/* ---- block 11 — 6-logo customer strip (§5.9). y 2949, mt-[7.7em] ---- */}
      <LogoStrip logos={LOGOS} />

      {/* ---- block 12 — G2 logo + 5 stars + rating line (§5.10). y 3065, mb-0 ---- */}
      <G2Block />
    </div>
  )
}
