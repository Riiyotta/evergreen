import { useState } from 'react'
import { useLocation } from 'react-router-dom'

// LeadMagnetForm — CLONE_SPEC_CONTENT_B §7. One component, two uses:
// T-EBOOK's card form and T-PILLAR's final-CTA form (identical field list,
// classes and geometry). CONTENT_A's blog-article `LeadMagnetForm` is the same.
//
// Column max-w-[80ch] = 444.02px (80ch of the ROOT em, 10.6667px). Fields are
// flex children with align-items:stretch so they fill it; their own
// max-w-[49ch] (580.71px) never binds. gap-[10px] is a fixed 10px, not em.
// Input height 3em resolves AFTER text-[1.75em] -> 55.98px.
// Submit radius is 10px on ALL corners (unlike the footer newsletter's
// rounded-r-[10px]). No hover, no active, no transition, no focus ring.
//
// The real target is a Next.js server action with no public endpoint, so the
// submit is STUBBED: native validation, ~600ms pending, then done.
export default function LeadMagnetForm() {
  const { pathname } = useLocation()
  const [state, setState] = useState('idle') // idle | pending | done | error

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    setState('pending')
    window.setTimeout(() => {
      form.reset()
      setState('done')
    }, 600)
  }

  // FormDone — role=status, radius 10px, border 2px #000, bg #beedc0, pad 20px.
  if (state === 'done') {
    return (
      <div className="mx-auto mb-[1.6em] flex w-full max-w-[80ch] flex-col gap-[10px]">
        <div
          role="status"
          className="rounded-[10px] border-2 border-black bg-leaf p-[20px] text-center"
        >
          <p className="text-black">Thank you!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto mb-[1.6em] flex w-full max-w-[80ch] flex-col gap-[10px]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col justify-center gap-[10px]"
      >
        {/* honeypot — the only spam control; no consent box, no reCAPTCHA */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] size-px opacity-0"
        />
        <input type="hidden" name="sourcePath" value={pathname} />
        {[
          { type: 'text', name: 'name', label: 'Name' },
          { type: 'email', name: 'email', label: 'Email' },
          { type: 'text', name: 'company', label: 'Company' },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.label}
            aria-label={field.label}
            required
            maxLength={256}
            className="h-[3em] max-w-[49ch] rounded-[7px] border-2 border-black px-[0.9em] text-[1.75em] leading-[1.7] text-black placeholder:text-black/60"
          />
        ))}
        <button
          type="submit"
          disabled={state === 'pending'}
          className="h-[3em] rounded-[10px] bg-black px-[1.4em] text-[1.75em] font-bold leading-[1.7] text-white disabled:opacity-70"
        >
          {state === 'pending' ? 'Please wait...' : 'Download'}
        </button>
      </form>

      {/* FormError — border is 1px here, NOT 2px. The message string could not
          be read from the original (it comes from the server action), so this
          is a neutral stand-in, NOT measured copy. */}
      {state === 'error' && (
        <div
          role="alert"
          className="mt-[1.4em] rounded-[10px] border border-black p-[10px]"
        >
          <p className="text-black">Something went wrong. Please try again.</p>
        </div>
      )}
    </div>
  )
}
