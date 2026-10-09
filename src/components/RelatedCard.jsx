import { Link } from 'react-router-dom'
import LeafLayer from './LeafLayer.jsx'
import { CARD_LEAVES } from '../lib/leaves.js'

// RelatedCard — CLONE_SPEC_CONTENT_A §2.5. The two "More articles" cards at the
// foot of every blog article (block C5). Markup verbatim.
//
// ⚠ This is NOT the shared LinkCard: it carries 3 CARD_LEAVES, has no excerpt,
// centres its content on both axes, and its CTA line IS underlined (the anchor
// has no `no-underline`, unlike LinkCard's).
//
// Measured @1280:
//   outer  mt-[7.6em] = 81.0666px, w-[42em] = 447.98, height 334.20
//   card   447.98 x 304.20, radius 10px, border 2px #000, bg #ffffff,
//          padding-inline 21.3333px (px-[2em]), margin-bottom 30px
//   title  37.3333 / 52.2666 / 600 / serif / #000, centred; wrapper mb-[2em]
//   CTA    leaf 13.5 x 36.8 + "Read blog" 18.6667 / 31.7333 / 600, underlined
//   count  exactly 2
//
// The spec's markup uses an <h2> here; kept as-is.
// NO hover. MOTION: CARD_LEAVES in their initial pre-drift state, no stagger.
export default function RelatedCard({ slug, title, ctaLabel = 'Read blog' }) {
  return (
    <div>
      <div className="relative mt-[7.6em] flex h-full w-[42em] flex-col items-center max-wf-tablet:mb-[6em]">
        <LeafLayer leaves={CARD_LEAVES} />
        <div className="relative z-[100] mb-[30px] flex size-full flex-col items-center justify-center rounded-[10px] border-2 border-black bg-white px-[2em] max-wf-tablet:py-[4em]">
          <div className="mb-[2em]">
            <h2 className="font-headline text-[3.5em] font-semibold leading-[1.4] text-black">
              {title}
            </h2>
          </div>
          <Link to={`/blog/${slug}`} className="flex w-auto justify-center">
            <img
              src="/assets/ever-small-leafsvg-e988d6.svg"
              alt=""
              aria-hidden="true"
              className="mr-[0.7em] mt-[0.4em] w-[1.26708em] max-wf-mini:mb-[0.9em] max-wf-mini:w-[2em]"
            />
            <p className="mt-[0.5em] text-[1.75em] font-semibold">{ctaLabel}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
