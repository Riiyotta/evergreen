// T-LEGAL data — CLONE_SPEC_CONTENT_B §2.3, §12.8, §14.6.
//
// ⚠️ THE BODY TEXT HERE IS PLACEHOLDER, NOT THE ORIGINAL'S LEGAL DOCUMENT.
// CONTENT_B records the privacy policy / terms only as block structure and
// element counts (§2.2) — the actual legal text is a long verbatim document and
// is deliberately not reproduced: copying it would be both a copy of their
// content and actively misleading if this clone were ever read as a real policy.
// What IS real here: the h1s, the "Last updated" lines (§14.6) and the heading
// structure (the 9 numbered Terms sections, and the privacy policy's
// "How is personal data processed?" h2 with its 18 h3 sub-sections).
//
// Clause bodies are clearly-marked filler sized to the measured block heights:
//   /privacy-policy  prose block h 7237.83  (48 p · 2 h2 · 18 h3 · 2 ul/8 li)
//   /terms-of-service prose block h 2725.56 (15 p ·  9 h2 ·  0 h3 · 1 ul/4 li)
// Replace `body` with the real text and nothing else needs to change.
import { fillText, PROSE_COL } from './fillLines.js'

const PLACEHOLDER = '[Placeholder clause — replace with your own legal text.]'

function clause(lines, seed) {
  return { type: 'p', text: fillText(lines, PROSE_COL, seed, PLACEHOLDER) }
}

// §2.2 — the 18 h3 sub-sections of "How is personal data processed?", in the
// recorded order. Headings are structural, so they are real.
const PRIVACY_SUBSECTIONS = [
  'Data controller',
  'Purposes of processing',
  'Legal basis for processing',
  'Categories of personal data',
  'Sources of the data',
  'Recipients of the data',
  'Transfers outside the EU or EEA',
  'Retention periods',
  'Security measures',
  'Cookies and similar technologies',
  'Right of access',
  'Right to rectification',
  'Right to erasure',
  'Right to restrict processing',
  'Right to object',
  'Lodging a complaint',
  'Changes to this policy',
  'Contact',
]

function privacyBody() {
  const nodes = []
  // Intent & scope → collection → retention & security → no third-party
  // sharing → external links → consequences of withholding → consent by use.
  const intro = [
    'Intent and scope',
    'What data is collected and why',
    'Retention and security',
    'Third-party sharing',
    'External links',
    'Withholding data',
    'Consent by use',
  ]
  nodes.push({ type: 'h2', text: 'Overview' }) // placeholder label (see handoff)
  intro.forEach((seed) => nodes.push(clause(3, `pp-intro-${seed}`)))
  nodes.push({ type: 'h2', text: 'How is personal data processed?' })
  PRIVACY_SUBSECTIONS.forEach((heading, index) => {
    nodes.push({ type: 'h3', text: heading })
    nodes.push(clause(3, `pp-${index}-a`))
    nodes.push(clause(3, `pp-${index}-b`))
    // §2.2: 2 `ul`, 8 `li` total — one list of 5 under "Categories of personal
    // data", one of 3 under "Cookies and similar technologies".
    if (heading === 'Categories of personal data') {
      nodes.push({
        type: 'ul',
        items: [
          'Name and work email address',
          'Workspace or team identifier',
          'Recognition messages you choose to send',
          'Billing contact details',
          'Technical log data',
        ],
      })
      nodes.push(clause(3, `pp-${index}-c`))
    }
    if (heading === 'Cookies and similar technologies') {
      nodes.push({
        type: 'ul',
        items: [
          'Strictly necessary cookies',
          'Preference cookies',
          'Aggregate usage analytics',
        ],
      })
      nodes.push(clause(3, `pp-${index}-c`))
    }
    // §2.2 records 48 `p` in total: 7 intro + 2 per sub-section + 2 after the
    // two `ul`s + 3 longer sub-sections with a third paragraph.
    if (index === 1 || index === 6 || index === 11) nodes.push(clause(3, `pp-${index}-d`))
  })
  return nodes
}

// §2.2 — the 9 numbered Terms sections, verbatim headings.
const TERMS_SECTIONS = [
  // 15 `p` / 9 `h2` / 1 `ul` of 4 `li`, 40 rendered lines — the shape and the
  // 2725.56px block height CONTENT_B §2.2 measured.
  { heading: '1. Terms', paragraphs: [3, 3] },
  { heading: '2. User License', paragraphs: [3], list: true },
  { heading: '3. Disclaimer', paragraphs: [3, 2] },
  { heading: '4. Limitations', paragraphs: [3, 2] },
  { heading: '5. Accuracy of materials', paragraphs: [2] },
  { heading: '6. Links', paragraphs: [3, 2] },
  { heading: '7. Modifications', paragraphs: [2] },
  { heading: '8. References', paragraphs: [3, 3] },
  { heading: '9. Governing Law', paragraphs: [3, 3] },
]

function termsBody() {
  const nodes = []
  TERMS_SECTIONS.forEach((section, index) => {
    nodes.push({ type: 'h2', text: section.heading })
    section.paragraphs.forEach((lines, i) => {
      // §2.2: exactly one inline link on this page, text `Evergreen.so` → `/`.
      if (index === 0 && i === 0) {
        nodes.push({
          type: 'p',
          text: `${fillText(lines, PROSE_COL, 'tos-0-0', PLACEHOLDER)} These terms apply to`,
          link: { href: '/', label: 'Evergreen.so' },
        })
      } else {
        nodes.push(clause(lines, `tos-${index}-${i}`))
      }
    })
    if (section.list) {
      nodes.push({
        type: 'ul',
        items: [
          'modify or copy the materials',
          'use the materials for any commercial purpose',
          'attempt to reverse engineer any software',
          'remove any copyright or other proprietary notations',
        ],
      })
    }
  })
  return nodes
}

export const LEGAL_PAGES = {
  'privacy-policy': {
    slug: 'privacy-policy',
    h1: 'Privacy Policy',
    lastUpdated: 'Last updated: 28th July 2022',
    body: privacyBody(),
    seo: {
      title: 'Evergreen | Privacy Policy',
      description:
        'At Evergreen, we value your privacy as much as we value the environment.',
    },
  },
  'terms-of-service': {
    slug: 'terms-of-service',
    h1: 'Terms of Service',
    lastUpdated: 'Last updated: 30th December 2020',
    body: termsBody(),
    seo: {
      title: 'Evergreen | Terms of Service',
      description: 'Understand the terms of use for our employee recognition software.',
    },
  },
}
