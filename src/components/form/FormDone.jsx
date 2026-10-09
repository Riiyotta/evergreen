// CLONE_SPEC_CORE_B §T-3.4 — success panel. On success the whole <form> is
// UNMOUNTED and replaced by this. 2px black border, radius 10px, bg-leaf
// (#beedc0), literal `p-[20px]` (px, not em), centred. Inner <p> is the base
// body role forced to #000.
export default function FormDone({ children }) {
  return (
    <div
      role="status"
      className="rounded-[10px] border-2 border-black bg-leaf p-[20px] text-center"
    >
      <p className="text-black">{children}</p>
    </div>
  )
}
