import { Link } from 'react-router-dom'
import LeafLayer from './LeafLayer.jsx'
import { CARD_LEAVES } from '../lib/leaves.js'

// CaseStudyTeaserCard — CLONE_SPEC_CONTENT_B §5.4 (T-STORY "other stories" row).
//
// The wrapper is `w-[34.4013em]` (366.94px) but the card inside is `w-[42em]`
// (447.98px): the cards DELIBERATELY overflow their wrapper and overlap. Do not
// "fix" the mismatch — it is what puts the two cards at x 232.53 / 712.51.
// Card 447.98 x 475.09px, bg #ffffff, 2px #000, radius 10px, padding
// 45.007px 32px 39.333px. `mb-[14em]` (149.333px) on the outer div pairs with
// the row's `mb-[-10em]` to pull the divider up under the cards.
//
// 3 CARD_LEAVES behind each card (§11), initial pre-drift state only.
export default function CaseStudyTeaserCard({ story }) {
  return (
    <div className="mb-[14em]">
      <div className="relative flex w-[34.4013em] flex-col items-center max-wf-mini:w-auto">
        <LeafLayer leaves={CARD_LEAVES} />
        <div className="relative z-[100] flex h-full w-[42em] flex-col items-center rounded-[10px] border-2 border-black bg-white px-[3em] pt-[4.21943em] pb-[3.6875em] max-wf-mini:w-auto">
          <span className="flex justify-center">
            <img src={story.logo} alt={`${story.company} logo`} className="h-[4.3em]" />
          </span>
          <div className="my-[1.3em]">
            <h2 className="font-headline text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-[3.9em]">
              {story.company}
            </h2>
          </div>
          <div className="mb-[1.3em] flex font-semibold">
            <p className="text-center font-bold">{story.employeesShort}</p>
            <p className="ml-[0.3em] text-center font-bold">Employees</p>
          </div>
          <p className="mx-auto max-w-[49ch] text-center text-[1.5625em]">{story.teaser}</p>
          <div className="mt-[1.3em] max-wf-mini:min-h-[4.69em]">
            <Link
              to={`/customer-success-stories/${story.slug}`}
              className="flex w-full justify-center no-underline"
            >
              <p className="mt-[0.5em] text-[1.75em] font-semibold">Read full case study</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
