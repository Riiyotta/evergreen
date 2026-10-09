// CLONE_SPEC_CORE_B §T-3.1 — the shared form control, used by /contact and
// /referral. Source transcribed verbatim from the original's compiled chunk
// (043iauolx97i1.js → `LabelledField`).
//
// ⚠️ EM-CASCADE: `mb-[1.6em]`, `mb-[0.5em]`, `px-[0.9em]`, `h-[3em]` and
// `h-[3.54em]` all resolve against the element's OWN `text-[1.75em]` =
// 18.667px @1280, NOT the 10.6667px root. The spacing classes must therefore
// stay on the same element as `text-[1.75em]`. Measured: input 444.02 × 55.98,
// textarea 444.02 × 66.08, label 444.02 × 31.73, label mb 9.333, control mb
// 29.867, padding 0 16.8px.
//
// ⚠️ The label is #333333, not #000000: a <label> is not matched by the
// `.marketing-root p { color:#000 }` base rule, so it inherits .marketing-root.
// Do not add a colour class.
// ⚠️ 1.5px border (the homepage newsletter input is 2px) and a #999999
// placeholder (the newsletter uses black/60). Both intentional (§10.3).
// NO focus ring: CORE_B §0.3 verified 0 `focus:` classes and `box-shadow:none`
// on every control on these routes. UA default ring only — do not add one.
const BASE =
  'mb-[1.6em] block w-full rounded-[7px] border-[1.5px] border-black px-[0.9em] ' +
  'text-[1.75em] leading-[1.7] text-black placeholder:text-[#999]'

export default function LabelledField({
  label,
  name,
  type = 'text',
  placeholder,
  required = true,
  textarea = false,
}) {
  return (
    <>
      <label
        htmlFor={name}
        className="mb-[0.5em] block text-left text-[1.75em] leading-[1.7] font-bold"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          maxLength={5000}
          placeholder={placeholder}
          className={`${BASE} h-[3.54em]`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          maxLength={256}
          placeholder={placeholder}
          className={`${BASE} h-[3em]`}
        />
      )}
    </>
  )
}
