// RichTextBlocks — renders the free-form `Block[]` body of the blog article
// (CLONE_SPEC_CONTENT_A §9.1) and of the comparison page (§4.2) as the plain
// HTML elements that `.marketing-rich-text` styles.
//
// It adds NO classes of its own. Every type style (p 18.6667/31.7333,
// h2 48/57.6 at line-height 1.2, h3 26.6667/41.0667 in Rubik at weight 700,
// ul/ol at #333, blockquote on #c3f2c5 with a 2px black 10px-radius box,
// figure at max-width 60%, figcaption at 10.6667px, inline a at line-height 1,
// bare `code` in ui-monospace) already lives in src/index.css under
// `.marketing-rich-text`, transcribed from the original's own stylesheet.
// Styling anything here would double up on that layer.
//
// `p` / `ul` / `ol` / `blockquote` carry inline markup (<a>, <strong>, <code>,
// <br>), so they go through dangerouslySetInnerHTML — the content comes from
// the repo's own data files, not from user input.
//
// ⚠ `table` and `hr` are intentionally unsupported: §2.3 found no rule for
// either in the original's stylesheet, so they would render with raw UA
// defaults. §11.5 says prefer not to use them.
export default function RichTextBlocks({ blocks }) {
  return blocks.map((block, i) => {
    switch (block.t) {
      case 'h2':
        return (
          <h2 key={i} className={block.variant === 'rich-text-h1' ? 'rich-text-h1' : undefined}>
            {block.text}
          </h2>
        )
      case 'h3':
        return <h3 key={i}>{block.text}</h3>
      case 'h4':
        return <h4 key={i}>{block.text}</h4>
      case 'p':
        return <p key={i} dangerouslySetInnerHTML={{ __html: block.html }} />
      case 'ul':
        return (
          <ul key={i}>
            {block.items.map((item, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )
      case 'ol':
        return (
          <ol key={i}>
            {block.items.map((item, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ol>
        )
      case 'blockquote':
        return (
          <blockquote key={i}>
            <p dangerouslySetInnerHTML={{ __html: block.html }} />
          </blockquote>
        )
      case 'figure':
        return (
          <figure key={i}>
            <img src={block.src} alt={block.alt || ''} loading="lazy" decoding="async" />
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>
        )
      case 'videoEmbed':
        return (
          <div
            key={i}
            className="video-embed"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        )
      default:
        return null
    }
  })
}
