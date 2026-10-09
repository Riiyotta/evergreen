import { Link } from 'react-router-dom'

// The universal listing / related card — CLONE_SPEC_CONTENT_B §5.1.
// Used by every CARD_GRID on T-INDEX, T-DETAIL, T-PILLAR and the
// /alternatives index.
//
// 447.98px wide (`w-[42em]`), bg #ffffff (a NEW surface — the homepage's only
// card is bg-cream), 2px solid #000, radius 10px, padding 2.4em (25.6px).
// box-shadow: none. NO hover and NO active state — the only affordance is the
// cursor. Do not add one.
//
// `as` picks the heading level: h2 on the four index pages (top-level
// listing), h3 inside any "related / further reading" group or T-PILLAR card
// group. `description` is optional — present on glossary/for/values/messages
// cards, absent on blog-article cards and some pillar cards.
export default function LinkCard({
  title,
  href,
  ctaLabel,
  description,
  as: Heading = 'h2',
}) {
  return (
    <li className="relative z-[100] w-[42em] list-none rounded-[10px] border-2 border-black bg-white p-[2.4em] max-wf-mini:max-w-full">
      <Link to={href} className="no-underline">
        <Heading className="font-headline text-[3.5em] font-semibold leading-[1.4] text-black">
          {title}
        </Heading>
        {description && <p className="my-[1em] text-[1.5625em]">{description}</p>}
        <p className="mt-[0.5em] text-[1.75em] font-semibold">{ctaLabel}</p>
      </Link>
    </li>
  )
}

// ctaLabel is a template constant keyed off the LINK TARGET, not per-item data
// (CONTENT_B §5.1). Exported so every grid derives it the same way.
export const CTA_LABEL_BY_TARGET = {
  '/employee-recognition/glossary': 'Read the definition',
  '/employee-recognition/for': 'Read the guide',
  '/employee-recognition-messages': 'Read the examples',
  '/company-values': 'See what to recognise',
  '/employee-recognition': 'Read the guide',
  '/blog': 'Read the article',
  '/customer-success-stories': 'Read full case study',
}

// Index-page cards point AT a collection rather than into it.
export const CTA_LABEL_FOR_INDEX = {
  '/employee-recognition-messages': 'Browse the occasions',
  '/company-values': 'See the values',
}

export function ctaLabelFor(href) {
  const collection = '/' + href.split('/').filter(Boolean).slice(0, 2).join('/')
  return (
    CTA_LABEL_BY_TARGET[collection] ||
    CTA_LABEL_BY_TARGET['/' + href.split('/').filter(Boolean)[0]] ||
    'Read more'
  )
}
