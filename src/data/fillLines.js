// Line-budget helper for PLACEHOLDER prose.
//
// CLONE_SPEC_CONTENT_B deliberately did not transcribe editorial body copy
// (§2.2, §14): it recorded block structure, element counts and measured block
// HEIGHTS instead. The templates in set B therefore ship representative filler
// of the right LENGTH so the geometry lands where the spec says it does, and the
// real copy drops straight in.
//
// `fill(lines, columnPx, seed)` returns deterministic filler sized to occupy
// roughly `lines` rendered lines of an 18.667px Rubik paragraph in a column of
// `columnPx`. Calibration: Rubik at 18.667px averages ≈8.6px per character, and
// the generator's lexicon averages ≈7.2 characters per word including the space.
// Both are approximations — see the handoff note on docH tolerance (§16.2).
import { words } from './placeholderProse.js'

const PX_PER_CHAR = 10.4
const CHARS_PER_WORD = 7.2

/** Measured prose column widths @1280 (§2, §15). */
export const PROSE_COL = 829.65 // .marketing-rich-text, full width
export const STORY_COL = 691.22 // T-STORY right column (60% wins over 77.78em)
export const BLOCK_COL = 749.86 // `w-[70.3em]` blocks (LEAF_DL / FAQ_DL / PROSE_LEFT)
export const LEDE_COL = 580.71 // `max-w-[49ch]` on an 18.667px p

export function wordsPerLine(columnPx) {
  return columnPx / PX_PER_CHAR / CHARS_PER_WORD
}

export function fill(lines, columnPx, seed) {
  return words(Math.max(3, Math.round(lines * wordsPerLine(columnPx))), seed)
}

/**
 * Same as `fill`, but the `prefix` (e.g. a "[Placeholder copy]" marker) is
 * counted against the line budget, so a 3-line paragraph stays 3 lines once the
 * marker is prepended.
 */
export function fillText(lines, columnPx, seed, prefix = '') {
  const charBudget = lines * (columnPx / PX_PER_CHAR) - prefix.length
  const count = Math.max(3, Math.round(charBudget / CHARS_PER_WORD))
  return prefix ? `${prefix} ${words(count, seed)}` : words(count, seed)
}
