import LeafLayer from './LeafLayer.jsx'
import { CARD_LEAVES } from '../lib/leaves.js'

// CLONE_SPEC_CORE_B §T-2 — the white content card shared by /contact,
// /referral and /schedule-a-demo, with its 3 measured size variants.
//
// ⚠️ #ffffff is a NEW content surface for marketing pages (§10.3): on the
// homepage white existed only as the SlideOverlay panel background.
// 2px black border, radius 10px, min-height 25em (266.667px), NO shadow,
// NO gradient, NO hover.
//
// Variants (measured @1280):
//   contact   wrapper w-[50em]      533.33 · card 533.33 × 672.77
//   referral  wrapper w-[50em]      533.33 · card 533.33 × 1053.48
//   demo      wrapper w-[50.4013em] 537.61 · card 537.61 × 676.66
//
// The 3 CARD_LEAVES (§7.2, verbatim) are positioned relative to the WRAPPER,
// not the white card, and sit behind it (card is z-[100]).
const VARIANTS = {
  contact: {
    wrapper: 'w-[50em] max-wf-mini:w-[90%]',
    card: 'px-[4em] pt-[4.21943em] pb-[3em] max-wf-mini:px-[2em]',
  },
  referral: {
    wrapper: 'w-[50em] max-wf-mini:w-[90%]',
    card: 'px-[4em] pt-[4.21943em] pb-[3em] max-wf-mini:px-[2em]',
  },
  demo: {
    wrapper: 'w-[50.4013em] max-wf-mini:w-[40em]',
    card: 'p-[2em] max-wf-mini:px-[1em]',
  },
}

export default function FormCard({ variant, children }) {
  const { wrapper, card } = VARIANTS[variant]
  return (
    <div className={`relative mx-auto mt-[7.6em] flex flex-col items-center ${wrapper}`}>
      <LeafLayer leaves={CARD_LEAVES} />
      <div
        className={`relative z-[100] min-h-[25em] w-full rounded-[10px] border-2 border-black bg-white ${card}`}
      >
        {children}
      </div>
    </div>
  )
}
