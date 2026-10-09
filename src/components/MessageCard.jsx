import LeafLayer from './LeafLayer.jsx'
import { QUOTE_LEAVES } from '../lib/leaves.js'
import { BLOCK } from '../lib/classes.js'

// MessageCard + MESSAGE_GRID — CLONE_SPEC_CONTENT_B §5.2.
// Used by the 35 message pages, the 25 company-value pages and the 12 "for" pages.
//
// NO copy-to-clipboard control. §1 negatives verified zero <button>, zero
// navigator.clipboard and zero occurrences of "copy"/"clipboard" across all 35
// message routes. The card is pure static markup — do not add one.
//
// The category badge is VISUALLY identical to BadgeLink (§3.2) but BEHAVIOURALLY
// different: no `hover:bg-white`, no `transition-colors`. Two variants of one
// visual; do not reuse BadgeLink here and do not propagate its hover.
//
// `mt-auto pt-[1.4em]` on the footer is what pins badge+note to the card bottom,
// which is why rows of unequal message lengths still look even (the <li> is
// flex-col inside a `align-items: stretch` flex row).
export default function MessageCard({ text, category, note }) {
  return (
    <li className="relative z-[100] flex w-[42em] list-none flex-col rounded-[10px] border-2 border-black bg-white p-[2.4em] max-wf-mini:max-w-full">
      {/* 18.667px / 31.733px / 400 / #000, centred, 392.80px wide, margin 0 */}
      <p className="text-[1.75em] leading-[1.7]">{text}</p>
      <div className="mt-auto pt-[1.4em]">
        {/* N11 — 15.333px / 24.533px / 600. bg #beedc0, 2px #000, rounded-full,
            padding 5.367px 16.867px. No hover, no transition. */}
        <span className="inline-flex items-center rounded-full border-2 border-black bg-leaf px-[1.1em] py-[0.35em] text-center text-[1.4375em] font-semibold text-black">
          {category}
        </span>
        {/* N12 — 15.333px / 26.067px / 400, margin-top 12.267px */}
        <p className="mt-[0.8em] text-[1.4375em]">{note}</p>
      </div>
    </li>
  )
}

// Block MESSAGE_GRID. Wrapper `w-[87em] max-w-full` = 927.98px @1280, carrying the
// 6 STATIC QUOTE_LEAVES (§11: initial === animate, no `marketing-drift-leaf`
// class — never animate these). Cards sit above them on z-[100].
export function MessageGrid({ messages }) {
  return (
    <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
      <div className="relative mx-auto w-[87em] max-w-full">
        <LeafLayer leaves={QUOTE_LEAVES} />
        <ul className="flex flex-wrap justify-center gap-[3em]">
          {messages.map((message, i) => (
            <MessageCard key={i} {...message} />
          ))}
        </ul>
      </div>
    </div>
  )
}
