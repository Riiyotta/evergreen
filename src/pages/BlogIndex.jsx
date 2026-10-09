import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { BLOCK } from '../lib/classes.js'
import BlogCard from '../components/BlogCard.jsx'
import { blogIndex, blogPosts } from '../data/blogPosts.js'

// Route "/blog" — CLONE_SPEC_CONTENT_A §1 (TEMPLATE A).
//
// Section map @1280 — total document height target 29100px:
//   A nav           y    0      h    77     (Layout)
//   B page head     y   44.61   h   206.13  bg-cream, inner pt-[10.2em]
//   B1 h1           y  153.41   h    97.33  "Evergreen Blog"
//   C card list     y  295.53   h 28248.5   53 rows, pitch 531.98 constant
//   D footer        y 28588.8   h  ~511     (Layout)
//
// ⚠ This route has NO announcement banner, NO eyebrow badge, NO intro
// paragraph, NO divider band and NO final CTA (§1.1). h1 -> cards -> footer.
// Layout's BANNER_ROUTES already excludes /blog, so nothing is needed here.
//
// ⚠ The wrapper here is the SECTION_WRAPPER with NO `pb-[5em]` (§0.2) — the
// only one of the four templates without it.
//
// ⚠ It is NOT a grid: one vertical stack of 53 full-width split rows, one
// column at every viewport (§1.2). No pagination, no load-more, no filters, no
// tag chips, no search, no sort — all 53 posts are rendered in one list.
//
// MOTION: 53 x 3 = 159 CARD_LEAVES rendered in their initial pre-drift state by
// BlogCard. No card stagger, no entrance animation, no scroll-linked motion.
export default function BlogIndex() {
  return (
    <section className="relative bg-cream">
      <div className={SECTION_WRAPPER}>
        {/* B — shared page-head block (§0.3), badge slot unused on this route */}
        <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
          <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
            {/* max-w-[49ch] stays in `ch`: it measures in the display serif and
                resolves to 1981.52px, i.e. effectively unconstrained (§11.2). */}
            <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
              {blogIndex.h1}
            </h1>
          </div>
        </div>

        {/* C — the card list. The inner bare div shrink-wraps to the row width
            (1015.69px @1280), which is what centres the column. */}
        <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
          <div>
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                heroImage={post.heroImage}
                heroImageAlt={post.heroImageAlt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
