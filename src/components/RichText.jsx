// Shared prose container — CLONE_SPEC_CONTENT_B §2, CLONE_SPEC_CONTENT_A §4.
// Used by T-LEGAL, T-DETAIL, T-PILLAR, T-STORY and the blog article template.
//
// The element type scale lives in src/index.css under `.marketing-rich-text`
// (transcribed from the original's own compiled stylesheet). Keep it there —
// it relies on descendant selectors and on the container's font-size being the
// ROOT em (10.6667px @1280), not the paragraph size. That is why `figure` and
// `figcaption` resolve their `1em` to ~10.67px.
//
// Container: 933.36px @1440 · 829.653px @1280 · 642.333px @768 · 343.22px @390.
export default function RichText({ children, className = '' }) {
  return (
    <div
      className={`marketing-rich-text mx-auto max-w-[77.78em] max-wf-tablet:w-auto ${className}`}
    >
      {children}
    </div>
  )
}
