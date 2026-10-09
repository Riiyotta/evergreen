import { useTrialModal } from '../lib/trialModal.jsx'

// Primary pill button — CLONE_SPEC §5.4 "Primary (pill, black) — TrialButton".
// Used twice: hero block 2 and the final CTA (§H). Class string verbatim.
// NO hover state, NO active state, NO transition — do not add any (§2, §7.4).
// radius 40.5px is kept as the spec's literal `rounded-[40.5px]`; the
// `rounded-pill-cta` token in tailwind.config.js resolves identically.
export default function TrialButton({ className = '' }) {
  const { openTrial } = useTrialModal()
  return (
    <button
      type="button"
      onClick={openTrial}
      className={`inline-block rounded-[40.5px] bg-black px-[2.2em] py-[1.2em] ${className}`}
    >
      <span className="block text-[1.875em] font-semibold leading-[1.54] text-white">
        Start 14 Day Trial
      </span>
    </button>
  )
}
