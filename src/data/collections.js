// The four collections behind T-INDEX (4 routes) and T-DETAIL (102 routes).
//
// Real: every slug, every title/name, every cross-reference href, every card CTA
// label, every section heading, and every element COUNT (paragraphs, bullets, dl
// rows, faq rows, message cards) — all taken from CLONE_SPEC_CONTENT_B §3.10,
// §12.1–12.5 and §14.
//
// ⚠️ Placeholder: all body prose, ledes, definitions, messages, notes, FAQ text and
// card descriptions. See src/data/placeholder.js for why and for how to swap in the
// real copy. Line counts per block are annotated inline and were solved back out of
// the §3.10 measured block heights, so geometry is right even though words are not.

import {
  BLOG_ROWS,
  FOR_ROWS,
  GLOSSARY_ROWS,
  MESSAGE_CATEGORIES,
  MESSAGE_ROWS,
  VALUE_ROWS,
} from './catalog.js'
import * as P from './placeholder.js'

// ── Ref builders (§12 `Ref = { href, title, description?, ctaLabel }`) ──────────
// Description presence and length per target type are MEASURED, not guessed —
// solved from the §3.10 card-grid heights:
//   glossary ref  5-line description   for ref 4-line   value ref 3-line
//   message ref   NO description (grid heights only reconcile without one)
//   blog ref      3-line description
const glossaryRef = ([slug, name]) => ({
  href: `/employee-recognition/glossary/${slug}`,
  title: name,
  description: P.fill(`g-def-${slug}`, 218),
  ctaLabel: 'Read the definition',
})
const forRef = ([slug, name]) => ({
  href: `/employee-recognition/for/${slug}`,
  title: name,
  description: P.fill(`f-card-${slug}`, 170),
  ctaLabel: 'Read the guide',
})
const valueRef = ([slug, name]) => ({
  href: `/company-values/${slug}`,
  title: name,
  description: P.fill(`v-def-${slug}`, 140),
  ctaLabel: 'See what to recognise',
})
const messageRef = ([slug, title]) => ({
  href: `/employee-recognition-messages/${slug}`,
  title,
  ctaLabel: 'Read the examples',
})
const blogRef = ([slug, title]) => ({
  href: `/blog/${slug}`,
  title,
  description: P.fill(`b-${slug}`, 118),
  ctaLabel: 'Read the article',
})

// Deterministic neighbour picker — `n` rows after `index`, wrapping, never self.
function pick(rows, index, n) {
  const out = []
  for (let i = 1; out.length < n; i += 1) out.push(rows[(index + i) % rows.length])
  return out
}

const prose = (seed, sections) =>
  sections.map(([heading, lineCounts], s) => ({
    heading,
    paragraphs: lineCounts.map((n, p) => P.prose(`${seed}-h${s}-p${p}`, n)),
  }))

const bullets = (seed, lineCounts) =>
  lineCounts.map((n, i) => P.bullet(`${seed}-b${i}`, n))

const dl = (seed, lineCounts) =>
  lineCounts.map((n, i) => ({
    term: P.term(`${seed}-dt${i}`, 1),
    definition: P.column(`${seed}-dd${i}`, n),
  }))

const faq = (seed, lineCounts) =>
  lineCounts.map((n, i) => ({
    question: P.question(`${seed}-q${i}`, 1),
    answer: P.column(`${seed}-a${i}`, n),
  }))

// §5.2 Message = { text, category, note }. `textLines` / `noteLines` come from the
// measured MESSAGE_GRID row heights: messages pages 3-line text + 2-line note
// (card 269.0px, 6 rows = 1796.1 ✓), values pages 3-line text + 1-line note
// (242.9px ✓), `for` pages 5-line text + 2-line note (332.4px ✓).
const messages = (seed, count, textLines, noteLines) =>
  Array.from({ length: count }, (_, i) => ({
    text: P.message(`${seed}-m${i}`, textLines),
    category: MESSAGE_CATEGORIES[i % MESSAGE_CATEGORIES.length],
    note: P.message(`${seed}-n${i}`, noteLines),
  }))

// ── /employee-recognition/glossary/:slug (30) — §12.1 ──────────────────────────
// Block sequence + line counts from §3.10 (kudos): PROSE_LEFT 2 lines ·
// RICHTEXT 4 h2 / 9 p (3,3,2 / 3,3 / 3,2 / 3,2 = 24 lines) · 3 bullets (3,3,2) ·
// 3 FAQ rows (answers 3,3,3) · 3 related terms · 3 "in practice" · 2 blog.
export const GLOSSARY = GLOSSARY_ROWS.map((row, i) => {
  const [slug, name] = row
  return {
    slug,
    name,
    definition: P.fill(`g-def-${slug}`, 218), // hero lede (4 lines) AND card description (5 lines)
    intro: P.column(`g-intro-${slug}`, 2),
    body: prose(`g-body-${slug}`, [
      [P.heading(`g-h2-${slug}-0`), [3, 3, 2]],
      [P.heading(`g-h2-${slug}-1`), [3, 3]],
      [P.heading(`g-h2-${slug}-2`), [3, 2]],
      [P.heading(`g-h2-${slug}-3`), [3, 2]],
    ]),
    examples: bullets(`g-ex-${slug}`, [3, 3, 2]),
    faq: faq(`g-faq-${slug}`, [3, 3, 3]),
    relatedTerms: pick(GLOSSARY_ROWS, i, 3).map(glossaryRef),
    inPractice: [
      messageRef(MESSAGE_ROWS[(i * 3) % MESSAGE_ROWS.length]),
      messageRef(MESSAGE_ROWS[(i * 3 + 1) % MESSAGE_ROWS.length]),
      valueRef(VALUE_ROWS[i % VALUE_ROWS.length]),
    ],
    furtherReading: [BLOG_ROWS[i % 4], BLOG_ROWS[(i + 1) % 4]].map(blogRef),
  }
})

// ── /employee-recognition/for/:slug (12) — §12.2 ───────────────────────────────
// §3.10 (startups): RICHTEXT 3 h2 / 11 p (35 lines) · LEAF_DL 4 (dd 3,3,3,2) ·
// 5 bullets (3,3,2,2,2) · MESSAGE_GRID 5 · LEAF_DL 5 (dd 3,2,2,2,2) ·
// FAQ 4 (answers 4,4,4,3) · 6 related · 4 blog · 3 other teams.
export const FOR = FOR_ROWS.map((row, i) => {
  const [slug, name, h1] = row
  return {
    slug,
    name,
    h1,
    lede: P.lede(`f-lede-${slug}`, 3),
    cardDescription: P.fill(`f-card-${slug}`, 170),
    body: prose(`f-body-${slug}`, [
      [P.heading(`f-h2-${slug}-0`), [3, 3, 4, 3]],
      [P.heading(`f-h2-${slug}-1`), [3, 3, 4]],
      [P.heading(`f-h2-${slug}-2`), [3, 3, 3, 3]],
    ]),
    obstacles: dl(`f-obs-${slug}`, [3, 3, 3, 2]),
    works: bullets(`f-works-${slug}`, [3, 3, 2, 2, 2]),
    messages: messages(`f-msg-${slug}`, 5, 5, 2),
    program: dl(`f-prog-${slug}`, [3, 2, 2, 2, 2]),
    faq: faq(`f-faq-${slug}`, [4, 4, 4, 3]),
    related: [
      ...pick(MESSAGE_ROWS, i * 4, 3).map(messageRef),
      ...pick(VALUE_ROWS, i * 3, 3).map(valueRef),
    ],
    furtherReading: BLOG_ROWS.map(blogRef),
    otherTeams: pick(FOR_ROWS, i, 3).map(forRef),
  }
})

// ── /employee-recognition-messages/:slug (35) — §12.3 ──────────────────────────
// §3.10 (promotion): RICHTEXT 2 h2 / 4 p (2,2 / 2,2) · MESSAGE_GRID `count` ·
// 5 bullets (2,2,2,1,1) · FAQ 4 (answers 5,5,5,4) · 1–3 values · 2–3 glossary ·
// 3 other occasions.
export const MESSAGES = MESSAGE_ROWS.map((row, i) => {
  const [slug, title] = row
  const count = Number(title.match(/\d+/)[0])
  return {
    slug,
    title,
    count,
    lede: P.lede(`m-lede-${slug}`, 3),
    cardDescription: P.fill(`m-card-${slug}`, 135),
    body: prose(`m-body-${slug}`, [
      [P.heading(`m-h2-${slug}-0`), [2, 2]],
      [P.heading(`m-h2-${slug}-1`), [2, 2]],
    ]),
    messages: messages(`m-msg-${slug}`, count, 3, 2),
    land: bullets(`m-land-${slug}`, [2, 2, 2, 1, 1]),
    faq: faq(`m-faq-${slug}`, [5, 5, 5, 4]),
    values: [valueRef(VALUE_ROWS[(i * 2) % VALUE_ROWS.length])],
    glossary: pick(GLOSSARY_ROWS, i * 2, 2).map(glossaryRef),
    otherOccasions: pick(MESSAGE_ROWS, i, 3).map(messageRef),
  }
})

// ── /company-values/:slug (25) — §12.4 ─────────────────────────────────────────
// §3.10 (accountability): RICHTEXT 2 h2 / 4 p (2,2 / 2,2) · LEAF_DL 4 (dd 1 each)
// · MESSAGE_GRID 6 · PROSE_LEFT 3 lines · 3 bullets (2,2,2) ·
// FAQ 4 (answers 3,3,3,2) · 3 occasions · 3 where-it-fits · 3 related values.
export const VALUES = VALUE_ROWS.map((row, i) => {
  const [slug, name] = row
  return {
    slug,
    name,
    definition: P.fill(`v-def-${slug}`, 140), // hero lede (3 lines) AND card description (3 lines)
    body: prose(`v-body-${slug}`, [
      [P.heading(`v-h2-${slug}-0`), [2, 2]],
      [P.heading(`v-h2-${slug}-1`), [2, 2]],
    ]),
    signals: dl(`v-sig-${slug}`, [1, 1, 1, 1]),
    messages: messages(`v-msg-${slug}`, 6, 3, 1),
    absence: P.column(`v-abs-${slug}`, 3),
    recognise: bullets(`v-rec-${slug}`, [2, 2, 2]),
    faq: faq(`v-faq-${slug}`, [3, 3, 3, 2]),
    occasions: pick(MESSAGE_ROWS, i * 3, 3).map(messageRef),
    whereItFits: [
      ...pick(GLOSSARY_ROWS, i * 2, 2).map(glossaryRef),
      forRef(FOR_ROWS[i % FOR_ROWS.length]),
    ],
    // "Related values" cards carry NO description, and there are 3 of them: a
    // no-description 1-line-title card is 148.5px tall, and 148.5 + 32 + 148.5 =
    // 329.0 is the only way to reconcile the measured 328.98px grid height.
    relatedValues: pick(VALUE_ROWS, i, 3).map(([s, n]) => ({
      href: `/company-values/${s}`,
      title: n,
      ctaLabel: 'See what to recognise',
    })),
  }
})

// ── Lookup ─────────────────────────────────────────────────────────────────────
const BY_COLLECTION = {
  glossary: GLOSSARY,
  for: FOR,
  messages: MESSAGES,
  values: VALUES,
}

export function getDetail(collection, slug) {
  return BY_COLLECTION[collection].find((item) => item.slug === slug)
}

// ── The four T-INDEX pages — §12.5, §14.2 ──────────────────────────────────────
// h1s and cross-sell headings/titles are VERBATIM §14.2. Cross-sell card
// descriptions are 3-line placeholders (the measured 309.72 / 257.47 heights).
const PILLAR_CARD = {
  href: '/employee-recognition',
  title: 'Employee recognition: the complete guide',
  description: P.fill('x-pillar', 135),
  ctaLabel: 'Read the guide',
}
const MESSAGES_INDEX_CARD = {
  href: '/employee-recognition-messages',
  title: 'Recognition messages for every occasion',
  description: P.fill('x-messages', 135),
  ctaLabel: 'Browse the occasions',
}

export const INDEX_PAGES = {
  glossary: {
    route: '/employee-recognition/glossary',
    h1: 'Employee recognition glossary',
    lede: P.lede('i-glossary', 3),
    items: GLOSSARY.map((t) => glossaryRef([t.slug, t.name])),
    crossSellHeading: 'Looking for the practice rather than the vocabulary?',
    crossSell: [PILLAR_CARD, MESSAGES_INDEX_CARD],
  },
  for: {
    route: '/employee-recognition/for',
    h1: 'Employee recognition for your kind of team',
    lede: P.lede('i-for', 3),
    items: FOR.map((t) => ({
      href: `/employee-recognition/for/${t.slug}`,
      title: t.name,
      description: t.cardDescription,
      ctaLabel: 'Read the guide',
    })),
    crossSellHeading: 'The rest of the guide',
    crossSell: [PILLAR_CARD, MESSAGES_INDEX_CARD],
  },
  messages: {
    route: '/employee-recognition-messages',
    h1: 'Employee recognition messages',
    lede: P.lede('i-messages', 3),
    items: MESSAGES.map((m) => ({
      href: `/employee-recognition-messages/${m.slug}`,
      title: m.title,
      description: m.cardDescription,
      ctaLabel: 'Read the examples',
    })),
    crossSellHeading: 'Recognising a value rather than an occasion?',
    crossSell: [
      {
        href: '/company-values',
        title: 'Company values',
        description: P.fill('x-values', 135),
        ctaLabel: 'See the values',
      },
    ],
  },
  values: {
    route: '/company-values',
    h1: 'Company values, described properly',
    lede: P.lede('i-values', 3),
    items: VALUES.map((v) => valueRef([v.slug, v.name])),
    crossSellHeading: 'Looking for the words instead?',
    crossSell: [
      {
        href: '/employee-recognition-messages',
        title: 'Employee recognition messages',
        description: P.fill('x-messages-index', 135),
        ctaLabel: 'Browse the occasions',
      },
    ],
  },
}

// §3.2 — eyebrow badge per collection. The four index pages all point at the hub.
export const PARENT_BADGE = {
  glossary: { label: 'Recognition glossary', href: '/employee-recognition/glossary' },
  for: { label: 'Recognition for teams', href: '/employee-recognition/for' },
  messages: { label: 'Recognition messages', href: '/employee-recognition-messages' },
  values: { label: 'Company values', href: '/company-values' },
}
export const INDEX_BADGE = {
  label: 'Employee recognition guide',
  href: '/employee-recognition',
}
