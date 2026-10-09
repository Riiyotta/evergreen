import { BLOCK } from '../../lib/classes.js'

// Block LEAF_BULLETS — CLONE_SPEC_CONTENT_B §3.6.
// ul 749.86px, list-style none. li margin-bottom 2em (21.333px), flex,
// align-items flex-start. Leaf img 13.50 x 22.91px with margin-top 4.267px.
// p margin-left 13.067px, 18.667/31.733/400/#000.
export default function LeafBulletList({ items }) {
  return (
    <div className={BLOCK}>
      <ul className="mx-auto w-[70.3em] list-none text-left max-wf-mini:max-w-full">
        {items.map((text, i) => (
          <li key={i} className="mb-[2em] flex items-start">
            <img
              src="/assets/ever-small-leafsvg-e988d6.svg"
              alt=""
              aria-hidden="true"
              className="mt-[0.4em] w-[1.26708em] shrink-0"
            />
            <p className="ml-[0.7em]">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
