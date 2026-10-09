// ============================================================================
// PLACEHOLDER PROSE — NOT measured, NOT transcribed from the original.
// ============================================================================
// CLONE_SPEC_CONTENT_A deliberately did NOT capture article / comparison body
// copy. It recorded block structure, element counts, word counts and one-line
// section summaries instead (§2.3, §4.2, §9). This module generates
// deterministic, topic-flavoured filler of the RECORDED word counts so the
// measured geometry (line counts, block heights, document heights) is right and
// real copy can be dropped in later.
//
// Everything in here is replaceable: swap a post's `body` blocks in
// src/data/blogPosts.js, or an Alternative's strings in src/data/alternatives.js,
// and this module stops being used for that record.
//
// Structural / UI copy (h1s, badge labels, section headings, CTA labels,
// SpecList row labels, card titles) is NEVER generated here — it is verbatim
// from CONTENT_A and lives inline in the data files.

const LEXICON = [
  'recognition', 'appreciation', 'team', 'manager', 'culture', 'feedback',
  'workplace', 'colleague', 'reward', 'budget', 'channel', 'message',
  'habit', 'moment', 'programme', 'launch', 'rollout', 'adoption',
  'engagement', 'retention', 'morale', 'leader', 'peer', 'shoutout',
  'milestone', 'onboarding', 'ritual', 'cadence', 'signal', 'outcome',
  'practice', 'review', 'value', 'behaviour', 'intent', 'clarity',
  'trust', 'context', 'effort', 'impact', 'tree', 'planting',
  'sustainability', 'reporting', 'admin', 'integration', 'slack', 'teams',
  'pricing', 'seat', 'trial', 'plan', 'tier', 'point', 'catalogue',
  'survey', 'pulse', 'nudge', 'prompt', 'template', 'guide', 'example',
  'small', 'specific', 'honest', 'useful', 'simple', 'steady', 'quiet',
  'visible', 'fair', 'clear', 'practical', 'light', 'public', 'private',
  'weekly', 'monthly', 'daily', 'first', 'second', 'better', 'enough',
  'works', 'helps', 'keeps', 'shows', 'means', 'needs', 'takes', 'gives',
  'makes', 'stays', 'reads', 'lands', 'sticks', 'scales', 'counts',
  'because', 'while', 'without', 'instead', 'rather', 'before', 'after',
  'the', 'a', 'and', 'that', 'this', 'with', 'for', 'into', 'from', 'on',
]

// mulberry32 — tiny deterministic PRNG so every build emits identical copy.
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * `count` words of filler, broken into 8–16-word sentences. `seed` is any
 * string; the same seed always yields the same text.
 */
export function words(count, seed) {
  const next = rng(hash(String(seed)))
  const out = []
  let sentence = []
  let target = 8 + Math.floor(next() * 9)
  for (let i = 0; i < count; i += 1) {
    sentence.push(LEXICON[Math.floor(next() * LEXICON.length)])
    if (sentence.length >= target || i === count - 1) {
      sentence[0] = sentence[0][0].toUpperCase() + sentence[0].slice(1)
      out.push(`${sentence.join(' ')}.`)
      sentence = []
      target = 8 + Math.floor(next() * 9)
    }
  }
  return out.join(' ')
}

/** Same as `words`, with no trailing full stop — for card excerpts/subtitles. */
export function phrase(count, seed) {
  return words(count, seed).replace(/\.$/, '')
}

/** A filler paragraph that carries one inline internal link (§2.3 inline `a`). */
export function paragraphWithLink(count, seed, href, label) {
  const text = words(count, seed)
  const cut = text.indexOf('. ')
  if (cut === -1) return `${text} <a href="${href}">${label}</a>.`
  return `${text.slice(0, cut + 1)} <a href="${href}">${label}</a>.${text.slice(cut + 1)}`
}

// Short-word variant. The /blog card excerpt must render in 2–3 lines inside
// the 420.53px copy column: §1.2 measured the copy block at 337.5 / 365.83 /
// 418.08px, all of which are (2–3-line title + 2–3-line excerpt), and the card
// height is only constant at 430.66px while the copy block stays under the
// 426.66px image column. A 4-line excerpt pushes the card to 450.41px and
// breaks the constant 531.98px row pitch, so excerpt filler is drawn from a
// deliberately short lexicon to keep the recorded 10–25 word counts inside
// three lines.
const SHORT_LEXICON = [
  'a', 'and', 'the', 'for', 'to', 'in', 'on', 'of', 'with', 'that', 'it',
  'team', 'work', 'say', 'good', 'kind', 'note', 'card', 'gift', 'tree',
  'plan', 'week', 'day', 'step', 'tip', 'idea', 'how', 'why', 'what',
  'more', 'less', 'best', 'real', 'easy', 'keep', 'send', 'give', 'show',
  'help', 'ask', 'make', 'take', 'find', 'stay', 'grow', 'lead', 'join',
  'small', 'quick', 'clear', 'fair', 'open', 'quiet', 'short', 'light',
  'thanks', 'praise', 'kudos', 'people', 'habit', 'value', 'trust',
]

export function shortPhrase(count, seed) {
  const next = rng(hash(`short-${seed}`))
  const out = []
  for (let i = 0; i < count; i += 1) {
    out.push(SHORT_LEXICON[Math.floor(next() * SHORT_LEXICON.length)])
  }
  out[0] = out[0][0].toUpperCase() + out[0].slice(1)
  return out.join(' ')
}
