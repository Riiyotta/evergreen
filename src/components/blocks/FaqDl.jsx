import { BLOCK } from '../../lib/classes.js'

// Block FAQ_DL — CLONE_SPEC_CONTENT_B §3.8 (CONTENT_A's `FaqList` is the same).
// dt 26.667px / 41.067px / 700 / Rubik / #000. dd > p 18.667/31.733/400/#000.
// Row margin-bottom 3em = 32px; dd margin-top 0.6em = 6.4px. dl width 749.86px.
//
// PLAIN <dl>, NOT an accordion — the original has no <details>, no JS and
// everything is always open. Do not add disclosure behaviour.
export default function FaqDl({ rows }) {
  return (
    <div className={BLOCK}>
      <dl className="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full">
        {rows.map((row, i) => (
          <div key={i} className="mb-[3em]">
            <dt className="text-[2.5em] font-bold leading-[1.54] text-black">
              {row.question}
            </dt>
            <dd className="mt-[0.6em]">
              <p>{row.answer}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
