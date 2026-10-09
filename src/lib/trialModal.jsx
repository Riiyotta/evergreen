import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Shared open/close state for the trial modal (CLONE_SPEC §5.11). Every
// "Start 14 Day Trial" button on the page (hero block 2, final CTA in §H) opens
// the same overlay, so the state lives at the App level and the buttons call
// `openTrial()` from this context.
const TrialModalContext = createContext({ open: false, openTrial: () => {}, closeTrial: () => {} })

export function TrialModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openTrial = useCallback(() => setOpen(true), [])
  const closeTrial = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ open, openTrial, closeTrial }), [open, openTrial, closeTrial])
  return <TrialModalContext.Provider value={value}>{children}</TrialModalContext.Provider>
}

export function useTrialModal() {
  return useContext(TrialModalContext)
}
