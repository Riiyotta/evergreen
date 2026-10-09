// ArkettaCtaPanel — CLONE_SPEC_CONTENT_A §5.2. Blog articles only (block C2).
//
// ⚠ This panel deliberately BREAKS the design system in three ways. CONTENT_A
// flags all three; reproduce them, do NOT normalise:
//   1. padding is FIXED PX (`px-[140px] py-[100px]`, `40px 20px` at ≤479px) —
//      the only place in the whole system that is not in `em`.
//   2. radius is 8px on the panel and 4px on the button — the only 8px / 4px
//      radii anywhere (everything else is 10 / 7 / 40.5 / 30 / 9999).
//   3. `gap-[15px]` and `mt-[20px]` are fixed px too.
//
// Measured @1280: panel 1152.03 x 557.58, min-height 400px, bg #000000.
// h2 32px / 64px (text-[3em] leading-[2]) / 600 / serif / cream.
// body div 16px / 28.8px / 400 / Rubik / cream, six <br>-separated lines.
// CTA 163.28 x 42, bg cream, padding 9px 40px, label 16px / 24px / 600 / #000.
// NO hover on the panel or the button. NO box-shadow, NO gradient.
//
// The real href is
// https://arketta.app/?utm_source=evergreen&utm_medium=blog-cta&utm_campaign=waitlist
// with target="_blank" — off-domain, so per the clone's link rule the anchor is
// rendered with NO href (markup and styling otherwise unchanged).
//
// The body lines are PLACEHOLDER copy of the recorded length (~55 words of
// Arketta cross-promo, §5.2) — CONTENT_A did not transcribe them.
// §5.2 describes "six <br>-separated lines" but measures the body div at
// 201.58px, which is exactly SEVEN 28.8px lines, and the panel total (557.58 =
// 200 padding + 64 h2 + 15 gap + 201.58 body + 15 gap + 20 button margin + 42
// button) only closes with seven. Seven lines it is.
// Seven line boxes: three short groups of 2 / 2 / 1 lines with a blank line
// between them, which is how the reference screenshot reads.
const BODY_LINES = [
  'Pulse checks in one tool. Recognition in another. Surveys somewhere else.',
  'It is a mess. And we get it.',
  '',
  'That is why we are building Arketta. One platform that brings all your workplace apps under one roof.',
  'Pick and choose the apps you need. Run them right inside Slack, Teams, and more.',
  '',
  'One platform. One login. Zero hassle.',
]

export default function ArkettaCtaPanel() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-[15px] rounded-[8px] bg-black px-[140px] py-[100px] text-center max-wf-mini:min-h-0 max-wf-mini:px-[20px] max-wf-mini:py-[40px]">
      <h2 className="font-headline text-[3em] font-semibold leading-[2] text-cream max-wf-mini:text-center max-wf-mini:text-[2.5em] max-wf-mini:leading-[1.5]">
        Tired of juggling multiple workplace apps?
      </h2>
      <div className="text-center text-[1.5em] leading-[1.8] text-cream">
        {BODY_LINES.map((line, i) => (
          <span key={i}>
            {line}
            {i < BODY_LINES.length - 1 && <br />}
          </span>
        ))}
      </div>
      {/* off-domain target -> rendered inert (no href), label + geometry kept */}
      <a className="mt-[20px] rounded-[4px] bg-cream px-[40px] py-[9px] text-[1.5em] leading-[1.5] text-black no-underline">
        Read more
      </a>
    </div>
  )
}
