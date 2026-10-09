import { words, phrase, paragraphWithLink } from './placeholderProse.js'

// ============================================================================
// src/data/alternatives.js — the 15 `/alternatives/:slug` routes + the index.
// ============================================================================
// Contract: CLONE_SPEC_CONTENT_A §9.3 / §9.4.
//
// VERBATIM from the spec (do not paraphrase):
//  • index badge "Employee recognition guide" → /employee-recognition, h1
//    "Comparing recognition tools", the 31-word intro paragraph (§3.2),
//  • all 15 card titles / hrefs and the CTA label "Read the comparison" (§3.4),
//  • the trailing "What Evergreen is" block and its 2 cards (§3.4),
//  • every comparison section heading: "{C} at a glance", "Where {C} is strong",
//    "Where it falls short", "How Evergreen differs", "Verdict",
//    "Questions people ask", "Sources", "Where recognition happens",
//    "Other comparisons" (§4.1),
//  • the 4 fixed body h2s: "What {C} is", "Who it suits",
//    "How the two products treat a thank-you", "What switching involves" (§4.2),
//  • the 3 SpecList row labels: "Pricing", "Best for", "Website" (§5.4),
//  • CTA labels "See pricing" / "Read the guide" (§4.4).
//
// PLACEHOLDER (safe to replace): `subtitle`, `cardExcerpt`, `metaDescription`,
// every glance / differs definition, `body` paragraphs, `strengths`,
// `shortfalls`, `verdict`, `faq` answers. CONTENT_A recorded only word counts
// and one-line summaries for these, never the prose.
//
// NOT present anywhere in the original (§4.0 / §9.3): competitor logos, a
// comparison <table>, tick/cross cells, ratings, a pricing matrix, a date
// element (the "as read on" date lives inside the Pricing row text).
//
// ⚠ SPEC GAP — the pricing-read date. §5.4 records the FORMAT
// (`Pricing` ends with "(as read on {D Month YYYY})") but no per-competitor
// date was captured, so one placeholder date is used for all 15.
const PRICING_READ_ON = '9 October 2026'

// Verbatim §3.4 table + the real competitor domain for the `Website` row.
// `sources` hrefs are off-domain and therefore rendered INERT (§0 / §10) —
// the two sampled pages' real URLs are kept; the rest follow the same shape.
const TABLE = [
  { slug: 'achievers', competitor: 'Achievers', title: 'Achievers Alternative: Evergreen vs Achievers', domain: 'achievers.com' },
  { slug: 'assembly', competitor: 'Assembly', title: 'Assembly Alternative: Evergreen vs Assembly', domain: 'joinassembly.com' },
  { slug: 'awardco', competitor: 'Awardco', title: 'Awardco Alternative: Evergreen vs Awardco', domain: 'award.co' },
  { slug: 'bonusly', competitor: 'Bonusly', title: 'Bonusly Alternative: Evergreen vs Bonusly', domain: 'bonusly.com',
    sources: [
      { label: 'Bonusly pricing', href: 'https://bonusly.com/pricing' },
      { label: 'Bonusly product overview', href: 'https://bonusly.com/features/product-overview' },
      { label: 'Bonusly rewards', href: 'https://bonusly.com/product/rewards' },
      { label: 'Bonusly Slack integration', href: 'https://bonusly.com/integrations/slack' },
    ] },
  { slug: 'bucketlist', competitor: 'Bucketlist', competitorFull: 'Bucketlist Rewards', title: 'Bucketlist Alternative: Evergreen vs Bucketlist Rewards', domain: 'bucketlistrewards.com' },
  { slug: 'cooleaf', competitor: 'Cooleaf', title: 'Cooleaf Alternative: Evergreen vs Cooleaf', domain: 'cooleaf.com' },
  { slug: 'guusto', competitor: 'Guusto', title: 'Guusto Alternative: Evergreen vs Guusto', domain: 'guusto.com' },
  { slug: 'heytaco', competitor: 'HeyTaco', title: 'HeyTaco Alternative: Evergreen vs HeyTaco', domain: 'heytaco.com',
    sources: [
      { label: 'HeyTaco pricing', href: 'https://heytaco.com/pricing' },
      { label: 'How HeyTaco works', href: 'https://heytaco.com/how' },
      { label: 'HeyTaco', href: 'https://heytaco.com/' },
    ] },
  { slug: 'karma-bot', competitor: 'Karma', title: 'Karma Alternative: Evergreen vs Karma', domain: 'karmabot.chat' },
  { slug: 'kudos', competitor: 'Kudos', title: 'Kudos Alternative: Evergreen vs Kudos', domain: 'kudos.com' },
  { slug: 'matter', competitor: 'Matter', title: 'Matter Alternative: Evergreen vs Matter', domain: 'matterapp.com' },
  { slug: 'motivosity', competitor: 'Motivosity', title: 'Motivosity Alternative: Evergreen vs Motivosity', domain: 'motivosity.com' },
  { slug: 'nectar', competitor: 'Nectar', title: 'Nectar Alternative: Evergreen vs Nectar', domain: 'nectarhr.com' },
  { slug: 'workhuman', competitor: 'Workhuman', title: 'Workhuman Alternative: Evergreen vs Workhuman', domain: 'workhuman.com' },
  { slug: 'worktango', competitor: 'WorkTango', title: 'WorkTango Alternative: Evergreen vs WorkTango', domain: 'worktango.com' },
]

// §4.2 — the four body headings are FIXED on all 15 pages.
const BODY_HEADINGS = (competitor) => [
  `What ${competitor} is`,
  'Who it suits',
  'How the two products treat a thank-you',
  'What switching involves',
]

// One internal inline link per body section (§4.2 lists these five targets).
const BODY_LINKS = [
  ['/employee-recognition', 'what recognition is for'],
  ['/pricing', 'how Evergreen is priced'],
  ['/company-values', 'the values behind a thank-you'],
  ['/esg', 'the trees we plant'],
]

function buildBody(row) {
  const s = (k) => `${row.slug}-body-${k}`
  const blocks = []
  BODY_HEADINGS(row.competitorFull || row.competitor).forEach((text, i) => {
    blocks.push({ t: 'h2', text })
    // §4.2 — strictly alternating h2, p, p; paragraphs 54–87 words.
    blocks.push({
      t: 'p',
      html: paragraphWithLink(50 + i * 4, s(`a${i}`), BODY_LINKS[i][0], BODY_LINKS[i][1]),
    })
    blocks.push({ t: 'p', html: words(56 - i * 3, s(`b${i}`)) })
  })
  return blocks
}

// §5.4 — exactly 3 rows, labels verbatim. `Website` is a bare domain string
// rendered as PLAIN TEXT, never a link.
function buildGlance(row) {
  return [
    {
      term: 'Pricing',
      definition: `${phrase(30, `${row.slug}-glance-pricing`)} (as read on ${PRICING_READ_ON}).`,
    },
    { term: 'Best for', definition: `${phrase(32, `${row.slug}-glance-best`)}.` },
    { term: 'Website', definition: row.domain },
  ]
}

// §5.4 — 4 free-text rows under "How Evergreen differs".
const DIFFERS_TERMS = [
  'Where the thank-you happens',
  'What the reward is',
  'What it costs to run',
  'What you can report on',
]

export const alternatives = TABLE.map((row, index) => {
  const competitor = row.competitor
  const siblings = [1, 2, 3].map((n) => TABLE[(index + n) % TABLE.length].slug)
  return {
    slug: row.slug,
    competitor,
    competitorFull: row.competitorFull,
    title: row.title,
    // PLACEHOLDER — 23–27 words, 3 lines at max-w-[49ch] (§4.1).
    subtitle: `${phrase(25, `${row.slug}-subtitle`)}.`,
    // PLACEHOLDER — one sentence.
    metaDescription: `${phrase(20, `${row.slug}-meta`)}.`,
    // PLACEHOLDER — 23–31 words, index card only (§3.3).
    cardExcerpt: `${phrase(26, `${row.slug}-card`)}.`,
    glance: buildGlance(row),
    body: buildBody(row),
    // PLACEHOLDER — 5 items, 15–24 words each (§5.5).
    strengths: [0, 1, 2, 3, 4].map((i) => `${phrase(17 + i, `${row.slug}-strong-${i}`)}.`),
    // PLACEHOLDER — 4 items (§5.5).
    shortfalls: [0, 1, 2, 3].map((i) => `${phrase(18 - i, `${row.slug}-short-${i}`)}.`),
    // PLACEHOLDER definitions; terms are free text in the original (§5.4).
    differs: DIFFERS_TERMS.map((term, i) => ({
      term,
      definition: `${phrase(21 + i * 2, `${row.slug}-differs-${i}`)}.`,
    })),
    // PLACEHOLDER — single paragraph, ~62 words, 5 lines (§4.3).
    verdict: `${phrase(62, `${row.slug}-verdict`)}.`,
    // PLACEHOLDER answers (36–59 words); the questions are representative of
    // the recorded shape — §5.6 recorded counts and geometry, not the text.
    // ⚠ SPEC CORRECTION: §5.6 and §9.3 both say "3 rows", but
    // _reference/screenshots/alt-1280-faq-sources.png shows FOUR questions on
    // /alternatives/bonusly, and only four rows reconcile §4.1's measured
    // 843.91px dl against §5.6's own per-row heights (174.39 + 183.72 + 215.45
    // + ~174 + 3 x 32 margin = 843.6). Built with four.
    faq: [
      {
        q: `Is Evergreen cheaper than ${competitor}?`,
        a: `${phrase(44, `${row.slug}-faq-0`)}.`,
      },
      {
        q: `Can we move our ${competitor} history across?`,
        a: `${phrase(52, `${row.slug}-faq-1`)}.`,
      },
      {
        q: `Is a ${competitor} reward taxable?`,
        a: `${phrase(48, `${row.slug}-faq-2`)}.`,
      },
      {
        q: `Who should stay on ${competitor}?`,
        a: `${phrase(38, `${row.slug}-faq-3`)}.`,
      },
    ],
    // §4.3 / §9.3 — ALL off-domain, so these render with NO href (inert).
    sources:
      row.sources ||
      [
        { label: `${competitor} pricing`, href: `https://${row.domain}/pricing` },
        { label: `${competitor} product overview`, href: `https://${row.domain}/product` },
        { label: `${competitor} integrations`, href: `https://${row.domain}/integrations` },
      ],
    relatedComparisons: siblings,
    showBanner: false,
  }
})

export function getAlternative(slug) {
  return alternatives.find((item) => item.slug === slug)
}

export function titleForSlug(slug) {
  const found = TABLE.find((row) => row.slug === slug)
  return found ? found.title : slug
}

// §9.4 — the index. No pagination, no filters, no tags (§3.3).
export const alternativesIndex = {
  badge: { label: 'Employee recognition guide', href: '/employee-recognition' },
  h1: 'Comparing recognition tools',
  // VERBATIM §3.2.
  intro:
    'One page per platform. Each names what the other product does well, where it falls short, how Evergreen differs, and the date the pricing was read. Nothing here is a ranking.',
  metaDescription:
    'Fair, dated comparisons of Evergreen with Bonusly, Nectar, HeyTaco, Kudos and other employee recognition platforms: pricing, strengths, gaps and who each suits.',
  items: alternatives.map((item) => ({
    slug: item.slug,
    title: item.title,
    cardExcerpt: item.cardExcerpt,
  })),
  // VERBATIM §3.4.
  trailing: {
    heading: 'What Evergreen is',
    cards: [
      {
        href: '/pricing',
        title: 'Pricing',
        ctaLabel: 'See pricing',
        description: `${phrase(17, 'alts-trailing-pricing')}.`,
      },
      {
        href: '/employee-recognition',
        title: 'Employee recognition: the complete guide',
        ctaLabel: 'Read the guide',
        description: `${phrase(16, 'alts-trailing-guide')}.`,
      },
    ],
  },
  showBanner: false,
  showDivider: true,
  showFinalCta: 'homepage',
}

// §4.4 — the fixed "Where recognition happens" block, identical on all 15
// comparison pages. Heading tag inside each card is an h3 here.
export const WHERE_RECOGNITION_HAPPENS = {
  heading: 'Where recognition happens',
  cards: [
    {
      href: '/pricing',
      title: 'Evergreen pricing',
      ctaLabel: 'See pricing',
      description: `${phrase(17, 'alt-wrh-pricing')}.`,
    },
    {
      href: '/employee-recognition',
      title: 'Employee recognition: the complete guide',
      ctaLabel: 'Read the guide',
      description: `${phrase(16, 'alt-wrh-guide')}.`,
    },
  ],
}
