import { useState } from 'react'

// Section I — CLONE_SPEC §5.12 (newsletter form), §5.13 (layout), §8 "I — Footer".
// bg #fffff3, wrapper py-[5em] (53.33px) plus the load-bearing -3em top margin.
// No shadows, no gradients. Links: instant `hover:underline` only.

const FOOTER_COLUMNS = [
  [
    { label: 'ESG', href: '/esg' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Customers', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Schedule a demo', href: '/schedule-a-demo' },
  ],
  [
    { label: 'Our purpose', href: '/our-purpose' },
    {
      label: 'Help center',
      href: null,
    },
    { label: 'Referral Program', href: '/referral' },
    { label: 'Contact us', href: '/contact' },
  ],
  [
    { label: 'Employee recognition guide', href: '/employee-recognition' },
    { label: 'Recognition messages', href: '/employee-recognition-messages' },
    { label: 'Company values', href: '/company-values' },
    { label: 'Recognition glossary', href: '/employee-recognition/glossary' },
    { label: 'Recognition for teams', href: '/employee-recognition/for' },
    { label: 'Alternatives', href: '/alternatives' },
  ],
]

const SOCIALS = [
  {
    href: null,
    label: 'Evergreen on LinkedIn',
    src: '/assets/icon-linkedinsvg-777cac.svg',
  },
  {
    href: null,
    label: 'Evergreen on Twitter',
    src: '/assets/icon-twittersvg-6d6f46.svg',
  },
  {
    href: null,
    label: 'Email Evergreen',
    src: '/assets/icon-emailsvg-1a80b8.svg',
  },
]

// §5.12 — useMarketingForm's four states. The original posts to a Next.js server
// action (`subscribeToNewsletter`) with no public endpoint, so submit is a stub
// that runs the real state machine and resets the form on success.
function NewsletterForm() {
  const [status, setStatus] = useState('idle') // idle | pending | done | error

  const onSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('pending')
    // Stub for the server action — no public endpoint exists (§0 item 3).
    window.setTimeout(() => {
      setStatus('done')
      form.reset()
    }, 600)
  }

  if (status === 'done') {
    // FormDone
    return (
      <div role="status" className="rounded-[10px] border-2 border-black bg-leaf p-[20px] text-center">
        <p className="text-black">Thank you!</p>
      </div>
    )
  }

  return (
    <>
      <form className="relative flex w-full justify-center" onSubmit={onSubmit}>
        {/* honeypot — part of the measured DOM (§10.10) */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] size-px opacity-0"
        />
        {/* GOTCHA (§10.5): `h-[3em]` resolves AFTER `text-[1.75em]` -> 3 x 18.667 = 55.98px.
            Both classes must stay on the same element. */}
        <input
          type="email"
          name="email"
          required
          maxLength={256}
          placeholder="Your best email"
          aria-label="Your best email"
          className="h-[3em] w-full max-w-[49ch] rounded-l-[7px] border-2 border-black px-[0.9em] text-[1.75em] leading-[1.7] text-black placeholder:text-black/60"
        />
        <button
          type="submit"
          disabled={status === 'pending'}
          className="h-[3em] shrink-0 rounded-r-[10px] bg-black px-[1.4em] text-[1.75em] font-bold leading-[1.7] text-white disabled:opacity-70"
        >
          {status === 'pending' ? 'Please wait...' : 'Plant a tree'}
        </button>
      </form>
      {status === 'error' && (
        // FormError — note the 1px `border`, the page's only non-2px stroke (§2)
        <div role="alert" className="mt-[1.4em] rounded-[10px] border border-black p-[10px]">
          <p className="text-black">Something went wrong. Please try again.</p>
        </div>
      )}
    </>
  )
}

export default function Footer() {
  return (
    <section className="relative bg-cream">
      <div className="mx-auto -mt-[3em] w-full max-w-[1920px] px-[6em] py-[5em] max-wf-tablet:px-[6vw]">
        {/* Row 1 — logo */}
        <div className="my-[4.2em] text-center max-wf-mini:my-[3.5em] flex justify-between">
          <a href="/" className="block w-[16.0983em]">
            <img src="/assets/evergreen-logosvg-216cd4.svg" alt="Evergreen" className="h-auto w-full" />
          </a>
        </div>

        {/* Row 2 — newsletter + social | 3 link columns */}
        <div className="my-[4.2em] text-center max-wf-mini:my-[3.5em] flex justify-between max-wf-phone:flex-col">
          <div className="flex flex-col items-start">
            <div className="mb-[4em] flex flex-col items-start">
              <div className="flex max-wf-mini:w-full max-wf-mini:flex-row-reverse max-wf-mini:items-center">
                <p className="mt-[0.5em] font-semibold max-wf-mini:mt-0 max-wf-mini:ml-[1em] max-wf-mini:text-left max-wf-mini:leading-[1.6]">
                  Sign up for our newsletter and plant a tree
                </p>
                <img
                  src="/assets/ever-small-leafsvg-e988d6.svg"
                  alt=""
                  aria-hidden="true"
                  className="mt-[0.4em] ml-[0.7em] w-[1.26708em] max-wf-mini:mb-[0.9em] max-wf-mini:w-[2em]"
                />
              </div>
              <div className="mt-[1em] mb-[1.6em] flex w-full flex-col">
                <NewsletterForm />
              </div>
              <div className="flex">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="mr-[1.2em] flex size-[4em] items-center justify-center rounded-full border-2 border-black bg-cream-dark"
                  >
                    <img
                      src={social.src}
                      alt=""
                      aria-hidden="true"
                      className="h-[1.67015em] w-auto"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <nav aria-label="Footer" className="flex justify-end max-wf-mini:flex-col">
            {FOOTER_COLUMNS.map((column, index) => (
              <ul
                key={index}
                className={`flex list-none flex-col items-start${index < 2 ? ' mr-[3.1em]' : ''}`}
              >
                {column.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="mb-[1.2em] block text-[1.6875em] font-medium text-black no-underline hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        {/* Row 3 — legal */}
        <div className="my-[4.2em] text-center max-wf-mini:my-[3.5em] mb-0 max-wf-mini:mb-0 flex flex-row items-center justify-between max-wf-mini:flex-col-reverse max-wf-mini:items-start">
          <span className="text-[1.5em] leading-none max-wf-mini:mb-[1.1em]">
            © Evergreen • Made with 💚 in Helsinki, Finland
          </span>
          <span className="flex max-wf-mini:flex-col max-wf-mini:text-left">
            <a
              href="/terms-of-service"
              className="mr-[1.2em] text-[1.5em] font-normal no-underline hover:underline max-wf-mini:mb-[1.1em]"
            >
              Terms of service
            </a>
            <a
              href="/privacy-policy"
              className="text-[1.5em] font-normal no-underline hover:underline max-wf-mini:mb-[1.1em]"
            >
              Privacy policy
            </a>
          </span>
        </div>
      </div>
    </section>
  )
}
