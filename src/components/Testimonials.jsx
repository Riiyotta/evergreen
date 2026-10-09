import LeafLayer from './LeafLayer.jsx'
import { QUOTE_LEAVES } from '../lib/leaves.js'
import { BLOCK } from '../lib/classes.js'

// Testimonial pair — CLONE_SPEC §5.7, rendered identically on `/` (homepage
// block 10) and `/pricing` (CLONE_SPEC_CORE_A §1.3 block 0). The block wrapper,
// the `mt-[14.7433em]` row and the card geometry are byte-identical on both
// routes; only the content and the company-logo width differ, so those are props.
//
// `logoWidth`: `w-[7.96em]` (85px) on the homepage, `w-[19.4941em]` (207.92px)
// on /pricing (CORE_A §1.3). `item.imgClassName` lets /pricing's first avatar
// carry its static `ml-[1.4em] h-[90%] scale-[1.2]` transform (CORE_A §5 note 5
// — intentional off-centre crop, NOT a bug).
//
// The 6 QUOTE_LEAVES behind each card are STATIC on both routes (§7.2):
// no `marketing-drift-leaf`, initial === animate. Never animate them.
export default function Testimonials({ items, logoWidth = 'w-[7.96em]' }) {
  return (
    <div className={BLOCK}>
      <div className="mt-[14.7433em] flex w-full justify-center max-wf-tablet:flex-wrap">
        {items.map((item) => (
          <div
            key={item.name}
            className={`flex flex-col max-wf-mini:text-[0.8em] ${item.columnExtra ?? ''}`}
          >
            <div className="relative mx-[9.25em] w-[39.1109em]">
              <LeafLayer leaves={QUOTE_LEAVES} />
              <div className="relative z-20 flex w-full flex-col items-center rounded-[10px] border-2 border-black bg-cream px-[1.4em] pt-[6em] pb-[3em]">
                <span className="absolute -top-[13.4em] flex size-[11.7918em] items-end justify-center overflow-hidden rounded-full border-2 border-black bg-leaf">
                  <img
                    src={item.avatar}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className={item.imgClassName ?? 'h-auto w-full'}
                  />
                </span>
                <p className="text-center text-[2.3em] leading-[1.54] font-semibold">
                  {item.quote}
                </p>
                <div className="mt-[2.4em]">
                  <p className="text-center text-[1.9375em] leading-[1.41]">
                    {item.name}
                    <br />
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-[3em] flex justify-center">
              <img
                src={item.logo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className={logoWidth}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
