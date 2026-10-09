// CLONE_SPEC_CORE_B §0.5 — the shared hero block on /case-studies, /contact,
// /schedule-a-demo and /referral. Measured identically on all four @1280:
// block y 45, h 206.13; h1 y 153, w 1151.98, h 97.33 (65.333 / 600 / 97.3466 /
// #000) — the plain base h1 rule (§3.2), one line on all four.
// No avatar pills, no floating decoration.
// `max-w-[49ch]` must stay in `ch` (§10.4); it computes to 1981.52px in the
// 65.33px display face so it only bites below ~480px.
export default function HeroHeading({ children }) {
  return (
    <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
      <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
        <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">{children}</h1>
      </div>
    </div>
  )
}
