import { leafClassName, leafStyle } from '../lib/leaves.js'

// Shared leaf renderer (CLONE_SPEC §7.2). `leafStyle` emits the initial
// (pre-animation) inline style verbatim; `leafClassName` emits
// `marketing-drift-leaf` / `marketing-scroll-leaf` / `marketing-responsive-leaf`.
// QUOTE_LEAVES get no class at all — they are static, initial === animate.
export default function LeafLayer({ leaves }) {
  return (
    <span aria-hidden="true" className="pointer-events-none">
      {leaves.map((leaf, index) => {
        const { src, style } = leafStyle(leaf)
        const className = leafClassName(leaf)
        return (
          <img
            key={index}
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            {...(className ? { className } : null)}
            style={style}
          />
        )
      })}
    </span>
  )
}
