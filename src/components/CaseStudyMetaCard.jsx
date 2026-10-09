import LeafLayer from './LeafLayer.jsx'
import { CARD_LEAVES } from '../lib/leaves.js'

// CaseStudyMetaCard — CLONE_SPEC_CONTENT_B §5.3 (T-STORY, left column of the
// prose row). Measured @1280: column `w-[26%]` = 299.52px, card 299.52 x
// 790.89px, bg #ffffff, 2px #000, radius 10px, padding 45.007px 0 39.333px
// (ZERO horizontal padding — the rows are centred by the flex column, not by
// padding). Row `div.mb-[1.5em]` = margin-bottom 16px, content width 210.67px.
//
// Row labels are fixed and identical on all 4 instances (§5.3 / §14.6):
// Company · HQ Location · Employees · Industry · Trees Planted · Read more.
//
// The `Website` link is OFF-DOMAIN (§13) so it renders with NO href — markup
// and styling unchanged (18px / 18px / 500 / #333333, underlined).
//
// 3 CARD_LEAVES sit behind the card (§11): rendered here in their INITIAL
// pre-drift transform with `marketing-drift-leaf`; the drift (1300 / 1500 /
// 1000ms, easeInOutQuad, whileInView once) is the Animation agent's job.
const LEAF = '/assets/ever-small-leafsvg-e988d6.svg'

function RowLeaf() {
  return (
    <img
      src={LEAF}
      alt=""
      aria-hidden="true"
      className="mt-[0.4em] ml-[0.7em] inline-block w-[1.26708em] max-wf-mini:mb-[0.9em] max-wf-mini:w-[2em]"
    />
  )
}

export default function CaseStudyMetaCard({ meta }) {
  const rows = [
    { label: 'Company', value: meta.company },
    { label: 'HQ Location', value: meta.hqLocation },
    { label: 'Employees', value: meta.employees },
    { label: 'Industry', value: meta.industry },
    { label: 'Trees Planted', value: meta.treesPlanted },
  ]

  return (
    <div className="relative mx-auto flex w-[26%] items-start max-wf-tablet:mb-[5em] max-wf-tablet:w-[46em] max-wf-mini:w-[95%]">
      <LeafLayer leaves={CARD_LEAVES} />
      <div className="relative z-[100] w-full rounded-[10px] border-2 border-black bg-white pt-[4.21943em] pb-[3.6875em]">
        <div className="flex flex-col items-center">
          {rows.map((row) => (
            <div key={row.label} className="mb-[1.5em]">
              <p className="font-semibold">{row.label}</p>
              <p className="mx-[3em] mb-[0.75em] max-w-[49ch] text-center max-wf-mini:mx-0">
                {row.value}
              </p>
              <RowLeaf />
            </div>
          ))}
          <div className="mb-[1.5em]">
            <p className="font-semibold">Read more</p>
            {/* off-domain company site — destination stripped by design (§13) */}
            <a className="mb-[1.2em] text-[1.6875em] font-medium underline">Website</a>
            <RowLeaf />
          </div>
        </div>
      </div>
    </div>
  )
}
