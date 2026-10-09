import { BLOCK } from '../lib/classes.js'

// Six-logo customer strip — CLONE_SPEC §5.9. Identical markup on `/` and
// `/pricing`; only the 5th slot differs (CoverWallet on the homepage, Fraktio
// on /pricing — CORE_A §1.3), so the list is a prop.
// Widths stay inline `style` em values exactly as the original emits them.
// Static justify-between row: no greyscale, no opacity, no hover, no marquee.
export default function LogoStrip({ logos }) {
  return (
    <div
      className={`${BLOCK} mt-[7.7em] flex items-center justify-between pl-[3em] max-wf-tablet:w-[56em] max-wf-tablet:max-w-full max-wf-tablet:flex-wrap max-wf-tablet:pl-0 max-wf-mini:mt-[7.7em] max-wf-mini:w-auto max-wf-mini:justify-center`}
    >
      {logos.map((logo) => (
        <div key={logo.src} className="max-wf-tablet:mb-[2.6em] max-wf-mini:mx-[0.5em]">
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            style={{ width: logo.width }}
          />
        </div>
      ))}
    </div>
  )
}
