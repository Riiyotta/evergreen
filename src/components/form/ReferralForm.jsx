import FormDone from './FormDone.jsx'
import FormError from './FormError.jsx'
import Honeypot from './Honeypot.jsx'
import LabelledField from './LabelledField.jsx'
import SubmitButton from './SubmitButton.jsx'
import useMarketingForm from './useMarketingForm.js'

// CLONE_SPEC_CORE_B §R-2 — `ReferralForm`. Form box measured 444.02 × 957.5.
// The `*` markers are part of the LABEL STRING, not separate elements, and all
// apostrophes in labels/placeholders are STRAIGHT in the original. The trailing
// `..` in the greeting placeholder is two dots — reproduce.
// `Send greetings` is the only optional field and the only one without a `*`.
// Server action `submitReferral` has no public endpoint — stubbed.
const FIELDS = [
  { label: 'Your Name *', name: 'referrerName', type: 'text', placeholder: 'Your Full Name' },
  {
    label: 'Your Email *',
    name: 'referrerEmail',
    type: 'email',
    placeholder: 'Your Email Address',
  },
  {
    label: "Your Referral's First Name *",
    name: 'referralFirstName',
    type: 'text',
    placeholder: "Your Referral's First Name",
  },
  {
    label: "Your Referral's Last Name *",
    name: 'referralLastName',
    type: 'text',
    placeholder: "Your Referral's Last Name",
  },
  {
    label: "Your Referral's Email *",
    name: 'referralEmail',
    type: 'email',
    placeholder: "Your Referral's Email Address",
  },
  {
    label: "Your Referral's Company *",
    name: 'referralCompany',
    type: 'text',
    placeholder: "Your Referral's Company Name",
  },
  {
    label: 'Send greetings',
    name: 'greeting',
    textarea: true,
    required: false,
    placeholder: 'Optional greetings for your referral..',
  },
]

export default function ReferralForm() {
  const { state, pending, onSubmit } = useMarketingForm()

  if (state === 'done') {
    // Curly apostrophe is the original's rendered character (§R-2.3).
    return <FormDone>Thank you! We’ll let you know if your referral takes action.</FormDone>
  }

  return (
    <>
      <form className="mb-[15px] flex flex-col" onSubmit={onSubmit}>
        <Honeypot />
        {FIELDS.map((field) => (
          <LabelledField key={field.name} {...field} />
        ))}
        <SubmitButton pending={pending}>Submit Referral</SubmitButton>
      </form>
      {state !== 'idle' && state.error ? <FormError>{state.error}</FormError> : null}
    </>
  )
}
