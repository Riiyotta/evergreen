import { Link } from 'react-router-dom'
import LeafLayer from './LeafLayer.jsx'
import { CARD_LEAVES } from '../lib/leaves.js'

// BlogCard — the /blog listing row. CLONE_SPEC_CONTENT_A §1.2, markup verbatim.
//
// ⚠ /blog is NOT a card grid. It is ONE column of 53 full-width split rows
// (image left / copy right), pitch a constant 531.98px @1280.
//
// Measured @1280:
//   row wrapper  w-[95.2213em] = 1015.69, margin 53.3333px 0 101.3333px
//   card         1015.69 x 430.66, radius 10px, border 2px #000,
//                bg #ffffff (⚠ pure white, not cream), overflow hidden
//   image col    h-[40em] w-1/2 flex-1 -> 505.84 x 426.66, border-right 2px #000
//   image        503.84 x 426.66, object-cover, alt="" (decorative)
//   copy col     w-1/2 p-[4em] -> padding 42.6666px, content 420.53px,
//                vertically centred by the card's items-center
//   h2           37.3333 / 52.2666 / 600 / serif / #000 / left
//   excerpt      16.6667 / 28.3333 / 400, margin-block 25px
//   Keep reading leaf 13.5 x 36.8 + label 18.6667 / 31.7333 / 600, underlined
//
// Card height is IMAGE-driven, so it is constant regardless of title length
// (the copy block measures 337.5 / 365.83 / 418.08 for 2 / 3 / 4-line titles).
//
// ⚠ ONLY "Keep reading" is a link. The image and the h2 are NOT wrapped in an
// anchor — do not make the whole card clickable.
// ⚠ NO hover state at all: measured transform:none, cursor:auto, no shadow.
//
// `--blog-card-tablet-width` is referenced by the original but never defined in
// its stylesheet (§1.3), so the ≤991px card is plain `w-full` here.
//
// MOTION: the 3 leaves are §7.2 CARD_LEAVES, byte-identical on every row —
// no stagger, no transition-delay, no index-based delay, and the card box
// itself has no entrance animation (§1.4). They are rendered in their INITIAL
// pre-drift transform by LeafLayer; the Animation agent drives x/y -> 0.
export default function BlogCard({ slug, title, excerpt, heroImage, heroImageAlt = '' }) {
  return (
    <div className="relative mb-[9.5em] mt-[5em] flex w-[95.2213em] flex-col items-center max-wf-tablet:w-full">
      <LeafLayer leaves={CARD_LEAVES} />
      <div className="relative z-[100] flex w-full items-center overflow-hidden rounded-[10px] border-2 border-black bg-white max-wf-tablet:w-full max-wf-tablet:max-w-full max-wf-tablet:flex-col max-wf-mini:w-full">
        <div className="relative h-[40em] w-1/2 flex-1 border-r-2 border-black max-wf-tablet:w-full max-wf-tablet:border-r-0 max-wf-mini:h-auto max-wf-mini:flex-none">
          <img
            src={heroImage}
            alt={heroImageAlt}
            className="size-full object-cover max-wf-mini:h-auto"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="w-1/2 p-[4em] text-left max-wf-tablet:w-full max-wf-tablet:text-center">
          <h2 className="font-headline text-[3.5em] font-semibold leading-[1.4] text-black">
            {title}
          </h2>
          <p className="my-[1.5em] w-full text-[1.5625em] max-wf-tablet:mx-auto max-wf-tablet:w-[31.115em] max-wf-tablet:max-w-full">
            {excerpt}
          </p>
          <Link to={`/blog/${slug}`} className="flex w-full justify-center">
            <img
              src="/assets/ever-small-leafsvg-e988d6.svg"
              alt=""
              aria-hidden="true"
              className="mr-[0.7em] mt-[0.4em] w-[1.26708em] max-wf-mini:mb-[0.9em] max-wf-mini:w-[2em]"
            />
            <p className="mt-[0.5em] text-[1.75em] font-semibold">Keep reading</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
