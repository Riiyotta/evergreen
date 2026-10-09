import { useState } from 'react'

// CLONE_SPEC_CORE_B §T-3.4 — the original's `useMarketingForm`, decoded from
// chunk 043iauolx97i1.js:
//
//   const [state, setState] = useState('idle')   // 'idle' | 'done' | {error}
//   const [pending, start]  = useTransition()
//   onSubmit: preventDefault → FormData → start(async () => {
//     const res = await action(data)
//     res.ok ? (setState('done'), form.reset()) : setState({ error: res.reason })
//   })
//
// REINTERPRETATION: the original runs on React 19, where `useTransition` keeps
// `isPending` true across an awaited async callback. This project is React
// 18.3, where it does not, so `pending` is plain state here. The observable
// state machine (idle → pending → done | error) is identical.
//
// ⚠️ STUB. Both real actions are Next.js server actions
// (`submitContactRequest` 4092416713f8c685…, `submitReferral` 40f6f29930754…)
// with NO public endpoint, so nothing is posted anywhere. The stub holds
// `pending` for ~900 ms and then resolves to `done`.
//
// The error branch is still reachable so the FormError markup can be
// exercised: load the page with `?formError=1`.
const STUB_DELAY_MS = 900

// ⚠️ UNKNOWN COPY. The real error string is server-supplied (`res.reason`) and
// appears in no client bundle, so it could not be measured (CORE_B §10.5).
// This is a neutral stand-in of similar length — it is NOT the original's copy
// and must not be treated as verbatim.
const UNKNOWN_SERVER_ERROR = 'Something went wrong. Please try again.'

export default function useMarketingForm() {
  const [state, setState] = useState('idle')
  const [pending, setPending] = useState(false)

  function onSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    // Shape-identical to the original; the payload goes nowhere in the clone.
    const data = Object.fromEntries(new FormData(form))
    void data
    const forceError =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('formError')

    setPending(true)
    setTimeout(() => {
      setPending(false)
      if (forceError) {
        setState({ error: UNKNOWN_SERVER_ERROR })
      } else {
        setState('done')
        // Kept from the original: reset runs before the form unmounts.
        form.reset()
      }
    }, STUB_DELAY_MS)
  }

  return { state, pending, onSubmit }
}
