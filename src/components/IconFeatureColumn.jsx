// IconFeatureColumn (serif variant) — CLONE_SPEC_CORE_A §1.5.
//
// NOT the homepage's 25em/29em/25em icon trio (CLONE_SPEC §8-H): this one is
// percentage-width (`w-[30%]` = 345.61px @1280) and carries a serif sub-heading
// (CORE_A §4 "Serif sub-heading", 3.125em/1.29 semibold, `max-w-[11ch]`).
//
// Shared with /our-purpose §3.3 (owned by another agent).
// `max-w-[11ch]` MUST stay in `ch` — it is measured in the substitute serif's
// `ch`, so frame and text scale together (CORE_A §5 note 1).
//
// No hover, no transition, no motion.
export default function IconFeatureColumn({ icon, iconAlt = '', heading, body }) {
  return (
    <div className="flex w-[30%] flex-col items-center max-wf-phone:mb-[4.6em] max-wf-phone:w-full">
      <span className="mb-[1em] flex h-[3.24544em] items-center justify-center">
        <img src={icon} alt={iconAlt} className="h-full w-auto" />
      </span>
      <h2 className="my-[0.5em] max-w-[11ch] text-center font-headline text-[3.125em] leading-[1.29] font-semibold text-black max-wf-mini:text-[3.9em]">
        {heading}
      </h2>
      <p className="mx-auto max-w-[49ch] text-center">{body}</p>
    </div>
  )
}
