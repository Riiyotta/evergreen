// CLONE_SPEC_CORE_B §T-3.3 (= CLONE_SPEC §5.4 "SubmitButton", first live use).
// Measured 154.33 × 49.73 (`Contact us`) / 199.58 × 49.73 (`Submit Referral`),
// radius 30px, padding 9px 26.1333px, bg #000, label 18.667/31.733/700/#fff.
// Pending: `disabled` → opacity .70 and the literal label `Please wait...`
// (three dots, not an ellipsis). NO hover, NO active, NO focus ring, NO shadow.
export default function SubmitButton({ pending, children }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-[0.5em] self-center rounded-[30px] bg-black px-[1.4em] py-[9px] text-[1.75em] leading-[1.7] font-bold text-white disabled:opacity-70"
    >
      {pending ? 'Please wait...' : children}
    </button>
  )
}
