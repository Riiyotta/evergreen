import { BLOCK } from '../lib/classes.js'

// 4-stat leaf-pill row — CLONE_SPEC §5.5, reproduced VERBATIM by
// CLONE_SPEC_CONTENT_B §4.3 (T-PILLAR, inside a `div.my-[4em]`) and §8
// (T-PARTNER hero block 8). Measured block height 137.59px @1280.
//
// Pills `11.2528em x 5.75094em` (120 x 61.3px), radius 46px, 2px #000, bg
// #beedc0; number 26.667px/41.067px/700; two `w-1/2 justify-around` halves;
// block gets `mt-[6.5em]`.
//
// ⚠️ DUPLICATION NOTE: the homepage renders this same markup inline inside
// Hero.jsx (`STATS` + `StatPill` + block 8). Hero.jsx is owned by another agent
// and was not edited, so this is a second copy of the same measured markup.
// Factoring Hero's StatPill/stat row out into this file is the obvious cleanup.
//
// The 4 footnote <sup> links are OFF-DOMAIN (hubspot / apollotechnical, §13):
// rendered with NO href, markup unchanged.

// §3.3 "Big stat / proof heading".
const PROOF_HEADING =
  'text-[2.5em] leading-[1.54] font-bold text-black max-wf-phone:text-[2.4em]'

// §14.5 — captions verbatim (identical to the homepage).
const STATS = [
  { pill: '69%', caption: 'of employees work harder when recognised', note: '1' },
  { pill: '39%', caption: 'of employees don’t feel appreciated at work', note: '2' },
  {
    pill: '14.9%',
    caption: 'lower turnover rates in teams with regular feedback',
    note: '3',
  },
  { pill: '65%', caption: 'of employees prefer non-cash incentives', note: '4' },
]

function StatPill({ pill, caption, note }) {
  return (
    <div className="flex w-[25em] flex-col items-center max-wf-phone:mx-[1em] max-wf-phone:w-[16em] max-wf-mini:mb-[4.6em]">
      <span className="mb-[1.2em] flex h-[5.75094em] w-[11.2528em] items-center justify-center rounded-[46px] border-2 border-black bg-leaf">
        <span className={`${PROOF_HEADING} text-center`}>{pill}</span>
      </span>
      <p className="mx-auto max-w-[49ch] text-center">
        {caption}
        <a className="ml-[0.2em] no-underline">
          <sup>{note}</sup>
        </a>
      </p>
    </div>
  )
}

export default function StatRow() {
  return (
    <div
      className={`${BLOCK} mt-[6.5em] flex justify-around max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:mt-[6.5em]`}
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
  )
}
