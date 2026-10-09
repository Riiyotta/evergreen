// ─────────────────────────────────────────────────────────────────────────────
//  ⚠️  PLACEHOLDER COPY — NONE OF THIS TEXT IS FROM THE ORIGINAL SITE.
// ─────────────────────────────────────────────────────────────────────────────
// CLONE_SPEC_CONTENT_B §2.2 and §5.2 deliberately did NOT transcribe the editorial
// prose (the glossary article bodies, the 35 message libraries, the SEO guide
// bodies). They recorded block structure, element counts and measured geometry
// instead. Everything this module emits is synthetic filler whose single job is to
// occupy the recorded number of LINES at the recorded column width, so the §3.10
// per-block heights reproduce.
//
// To drop in real content: replace the `*Placeholder()` call sites in
// src/data/collections.js (or put literal strings on the catalog rows in
// src/data/catalog.js). No markup or layout change is needed.
//
// LINE MATH. A paragraph's rendered height is lines x line-height, so the only
// thing that has to be right is the character count relative to the column's
// characters-per-line. CPL values below are calibrated against Rubik 400 at the
// measured column widths (§10 "New column widths"):
//   prose column  829.65px @ 18.667px  (RICHTEXT, §3.5)
//   70.3em column 749.86px @ 18.667px  (PROSE_LEFT / LEAF_DL dd / FAQ answer, §3.4/3.7/3.8)
//   bullet p      723.30px @ 18.667px  (LEAF_BULLETS, §3.6)
//   hero lede     580.71px @ 18.667px  (`max-w-[49ch]`, §3.1)
//   card desc     392.80px @ 16.667px  (LinkCard N8, §5.1)
//   message p     392.80px @ 18.667px  (MessageCard, §5.2)

export const CPL = {
  prose: 86,
  column: 78,
  bullet: 75,
  lede: 60,
  cardDescription: 48,
  message: 43,
  faqQuestion: 42, // 26.667px bold in the 749.86em column (true CPL ~56, kept short)
  proseHeading: 38, // 48px display serif in the 829.65px prose column (§2.1 h2, lh 1.2)
  dlTerm: 60, // 21.333px bold in the 749.86em column
}

const POOL = (
  'the work that would otherwise pass without comment gets named out loud so the ' +
  'rest of the team can see it a manager who notices the small unglamorous things ' +
  'is worth more to a quiet contributor than any quarterly award and the habit is ' +
  'cheap to build once somebody starts it recognition only lands when it is ' +
  'specific timely and said in front of the people whose opinion the recipient ' +
  'actually cares about a vague thanks for everything reads as a formality and is ' +
  'filed as one name the decision the effort or the save and the same sentence ' +
  'suddenly carries weight teams that make this ordinary rather than ceremonial ' +
  'see it spread sideways between colleagues instead of trickling down from the ' +
  'top which is where most of its value sits anyway budget helps but attention is ' +
  'the scarce input and it is the one thing a programme cannot buy on your behalf'
).split(' ')

function hash(seed) {
  let h = 2166136261
  const s = String(seed)
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) % POOL.length
}

// Deterministic filler of ~`chars` characters, broken into sentences of ~11 words.
export function fill(seed, chars) {
  const words = []
  let length = 0
  let i = hash(seed)
  while (length < chars) {
    const word = POOL[i % POOL.length]
    words.push(word)
    length += word.length + 1
    i += 1
  }
  const sentences = []
  for (let j = 0; j < words.length; j += 11) {
    const chunk = words.slice(j, j + 11)
    if (!chunk.length) break
    sentences.push(chunk.join(' ').replace(/^./, (c) => c.toUpperCase()))
  }
  return `${sentences.join('. ')}.`
}

// `lines` x CPL, less a part-full last line (0.42 of a line is the measured mean
// trailing slack across the sampled routes).
export function lines(seed, count, cpl) {
  return fill(seed, Math.round((count - 0.42) * cpl))
}

export const prose = (seed, n) => lines(seed, n, CPL.prose)
export const column = (seed, n) => lines(seed, n, CPL.column)
export const bullet = (seed, n) => lines(seed, n, CPL.bullet)
export const lede = (seed, n) => lines(seed, n, CPL.lede)
export const cardDescription = (seed, n) => lines(seed, n, CPL.cardDescription)
export const message = (seed, n) => lines(seed, n, CPL.message)
export const question = (seed, n) => lines(seed, n, CPL.faqQuestion)
export const term = (seed, n) => lines(seed, n, CPL.dlTerm)
// Prose `h2` — must stay on ONE line or the RICHTEXT block height shifts by 57.6px.
export const heading = (seed, n = 1) => lines(seed, n, CPL.proseHeading)
