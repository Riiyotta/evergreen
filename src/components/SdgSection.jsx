import { SECTION_WRAPPER } from '../layout/Layout.jsx'

// UN Sustainable Development Goal block — SHARED verbatim by /esg (§2.1 row G)
// and /our-purpose (§3.1 row D). CLONE_SPEC_CORE_A DOM-diffed the two routes and
// found the subtrees byte-identical, so this renders its own <section> + wrapper
// (both pages use `relative bg-cream-dark` + `pt-[18em]` and NO bottom padding).
//
// Geometry @1280 (CORE_A §2.1 / §2.6): section height 1087.30, inner 1152px.
//   h2 block  y +44.8   3 lines x 71.04 = 213.12 inside `w-[70.3em]` (749.86px)
//   p  block  my-0      7 lines x 31.733 = 222.13 (5 text + blank + "See all UN goals")
//   4-up row  mt-[5.5em] = 58.667, height 311.83
//
// The `See all UN goals` anchor points off-domain
// (https://www.un.org/sustainabledevelopment/sustainable-development-goals/) and
// is therefore rendered with NO href per the clone's external-link policy;
// markup and styling are otherwise untouched.
//
// NO leaves in this section (the dividers above/below own the leaf layers), so
// nothing here needs motion. No gradients, no shadows, no hover states.

// §1 universal content-block rule.
const BLOCK = 'my-[4.2em] text-center max-wf-mini:my-[3.5em]'

// §2.6 / §2.10 — the four goal columns, in DOM order, verbatim copy.
const GOALS = [
  {
    src: '/assets/icon-povertysvg-375091.svg',
    alt: 'No poverty icon',
    goal: 'GOAL 1',
    title: 'NO POVERTY',
    body: 'No Poverty. More than 700m people live in extreme poverty. We help to employ people to plant trees.',
  },
  {
    src: '/assets/icon-youthsvg-db3447.svg',
    alt: 'Youth employment icon',
    goal: 'GOAL 8',
    title: 'YOUTH EMPLOYMENT',
    body: 'One-fifth of young people are not in education, employment or training. Paying them to plant trees couldn’t be more positive.',
  },
  {
    src: '/assets/icon-environmentsvg-89f589.svg',
    alt: 'Climate action icon',
    goal: 'GOAL 13',
    title: 'CLIMATE ACTION',
    body: 'Global emissions of carbon dioxide C02 have increased by almost 50% since 1990. We need reforestation on a massive scale.',
  },
  {
    src: '/assets/icon-treesvg-fb7494.svg',
    alt: 'Plant a tree icon',
    goal: 'GOAL 15',
    title: 'PLANT A TREE',
    body: 'Plant a tree and help protect the environment. Forests are home to more than 80% of all terrestrial species of animals, plants and insects.',
  },
]

export default function SdgSection() {
  return (
    <section className="relative bg-cream-dark">
      <div className={`${SECTION_WRAPPER} pt-[18em]`}>
        {/* Heading block — frame `w-[70.3em]` (749.86px). §5 flags this H2 as the
            second-tightest wrap on the site: 3 lines, longest 728.6 / 749.86px
            (2.8% headroom). Do not widen the frame unless it reflows. */}
        <div className={BLOCK}>
          <div className="mx-auto mt-0 w-[70.3em] max-wf-phone:w-auto max-wf-mini:mt-[3em] max-wf-mini:w-auto">
            <h2 className="text-center font-headline text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-[3.9em]">
              Take action across four categories in the UN Sustainable Development Goal Framework
            </h2>
          </div>
        </div>

        {/* Intro paragraph + off-domain "See all UN goals" link (href stripped). */}
        <div className="my-0 w-full text-center max-wf-mini:my-0">
          <p className="mx-auto max-w-[49ch] text-center">
            The Sustainable Development Goals are the blueprint to achieve a better and more
            sustainable future for all. They address the global challenges we face, including
            poverty, inequality, climate change, environmental degradation, peace and justice.
            Joining Evergreen ensures you are helping across four categories.
            <br />
            <br />
            <a target="_blank" rel="noreferrer">
              See all UN goals
            </a>
          </p>
        </div>

        {/* §2.6 SdgGoalColumn 4-up row — `justify-between`, columns `w-[20%]`
            (230.41px @1280) with `mx-[0.5em]`. Class string verbatim. */}
        <div
          className={`${BLOCK} mb-0 mt-[5.5em] flex justify-between max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:mb-0 max-wf-mini:mt-[5.5em]`}
        >
          {GOALS.map((goal) => (
            <div
              key={goal.goal}
              className="mx-[0.5em] flex w-[20%] flex-col items-center max-wf-phone:mb-[5em] max-wf-phone:w-[80%] max-wf-mini:w-[90%]"
            >
              <span className="mb-[1em] flex h-[3.24544em] items-center justify-center">
                <img src={goal.src} alt={goal.alt} className="h-full w-auto" />
              </span>
              {/* §4 NEW type role — SDG goal label, 1.7em / 1.75 / 700. */}
              <p className="mb-[0.7em] text-center text-[1.7em] font-bold leading-[1.75]">
                {goal.goal}
                <br />
                {goal.title}
              </p>
              <p className="mx-auto max-w-[49ch] text-center">{goal.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
