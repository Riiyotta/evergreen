// CLONE_SPEC_CORE_B §T-3.4 — error panel. The form STAYS MOUNTED (values
// preserved) and this is appended after it.
// ⚠️ `border` = 1px: this is the ONLY 1px border in the whole system (every
// other stroke is 2px, form fields are 1.5px). Intentional — do not normalise.
// `mt-[1.4em]` is root-relative here (the div carries no `text-[…]`) = 14.93px.
export default function FormError({ children }) {
  return (
    <div role="alert" className="mt-[1.4em] rounded-[10px] border border-black p-[10px]">
      <p className="text-black">{children}</p>
    </div>
  )
}
