import { words, phrase, shortPhrase, paragraphWithLink } from './placeholderProse.js'

// ============================================================================
// src/data/blogPosts.js — the 53 `/blog/:slug` routes + the `/blog` index list.
// ============================================================================
// Contract: CLONE_SPEC_CONTENT_A §9.1 / §9.2.
//
// VERBATIM from the spec (do not paraphrase): `slug`, `title` (§1.5 table —
// titles are navigational structure), `heroImage` (§1.5 / §8), the index h1
// "Evergreen Blog", the badge label "Blog", the guide-cluster and
// "More articles" headings and every CTA label.
//
// PLACEHOLDER (safe to replace): `excerpt`, `metaDescription`, every `body`
// block's text, and `date`. CONTENT_A deliberately did not capture article
// prose; it captured block sequences and word counts, which is what is
// reproduced here via src/data/placeholderProse.js.
//
// ⚠ SPEC GAP — dates. §2.2 measured exactly one date (2026-09-07 on
// /blog/employee-recognition-in-slack). The other 52 article dates were never
// recorded, so `date` below is a PLACEHOLDER descending series (24-day steps)
// seeded from that one real value. §1.5 notes the index order is hand-made and
// NOT date-sorted, so the series is cosmetic only.
//
// NOT part of this template anywhere in the original (§9.1): author, avatar,
// read time, category, tags, table of contents, share row, updatedAt.

// §1.5 ordered table — slug / title / heroImage verbatim; `excerptWords` is the
// measured 10–25-word excerpt length the placeholder copy reproduces.
const TABLE = [
  {
    slug: 'employee-recognition-in-slack',
    title: 'Employee Recognition in Slack: A Practical Setup Guide',
    heroImage: 'employee-recognition-5c8c5b.webp',
    excerptWords: 23,
    date: '2026-09-07',
  },
  {
    slug: 'employee-recognition-metrics',
    title: 'Employee Recognition Metrics That Don’t Create Bad Incentives',
    heroImage: 'beta-evergreen-so-reporting-1-c89f9b.webp',
    excerptWords: 25,
    date: '2026-08-14',
  },
  {
    slug: '35-creative-ideas-on-how-to-recognize-employees',
    title: '35 creative employee recognition ideas',
    heroImage: 'ideas-employee-recognition-ca3a7d.webp',
    excerptWords: 17,
    date: '2026-07-21',
  },
  {
    slug: 'how-to-move-from-physical-to-virtual-recognition-program',
    title: 'Moving a recognition program from in-person to virtual',
    heroImage: 'virtual-recognition-program-2-cf0a14.webp',
    excerptWords: 14,
    date: '2026-06-27',
  },
  {
    slug: '15-creative-ways-to-give-shoutout-to-coworkers',
    title: '15 ways to give a coworker a shoutout (with templates)',
    heroImage: 'photo-1552664688-cf412ec27db2-eeea02.webp',
    excerptWords: 14,
    date: '2026-06-03',
  },
  {
    slug: 'how-ai-can-revolutionize-human-resources-applications-and-benefits',
    title: 'How AI Can Revolutionize Human Resources: Benefits & Uses',
    heroImage: 'luis-villasmil-4v8umzx8fya-unsplash-ad2c74.webp',
    excerptWords: 10,
    date: '2026-05-10',
  },
  {
    slug: 'how-to-build-a-great-and-succesful-employer-brand-tips-examples',
    title: 'How to Build a Succesful Employer Brand? Tips & Examples',
    heroImage: 'employer-brand-2ebc35.webp',
    excerptWords: 11,
    date: '2026-04-16',
  },
  {
    slug: '5-things-you-need-to-know-about-employee-recognition',
    title: 'Employee recognition 101: five things to know first',
    heroImage: 'employee-recognition-5c8c5b.webp',
    excerptWords: 17,
    date: '2026-03-23',
  },
  {
    slug: 'how-recognition-promotes-dei-in-the-workplace',
    title: 'How employee recognition supports DEI at work',
    heroImage: 'diversity-equity-inclusion-81e0bf.webp',
    excerptWords: 21,
    date: '2026-02-27',
  },
  {
    slug: 'how-to-create-employee-recognition-program-step-by-step-guide',
    title: 'Creating an employee recognition program: step by step',
    heroImage: 'how-to-create-a-employee-recognition-program-5b22de.webp',
    excerptWords: 18,
    date: '2026-02-03',
  },
  {
    slug: 'how-to-be-a-great-team-leader-tips-for-new-managers',
    title: 'Top 5 Tips On How to Be a Great Team Leader in 2023',
    heroImage: 'image-8-584426.webp',
    excerptWords: 23,
    date: '2026-01-10',
  },
  {
    slug: 'what-are-the-effects-of-the-employee-recognition',
    title: 'Effects of employee recognition on retention and morale',
    heroImage: 'snowball-effect-84a4d6.webp',
    excerptWords: 14,
    date: '2025-12-17',
  },
  {
    slug: '5-companies-with-the-best-employee-recognition-programs',
    title: '5 companies with the best employee recognition programs',
    heroImage: 'employee-recognition-programs-1345f0.webp',
    excerptWords: 20,
    date: '2025-11-23',
  },
  {
    slug: 'reasons-why-employee-recognition-programs-fail-and-how-to-ensure-its-success',
    title: 'Why recognition programs fail (and how to fix them)',
    heroImage: 'employee-recognition-fails-e9b555.webp',
    excerptWords: 20,
    date: '2025-10-30',
  },
  {
    slug: 'creating-a-culture-of-appreciation-peer-to-peer-recognition-templates-and-examples',
    title: 'What is peer-to-peer recognition? Examples and templates',
    heroImage: 'peer-to-peer-recognition-1-499dcd.webp',
    excerptWords: 14,
    date: '2025-10-06',
  },
  {
    slug: 'how-does-dei-impact-employee-engagement-in-organizations',
    title: 'How to improve employee engagement in organizations with D&I',
    heroImage: 'dei-69738b.webp',
    excerptWords: 24,
    date: '2025-09-12',
  },
  {
    slug: 'easy-guide-to-identify-a-not-engaged-employee',
    title: 'Easy guide to identify a not engaged employee',
    heroImage: 'image-1-507462.webp',
    excerptWords: 21,
    date: '2025-08-19',
  },
  {
    slug: 'employee-retention-5-strategies-for-retaining-top-talent',
    title: 'Employee Retention: 5 Strategies for Retaining Top Talent',
    heroImage: 'employee-retention-1-fa463f.webp',
    excerptWords: 17,
    date: '2025-07-26',
  },
  {
    slug: '15-team-building-activities-to-increase-employee-motivation',
    title: '15 Team Building Activities to Increase Employee Motivation',
    heroImage: 'teambuilding-6a611f.webp',
    excerptWords: 13,
    date: '2025-07-02',
  },
  {
    slug: '15-tips-to-create-employee-well-being-strategy-for-workforce-engagement',
    title: '15 tips to Create a Great Employee Well-being Strategy',
    heroImage: 'well-being-employee-da53fe.webp',
    excerptWords: 18,
    date: '2025-06-08',
  },
  {
    slug: 'how-to-identify-the-talent-engagement-in-your-team-template-test',
    title: 'How to identify talent engagement in the team? |Test Template',
    heroImage: 'jeshoots-com-2vd8lihdnw-unsplash-afa87c.webp',
    excerptWords: 16,
    date: '2025-05-15',
  },
  {
    slug: 'creating-a-great-workplace-culture-with-psychological-safety',
    title: 'Creating a Great Workplace Culture with Psychological Safety',
    heroImage: 'employee-experience-2-bdc29a.webp',
    excerptWords: 14,
    date: '2025-04-21',
  },
  {
    slug: 'how-to-create-a-positive-employee-experience',
    title: 'How to create a positive Employee Experience',
    heroImage: 'employee-experience-office-d43bbd.webp',
    excerptWords: 15,
    date: '2025-03-28',
  },
  {
    slug: 'evergreen-product-update-q1-2023',
    title: 'Evergreen Product Update Q1/2023',
    heroImage: 'kopio-product-update-aad3c9.webp',
    excerptWords: 10,
    date: '2025-03-04',
  },
  {
    slug: 'a-guide-to-employee-retention-strategies-tips-and-best-practices',
    title: 'Easy Guide to Employee Retention: Strategies,Tips',
    heroImage: 'employee-retention-8cedcf.webp',
    excerptWords: 19,
    date: '2025-02-08',
  },
  {
    slug: '12-ways-to-celebrate-earth-day',
    title: '12 ways to celebrate Earth day',
    heroImage: 'kopio-kopio-carbon-neutrality-e51f93.webp',
    excerptWords: 12,
    date: '2025-01-15',
  },
  {
    slug: 'steps-to-be-a-carbon-neutral-company',
    title: '5 Steps how to be a Carbon-Neutral Company',
    heroImage: 'carbon-neutrality-ade6df.webp',
    excerptWords: 21,
    date: '2024-12-22',
  },
  {
    slug: 'how-to-increase-motivation-at-work',
    title: '7 tips on how to increase employee motivation',
    heroImage: 'motivate-employees-eed2dc.webp',
    excerptWords: 17,
    date: '2024-11-28',
  },
  {
    slug: 'what-is-employee-appreciation-day-and-why-recognizing-your-employees-matters',
    title: 'Employee Appreciation Day: what it is and how to mark it',
    heroImage: 'appreciation-day-67c901.webp',
    excerptWords: 17,
    date: '2024-11-04',
  },
  {
    slug: 'how-to-develop-and-implement-a-great-esg-strategy',
    title: 'How to Develop and Implement a Great ESG Strategy?',
    heroImage: 'sustainability-9f7647.webp',
    excerptWords: 18,
    date: '2024-10-11',
  },
  {
    slug: 'how-to-show-appreciation-for-employees-after-layoffs',
    title: 'How to show appreciation to employees after layoffs',
    heroImage: 'layoff-0ad72b.webp',
    excerptWords: 22,
    date: '2024-09-17',
  },
  {
    slug: '10-templates-notes-to-thank-your-team-for-great-work',
    title: '10 thank-you note templates for your team',
    heroImage: 'thank-you-e78cec.webp',
    excerptWords: 20,
    date: '2024-08-24',
  },
  {
    slug: '6-esg-examples-driving-success-in-business',
    title: '6 ESG examples driving success in business',
    heroImage: 'untitled-3aae37.webp',
    excerptWords: 20,
    date: '2024-07-31',
  },
  {
    slug: 'why-does-talent-engagement-matter',
    title: '10 Reasons Why Talent Engagement is Important',
    heroImage: 'teamwork-culture-1-5d7b4f.webp',
    excerptWords: 16,
    date: '2024-07-07',
  },
  {
    slug: '9-strategies-for-building-and-sustaining-a-successful-teamwork-culture',
    title: 'The 9 Best Strategies to Build a Teamwork Culture',
    heroImage: 'kopio-teamwork-culture-3a2a24.webp',
    excerptWords: 16,
    date: '2024-06-13',
  },
  {
    slug: 'how-to-motivate-employees-and-avoid-quiet-quitting',
    title: 'How to motivate employees and avoid quiet quitting?',
    heroImage: 'motivation-quiet-quitting-6189fe.webp',
    excerptWords: 21,
    date: '2024-05-20',
  },
  {
    slug: '9-tips-to-boost-your-talent-engagement',
    title: '9 Tips to increase Employee Engagement in 2023',
    heroImage: 'samsung-uk-uzp2t-kkmdm-unsplash-b161a2.webp',
    excerptWords: 17,
    date: '2024-04-26',
  },
  {
    slug: 'evergreen-product-update-h2-2022',
    title: 'Evergreen Product Update H2/2022 🌳',
    heroImage: 'evergreen-product-update-h2-2022-009d0a.webp',
    excerptWords: 20,
    date: '2024-04-02',
  },
  {
    slug: 'employee-motivations-importance-in-the-workplace',
    title: 'Why is employee motivation important?',
    heroImage: 'employee-motivation-importance-in-the-workplace-evergreen-31e7dc.webp',
    excerptWords: 11,
    date: '2024-03-09',
  },
  {
    slug: 'evergreen-product-update-q3-2021',
    title: 'Evergreen product update Q3/2021',
    heroImage: '617a5ad96fbc2dc4316a0ab0-evergreen-product-update-q3-2021-79fe0d.webp',
    excerptWords: 19,
    date: '2024-02-14',
  },
  {
    slug: '15-excellent-ideas-to-increase-motivation-in-the-workplace',
    title: '15 Ideas to Increase Motivation in the Workplace',
    heroImage: '614d9ad1eba882d71260bdcd-15-excellent-ideas-to-increase-moti-e4d2e3.webp',
    excerptWords: 18,
    date: '2024-01-21',
  },
  {
    slug: 'why-employee-recognition-program-is-important',
    title: 'Benefits of an employee recognition program',
    heroImage: '6140682be54a3672f1cac3aa-why-employee-recognition-program-is-51ef12.webp',
    excerptWords: 12,
    date: '2023-12-28',
  },
  {
    slug: 'setting-the-trend-5-simple-ways-to-lead-by-example',
    title: '5 Simple Ways to Lead by Example in the Workplace',
    heroImage: '607031e359ab5e4aff9988fa-evergreen-5-simple-ways-to-lead-by--5d7991.webp',
    excerptWords: 16,
    date: '2023-12-04',
  },
  {
    slug: 'evergreen-product-update-q1-2021',
    title: 'Evergreen product update 🌳 Q1/2021',
    heroImage: '606d728872f4e20d945e9b63-1-duocqqfo3sxj46gsy3-znq-9c7717.webp',
    excerptWords: 17,
    date: '2023-11-10',
  },
  {
    slug: '4-tips-on-how-to-give-recognition-at-work',
    title: 'How to build a culture of recognition: 4 habits',
    heroImage: '6046042168e4a67c594c519f-why-is-employee-recognition-so-impo-24a963.webp',
    excerptWords: 17,
    date: '2023-10-17',
  },
  {
    slug: 'why-is-employee-recognition-so-important',
    title: 'Why employee recognition matters: three reasons',
    heroImage: '603429d37fb4e377c1531e03-why-is-employee-recognition-so-impo-bb6138.webp',
    excerptWords: 21,
    date: '2023-09-23',
  },
  {
    slug: '4-pandemic-proof-ideas-for-virtual-employee-appreciation',
    title: '8 virtual employee recognition ideas for remote teams',
    heroImage: '602a7f3635d51a60bf058cda-evergreen-virtual-employee-apprecia-e57e48.webp',
    excerptWords: 16,
    date: '2023-08-30',
  },
  {
    slug: 'evergreen-2-0-has-been-released',
    title: 'Evergreen 2.0 has been released! 🎉',
    heroImage: '5feb49aeab0dffb8605b169e-1-gizi2g6lo7ov-fjuxb3qww-61b002.webp',
    excerptWords: 17,
    date: '2023-08-06',
  },
  {
    slug: 'how-can-a-culture-of-gratitude-improve-employee-experience',
    title: 'How a culture of appreciation improves employee experience',
    heroImage: '5fa129b25e89979ec330054a-fraktio-gratitude-culture-88a55a.webp',
    excerptWords: 19,
    date: '2023-07-13',
  },
  {
    slug: 'how-to-manage-a-remote-team-in-2020',
    title: '5 Tips on How to Manage a Remote Team',
    heroImage: '5f8206cd96c87060e354c330-evergreen-how-to-manage-remote-team-c76507.webp',
    excerptWords: 16,
    date: '2023-06-19',
  },
  {
    slug: 'guide-to-better-company-culture',
    title: '3 ways to cultivate a strong Company Culture',
    heroImage: '5f8205eab8fd53d60769c94c-evergreen-guide-to-better-company-c-111446.webp',
    excerptWords: 21,
    date: '2023-05-26',
  },
  {
    slug: 'what-is-carbon-neutrality-and-why-does-it-matter',
    title: 'Your Ultimate Guide to Achieve Carbon Neutrality',
    heroImage: '5f820239e8bfd034298ffee3-evergreen-what-is-carbon-neutrality-e9f572.webp',
    excerptWords: 16,
    date: '2023-05-02',
  },
  {
    slug: 'guide-to-employee-recognition',
    title: 'How to give employee recognition: a short guide',
    heroImage: '5f8200e571a3e459effdeeea-evergreen-guide-to-employee-recogni-3449dc.webp',
    excerptWords: 22,
    date: '2023-04-08',
  },
]

// ---------------------------------------------------------------------------
// PLACEHOLDER body builders.
// Each reproduces one of the three block vocabularies §2.3 measured, so the
// rich-text column's height lands in the right range. Lengths in words come
// from §2.3 ("paragraphs 14–87 words, mean ≈ 33").
// ---------------------------------------------------------------------------

// The 9 in-article figure files that exist in /public/assets (§8).
const FIGURES = [
  'untitled-9-f552f7.webp',
  'untitled-10-270217.webp',
  'untitled-11-31bf54.webp',
  'untitled-12-9a1cea.webp',
  'untitled-13-e602ab.webp',
  'untitled-14-6fa94b.webp',
  'untitled-17-5c79b1.webp',
  'untitled-18-01dcc1.webp',
]

const p = (n, seed) => ({ t: 'p', html: words(n, seed) })

// §2.3 — /blog/employee-recognition-in-slack: the "new-style" article.
// p ×26-ish, h2 ×7, ul ×2, ol ×1, blockquote ×2, inline code ×3, inline a ×9.
// Block order transcribed from §2.3's recorded sequence.
// ⚠ §2.3's per-element counts (p ×26, h2 ×7) and its written-out order
// (which lists 29 p and 8 h2) disagree by a few elements; the ORDER is the more
// specific record, so it is what is reproduced. Flagged in the handoff.
function newStyleBody(slug) {
  const s = (k) => `${slug}-${k}`
  return [
    p(28, s(1)),
    p(34, s(2)),
    { t: 'p', html: paragraphWithLink(26, s(3), '/employee-recognition', 'what recognition is for') },
    { t: 'h2', text: 'Recognition is a behaviour, not a feature' },
    p(24, s(4)),
    { t: 'ul', items: [0, 1, 2, 3].map((i) => phrase(12, s(`ul1-${i}`))) },
    p(22, s(5)),
    { t: 'h2', text: 'Choose one channel and keep it there' },
    p(27, s(6)),
    { t: 'p', html: paragraphWithLink(31, s(7), '/pricing', 'how the seat count works') },
    { t: 'p', html: `${words(20, s(8))} The command is <code>/evergreen</code>, the channel is <code>#kudos</code>, and the digest posts from <code>evergreen[bot]</code>.` },
    { t: 'h2', text: 'One rule for writing a good thank-you' },
    p(23, s(9)),
    { t: 'ol', items: [0, 1, 2, 3].map((i) => phrase(13, s(`ol1-${i}`))) },
    p(18, s(10)),
    { t: 'blockquote', html: phrase(19, s('bq1')) },
    { t: 'blockquote', html: phrase(16, s('bq2')) },
    p(30, s(11)),
    { t: 'p', html: paragraphWithLink(25, s(12), '/company-values', 'tie it back to a value') },
    { t: 'h2', text: 'Seed the channel before you launch' },
    p(26, s(13)),
    p(33, s(14)),
    p(20, s(15)),
    { t: 'p', html: paragraphWithLink(24, s(16), '/blog/guide-to-employee-recognition', 'the short guide') },
    { t: 'h2', text: 'When to prompt, and when to stay quiet' },
    p(29, s(17)),
    p(25, s(18)),
    p(21, s(19)),
    { t: 'p', html: paragraphWithLink(23, s(20), '/employee-recognition-messages/project-completion', 'message examples') },
    { t: 'h2', text: 'How big a reward should be' },
    p(27, s(21)),
    p(32, s(22)),
    p(19, s(23)),
    { t: 'p', html: paragraphWithLink(26, s(24), '/employee-recognition/glossary', 'the glossary') },
    { t: 'h2', text: 'A seven-day plan' },
    p(24, s(25)),
    { t: 'ul', items: [0, 1, 2, 3].map((i) => phrase(14, s(`ul2-${i}`))) },
    { t: 'p', html: paragraphWithLink(17, s(26), '/contact', 'tell us what broke') },
  ]
}

// §2.3 — /blog/35-creative-ideas…: the legacy Webflow import.
// p ×80 (pseudo-headings are <p><strong>, not real h2/h3), h2 ×1,
// figure ×1, blockquote ×1. Rich text measured 8055.98px tall.
function legacyBody(slug) {
  const s = (k) => `${slug}-${k}`
  const blocks = [
    p(34, s('intro-1')),
    p(46, s('intro-2')),
    { t: 'h2', text: 'The list' },
    { t: 'figure', src: `/assets/ideas-employee-recognition-ca3a7d.webp`, alt: '' },
  ]
  // 35 pseudo-sections: <p><strong>heading</strong></p> + a body p each,
  // plus 8 extra paragraphs, to reach the measured ~80 direct `p` children.
  for (let i = 1; i <= 35; i += 1) {
    blocks.push({
      t: 'p',
      html: `<strong>${i}. ${phrase(5, s(`ph-${i}`))}</strong>`,
    })
    blocks.push(p(26 + (i % 7) * 4, s(`pb-${i}`)))
  }
  blocks.push({ t: 'blockquote', html: phrase(18, s('bq')) })
  for (let i = 0; i < 8; i += 1) blocks.push(p(30 + i * 3, s(`out-${i}`)))
  return blocks
}

// §2.3 — /blog/evergreen-product-update-q1-2023: image-heavy release note.
// p ×13, figure ×8, h3 ×1. No guide cluster (§2.1).
function releaseNoteBody(slug) {
  const s = (k) => `${slug}-${k}`
  const blocks = [p(32, s('lede')), p(44, s('lede-2'))]
  FIGURES.forEach((file, i) => {
    blocks.push({
      t: 'figure',
      src: `/assets/${file}`,
      alt: '',
      ...(i === 3 ? { caption: phrase(9, s(`cap-${i}`)) } : null),
    })
    blocks.push(p(27 + (i % 4) * 9, s(`fig-${i}`)))
  })
  blocks.splice(9, 0, { t: 'h3', text: 'Smaller improvements' })
  blocks.push(p(35, s('outro')), p(22, s('outro-2')), p(29, s('outro-3')))
  return blocks
}

// Every other post: the generic new-style shape, which is what §2.3's sampled
// "new-style" article looks like with fewer sections.
function genericBody(slug) {
  const s = (k) => `${slug}-${k}`
  const HEADINGS = [
    'Why this matters',
    'What to do first',
    'What good looks like',
    'Common mistakes',
    'Where to go next',
  ]
  const blocks = [p(30, s('lede')), { t: 'p', html: paragraphWithLink(34, s('lede-2'), '/employee-recognition', 'the complete guide') }]
  HEADINGS.forEach((text, i) => {
    blocks.push({ t: 'h2', text })
    blocks.push(p(26 + (i % 3) * 8, s(`a-${i}`)))
    blocks.push(p(34 - (i % 2) * 7, s(`b-${i}`)))
    if (i === 1) blocks.push({ t: 'ul', items: [0, 1, 2, 3].map((j) => phrase(13, s(`ul-${j}`))) })
    if (i === 2) blocks.push({ t: 'blockquote', html: phrase(17, s('bq')) })
    if (i === 3) blocks.push({ t: 'ol', items: [0, 1, 2].map((j) => phrase(12, s(`ol-${j}`))) })
  })
  blocks.push({ t: 'p', html: paragraphWithLink(25, s('close'), '/pricing', 'see what it costs') })
  return blocks
}

const BODY_BY_SLUG = {
  'employee-recognition-in-slack': newStyleBody,
  '35-creative-ideas-on-how-to-recognize-employees': legacyBody,
  'evergreen-product-update-q1-2023': releaseNoteBody,
}

// §2.1 — the guide cluster (C3 + C4) is OPTIONAL. It is absent on the sampled
// product update, so product-update posts omit it; every other post carries it.
const NO_GUIDE_CLUSTER = (slug) => slug.startsWith('evergreen-product-update') || slug === 'evergreen-2-0-has-been-released'

// §2.4 — heading verbatim; 4 cards, CTA labels verbatim
// (`Read the full guide`, then `Read the article` ×3).
function guideClusterFor(index) {
  const siblings = [1, 2, 3].map((n) => TABLE[(index + n * 7) % TABLE.length])
  return {
    heading: 'Part of the employee recognition guide',
    cards: [
      {
        href: '/employee-recognition',
        title: 'Employee recognition: the complete guide',
        ctaLabel: 'Read the full guide',
        // PLACEHOLDER — §2.4 measured these cards at up to 390.30px tall,
        // which is the LinkCard's "3-line title + excerpt" height, so the
        // cluster cards DO carry an excerpt paragraph.
        description: `${phrase(24, 'cluster-guide')}.`,
      },
      ...siblings.map((post, i) => ({
        href: `/blog/${post.slug}`,
        title: post.title,
        ctaLabel: 'Read the article',
        description: `${phrase(24, `cluster-${index}-${i}`)}.`,
      })),
    ],
  }
}

// §2.5 — always present, heading "More articles", exactly 2 cards, CTA "Read blog".
function moreArticlesFor(index) {
  return {
    heading: 'More articles',
    cards: [1, 2].map((n) => {
      const post = TABLE[(index + n) % TABLE.length]
      return { slug: post.slug, title: post.title, ctaLabel: 'Read blog' }
    }),
  }
}

export const blogPosts = TABLE.map((row, index) => ({
  slug: row.slug,
  title: row.title,
  // PLACEHOLDER — 10–25 words per §1.5, exact measured count per post.
  excerpt: shortPhrase(row.excerptWords, `excerpt-${row.slug}`),
  heroImage: `/assets/${row.heroImage}`,
  heroImageAlt: '', // always "" in the original (§1.2 / §9.1)
  date: row.date,
  // PLACEHOLDER — one sentence (§9.1).
  metaDescription: `${phrase(18, `meta-${row.slug}`)}.`,
  showBanner: true, // §0.1 — articles are the only one of the four with the banner
  body: (BODY_BY_SLUG[row.slug] || genericBody)(row.slug),
  guideCluster: NO_GUIDE_CLUSTER(row.slug) ? undefined : guideClusterFor(index),
  moreArticles: moreArticlesFor(index),
}))

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

// §9.2 — the index. No pagination, no filters, no tags, no sort (§1.2).
export const blogIndex = {
  h1: 'Evergreen Blog',
  metaDescription:
    'Explore our blog for insights on creating a positive work culture through recognition. From employee appreciation to ESG, our articles will help you build a happier, and stronger company culture.',
  showBanner: false,
  showDivider: false,
  showFinalCta: false,
}
