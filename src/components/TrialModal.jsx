import SlideOverlay from './SlideOverlay.jsx'
import { useTrialModal } from '../lib/trialModal.jsx'

// CLONE_SPEC §5.11 — opened by every "Start 14 Day Trial" button (hero + final CTA).
// SlideOverlay panel, bg-white (#ffffff), z-[999999999].
export default function TrialModal() {
  const { open, closeTrial } = useTrialModal()

  return (
    <SlideOverlay
      open={open}
      onClose={closeTrial}
      label="Choose your 14 day free trial type"
      className="z-[999999999] flex items-center justify-center px-[2em]"
    >
      <div className="flex w-[42em] flex-col items-center text-center">
        <div className="mb-[3em]">
          <p className="font-headline text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-[3.9em]">
            Choose your 14 day free trial type:
          </p>
        </div>

        <div className="mb-[3.2em] flex flex-col">
          <a
            /* external install link removed */
            className="mt-[10px] flex items-center rounded-[40.5px] bg-black px-[3.5em] py-[1.2em] text-white no-underline"
          >
            <img
              src="/assets/slacksvg-1b4e41.svg"
              alt="Slack logo"
              className="mr-[1em] h-auto w-[3.47539em]"
            />
            <span className="block text-[1.875em] font-semibold leading-[1.54]">
              Start with Slack
            </span>
          </a>
          <a
            /* external install link removed */
            className="mt-[20px] flex items-center rounded-[40.5px] bg-black px-[3.5em] py-[1.2em] text-white no-underline"
          >
            <img
              src="/assets/teamssvg-b74fd1.svg"
              alt="Teams logo"
              className="mr-[1em] h-auto w-[3.47539em]"
            />
            <span className="block text-[1.875em] font-semibold leading-[1.54]">
              Start with Teams
            </span>
          </a>
        </div>

        <div className="mb-[3.2em]">
          <div className="flex items-center max-wf-mini:text-[1.3em]">
            <span className="mr-[1em] flex w-[3.47539em] items-center justify-center">
              <img src="/assets/webexpng-52e71f.webp" alt="Webex logo" className="h-auto w-full" />
            </span>
            <p className="text-[1.4375em]">Coming soon</p>
          </div>
        </div>

        <button
          type="button"
          onClick={closeTrial}
          className="h-[1.092em] text-[1.6875em] font-medium leading-none text-black underline"
        >
          Back
        </button>
      </div>
    </SlideOverlay>
  )
}
