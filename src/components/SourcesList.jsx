import { Link } from 'react-router-dom'

// SourcesList — CLONE_SPEC_CONTENT_A §4.3 / §5.7. /alternatives/:slug block B15.
//
// Frame `div.mx-auto.w-[70.3em].text-left` (749.86px @1280) containing
//   ul.list-none (749.86 x 158.91) of li.mb-[1em] (margin-bottom 10.6667px,
//   each 31.73 tall) -> p -> a (18.6667px, line-height 18.6667 from the
//   `.marketing-root a` rule, weight 600, underlined, #000).
// Then the centred contact note: p.mx-auto.max-w-[49ch].text-center
//   .text-[1.4375em] -> 477.08 x 52.09, 15.3333px / 26.0667px / 400 / #000.
//
// ⚠ EVERY source href is off-domain (competitor marketing pages, §9.3), so per
// the clone's link rule the anchors are rendered with NO href — markup and
// styling unchanged, label kept. The note's /contact link IS internal and stays
// live as a react-router <Link>.
//
// No hover, no external-link icon, no rel/target attributes in the original.
export default function SourcesList({ sources }) {
  return (
    <div className="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full">
      <ul className="list-none">
        {sources.map((source, i) => (
          <li key={i} className="mb-[1em]">
            <p>
              {/* inert: off-domain */}
              <a>{source.label}</a>
            </p>
          </li>
        ))}
      </ul>
      <p className="mx-auto max-w-[49ch] text-center text-[1.4375em]">
        Spotted something out of date? Tell us at{' '}
        <Link to="/contact">evergreen.so/contact</Link>.
      </p>
    </div>
  )
}
