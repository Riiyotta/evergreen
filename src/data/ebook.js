// T-EBOOK data — CLONE_SPEC_CONTENT_B §7.1, §12.9, §14.6.
//
// VERBATIM (structural copy, §14.6): the h1, the `strong` call to action, the
// five `<sub>` bullet lines and the closing "Get Started Here 👇".
// PLACEHOLDER: the opening pitch sentences only (editorial prose), sized to the
// measured lede block — `p.mx-auto.max-w-[60ch]` (711.08px), block h 571.22px.
import { fillText } from './fillLines.js'

const LEDE_COL = 711.08 // `max-w-[60ch]` on an 18.667px p (§10)

export const EBOOK = {
  slug: 'practical-guide-to-employee-recognition',
  // §7.1: the h1's text sits in a <strong>, which bumps 600 → 700. That is the
  // only weight-700 display heading in set B. Do not normalise it.
  h1: 'Unlock Employee Engagement with Employee Recognition',
  h1Strong: true,
  lede: {
    // PLACEHOLDER opening, sized so the whole lede block lands on its measured
    // 571.22px (18 rendered lines including the <br>s and the <sub> list).
    intro: fillText(8, LEDE_COL, 'ebook-intro'),
    // Verbatim §14.6.
    callToAction: 'Download our Practical Guide to Employee Recognition eBook now!',
    bullets: [
      '-How Employee Recognition Drives Engagement',
      "-The Dos and Don'ts of Employee Recognition",
      '-Practical Strategies for Crafting an Effective Recognition Program',
      '-Real-world Examples of Recognition',
      '...and much more!',
    ],
    closing: 'Get Started Here',
    closingEmoji: '👇',
  },
  showG2: true,
  seo: {
    title: 'Practical Guide to Employee Recognition',
    description:
      'Download our Practical Guide to Employee Recognition eBook and discover the power of recognizing employees.',
  },
}
