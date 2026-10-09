import { BLOCK } from '../lib/classes.js'

// G2 rating block — CLONE_SPEC §5.10. Byte-identical on `/` and `/pricing`
// (CORE_A §1.3), so it takes no props.
export default function G2Block() {
  return (
    <div className={`${BLOCK} mb-0 max-wf-mini:mb-0`}>
      <div className="mt-[7em] flex flex-col items-center">
        <img
          src="/assets/logo-g2png-c53a3f.webp"
          alt="G2 logo"
          loading="lazy"
          decoding="async"
          className="w-[6.03104em]"
        />
        <div className="mt-[1.95218em] mb-[2.45003em] flex">
          {[0, 1, 2, 3, 4].map((index) => (
            <img
              key={index}
              src="/assets/star1svg-303d31.svg"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="mx-[1.14204em] w-[3.03685em]"
            />
          ))}
        </div>
        <p className="text-[2.5em] leading-[1.54] font-semibold w-full text-center">
          4.8 / 5 on G2 Reviews
        </p>
      </div>
    </div>
  )
}
