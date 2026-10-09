import { useParams } from 'react-router-dom'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { BLOCK } from '../lib/classes.js'
import BadgeLink from '../components/BadgeLink.jsx'
import DateLine from '../components/DateLine.jsx'
import RichText from '../components/RichText.jsx'
import RichTextBlocks from '../components/RichTextBlocks.jsx'
import ArkettaCtaPanel from '../components/ArkettaCtaPanel.jsx'
import ContentHeading from '../components/ContentHeading.jsx'
import LinkCard from '../components/LinkCard.jsx'
import RelatedCard from '../components/RelatedCard.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import LeadMagnetForm from '../components/blocks/LeadMagnetForm.jsx'
import { getBlogPost } from '../data/blogPosts.js'

// Route "/blog/:slug" (53 routes) — CLONE_SPEC_CONTENT_A §2 (TEMPLATE B).
//
// Section map @1280 — doc height 9265 / 12518 / 6470 for the three sampled
// instances (rich-text height is the only real variable):
//   A banner        y    0      h    51.74  (Layout — see the note below)
//   B nav           y   51.74   h    76.59  (Layout)
//   C article       y   96.34   h  7549.25  bg-cream, wrapper pb-[5em]
//   C0 head         y   96.34   h   463.70  badge + h1 + date
//   C1 prose        y  613.38   h  4745.75  .marketing-rich-text, 829.64 wide
//   C2 Arketta CTA  y 5388.98   h   557.58  black panel, radius 8px, px padding
//   C3 guide h2     y 5991.36   h   142.06  OPTIONAL
//   C4 guide grid   y 6178.22   h   812.58  OPTIONAL, 4 LinkCards (2x2)
//   C5 more articles y 7035.59  h   511.88  always present, 2 RelatedCards
//   D divider band  y 7613.61   h   161.98  band colour = cream (section above)
//   E lead magnet   y 7743.61   h  1010.95  bg-cream-dark, pt-[18em] pb-[5em]
//   F footer        y 8754.56   h  ~511     (Layout)
//
// ⚠ BANNER FOLLOW-UP: this is the ONLY one of the four content templates that
// renders the announcement banner (§0.1), and it shifts every y-offset below it
// by 51.74px. The banner is owned by Layout's `BANNER_ROUTES`, which is an
// exact-pathname Set, so a parameterised route cannot be expressed in it and
// Layout.jsx is out of this agent's scope. Required central change:
// make the check prefix-aware, e.g.
//   const showBanner = BANNER_ROUTES.has(pathname) || pathname.startsWith('/blog/')
// (`/blog` itself must stay bannerless). Until that lands this route renders
// 51.74px short.
//
// ⚠ C3 + C4 are OPTIONAL — driven by `guideCluster`, absent on the sampled
// product update. C2, C5 and E are always present.
// ⚠ E is NOT the homepage CTA (it breaks §1 H): articles end with the gated-PDF
// lead-magnet form, not "Start feeling good about work".
// ⚠ No hero image on the article itself; no author, avatar, read time, share
// row, tag list or table of contents anywhere (§2.2).
//
// MOTION: 12 DIVIDER_LEAVES (band D) + 2 x 3 CARD_LEAVES (the RelatedCards) are
// rendered in their initial pre-drift transform. Nothing else animates on this
// route: no scroll-progress bar, no sticky TOC, no prose reveal (§2.9).

// §2.7 — PLACEHOLDER copy of the recorded length (~44 words in 2 paragraphs
// separated by <br><br>, the second sentence wrapped in <strong>). CONTENT_A
// recorded the geometry and word count, not the text.
const LEAD_MAGNET_HEADING =
  'Want to access our Practical Guide of Employee Recognition?'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[12em] pt-[12em] text-center`}>
          <h1 className="mx-auto max-w-[49ch] text-center">Article not found</h1>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* ================= C — article section ================= */}
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[5em]`}>
          {/* C0 — page head (§2.2): badge, h1, date. No hero image. */}
          <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
            <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
              <BadgeLink label="Blog" href="/blog" />
              <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
                {post.title}
              </h1>
              <DateLine date={post.date} />
            </div>
          </div>

          {/* C1 — prose. The 29.87px gap to C2 below is the last paragraph's
              own margin-bottom; the panel has no margin of its own. */}
          <RichText>
            <RichTextBlocks blocks={post.body} />
          </RichText>

          {/* C2 — Arketta cross-promo panel */}
          <ArkettaCtaPanel />

          {/* C3 + C4 — optional guide cluster, 4 LinkCards with h3 headings */}
          {post.guideCluster && (
            <>
              <ContentHeading>{post.guideCluster.heading}</ContentHeading>
              <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
                <ul className="flex w-full flex-wrap justify-center gap-[3em]">
                  {post.guideCluster.cards.map((card) => (
                    <LinkCard
                      key={card.href}
                      as="h3"
                      href={card.href}
                      title={card.title}
                      description={card.description}
                      ctaLabel={card.ctaLabel}
                    />
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* C5 — "More articles": exactly 2 RelatedCards, justify-around */}
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <div className="mt-[7em] flex w-full flex-wrap justify-between">
              <h2 className="mx-auto max-w-[49ch] text-center font-headline text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-[3.9em]">
                {post.moreArticles.heading}
              </h2>
              <div className="mt-[3em] flex w-full items-stretch justify-around max-wf-tablet:flex-col max-wf-tablet:items-center">
                {post.moreArticles.cards.map((card) => (
                  <RelatedCard
                    key={card.slug}
                    slug={card.slug}
                    title={card.title}
                    ctaLabel={card.ctaLabel}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= D — divider band ================= */}
      {/* band colour matches the section ABOVE it, which is bg-cream */}
      <LeafDivider band="bg-cream" />

      {/* ================= E — lead-magnet CTA (cream-dark) ================= */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          <div
            className={`${BLOCK} mt-0 flex justify-center max-wf-mini:mt-0 max-wf-phone:flex-col`}
          >
            <div className="mx-auto mt-0 w-auto">
              <h2 className="font-headline text-center text-[6.125em] font-semibold leading-[1.4] text-black max-wf-mini:text-[5.1em]">
                {LEAD_MAGNET_HEADING}
              </h2>
            </div>
          </div>

          {/* ⚠ max-w-[59ch] (699.22px @1280) — a NEW container width, not the
              49ch / 580.714px used everywhere else. Keep it in `ch`. */}
          <div className={BLOCK}>
            <p className="mx-auto max-w-[59ch] text-center">
              Our Practical Guide of Employee Recognition collects the habits,
              prompts and templates we see working in real teams, in one short
              PDF you can hand to a manager.
              <br />
              <br />
              <strong>
                Fill in the form and we will email the guide straight to you.
              </strong>
            </p>
          </div>

          {/* Form column is max-w-[80ch] = 541.63px @1280; owned by LeadMagnetForm */}
          <LeadMagnetForm />
        </div>
      </section>
    </>
  )
}
