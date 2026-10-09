// T-PILLAR data — /employee-recognition.
// Spec: CLONE_SPEC_CONTENT_B §4.3 (page map), §3 (block vocabulary), §5.1
// (LinkCard + CTA labels), §14.3 / §14.5 (verbatim copy), block y/h table in
// `_reference/recon-b/er_hub.json`.
//
// REAL: the h1, the stat captions, the prose `h2` sequence CONTENT_B recorded,
// the "Questions people ask" / "Reading list" section headings, the eight
// reading-list category `h3` labels (§4.3 item 4), every card TARGET + title
// that CONTENT_B tabulates (§14.3 names the 12 team guides, the 25 values and
// the 35 message articles; src/data/blogPosts.js holds the real blog titles and
// slugs, including the first card of each reading-list category, which the
// measurement captured), and the final-CTA copy.
//
// PLACEHOLDER (clearly marked): every prose paragraph, every FAQ answer, every
// glossary definition and every card description that the measurement truncated.
// CONTENT_B records the pillar article body only as element counts and block
// heights (§2.2) — the 25 065px of article copy is not transcribed.
//
// Paragraph LENGTHS are derived from the measured block heights rather than
// guessed: `proseBlock(targetHeight, …)` distributes the available rendered
// lines across the paragraphs of a block so each `.marketing-rich-text` block
// lands on its recorded height.
import { fillText, PROSE_COL, BLOCK_COL } from './fillLines.js'
import { CTA_LABEL_BY_TARGET, CTA_LABEL_FOR_INDEX } from '../components/LinkCard.jsx'
import { blogPosts } from './blogPosts.js'

const P = '[Placeholder copy]'

// Measured element box metrics @1280 (§2.1), used to turn a target block height
// into a line budget.
const H2_BOX = 57.6 + 38.4 // prose h2 + margin-bottom
const H3_BOX = 41.067 + 8 // prose h3 + margin-bottom
const P_MARGIN = 29.867 // prose p margin-bottom
const LINE = 31.733 // prose p line-height

/**
 * Builds one `.marketing-rich-text` block of the recorded shape, sized to its
 * recorded height. `shape` is an ordered array of
 *   { h2 } | { h3 } | { p: count }
 * and `targetHeight` is the measured block height from er_hub.json.
 */
function proseBlock(targetHeight, shape, seed, lineAdjust = 0) {
  const headingHeight = shape.reduce(
    (sum, item) => sum + (item.h2 ? H2_BOX : 0) + (item.h3 ? H3_BOX : 0),
    0,
  )
  const paragraphs = shape.reduce((sum, item) => sum + (item.p || 0), 0)
  // `lineAdjust` compensates for the generator's rounding on short blocks,
  // where a one-line miss is a double-digit percentage of the block.
  const lineBudget =
    Math.max(
      paragraphs * 2,
      Math.round((targetHeight - headingHeight - paragraphs * P_MARGIN) / LINE),
    ) + lineAdjust
  const base = Math.floor(lineBudget / paragraphs)
  let extra = lineBudget - base * paragraphs
  const nodes = []
  let index = 0
  shape.forEach((item) => {
    if (item.h2) nodes.push({ type: 'h2', text: item.h2 })
    if (item.h3) nodes.push({ type: 'h3', text: item.h3 })
    for (let i = 0; i < (item.p || 0); i += 1) {
      const lines = base + (extra > 0 ? 1 : 0)
      if (extra > 0) extra -= 1
      index += 1
      nodes.push({ type: 'p', text: fillText(lines, PROSE_COL, `${seed}-${index}`, P) })
    }
  })
  return nodes
}

// `descriptionLines` — card descriptions are 16.667px/28.333px in a 392.8px
// content box, so the line budget is computed against ~6.9px per character.
const CARD_DESC_COL = 392.8 * (8.6 / 6.9)

function card(href, title, descriptionLines, seed, ctaLabel) {
  return {
    href,
    title,
    description: descriptionLines
      ? fillText(descriptionLines, CARD_DESC_COL, seed, P)
      : undefined,
    ctaLabel:
      ctaLabel ||
      CTA_LABEL_FOR_INDEX[href] ||
      CTA_LABEL_BY_TARGET['/' + href.split('/').filter(Boolean).slice(0, 2).join('/')] ||
      'Read more',
  }
}

function blogCard(slug) {
  const post = blogPosts.find((item) => item.slug === slug)
  return {
    href: `/blog/${slug}`,
    title: post ? post.title : slug,
    description: post ? post.excerpt : undefined,
    ctaLabel: CTA_LABEL_BY_TARGET['/blog'],
  }
}

// §14.3 — the 12 team guides, alphabetical, verbatim titles.
const TEAM_GUIDES = [
  ['agencies', 'Agencies'],
  ['customer-support-teams', 'Customer support teams'],
  ['education-teams', 'Education teams'],
  ['engineering-teams', 'Engineering teams'],
  ['healthcare-teams', 'Healthcare teams'],
  ['manufacturing-teams', 'Manufacturing teams'],
  ['nonprofits', 'Nonprofits'],
  ['remote-teams', 'Remote teams'],
  ['retail-and-hospitality-teams', 'Retail and hospitality teams'],
  ['sales-teams', 'Sales teams'],
  ['small-businesses', 'Small businesses'],
  ['startups', 'Startups'],
]

// §14.3 — 10 glossary terms for the LEAF_DL "vocabulary" block. Term names are
// real; the 3-line definitions are placeholder (dl height 1534.1 = 10 rows x
// 3-line definition, measured).
const VOCABULARY = [
  'Employee recognition',
  'Peer-to-peer recognition',
  'Social recognition',
  'Values-based recognition',
  'Spot award',
  'Service award',
  'Monetary recognition',
  'Non-monetary recognition',
  'Recognition fatigue',
  'Participation rate',
]

export const PILLAR = {
  h1: 'Employee recognition',
  // Hero lede — `max-w-[49ch]` paragraph, measured 4 lines (block h 377.86).
  lede: fillText(4, 580.71, 'pillar-lede', P),

  // The ordered page body. Every entry maps 1:1 onto a measured block in
  // er_hub.json; `y`/`h` are the measured values at 1280 and are recorded here
  // so a regression is obvious.
  blocks: [
    // y 467.29, h 1101.0
    {
      kind: 'prose',
      nodes: proseBlock(1101.0, [{ h2: 'What employee recognition is' }, { p: 5 }], 'rt1', 1),
    },
    // y 1637.61, h 137.59 — the 4-stat pill row, in a `div.my-[4em]`.
    { kind: 'stats' },
    // y 1820.0, h 4345.3
    {
      kind: 'prose',
      nodes: proseBlock(
        4345.3,
        [
          { p: 1 },
          { h2: 'Why it matters' },
          { p: 2 },
          { h3: 'Retention' },
          { p: 2 },
          { h3: 'Engagement' },
          { p: 2 },
          { h2: 'The types of employee recognition' },
          { h3: 'Formal and informal' },
          { p: 2 },
          { h3: 'Monetary and non-monetary' },
          { p: 2 },
          { h3: 'Top-down and peer-to-peer' },
          { p: 2 },
          { h2: 'How to build an employee recognition program' },
          { h3: 'Decide what you are recognising' },
          { p: 1 },
          { h3: 'Pick the cadence' },
          { p: 1 },
          { h3: 'Make it visible' },
          { p: 1 },
          { h3: 'Give managers a script' },
          { p: 1 },
          { h3: 'Measure participation, not volume' },
          { p: 1 },
        ],
        'rt2',
      ),
    },
    // y 6210.06, h 903.61 — 5 cards (rows 281.39 / 305.25 / 253).
    {
      kind: 'cards',
      cards: [
        {
          href: '/employee-recognition-messages',
          title: 'Recognition messages for every occasion',
          // measured description, verbatim
          description: '35 occasions, each with example messages and a note on why each lands.',
          ctaLabel: CTA_LABEL_FOR_INDEX['/employee-recognition-messages'],
        },
        card('/employee-recognition-messages/employee-appreciation', 'Employee Appreciation Messages: 13 Specific Examples', 1, 'c-a2'),
        card('/employee-recognition-messages/work-anniversary', 'Work Anniversary Messages: 14 Examples for Every Milestone', 1, 'c-a3'),
        card('/employee-recognition-messages/new-team-member', 'Welcome Messages for a New Team Member: 12 Examples', 1, 'c-a4'),
        card('/employee-recognition-messages/promotion', 'Promotion Congratulation Messages: 12 That Aren’t Generic', 1, 'c-a5'),
      ],
    },
    // y 7158.47, h 629.8
    {
      kind: 'prose',
      nodes: proseBlock(
        629.8,
        [{ p: 1 }, { h2: 'What to say' }, { h3: 'Be specific' }, { p: 1 }, { h3: 'Say what it changed' }, { p: 2 }],
        'rt3',
        1,
      ),
    },
    // y 7833.11, h 860.3 — 5 cards.
    {
      kind: 'cards',
      cards: [
        {
          href: '/company-values',
          title: 'Company values, described as behaviour',
          description: '25 values, each with the behaviour that shows it and the words that name it.',
          ctaLabel: CTA_LABEL_FOR_INDEX['/company-values'],
        },
        card('/company-values/gratitude', 'Gratitude', 2, 'c-b2'),
        card('/company-values/accountability', 'Accountability', 3, 'c-b3'),
        card('/company-values/ownership', 'Ownership', 3, 'c-b4'),
        card('/company-values/trust', 'Trust', 2, 'c-b5'),
      ],
    },
    // y 8738.19, h 504.8
    {
      kind: 'prose',
      nodes: proseBlock(
        504.8,
        [{ p: 1 }, { h2: 'Recognition and culture' }, { h3: 'Habits beat campaigns' }, { p: 2 }],
        'rt4',
        1,
      ),
    },
    // y 9287.78, h 1979.2 — the 12 team guides.
    {
      kind: 'cards',
      cards: TEAM_GUIDES.map(([slug, name], index) =>
        card(`/employee-recognition/for/${slug}`, name, index === 0 ? 4 : 3, `c-for-${slug}`),
      ),
    },
    // y 11311.8, h 1531.9
    {
      kind: 'prose',
      nodes: proseBlock(
        1531.9,
        [
          { p: 1 },
          { h2: 'Remote and hybrid teams' },
          { h3: 'Make it asynchronous' },
          { p: 2 },
          { h3: 'Keep it in one place' },
          { p: 2 },
          { h3: 'Watch the quiet contributors' },
          { p: 2 },
        ],
        'rt5',
      ),
    },
    // y 12888.5, h 309.72 — 2 cards.
    {
      kind: 'cards',
      cards: [
        {
          href: '/',
          title: 'Evergreen for Slack and Microsoft Teams',
          description: 'Peer-to-peer recognition where your team already works, with a tree planted for every recognition.',
          ctaLabel: 'Read the guide',
        },
        // ⚠️ The second card's target was not captured; /pricing is the
        // plausible internal destination. Flagged in the handoff.
        card('/pricing', 'What Evergreen costs', 4, 'c-d2', 'Read the guide'),
      ],
    },
    // y 13243.0, h 191.2
    { kind: 'prose', nodes: proseBlock(191.2, [{ h2: 'The vocabulary' }, { p: 1 }], 'rt6', 1) },
    // y 13479.0, h 1808.0 — LEAF_DL (10 rows) + one centred glossary card.
    {
      kind: 'vocabulary',
      rows: VOCABULARY.map((term, index) => ({
        term,
        definition: fillText(3, BLOCK_COL, `voc-${index}`, P),
      })),
      card: {
        href: '/employee-recognition/glossary',
        title: 'Employee recognition glossary',
        description: '30 terms, each defined in one sentence and shown in use.',
        // ⚠️ §5.1 gives no CTA label for the glossary INDEX (only for its
        // items). The item label is reused; flagged in the handoff.
        ctaLabel: CTA_LABEL_BY_TARGET['/employee-recognition/glossary'],
      },
    },
    // y 15331.8, h 316.2
    { kind: 'prose', nodes: proseBlock(316.2, [{ h2: 'Where to start' }, { p: 2 }], 'rt7', 1) },
    // y 15692.9, h 71.03
    { kind: 'heading', text: 'Questions people ask' },
    // y 15808.7, h 1929.9 — 9 FAQ rows (1-line question + 4-line answer).
    {
      kind: 'faq',
      rows: [
        'What is employee recognition?',
        'Why does employee recognition matter?',
        'What are the types of employee recognition?',
        'How often should recognition happen?',
        'Does recognition have to cost money?',
        'Who should give recognition?',
        'What makes a recognition message land?',
        'How do you measure a recognition program?',
        'How do you keep a program going?',
      ].map((question, index) => ({
        question,
        answer: fillText(index < 2 ? 5 : 4, BLOCK_COL, `faq-${index}`, P),
      })),
    },
    // y 17783.4, h 71.03
    { kind: 'heading', text: 'Reading list' },
    // y 17899.2 … 22871.2 — 8 `div.mt-[4em]` groups: h3 + card grid.
    // Category labels verbatim (§4.3 item 4); the first card of each category is
    // the one the measurement captured.
    {
      kind: 'readingList',
      groups: [
        {
          h3: 'Why it matters',
          slugs: [
            'what-are-the-effects-of-the-employee-recognition',
            'reasons-why-employee-recognition-programs-fail-and-how-to-ensure-its-success',
            'employee-retention-5-strategies-for-retaining-top-talent',
          ],
        },
        {
          h3: 'Getting started',
          slugs: [
            '5-things-you-need-to-know-about-employee-recognition',
            'creating-a-culture-of-appreciation-peer-to-peer-recognition-templates-and-examples',
          ],
        },
        {
          h3: 'Culture',
          slugs: [
            'how-recognition-promotes-dei-in-the-workplace',
            'creating-a-great-workplace-culture-with-psychological-safety',
            'how-to-create-a-positive-employee-experience',
            'how-does-dei-impact-employee-engagement-in-organizations',
          ],
        },
        {
          h3: 'Programs',
          slugs: [
            'how-to-create-employee-recognition-program-step-by-step-guide',
            '5-companies-with-the-best-employee-recognition-programs',
            'how-to-build-a-great-and-succesful-employer-brand-tips-examples',
          ],
        },
        {
          h3: 'Ideas and templates',
          slugs: [
            '35-creative-ideas-on-how-to-recognize-employees',
            '15-creative-ways-to-give-shoutout-to-coworkers',
            '15-team-building-activities-to-increase-employee-motivation',
          ],
        },
        {
          h3: 'Remote and virtual',
          slugs: [
            'how-to-move-from-physical-to-virtual-recognition-program',
            'easy-guide-to-identify-a-not-engaged-employee',
          ],
        },
        {
          h3: 'Occasions',
          slugs: [
            'what-is-employee-appreciation-day-and-why-recognizing-your-employees-matters',
            '12-ways-to-celebrate-earth-day',
          ],
        },
        {
          h3: 'Measuring and tools',
          slugs: ['employee-recognition-in-slack', 'employee-recognition-metrics'],
        },
      ].map((group) => ({ h3: group.h3, cards: group.slugs.map(blogCard) })),
    },
  ],

  // §4.3 item 5 — the REPLACED final CTA. Copy verbatim.
  finalCta: {
    heading: 'Want to access our Practical Guide of Employee Recognition?',
    // `max-w-[59ch]` = 699.47px, measured h 222.14 (7 lines) with <br><br> and
    // a nested <strong>. The sentence below is the measured opening; the rest
    // is placeholder.
    paragraphLead: 'Gain valuable insights and practical tips to foster a culture of positive recognition in your team.',
    paragraphTail: fillText(3, 699.47, 'pillar-cta', P),
    paragraphStrong: 'Download the guide and get started today.',
  },

  seo: {
    title: 'Employee Recognition: The Complete Guide | Evergreen',
    description:
      'What employee recognition is, why it works, the types, how to build a program, what to write and how to measure it. One guide, with examples for every occasion.',
  },
}
