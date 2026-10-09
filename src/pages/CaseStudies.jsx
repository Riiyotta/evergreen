import CaseStudyCard from '../components/CaseStudyCard.jsx'
import CtaSection from '../components/CtaSection.jsx'
import HeroHeading from '../components/HeroHeading.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'

// Route "/case-studies" — CLONE_SPEC_CORE_B PART C.
// Chrome (nav, footer, trial modal) lives in Layout. ⚠️ This route has NO
// announcement banner (§0.1): nav y 0, <main> y 77, first section y 45.
// Doc height target 3253 @1280.
// Sections: A hero + card grid (45 / 1516, cream, normal px-[6em] gutter) ·
// B divider (1573 / 161.98) · C final CTA (1703 / 1039, cream-dark).

const BLOCK = 'my-[4.2em] text-center max-wf-mini:my-[3.5em]'

// §C-4 verbatim copy. Card 3 uses a STRAIGHT apostrophe, straight double
// quotes and an en-dash in the original — reproduced as-is.
const CARDS = [
  {
    logo: '/assets/workletesvg-eb3abc.svg',
    logoAlt: 'Worklete logo',
    name: 'Worklete',
    stat: '25',
    blurb:
      'One of the things Worklete loves about Evergreen is how easy it is to use. Implementing the app was very simple, and within just a few days, their entire team had embraced using Evergreen.',
    href: '/customer-success-stories/worklete',
  },
  {
    logo: '/assets/logo-kent-and-whitepng-139c7a.webp',
    logoAlt: 'Kent & White logo',
    name: 'Kent & White',
    stat: '20',
    blurb:
      'Kent & White is currently one of the fastest growing insurance brokerages in Atlantic Canada. However, fast growth comes with its own set of challenges.',
    href: '/customer-success-stories/kent-white',
  },
  {
    logo: '/assets/logo-wunderdogsvg-a66a50.svg',
    logoAlt: 'Wunderdog logo',
    name: 'Wunderdog',
    stat: '150',
    blurb:
      'Wunderdog wanted to take their employee recognition program to virtual form. (It\'s called "Doggomedals" – And we love it as it\'s so unique.)',
    href: '/customer-success-stories/wunderdog',
  },
  {
    logo: '/assets/logo-nitrosvg-4caa4a.svg',
    logoAlt: 'Nitro Games logo',
    name: 'Nitro Games',
    stat: '40',
    blurb:
      'Nitro Games have been one of the most active teams on Evergreen since the day they integrated Evergreen to their culture.',
    href: '/customer-success-stories/nitro-games',
  },
]

export default function CaseStudies() {
  return (
    <>
      {/* A — hero + case-study grid. y 45, h 1516, bg cream. */}
      <section className="relative bg-cream">
        <div className={SECTION_WRAPPER}>
          <HeroHeading>Customer Success Stories</HeroHeading>

          {/* block 1 — sub-paragraph, `max-w-[59ch]` = 699.23px, one line. */}
          <div className={BLOCK}>
            <p className="mx-auto max-w-[59ch] text-center">
              Real examples of Evergreen making a positive impact
            </p>
          </div>

          {/* block 2 — the 2-up flex-wrap grid (§C-2). w-[87em] = 927.98,
              row-gap 14em, pb 14em, mb -10em, column-gap: normal. */}
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <div className="mt-[7em] mb-[-10em] flex w-[87em] flex-wrap justify-between gap-y-[14em] pb-[14em] max-wf-tablet:w-auto max-wf-tablet:flex-col max-wf-tablet:items-center max-wf-tablet:justify-center">
              {CARDS.map((card) => (
                <CaseStudyCard key={card.name} {...card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* B — leaf divider. Band colour matches the section ABOVE it (cream). */}
      <LeafDivider />

      {/* C — final CTA, identical to homepage section H. */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pt-[18em] pb-[5em]`}>
          <CtaSection />
        </div>
      </section>
    </>
  )
}
