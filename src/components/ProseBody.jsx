import { Link } from 'react-router-dom'
import RichText from './RichText.jsx'

// ProseBody — renders a `RichText` node array inside the ONE shared prose
// container (CLONE_SPEC_CONTENT_B §2). Used by T-LEGAL, T-STORY and T-PILLAR.
//
// It adds NO styling of its own: every element type (p / h2 / h3 / ul / li /
// blockquote / figure / figcaption / a / strong) is already scaled by the
// `.marketing-rich-text` rules in src/index.css, which were transcribed from the
// original's own compiled stylesheet. Nothing here may set a font-size.
//
// Node shapes:
//   { type: 'h2' | 'h3', text }
//   { type: 'p', text, link?: { href, label }, strong?: string }
//   { type: 'ul' | 'ol', items: string[] }
//   { type: 'blockquote', text, strong? }
//   { type: 'figure', src, alt, caption, bare? }
//   { type: 'pExternal', text, linkLabel }   // off-domain inline link → no href
export default function ProseBody({ nodes, className }) {
  return (
    <RichText className={className}>
      {nodes.map((node, index) => {
        switch (node.type) {
          case 'h2':
            return <h2 key={index}>{node.text}</h2>
          case 'h3':
            return <h3 key={index}>{node.text}</h3>
          case 'ul':
            return (
              <ul key={index}>
                {node.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={index}>
                {node.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            )
          case 'blockquote':
            return (
              <blockquote key={index}>
                <p>
                  {node.strong ? <strong>{node.strong}</strong> : null}
                  {node.strong ? ' ' : null}
                  {node.text}
                </p>
              </blockquote>
            )
          case 'figure':
            // `bare` = a prose <img> with no <figure>/<figcaption>: the
            // nitro-games image measures 691.19px, i.e. the FULL prose column,
            // so it cannot be inside `figure { max-width: 60% }`.
            return node.bare ? (
              <img key={index} src={node.src} alt={node.alt ?? ''} />
            ) : (
              <figure key={index}>
                <img src={node.src} alt={node.alt ?? ''} />
                <figcaption>{node.caption}</figcaption>
              </figure>
            )
          case 'pExternal':
            // §13 — off-domain destination stripped; the <a> keeps its markup.
            return (
              <p key={index}>
                {node.text} <a>{node.linkLabel}</a>
              </p>
            )
          default:
            return (
              <p key={index}>
                {node.strong ? <strong>{node.strong}</strong> : null}
                {node.strong ? ' ' : null}
                {node.text}
                {node.link ? (
                  <>
                    {' '}
                    <Link to={node.link.href}>{node.link.label}</Link>
                  </>
                ) : null}
              </p>
            )
        }
      })}
    </RichText>
  )
}
