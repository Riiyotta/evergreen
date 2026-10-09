import Testimonials from './Testimonials.jsx'
import LogoStrip from './LogoStrip.jsx'
import G2Block from './G2Block.jsx'

// DEDUPE: this file used to carry its own copies of the testimonial pair, the
// 6-logo strip and the G2 block, because it and the /pricing extraction ran in
// parallel and neither saw the other's output. The markup was byte-identical.
// It is now a thin DATA ADAPTER over the canonical shared components, keeping
// the export names the three pages already import so nothing else had to change.
//
// Sources: CLONE_SPEC §5.7 / §5.9 / §5.10, CLONE_SPEC_CORE_B §R-4, §R-5.

// §R-4 — the homepage pair with three deltas: different avatar files, avatar 1
// carries `ml-[1.4em] h-[90%] scale-[1.2]`, and the company logos are
// `w-[19.4941em]` (207.92px) rather than the homepage's `w-[7.96em]` (85px).
// The 6 QUOTE_LEAVES behind each card are STATIC — never animate them.
const REFERRAL_TESTIMONIALS = [
  {
    avatar: '/assets/t3png-ee95a1.webp',
    imgClassName: 'ml-[1.4em] h-[90%] scale-[1.2]',
    quote: '“We already had a very close team but Evergreen has brought us closer.”',
    name: 'Brian Schryer',
    role: 'CEO',
    logo: '/assets/logo-kent-and-whitepng-e559b5.webp',
    columnExtra: '',
  },
  {
    avatar: '/assets/t4png-f92ff9.webp',
    // No closing full stop in the original — reproduce as-is.
    quote: '“Evergreen quickly helped transition us to a good peer recognition culture”',
    name: 'Sakir Temel',
    role: 'CTO',
    logo: '/assets/logo-coverwalletsvg-be24e9.svg',
    columnExtra: 'max-wf-tablet:mt-[14.4em] max-wf-tablet:mb-[5em]',
  },
]

// §R-5 — same component as §5.9. ONE delta vs the homepage: slot 5 is Fraktio,
// not CoverWallet. Widths stay inline em exactly as the original emits them.
const REFERRAL_LOGOS = [
  {
    src: '/assets/logo-harvardsvg-c5efb6.svg',
    alt: 'Harvard University Employees Credit Union logo',
    width: '17.1909em',
  },
  { src: '/assets/logo-nitrosvg-7a0f33.svg', alt: 'Nitro logo', width: '11.5931em' },
  { src: '/assets/logo-earnestsvg-2634ab.svg', alt: 'Earnest Ice Cream logo', width: '8.79133em' },
  { src: '/assets/logo-octopussvg-a91e19.svg', alt: 'Octopus Energy logo', width: '19.4863em' },
  { src: '/assets/logo-fraktiosvg-19b008.svg', alt: 'Fraktio logo', width: '11.6417em' },
  { src: '/assets/logo-hifyresvg-64f8d6.svg', alt: 'Hifyre logo', width: '13.6854em' },
]

export function G2RatingBlock() {
  return <G2Block />
}

export function ReferralTestimonials() {
  return <Testimonials items={REFERRAL_TESTIMONIALS} logoWidth="w-[19.4941em]" />
}

export function ReferralLogoStrip() {
  return <LogoStrip logos={REFERRAL_LOGOS} />
}
