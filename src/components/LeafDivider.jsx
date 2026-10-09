import { DIVIDER_LEAVES, leafClassName, leafStyle } from '../lib/leaves.js'

// Sections D and G — CLONE_SPEC §1 rows D/G, §7.2 DIVIDER_LEAVES.
//
// Markup transcribed verbatim from the saved original
// (_reference/Evergreen _ Give recognition and plant trees.html):
//   <section aria-hidden="true" class="relative">
//     <div class="relative mx-auto -mt-[3em] w-[120em]">
//       <span aria-hidden="true" class="pointer-events-none"> …12 leaves… </span>
//       <div class="relative z-[200] h-[15em] bg-cream"></div>
//     </div>
//     <div class="relative z-[201] h-[2px] bg-black"></div>
//   </section>
// NOTE: this section does NOT use the standard `max-w-[1920px] px-[6em]` container —
// the 120em band is `mx-auto` directly inside the section, so at 1280 it spans the
// full viewport. Adding the gutter wrapper would push it into horizontal overflow.
// The 2px black rule is a full-bleed sibling BELOW the band (160px + 2px = 162px).
//
// `band` sets the band fill. CLONE_SPEC_CORE_A finding: the band colour is NOT
// fixed at cream — it matches the section ABOVE the divider, so it varies per
// page (cream on the homepage, cream-dark or bg-leaf elsewhere).
//
// `leaves` lets a caller swap the coordinate set; it defaults to DIVIDER_LEAVES.
// Leaves render in their initial drift position (translate from `from`, in em).
// The drift-in motion — whileInView, once, amount 0, 1500ms,
// cubic-bezier(0.455,0.03,0.515,0.955), no stagger — is the animation agent's job;
// the `marketing-drift-leaf` class and the `from` data are already in place.
export default function LeafDivider({ leaves = DIVIDER_LEAVES, band = 'bg-cream' }) {
  return (
    <section aria-hidden="true" className="relative">
      <div className="relative mx-auto -mt-[3em] w-[120em]">
        <span aria-hidden="true" className="pointer-events-none">
          {leaves.map((leaf, index) => {
            const { src, style } = leafStyle(leaf)
            return (
              <img
                key={index}
                src={src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className={leafClassName(leaf)}
                style={style}
              />
            )
          })}
        </span>
        <div className={`relative z-[200] h-[15em] ${band}`} />
      </div>
      <div className="relative z-[201] h-[2px] bg-black" />
    </section>
  )
}
