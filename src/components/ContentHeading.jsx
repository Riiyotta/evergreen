import { BLOCK } from '../lib/classes.js'

// ContentHeading — the shared h2 heading block used by every section on
// /alternatives, /alternatives/:slug and the blog article's guide cluster.
// CLONE_SPEC_CONTENT_A §2.4 / §4.1 ("Every heading block is the same wrapper"),
// class strings verbatim.
//
// Frame `w-[70.3em]` = 749.86px @1280. h2 = 48px / 71.04px (4.5em / 1.48) /
// 600 / headline serif / #000, centred. Measured 749.86 x 71.03 for one line,
// 142.06 for two.
//
// ⚠ This is the DISPLAY h2 role (line-height 1.48). It is a different role from
// `.marketing-rich-text h2`, which is also 48px but has line-height 1.2. Do not
// unify them.
export default function ContentHeading({ children }) {
  return (
    <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
      <div className="mx-auto mt-0 w-[70.3em] max-wf-phone:w-auto max-wf-mini:mt-[3em] max-wf-mini:w-auto">
        <h2 className="font-headline text-center text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-center max-wf-mini:text-[3.9em]">
          {children}
        </h2>
      </div>
    </div>
  )
}
