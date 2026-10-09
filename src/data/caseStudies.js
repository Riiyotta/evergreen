// T-STORY data — CLONE_SPEC_CONTENT_B §6, §12.6, §14.6.
//
// REAL DATA (verbatim from the §12.6 instance table): slug, company, the six
// meta-card values, the quote author's name and role, the portrait / hero /
// logo asset filenames, the `related` pairs as shipped, and the subtitle
// pattern "How Evergreen helped {company} with peer recognition and
// environmental impact".
//
// PLACEHOLDER (clearly marked, trivially replaceable): the pull quote, the
// teaser sentence and every prose paragraph. CONTENT_B records the case-study
// narratives only as element counts and block heights (§2.2, §6.3) — the
// narratives themselves are the original's editorial copy and are not
// transcribed. Headings are structural, so the ones CONTENT_B measured are real
// (`About Wunderdog`, `Wunderdog's wonderful culture`); the rest are marked.
//
// Measured prose-column heights to aim at (§6.1, column 691.22px):
//   wunderdog 2589.14 · nitro-games ≈3034 · kent-white ≈2499 · worklete ≈2105
import { fillText, STORY_COL } from './fillLines.js'

const QUOTE_COL = 336.64 // quote `p` inside the `w-[44em]` column (mx-[3em])
const TEASER_COL = 380.02 // teaser `p`, `max-w-[49ch]` of a 16.667px p

const P = '[Placeholder copy]'

function p(lines, seed, extra) {
  return { type: 'p', text: fillText(lines, STORY_COL, seed, P), ...extra }
}
function quote(lines, seed) {
  return fillText(lines, QUOTE_COL, seed, P)
}
function teaser(lines, seed) {
  return fillText(lines, TEASER_COL, seed, P)
}

export const CASE_STUDIES = {
  wunderdog: {
    slug: 'wunderdog',
    company: 'Wunderdog',
    subtitle:
      'How Evergreen helped Wunderdog with peer recognition and environmental impact',
    quote: quote(5, 'wd-quote'),
    quoteAuthor: {
      name: 'Emilia Vesa',
      role: 'Head of People Operations',
      image: '/assets/t1png-d278e8.webp',
    },
    heroImage:
      '/assets/6040ebfbc5bbf0b356485b68-evergreen-customer-success-story-wu-a91174.webp',
    meta: {
      company: 'Wunderdog',
      hqLocation: 'Helsinki, Finland',
      employees: '150',
      industry: 'Technology Consulting',
      treesPlanted: '+1 000',
    },
    // 9 p · 2 h2 · 2 h3 · 2 blockquote · 1 figure · 2 off-domain inline links.
    body: [
      { type: 'h2', text: 'About Wunderdog' },
      p(5, 'wd-1'),
      { type: 'pExternal', text: fillText(5, STORY_COL, 'wd-2', P), linkLabel: 'You can read it from here! (We highly recommend this)' },
      { type: 'h3', text: "Wunderdog's wonderful culture" },
      p(5, 'wd-3'),
      p(5, 'wd-4'),
      { type: 'blockquote', text: quote(3, 'wd-bq1') },
      p(5, 'wd-5'),
      { type: 'h2', text: 'Recognition with Evergreen' }, // placeholder heading
      p(5, 'wd-6'),
      { type: 'h3', text: 'Trees planted together' }, // placeholder heading
      p(5, 'wd-7'),
      { type: 'blockquote', text: quote(3, 'wd-bq2') },
      {
        type: 'figure',
        src: '/assets/6040ec8c481409f3c3271af3-wunderdog-uses-evergreen-6e1e7c.webp',
        alt: '',
        caption: 'Screen capture from Wunderdogs recognition channel',
      },
      p(5, 'wd-8'),
      { type: 'pExternal', text: fillText(3, STORY_COL, 'wd-9', P), linkLabel: 'Read more' },
    ],
    teaser: teaser(5, 'wd-teaser'),
    // The teaser card uses the 48.16 x 45.86 variant of the Wunderdog mark
    // (measured on story_kentwhite / story_worklete); the 62f3d4 file is the
    // testimonial / logo-strip variant.
    logo: '/assets/logo-wunderdogsvg-a66a50.svg',
    employeesShort: '150',
    related: ['worklete', 'kent-white'],
    seo: {
      title: 'Wunderdog | Customer Success Story',
      description:
        'How Evergreen helped Wunderdog with peer recognition and environmental impact.',
    },
  },

  'nitro-games': {
    slug: 'nitro-games',
    company: 'Nitro Games',
    subtitle:
      'How Evergreen helped Nitro Games with peer recognition and environmental impact',
    quote: quote(7, 'ng-quote'),
    quoteAuthor: {
      name: 'Milka Tarkiainen',
      role: 'PeopleOps Manager',
      image: '/assets/nitro-7ab98f.webp',
    },
    heroImage:
      '/assets/6093fee595fb1027740e32ce-evergreen-customer-success-story-ni-b56302.webp',
    meta: {
      company: 'Nitro Games',
      hqLocation: 'Kotka, Finland',
      employees: '40',
      industry: 'Games',
      treesPlanted: '+1 000',
    },
    // 8 p · 2 h2 · 2 h3 · 2 blockquote · 1 image.
    body: [
      { type: 'h2', text: 'About Nitro Games' },
      p(7, 'ng-1'),
      p(7, 'ng-2'),
      { type: 'h3', text: 'A green agenda' }, // placeholder heading
      p(7, 'ng-3'),
      { type: 'blockquote', text: quote(3, 'ng-bq1') },
      p(7, 'ng-4'),
      // ⚠️ Measured 691.19px wide — the FULL prose column, i.e. wider than the
      // `figure` rule's `max-width: 60%` (414.73px). So this one renders as a
      // bare prose <img>, not a <figure>. See the handoff note.
      {
        type: 'figure',
        src: '/assets/609404d86be6b801dd061886-nitro-games-uses-evergreen-d4e489.webp',
        alt: '',
        caption: '',
        bare: true,
      },
      { type: 'h2', text: 'Recognition with Evergreen' }, // placeholder heading
      p(6, 'ng-5'),
      p(6, 'ng-6'),
      { type: 'h3', text: 'What changed' }, // placeholder heading
      p(6, 'ng-7'),
      {
        type: 'blockquote',
        // §16.9 — a <strong> at blockquote size (24.667px / 700) is a real
        // measured detail of this page, not a new type role.
        text: quote(3, 'ng-bq2'),
        strong: 'On average every employee gives 3,75 unique recognitions to each other per month.',
      },
      p(6, 'ng-8'),
    ],
    teaser: teaser(5, 'ng-teaser'),
    logo: '/assets/logo-nitrosvg-7a0f33.svg',
    employeesShort: '40',
    related: ['kent-white', 'worklete'],
    seo: {
      title: 'Nitro Games | Customer Success Story',
      description:
        'How Evergreen helped Nitro Games with peer recognition and environmental impact.',
    },
  },

  'kent-white': {
    slug: 'kent-white',
    company: 'Kent & White',
    subtitle:
      'How Evergreen helped Kent & White with peer recognition and environmental impact',
    quote: quote(8, 'kw-quote'),
    quoteAuthor: {
      name: 'Brian Schryer',
      role: 'Co-Owner and CEO',
      image: '/assets/t3png-c485a1.webp',
    },
    heroImage:
      '/assets/604635cc5238b1400d42ff05-evergreen-customer-success-story-ke-b7b307.webp',
    meta: {
      company: 'Kent & White',
      hqLocation: 'Bathurst, New Brunswick, Canada',
      employees: '20',
      industry: 'Insurance',
      treesPlanted: '+450',
    },
    body: [
      { type: 'h2', text: 'About Kent & White' },
      p(10, 'kw-1'),
      { type: 'h3', text: 'Growing fast' }, // placeholder heading
      p(10, 'kw-2'),
      p(9, 'kw-3'),
      { type: 'blockquote', text: quote(3, 'kw-bq1') },
      p(10, 'kw-4'),
      { type: 'h3', text: 'Recognition that travels' }, // placeholder heading
      p(10, 'kw-5'),
      { type: 'pExternal', text: fillText(8, STORY_COL, 'kw-6', P), linkLabel: 'Read more' },
      p(8, 'kw-7'),
    ],
    teaser: teaser(5, 'kw-teaser'),
    logo: '/assets/logo-kent-and-whitepng-139c7a.webp',
    employeesShort: '20',
    related: ['worklete', 'wunderdog'],
    seo: {
      title: 'Kent & White | Customer Success Story',
      description:
        'How Evergreen helped Kent & White with peer recognition and environmental impact.',
    },
  },

  worklete: {
    slug: 'worklete',
    company: 'Worklete',
    subtitle:
      'How Evergreen helped Worklete with peer recognition and environmental impact',
    quote: quote(5, 'wl-quote'),
    quoteAuthor: {
      name: 'James Rowley',
      role: 'Chief Technology Officer',
      image: '/assets/james-rowley-e7e9f5.webp',
    },
    heroImage:
      '/assets/60400af600d01e2b15b060f1-evergreen-customer-success-story-wo-397b3d.webp',
    meta: {
      company: 'Worklete',
      hqLocation: 'Oakland, United States',
      employees: '25',
      industry: 'Software',
      treesPlanted: '+300',
    },
    body: [
      { type: 'h2', text: 'About Worklete' },
      p(9, 'wl-1'),
      { type: 'h3', text: 'A distributed team' }, // placeholder heading
      p(9, 'wl-2'),
      { type: 'blockquote', text: quote(3, 'wl-bq1') },
      { type: 'h3', text: 'Recognition with Evergreen' }, // placeholder heading
      p(8, 'wl-3'),
      { type: 'pExternal', text: fillText(8, STORY_COL, 'wl-4', P), linkLabel: 'Read more' },
      { type: 'h3', text: 'Trees planted' }, // placeholder heading
      p(8, 'wl-5'),
      { type: 'blockquote', text: quote(3, 'wl-bq2') },
    ],
    teaser: teaser(6, 'wl-teaser'),
    logo: '/assets/workletesvg-eb3abc.svg',
    employeesShort: '25',
    related: ['kent-white', 'wunderdog'],
    seo: {
      title: 'Worklete | Customer Success Story',
      description:
        'How Evergreen helped Worklete with peer recognition and environmental impact.',
    },
  },
}

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES)
