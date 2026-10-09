import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// Shared overlay panel — CLONE_SPEC §5.3 (mobile menu) and §5.11 (trial modal).
// Both overlays on the page are this component: fixed inset-0, bg-white (#ffffff,
// the only pure-white surface on the page), full-viewport vertical slide.
//
// §7.6 motion, exact:
//   open:  translateY(-110vh) -> 0,  1000ms, cubic-bezier(0.455, 0.03, 0.515, 0.955)
//   close: 0 -> translateY(-110vh),   500ms, cubic-bezier(0.55, 0.085, 0.68, 0.53)
// Reduced motion collapses both to 0ms and hides at 0vh.
const OPEN_EASE = [0.455, 0.03, 0.515, 0.955]
const CLOSE_EASE = [0.55, 0.085, 0.68, 0.53]

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])'

export default function SlideOverlay({ open, onClose, label, className = '', children }) {
  const panelRef = useRef(null)
  const restoreRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const hidden = reducedMotion ? '0vh' : '-110vh'

  // body scroll lock + focus move/restore (§5.3 "Behaviour")
  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const panel = panelRef.current
    const first = panel?.querySelectorAll(FOCUSABLE)[0]
    ;(first || panel)?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      const restore = restoreRef.current
      if (restore && typeof restore.focus === 'function') restore.focus()
    }
  }, [open])

  // Escape closes; Tab is trapped and wraps first <-> last (§5.3)
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial={{ y: hidden }}
          animate={{ y: '0vh', transition: { duration: reducedMotion ? 0 : 1, ease: OPEN_EASE } }}
          exit={{ y: hidden, transition: { duration: reducedMotion ? 0 : 0.5, ease: CLOSE_EASE } }}
          className={`fixed inset-0 bg-white ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
