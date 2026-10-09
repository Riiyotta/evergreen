// NEW COMPONENT — CLONE_SPEC_CORE_A §2.5 `TickBadge`.
// A variant of the §5.8 value badge with a leading tick glyph. Three instances
// on /esg: ENVIRONMENTAL, SOCIAL, GOVERNANCE.
//
// Markup string verbatim from §2.5:
//   <div class="flex rounded-[10px] border-2 border-black bg-leaf px-[1.5em] py-[0.8em]">
//     <img src="/assets/ticksvg-589d98.svg" alt="…" class="mr-[0.4em] w-[2em]"/>
//     <p class="text-[1.625em] leading-[1.54] font-semibold">ENVIRONMENTAL</p>
//   </div>
//
// Height 47.73px, shrink-to-fit width (207.69 / 124.84 / 180.11 @1280).
// The tick is `w-[2em]` (21.33px) on a 209 x 150 intrinsic with the default
// `object-fit: fill`, so it renders 21.33 x 26.67 — DELIBERATELY squashed to a
// 0.8 aspect (§5 note 4). Do NOT add object-contain.
// Labels are literally uppercase in the source — no `text-transform` (§2.5).
// No box-shadow, no hover, no transition (§0).
export default function TickBadge({ label, alt }) {
  return (
    <div className="flex rounded-[10px] border-2 border-black bg-leaf px-[1.5em] py-[0.8em]">
      <img src="/assets/ticksvg-589d98.svg" alt={alt} className="mr-[0.4em] w-[2em]" />
      <p className="text-[1.625em] font-semibold leading-[1.54]">{label}</p>
    </div>
  )
}
