import { BLOCK } from '../../lib/classes.js'

// Block LEAF_DL — CLONE_SPEC_CONTENT_B §3.7.
// dt 21.333px (2em) / 32px (1.5) / 700 / Rubik / #000, flex row, items-center;
// leaf img w-[0.8em] of 21.333px = 17.06 x 28.95px, margin-right 9.6px.
// dd has no type of its own (root em); its p is 18.667/31.733/400/#000.
// Row margin-bottom 2.4em = 25.6px. dl width 749.86px.
export default function LeafDl({ rows }) {
  return (
    <div className={BLOCK}>
      <dl className="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full">
        {rows.map((row, i) => (
          <div key={i} className="mb-[2.4em]">
            <dt className="flex items-center text-[2em] font-bold leading-[1.5] text-black">
              <img
                src="/assets/ever-small-leafsvg-e988d6.svg"
                alt=""
                aria-hidden="true"
                className="mr-[0.45em] w-[0.8em] shrink-0"
              />
              {row.term}
            </dt>
            <dd className="mt-[0.3em]">
              <p className="text-[1.75em] leading-[1.7]">{row.definition}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
