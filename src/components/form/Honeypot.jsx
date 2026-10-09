// CLONE_SPEC_CORE_B §T-3 / CLONE_SPEC §5.12 — spam honeypot, identical on both
// forms. Off-screen at x −9623.66, 1 × 1, opacity 0, never focusable.
export default function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] size-px opacity-0"
    />
  )
}
