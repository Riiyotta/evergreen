// CLONE_SPEC_CORE_B §R-3 — /referral earnings-tier pill row.
// Reuses the homepage stat pill (§5.5) UNCHANGED — pill 120.02 × 61.33,
// radius 46px, 2px black border, bg-leaf, mb-[1.2em]; label 26.667 / 700 /
// 41.067 (§3.3 "Big stat"); column w-[25em], justify-around across 1152.
//
// ⚠️ NEW responsive mode: at ≤767px this becomes a 2-column CSS grid
// (`grid-cols-2`, `gap-x-0 gap-y-[3em]`, `items-start`) where the homepage
// stat row uses two `w-1/2` flex halves. Columns also narrow to `w-[16em]`.
//
// The dollar sign comes AFTER the number in all four figures — that is the
// original.
const BLOCK = 'my-[4.2em] text-center max-wf-mini:my-[3.5em]'

const TIERS = [
  { pill: '350$', caption: 'If your referral has 50 users you can earn up to 350$' },
  { pill: '1800$', caption: 'If your referral has 250 users you can earn up to 1800$' },
  { pill: '3500$', caption: 'If your referral has 500 users you can earn up to 3500$' },
  { pill: '8100$', caption: 'If your referral has 1500 users you can earn up to 8100$' },
]

export default function EarningsTiers() {
  return (
    <div
      className={`${BLOCK} mt-[6.5em] flex justify-around max-wf-phone:grid max-wf-phone:grid-cols-2 max-wf-phone:items-start max-wf-phone:gap-x-0 max-wf-phone:gap-y-[3em] max-wf-phone:flex-col max-wf-mini:mt-[6.5em]`}
    >
      {TIERS.map((tier) => (
        <div
          key={tier.pill}
          className="flex w-[25em] flex-col items-center max-wf-phone:mb-[4.6em] max-wf-phone:w-[16em]"
        >
          <span className="mb-[1.2em] flex h-[5.75094em] w-[11.2528em] items-center justify-center rounded-[46px] border-2 border-black bg-leaf">
            <span className="text-center text-[2.5em] leading-[1.54] font-bold text-black max-wf-phone:text-[2.4em]">
              {tier.pill}
            </span>
          </span>
          <p className="mx-auto max-w-[49ch] text-center">{tier.caption}</p>
        </div>
      ))}
    </div>
  )
}
