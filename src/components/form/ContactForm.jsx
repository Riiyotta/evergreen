import FormDone from './FormDone.jsx'
import FormError from './FormError.jsx'
import Honeypot from './Honeypot.jsx'
import LabelledField from './LabelledField.jsx'
import SubmitButton from './SubmitButton.jsx'
import useMarketingForm from './useMarketingForm.js'

// CLONE_SPEC_CORE_B §T-3 — `ContactForm`. Form box measured 444.02 × 576.78.
// Validation is NATIVE HTML ONLY (required / type="email" / maxlength): the
// original has no custom validation, no inline per-field error, no
// aria-invalid, no aria-describedby. Do not add any.
// Server action `submitContactRequest` has no public endpoint — stubbed.
const FIELDS = [
  { label: 'Name', name: 'name', type: 'text', placeholder: 'Full Name' },
  { label: 'Email', name: 'email', type: 'email', placeholder: 'Email Address' },
  { label: 'Company', name: 'company', type: 'text', placeholder: 'Company' },
  { label: 'Message', name: 'message', textarea: true, placeholder: 'Example Text' },
]

export default function ContactForm() {
  const { state, pending, onSubmit } = useMarketingForm()

  // done → the whole form is unmounted and replaced by the success panel.
  if (state === 'done') {
    // Curly apostrophe is the original's rendered character (§T-3.4).
    return <FormDone>Thank you! We’ll be in touch</FormDone>
  }

  return (
    <>
      <form className="mb-[15px] flex flex-col" onSubmit={onSubmit} noValidate={false}>
        <Honeypot />
        {FIELDS.map((field) => (
          <LabelledField key={field.name} {...field} />
        ))}
        <SubmitButton pending={pending}>Contact us</SubmitButton>
      </form>
      {/* error → the form stays mounted and this is appended after it. */}
      {state !== 'idle' && state.error ? <FormError>{state.error}</FormError> : null}
    </>
  )
}
