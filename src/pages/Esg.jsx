import LeafDivider from '../components/LeafDivider.jsx'
import TickBadge from '../components/TickBadge.jsx'
import SdgSection from '../components/SdgSection.jsx'
import ReassuranceCta from '../components/ReassuranceCta.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { CARD_LEAVES, leafClassName, leafStyle } from '../lib/leaves.js'

// Route "/esg" — CLONE_SPEC_CORE_A PART 2. Chrome (nav, footer, trial modal)
// lives in Layout; this route has NO announcement banner (§0), which Layout
// already handles via BANNER_ROUTES.
//
// Section map (@1280, CORE_A §2.1) — total document height 7043px:
//   A hero/ENVIRONMENTAL  y   44.61  h 1254.55  bg-cream       (no py; inner pt-[10.2em])
//   B divider band cream             h  161.98
//   C SOCIAL              y 1397.17  h 1401.38  bg-cream-dark  pt-[18em] pb-[5em]
//   D divider band cream-dark        h  161.98
//   E GOVERNANCE          y 2896.56  h 1312.98  bg-cream       pt-[18em] pb-[5em]
//   F divider band cream             h  161.98
//   G UN SDG              y 4307.56  h 1087.30  bg-cream-dark  pt-[18em], no pb
//   H divider band cream-dark        h  161.98
//   I reassurance + CTA   y 5492.88  h 1038.81  bg-cream-dark  pt-[18em] pb-[5em]
// Divider band colour matches the section ABOVE it (§0.1).
//
// MOTION: nothing is animated here. 48 DIVIDER_LEAVES (4 x 12) + 6 CARD_LEAVES
// (2 x 3) = 54 `marketing-drift-leaf` elements are rendered in their INITIAL
// pre-drift transform by leafStyle(); the Animation agent drives x/y -> 0.
// No scroll-tracked leaves, no recognition line, no heart on this route (§2.8).
//
// Zero gradients, zero box-shadows, zero hover states (§0).

// §1 universal content-block rule.
const BLOCK = 'my-[4.2em] text-center max-wf-mini:my-[3.5em]'

// Shared display-heading role (§3.3 "Section display heading", 4.5em / 1.48 / 600).
const DISPLAY_H2 =
  'text-center font-headline text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-[3.9em]'

// The heading frame used by SOCIAL and GOVERNANCE (§2.3 / §2.4), 70.3em = 749.86px.
const HEADING_FRAME =
  'mx-auto mt-0 w-[70.3em] max-wf-phone:w-auto max-wf-mini:mt-[3em] max-wf-mini:w-auto'

// §7.2 CARD_LEAVES, behind each of the two product visuals. Coordinates come
// from src/lib/leaves.js — never hardcoded here.
function CardLeaves() {
  return (
    <span aria-hidden="true" className="pointer-events-none">
      {CARD_LEAVES.map((leaf, i) => {
        const { src, style } = leafStyle(leaf)
        return (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className={leafClassName(leaf)}
            style={style}
          />
        )
      })}
    </span>
  )
}

export default function Esg() {
  return (
    <>
      {/* ================= A — hero / ENVIRONMENTAL =================
          One flex column, not the usual series of blocks (§2.2). The section
          wrapper carries NO py; the column's pt-[10.2em] (108.8px) is the only
          top padding and the hero ends flush with the 800x533 photo. */}
      <section className="relative bg-cream">
        <div className={SECTION_WRAPPER}>
          <div className="flex flex-col items-center pt-[10.2em] max-wf-mini:pt-[11.8em]">
            {/* Block 0 — H1. ⚠️ §5: tightest wrap on the whole site — 2 lines,
                longest line 1114.6 of 1152px (3.2% headroom). A third line
                would shift every downstream y by ~97px. */}
            <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full">
              <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
                We’ll help you meet your Environmental, Social and Governance commitments
              </h1>
            </div>

            {/* Block 1 — tick badge, mt-[9.93203em] = 105.942px (§4). */}
            <div className="mt-[9.93203em]">
              <TickBadge
                label="ENVIRONMENTAL"
                alt="A tick showing environmental commitments are being addressed"
              />
            </div>

            {/* Block 2 — display heading, 1 line. */}
            <div className={`${BLOCK} w-full`}>
              <h2 className={DISPLAY_H2}>Over 500 000 trees planted by teams</h2>
            </div>

            {/* Block 3 — veritree paragraph. `max-w-[40ch]` = 474.053px (§4).
                `veritree.com` is off-domain → rendered with NO href. */}
            <div className="my-0 w-full text-center max-wf-mini:my-0">
              <p className="mx-auto max-w-[40ch] text-center">
                Evergreen plants trees through{' '}
                <a target="_blank" rel="noreferrer">
                  veritree.com
                </a>
                . Learn more about Veritree on their website.
              </p>
            </div>

            {/* Block 4 — hero photo. ⚠️ §5 note 3 / §9: the ONLY fixed-px sized
                element on these pages. `w-[800px] mt-[40px]` is literally px in
                the original; it does NOT scale with the em engine. Do not
                "normalise" it to em. */}
            <img
              src="/assets/img-6223-7511ba.webp"
              alt=""
              aria-hidden="true"
              width="800"
              height="533"
              className="mt-[40px] w-[800px] max-w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= B — divider, band = section above (cream) ========= */}
      <LeafDivider band="bg-cream" />

      {/* ================= C — SOCIAL ================= */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          {/* Block 0 — tick badge */}
          <div className={`${BLOCK} flex w-full flex-col items-center justify-center`}>
            <TickBadge
              label="SOCIAL"
              alt="A tick showing social commitments are being addressed"
            />
          </div>

          {/* Block 1 — H2, 2 lines via an explicit <br/> (safe wrap, §5). */}
          <div className={BLOCK}>
            <div className={HEADING_FRAME}>
              <h2 className={DISPLAY_H2}>
                Create a positive company culture
                <br />
                through social recognition
              </h2>
            </div>
          </div>

          {/* Block 2 — paragraph, 5 lines, ends with the internal "Learn more". */}
          <div className="my-0 w-full text-center max-wf-mini:my-0">
            <p className="mx-auto max-w-[49ch] text-center">
              Evergreen is the <strong className="font-bold">only</strong> peer-to-peer recognition
              app that lets teams recognise a job well done, while planting trees for the planet.
              For the ultimate positive, feel-good team culture.
              <br />
              <br />
              <a href="/">Learn more</a>
            </p>
          </div>

          {/* Block 3 — 2-col row. `mt-[9.5em]` = 101.333px, `items-stretch`. */}
          <div
            className={`${BLOCK} mt-[9.5em] flex items-stretch justify-center max-wf-phone:flex-col max-wf-phone:items-center`}
          >
            {/* LEFT visual column — 34.4013em = 366.94px, §5.8 badge + seed line */}
            <div className="relative flex w-[34.4013em] flex-col items-center">
              <CardLeaves />
              <img
                src="/assets/sn-2png-f6c14a.webp"
                alt="A screen showing an employee being recognised"
                className="relative z-20 w-full"
              />
              <div className="my-[2.02566em] rounded-[10px] border-2 border-black bg-leaf px-[1.5em] py-[0.8em]">
                <p className="text-[1.625em] font-semibold leading-[1.54]">Tagged Value: Grit</p>
              </div>
              <div className="flex items-center">
                <img
                  src="/assets/ever-small-leafsvg-e988d6.svg"
                  alt=""
                  aria-hidden="true"
                  className="mr-[0.7em] w-[1.26708em]"
                />
                <p className="text-[1.625em] font-semibold leading-[1.54]">Sue earned 3 seeds</p>
              </div>
            </div>

            {/* RIGHT stats column — `ml-[6.91014em]` = 73.708px. NOTE this is the
                ESG gap; the homepage's equivalent row uses 9.91014em (§4). */}
            <div className="ml-[6.91014em] flex flex-col items-center">
              <div className="mb-[5em] flex flex-col items-center">
                {/* §4 NEW role — stat figure on a <p>, 4.5em / 1.48 / 600 serif. */}
                <p className="font-headline text-[4.5em] font-semibold leading-[1.48]">+100k</p>
                <p className="text-center">
                  peer-to-peer
                  <br />
                  recognitions so far
                </p>
              </div>
              <div className="mb-[5em] flex flex-col items-center">
                <p className="font-headline text-[4.5em] font-semibold leading-[1.48]">+8k</p>
                <p className="text-center">Evergreen users</p>
              </div>
              {/* §5.10 G2 block, but with alt "G2 review logo", eager images and
                  NO `mt-[7em]` wrapper (§2.3). */}
              <div className="flex flex-col items-center">
                <img
                  src="/assets/logo-g2png-c53a3f.webp"
                  alt="G2 review logo"
                  className="w-[6.03104em]"
                />
                <div className="mb-[2.45003em] mt-[1.95218em] flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src="/assets/star1svg-303d31.svg"
                      alt=""
                      aria-hidden="true"
                      className="mx-[1.14204em] w-[3.03685em]"
                    />
                  ))}
                </div>
                <p className="w-full text-center text-[2.5em] font-semibold leading-[1.54]">
                  4.8 / 5 on G2 Reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= D — divider, band = section above (cream-dark) ==== */}
      <LeafDivider band="bg-cream-dark" />

      {/* ================= E — GOVERNANCE ================= */}
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          <div className={`${BLOCK} flex w-full flex-col items-center justify-center`}>
            <TickBadge
              label="GOVERNANCE"
              alt="A tick showing governance commitments are being addressed"
            />
          </div>

          <div className={BLOCK}>
            <div className={HEADING_FRAME}>
              <h2 className={DISPLAY_H2}>Support your business structure with clear reporting</h2>
            </div>
          </div>

          {/* §2.10: "Administators" and the missing apostrophe in "teams" are
              typos in the ORIGINAL — reproduced verbatim. Do not correct. */}
          <div className="my-0 w-full text-center max-wf-mini:my-0">
            <p className="mx-auto max-w-[49ch] text-center">
              Administators and managers have access to extensive reports to understand their teams
              performance.
            </p>
          </div>

          <div
            className={`${BLOCK} mt-[9.5em] flex items-stretch justify-center max-wf-phone:flex-col max-wf-phone:items-center`}
          >
            {/* LEFT visual — no badge/seed line on this one (§2.4). */}
            <div className="relative flex w-[34.4013em] flex-col items-center">
              <CardLeaves />
              <img
                src="/assets/sn-4apng-19e16a.webp"
                alt="Screen showing individual and team recognition as a report"
                className="relative z-20 w-full"
              />
            </div>

            {/* RIGHT — w-[34.5em] = 367.98px, h-full + justify-between. */}
            <div className="ml-[6.91014em] flex h-full w-[34.5em] flex-col items-center justify-between max-wf-phone:ml-0 max-wf-phone:mt-[5em]">
              <div className="mb-[5em] w-[27.25em] max-w-full">
                <p className="text-center">
                  See who is giving and receiving the most recognitions. Tag company values to
                  ensure they stay visible and real.
                </p>
              </div>
              <img
                src="/assets/screen-report-split-2svg-008209.svg"
                alt="Image showing graph of team report"
                className="mt-[13.9em] w-full max-wf-phone:mt-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= F — divider, band = section above (cream) ========= */}
      <LeafDivider band="bg-cream" />

      {/* ================= G — UN SDG (shared with /our-purpose) ============= */}
      <SdgSection />

      {/* ================= H — divider, band = section above (cream-dark) ==== */}
      <LeafDivider band="bg-cream-dark" />

      {/* ================= I — reassurance + CTA (shared, = homepage §H) ===== */}
      <ReassuranceCta />
    </>
  )
}
