import TrialButton from './TrialButton.jsx'

// Section H — pricing reassurance (3 icon columns) + final CTA.
// Spec: CLONE_SPEC §1 row H (y 5639, height 1039, bg cream-dark #edede2,
// padding 18em 6em 5em), §3.3 (final-CTA display heading, small print,
// platform label), §4.4 (vertical increments), §5.4 (TrialButton), §8 H
// (verbatim copy). Markup structure transcribed from the saved original
// (`_reference/Evergreen _ …html`), which is the authority over spec prose.
//
// The section element + wrapper (`relative bg-cream-dark` and
// `mx-auto -mt-[3em] w-full max-w-[1920px] px-[6em] max-wf-tablet:px-[6vw]
// pt-[18em] pb-[5em]`) live in App.jsx — this component renders the wrapper's
// children only, in DOM order.
//
// NO leaves in this section (the original's section H contains none — the
// divider band G above it owns the last leaf layer), so nothing from
// src/lib/leaves.js is used here.
// NO gradients, NO box-shadows, NO hover/active states — §2 / §10.7.
// NO motion: every element is rendered in its final static state. The original
// drives the whole section with Framer Motion `whileInView` block reveals, so
// the Animation agent needs to take over the four `marketing-block` children
// (see handoff notes).

// §1 "Universal content-block rule" — the shared block class string, verbatim.
const BLOCK = 'my-[4.2em] text-center max-wf-mini:my-[3.5em]'

// The three pricing-reassurance columns. Column widths from §4.4 named widths:
// 25em / 29em / 25em. Icons + alt/aria from ASSET_MANIFEST rows 27-29 (all
// rendered 31-35 x 35, sized by `h-full w-auto` inside a `h-[3.24544em]` span).
// Note the asymmetric phone/mini overrides — they differ per column in the
// original (col 1 `max-wf-mini:mb-[4.6em]`, col 3 `max-wf-mini:mb-[4.2em]`)
// and are reproduced exactly rather than normalised.
const PRICING_COLUMNS = [
  {
    src: '/assets/icon-usersvg-f5e0ab.svg',
    text: 'Only pay for active users who use Evergreen',
    className: 'w-[25em] max-wf-phone:mx-[1em] max-wf-phone:w-[16em] max-wf-mini:mb-[4.6em]',
  },
  {
    src: '/assets/icon-supportsvg-bc4096.svg',
    text: 'Lots of support, with a help center and direct email options',
    className: 'w-[29em] max-wf-phone:mb-[5em] max-wf-phone:w-[80%] max-wf-mini:w-[90%]',
  },
  {
    src: '/assets/icon-timesvg-4c8791.svg',
    text: 'Cancel at any time, so why not give us a try',
    className: 'w-[25em] max-wf-phone:mx-[1em] max-wf-phone:w-[16em] max-wf-mini:mb-[4.2em]',
  },
]

// Slack / Teams install links — identical component to the hero's platform row.
// Labels are "add to <strong>Slack</strong>" (§8 C/H), 1.4375em (§3.3).
const PLATFORM_LINKS = [
  {
    href: null,
    src: '/assets/slacksvg-1b4e41.svg',
    label: 'Slack',
  },
  {
    href: null,
    src: '/assets/teamssvg-b74fd1.svg',
    label: 'Teams',
  },
]

// `smallPrintSuffix` — T-PARTNER appends ONE extra clause to the small print
// (CLONE_SPEC_CONTENT_B §8, e.g. "Contact us for your 30% 50Pros discount"),
// which wraps the line to 2 and takes the section from 1038.81px to 1064.86px.
// It is the ONLY difference between the partner CTA and this shared one.
// Default = undefined → markup byte-identical to before, so the homepage's
// measured 1038.81px section / 7189px document height cannot regress.
export default function CtaSection({ smallPrintSuffix }) {
  return (
    <>
      {/* Block 1 — 3-column pricing reassurance row. `mt-0` variant of the
          block rule; `justify-around` (§1 row H), stacking at ≤479px. */}
      <div
        className={`${BLOCK} mt-0 flex justify-around max-wf-mini:mt-0 max-wf-mini:flex-col max-wf-mini:items-center`}
      >
        {PRICING_COLUMNS.map((col) => (
          <div key={col.src} className={`flex flex-col items-center ${col.className}`}>
            <span className="mb-[1em] flex h-[3.24544em] items-center justify-center">
              <img src={col.src} alt="" aria-hidden="true" className="h-full w-auto" />
            </span>
            {/* §3.3 body paragraph (1.75em/1.7, #000 via the .marketing-root
                base rule); `max-w-[49ch]` must stay in `ch` (§10.4). */}
            <p className="mx-auto max-w-[49ch] text-center">{col.text}</p>
          </div>
        ))}
      </div>

      {/* Block 2 — final CTA display heading. Heading frame `w-[51em]` = 544px
          (§4.4 named widths); heading 6.125em/1.4 semibold (§3.3). */}
      <div
        className={`${BLOCK} mt-0 flex justify-center max-wf-mini:mt-0 max-wf-phone:flex-col`}
      >
        <div className="mx-auto mt-[7.4em] w-[51em] max-wf-phone:w-full max-wf-mini:mt-[3em] max-wf-mini:w-auto">
          <h2 className="font-headline text-center text-[6.125em] font-semibold leading-[1.4] text-black max-wf-mini:text-[5.1em]">
            Start feeling good about work
          </h2>
        </div>
      </div>

      {/* Block 3 — pricing paragraph. Verbatim §8 H, typographic apostrophe in
          "don’t" preserved. */}
      <div className={BLOCK}>
        <p className="mx-auto max-w-[49ch] text-center">
          For only $3.99 per active user a month. In the 14 day free trial we don’t plant real
          trees, but you can skip the trial if you like.
        </p>
      </div>

      {/* Block 4 — TrialButton (§5.4, already wired to the trial modal) + small
          print at `mt-[1.5em]` (§4.4) / 1.4375em (§3.3). */}
      <div className={BLOCK}>
        <div className="flex flex-col items-center">
          <TrialButton />
          <div className="mt-[1.5em]">
            <p className="mx-auto max-w-[49ch] text-center text-[1.4375em]">
              No credit card needed • No setup costs
              {smallPrintSuffix ? ` • ${smallPrintSuffix}` : null}
            </p>
          </div>
        </div>
      </div>

      {/* Block 5 — Slack / Teams install links. `mx-[3.5em]` gap (§4.4);
          `font-normal no-underline` cancels the .marketing-root <a> base rule
          (§3.2). No hover state. */}
      <div
        className={`${BLOCK} mt-0 flex justify-center max-wf-mini:mt-0 max-wf-phone:flex-col`}
      >
        <div className="flex items-center justify-center max-wf-mini:flex-col">
          {PLATFORM_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mx-[3.5em] flex items-center font-normal no-underline max-wf-mini:mb-[2.2em] max-wf-mini:text-[1.3em]"
            >
              <span className="mr-[1em] flex w-[3.47539em] items-center justify-center">
                <img src={link.src} alt="" aria-hidden="true" className="h-auto w-full" />
              </span>
              <span className="text-[1.4375em]">
                add to <strong className="font-bold">{link.label}</strong>
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
