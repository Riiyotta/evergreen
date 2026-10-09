// Section F — "Report on employee engagement…" + "Fulfill your CSR…".
//
// Spec: CLONE_SPEC §1 row F (bg-cream, padding 8em 6em 0, two 2-col rows),
// §3.3 (display heading 4.5em/1.48/600, body p 1.75em/1.7), §4.4 (6.60743em
// heading→bullets, 4em bullet-row mb, 9.91014em 2-col gap), §7.2 CARD_LEAVES,
// §8 "F" (verbatim copy), ASSET_MANIFEST rows 2 / 3 / 25 / 26.
//
// Section wrapper + `-mt-[3em]` + `pt-[8em]`/`pb-0` live in App.jsx per §1;
// this component renders the two content blocks only.
//
// Every class string below is transcribed verbatim from the saved original
// (_reference/Evergreen _ Give recognition and plant trees.html). Nothing is
// v4-only in this section, so no translation was needed; the only Tailwind v3
// notes are that `size-*`/`static z-[1]` are not used here beyond what v3
// already supports.
//
// MOTION: NOT implemented here. The 3 CARD_LEAVES behind the first visual are
// rendered in their initial (pre-drift) transform via leafStyle(), carrying
// `marketing-drift-leaf` so the Animation agent can drive x/y → 0 (§7.2).
import { CARD_LEAVES, leafStyle, leafClassName } from '../lib/leaves.js'

// §4.4 "Universal content-block rule" — `my-[4.2em]` = 44.8px @1280.
const BLOCK = 'my-[4.2em] text-center max-wf-mini:my-[3.5em]'

// Shared bullet row: leaf icon + body paragraph (§4.4 `4em` row gap, `0.7em` icon gap).
function Bullet({ children }) {
  return (
    <div className="mb-[4em] flex items-start max-wf-mini:mb-[3.6em] max-wf-mini:flex-col max-wf-mini:items-center">
      <img
        src="/assets/ever-small-leafsvg-e988d6.svg"
        alt=""
        aria-hidden="true"
        className="mt-[0.4em] w-[1.26708em] shrink-0 max-wf-mini:mb-[0.9em] max-wf-mini:w-[2em]"
      />
      <p className="ml-[0.7em] max-wf-mini:ml-0 max-wf-mini:text-center">{children}</p>
    </div>
  )
}

export default function ReportCsrSection() {
  return (
    <>
      {/* ── Row 1: reporting screenshot + heading + 4 bullets ─────────────── */}
      <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col max-wf-phone:items-center`}>
        {/* Left visual column — 39.1132em = 417px @1280 (§4.4 named widths) */}
        <div className="relative flex flex-col items-center w-[39.1132em] max-wf-phone:w-[40em] max-wf-mini:w-[34em]">
          {/* CARD_LEAVES (3) — §7.2. Initial/pre-animation state only. */}
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
          <img
            src="/assets/sn-3png-556d34.webp"
            alt="A screen showing a report of employee engagement"
            loading="lazy"
            decoding="async"
            className="relative z-20 w-full"
          />
        </div>

        {/* Right copy column — 50em = 533.3px, gap ml-[9.91014em] = 105.71px */}
        <div className="ml-[9.91014em] w-[50em] text-left max-wf-tablet:ml-[5.5em] max-wf-phone:mx-auto max-wf-phone:mt-[5em] max-wf-mini:ml-0 max-wf-mini:w-auto">
          <h2 className="font-headline text-[4.5em] leading-[1.48] font-semibold text-black max-wf-mini:text-center max-wf-mini:text-[3.9em]">
            Report on employee engagement, and your company’s Carbon offset
          </h2>
          <div className="mt-[6.60743em] max-wf-mini:mt-[5em]">
            <Bullet>
              See who is giving and receiving the most recognitions to better understand your team.
            </Bullet>
            <Bullet>Track personal and company-wide Carbon offsets.</Bullet>
            <Bullet>
              See which values earned the most recognitions, ensuring company values are visible and
              real.
            </Bullet>
            <Bullet>
              Admins and managers have extensive reporting to help understand how the team is doing.
            </Bullet>
          </div>
        </div>
      </div>

      {/* ── Row 2: "20,000 trees planted" badge + CSR heading + paragraph ──
          Block variant appends `mb-0 max-wf-mini:mb-0` (section has no bottom
          padding) and `static z-[1]` — the original overrides the row's own
          positioning context here because this row carries no leaves. */}
      <div
        className={`${BLOCK} mb-0 max-wf-mini:mb-0 flex justify-center max-wf-phone:flex-col static z-[1] max-wf-phone:items-center`}
      >
        <div className="relative flex w-[39.1132em] flex-col items-center max-wf-phone:w-[40em] max-wf-mini:w-[34em]">
          <img
            src="/assets/ever-badgepng-6b8d93.webp"
            alt="A badge showing 20,000 trees planted"
            loading="lazy"
            decoding="async"
            className="-mt-[0.8em] w-[20.4952em]"
          />
        </div>

        <div className="ml-[9.91014em] w-[50em] text-left max-wf-tablet:ml-[5.5em] max-wf-phone:mx-auto max-wf-phone:mt-[5em] max-wf-mini:ml-0 max-wf-mini:w-auto">
          <h2 className="font-headline text-[4.5em] leading-[1.48] font-semibold text-black max-wf-mini:text-center max-wf-mini:text-[3.9em]">
            Fulfill your CSR and net zero commitments
          </h2>
          <p>
            Prove your corporate environmental credibility, and visualise it with badges. Learn more
            about how Evergreen improves your{' '}
            <a className="underline" href="/esg">
              Environmental, Social and Governance
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
