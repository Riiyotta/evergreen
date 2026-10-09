import { useParams } from 'react-router-dom'
import CtaSection from '../components/CtaSection.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import FaqDl from '../components/blocks/FaqDl.jsx'
import LeafBulletList from '../components/blocks/LeafBulletList.jsx'
import LeafDl from '../components/blocks/LeafDl.jsx'
import { MessageGrid } from '../components/MessageCard.jsx'
import PagePending from '../pages/PagePending.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { PARENT_BADGE, getDetail } from '../data/collections.js'
import { CardGrid, Hero, ProseBody, ProseLeft, SectionHeading } from './blocks.jsx'

// T-DETAIL — ONE block composer serving all 102 SEO detail routes:
//   /employee-recognition/glossary/:slug          30
//   /employee-recognition/for/:slug               12
//   /employee-recognition-messages/:slug          35
//   /company-values/:slug                         25
//
// CLONE_SPEC_CONTENT_B §3: one page shape driven by an ordered array of blocks.
// §3.10 is the template contract — the block ORDER and the section HEADINGS are
// fixed per collection and therefore live here, not in the data; the only
// instance-to-instance variation is card counts, row counts and prose length. The
// two counted headings ("{N} messages …") are the one exception and are computed
// from the item's own data.
//
// Frame: one bg-cream section (pb-[5em]) -> leaf divider (161.98px) ->
// bg-cream-dark final CTA (1038.81px). Cards are `as="h3"` throughout — these are
// "related / further reading" groups, not a top-level listing (§5.1).

// Block kinds the composer understands. Each entry in a sequence is
// [kind, payload]; `heading` payload is the verbatim §14.4 string.
function Block({ kind, payload, collection }) {
  switch (kind) {
    case 'heading':
      return <SectionHeading>{payload}</SectionHeading>
    case 'proseLeft':
      return <ProseLeft paragraphs={payload} />
    case 'richtext':
      return <ProseBody sections={payload} />
    case 'leafBullets':
      return <LeafBulletList items={payload} />
    case 'leafDl':
      return <LeafDl rows={payload} />
    case 'faqDl':
      return <FaqDl rows={payload} />
    case 'messageGrid':
      return <MessageGrid messages={payload} />
    case 'cardGrid':
      return <CardGrid items={payload} as="h3" />
    default:
      throw new Error(`T-DETAIL: unknown block "${kind}" on ${collection}`)
  }
}

// ── The four fixed sequences (§3.10 + §14.4 headings, verbatim) ────────────────
const SEQUENCES = {
  glossary: (d) => [
    ['proseLeft', [d.intro]],
    ['richtext', d.body],
    ['heading', 'What it looks like'],
    ['leafBullets', d.examples],
    ['heading', 'Questions people ask'],
    ['faqDl', d.faq],
    ['heading', 'Related terms'],
    ['cardGrid', d.relatedTerms],
    ['heading', 'In practice'],
    ['cardGrid', d.inPractice],
    ['heading', 'Further reading'],
    ['cardGrid', d.furtherReading],
  ],
  messages: (d) => [
    ['richtext', d.body],
    ['heading', `${d.count} messages you can send`],
    ['messageGrid', d.messages],
    ['heading', 'What makes one land'],
    ['leafBullets', d.land],
    ['heading', 'Questions people ask'],
    ['faqDl', d.faq],
    ['heading', 'The values behind it'],
    ['cardGrid', d.values],
    ['heading', 'Where it fits'],
    ['cardGrid', d.glossary],
    ['heading', 'Other occasions'],
    ['cardGrid', d.otherOccasions],
  ],
  values: (d) => [
    ['richtext', d.body],
    ['heading', 'How you would know'],
    ['leafDl', d.signals],
    ['heading', `${d.messages.length} messages that name it`],
    ['messageGrid', d.messages],
    // PROSE_LEFT is optional on some instances (§3.10 note).
    ...(d.absence
      ? [
          ['heading', 'What its absence looks like'],
          ['proseLeft', [d.absence]],
        ]
      : []),
    ['heading', 'Recognising it well'],
    ['leafBullets', d.recognise],
    ['heading', 'Questions people ask'],
    ['faqDl', d.faq],
    ['heading', 'Occasions where it shows up'],
    ['cardGrid', d.occasions],
    ['heading', 'Where it fits'],
    ['cardGrid', d.whereItFits],
    ['heading', 'Related values'],
    ['cardGrid', d.relatedValues],
  ],
  for: (d) => [
    ['richtext', d.body],
    ['heading', 'What gets in the way'],
    ['leafDl', d.obstacles],
    ['heading', 'What works'],
    ['leafBullets', d.works],
    ['heading', `${d.messages.length} messages written for this team`],
    ['messageGrid', d.messages],
    ['heading', 'A program that fits'],
    ['leafDl', d.program],
    ['heading', 'Questions people ask'],
    ['faqDl', d.faq],
    ['heading', 'Occasions and values that come up most'],
    ['cardGrid', d.related],
    ['heading', 'Further reading'],
    ['cardGrid', d.furtherReading],
    ['heading', 'Other teams'],
    ['cardGrid', d.otherTeams],
  ],
}

// The HERO title/lede field names differ per collection (§12.1–12.4).
const HERO = {
  glossary: (d) => ({ title: d.name, lede: d.definition }),
  messages: (d) => ({ title: d.title, lede: d.lede }),
  values: (d) => ({ title: d.name, lede: d.definition }),
  for: (d) => ({ title: d.h1, lede: d.lede }),
}

export default function TDetail({ collection }) {
  const { slug } = useParams()
  const item = getDetail(collection, slug)

  // Every slug in §14.3 is wired, so this is a genuine 404.
  if (!item) return <PagePending />

  const hero = HERO[collection](item)
  const blocks = SEQUENCES[collection](item)

  return (
    <>
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[5em]`}>
          <Hero badge={PARENT_BADGE[collection]} title={hero.title} lede={hero.lede} />
          {blocks.map(([kind, payload], i) => (
            <Block key={i} kind={kind} payload={payload} collection={collection} />
          ))}
        </div>
      </section>

      <LeafDivider band="bg-cream" />

      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          <CtaSection />
        </div>
      </section>
    </>
  )
}
