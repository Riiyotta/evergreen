// CLONE_SPEC_CORE_B §D-3 — /schedule-a-demo scheduler.
//
// STATIC PLACEHOLDER standing in for the live Calendly inline widget
// (`calendly.com/joinevergreenapp/evergreen-demo`). The real embed is NOT
// loaded because this clone strips all external-domain requests: no
// `assets.calendly.com/assets/external/widget.js`, no calendly.com iframe.
// Box geometry (630px tall, min-width 320px, w-full) matches the measured
// original exactly — 490.95 × 630 at 1280, 320 × 630 at 390. The height is a
// LITERAL 630px at every viewport (it does not scale with the root em).
// At 390 the card's content box is only 309.81px, so `min-w-[320px]` overhangs
// the card's right edge by ≈10.2px. That is the original's real behaviour and
// <main> is overflow-hidden, so there is no page scroll. Do not "fix" it.
//
// The interior is Calendly's own design language, not Evergreen's, so it uses
// a different type scale and the two brand colours passed in the embed URL:
// text_color `#0b2f04`, primary_color `#34b11e`.
// Offsets and sizes below were measured off `demo-02-calendly-embed.png`
// (492 × 631, ≈1:1 with the measured box); the fills/greys were pixel-sampled
// from the same capture. It is an approximation of a third-party surface, not
// a reproduction of an Evergreen component. Nothing here is interactive.
const TEXT = '#0b2f04' // embed URL param `text_color`
const ACCENT = '#34b11e' // embed URL param `primary_color`
// Sampled, not specced: CORE_B §D-3 guessed `#e8f7e4` for the circle and
// `#1a7a1a` for the month label; the capture reads #eff8ee and the same
// #0b2f04 as the heading. Greys on the weekday header / unavailable numerals
// sample neutral (no green cast), so they are grey, not `#0b2f04`.
const CIRCLE = '#eff8ee'
const GREY = '#4d4d4d'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
// A fixed month — the clone has no calendar logic. October 2026 starts on a
// Thursday, which is what the reference capture shows.
const LEAD_BLANKS = 3
const DAYS_IN_MONTH = 31
const AVAILABLE = new Set([12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30])
const TODAY = 9

const CELLS = [
  ...Array.from({ length: LEAD_BLANKS }, () => null),
  ...Array.from({ length: DAYS_IN_MONTH }, (unused, index) => index + 1),
]
while (CELLS.length < 35) CELLS.push(null)

export default function SchedulerPlaceholder() {
  return (
    <div
      className="calendly-inline-widget relative h-[630px] min-w-[320px] w-full bg-white"
      role="img"
      aria-label="Calendly scheduling widget (placeholder)"
    >
      {/* 1 — "Select a Day", centred bold, ink centred on y 40 */}
      <div
        className="absolute top-[28px] right-0 left-0 flex h-[24px] items-center justify-center text-[20px] font-bold"
        style={{ color: TEXT }}
      >
        Select a Day
      </div>

      {/* 2 — month nav row, ink centred on y 113. Left chevron is the disabled
          grey of the capture; right chevron is the accent green. */}
      <div className="absolute top-[101px] right-0 left-0 flex h-[24px] items-center justify-center">
        {/* chevron centres measured at x 155.5 / 336.5 in the 492px capture */}
        <div className="flex w-[191px] max-w-full items-center justify-between">
          <span className="text-[18px] leading-none" style={{ color: GREY }}>
            ‹
          </span>
          <span className="text-[15px] font-bold" style={{ color: TEXT }}>
            October 2026
          </span>
          <span className="text-[18px] leading-none" style={{ color: ACCENT }}>
            ›
          </span>
        </div>
      </div>

      {/* 3 — weekday header, 7 equal columns, ink centred on y 156 */}
      <div className="absolute top-[146px] right-0 left-0 flex h-[20px] justify-center">
        <div className="grid w-[316px] max-w-full grid-cols-7 items-center">
          {WEEKDAYS.map((day) => (
            <span key={day} className="text-center text-[12px]" style={{ color: GREY }}>
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* 4 — 5 date rows of 48px (numeral centres y 190/238/286/334/382).
          Available days: 44px light-green circle + accent numeral. */}
      <div className="absolute top-[166px] right-0 left-0 flex justify-center">
        <div className="grid w-[316px] max-w-full grid-cols-7">
          {CELLS.map((day, index) => (
            <span key={index} className="flex h-[48px] items-center justify-center">
              {day === null ? null : AVAILABLE.has(day) ? (
                <span
                  className="flex h-[44px] w-[44px] items-center justify-center rounded-full text-[15px]"
                  style={{ backgroundColor: CIRCLE, color: ACCENT }}
                >
                  {day}
                </span>
              ) : (
                <span className="relative text-[15px]" style={{ color: GREY }}>
                  {day}
                  {day === TODAY ? (
                    <span
                      className="absolute top-[22px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                  ) : null}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* 5 — "Time zone" label, ink centred on y 435 */}
      <div className="absolute top-[426px] right-0 left-0 flex h-[19px] justify-center">
        <div className="w-[316px] max-w-full text-left text-[13px] font-bold" style={{ color: TEXT }}>
          Time zone
        </div>
      </div>

      {/* 6 — timezone row. ⚠️ The captured string "India Standard Time (3:32pm)"
          is machine locale + wall clock, NOT site content (CORE_B §D-3), so a
          neutral fixed label is used here. */}
      <div className="absolute top-[452px] right-0 left-0 flex h-[23px] items-center justify-center">
        <div
          className="flex w-[316px] max-w-full items-center pl-[9px] text-left text-[13px]"
          style={{ color: TEXT }}
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="mr-[5px] h-[13px] w-[13px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <circle cx="8" cy="8" r="6.4" />
            <ellipse cx="8" cy="8" rx="2.8" ry="6.4" />
            <path d="M1.6 8h12.8" />
          </svg>
          <span>Coordinated Universal Time</span>
          <svg viewBox="0 0 10 6" aria-hidden="true" className="ml-[8px] h-[6px] w-[10px]" fill="currentColor">
            <path d="M0 0h10L5 6z" />
          </svg>
        </div>
      </div>

      {/* 7 — ~150px of empty white below, inherent to the 630px box. */}
    </div>
  )
}
