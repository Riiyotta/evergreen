import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AnnouncementBanner from '../components/AnnouncementBanner.jsx'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import TrialModal from '../components/TrialModal.jsx'
import { TrialModalProvider } from '../lib/trialModal.jsx'

// Global chrome — rendered ONCE here and shared by every route.
// Page components render ONLY their own <main> content; they must never
// re-declare the banner, nav, footer or trial modal.
//
// Root: div.marketing-root.bg-cream. `.marketing-root` carries the font-size
// engine (0.833333vw / 16px >=1920 / 8.25833px <=991) declared in src/index.css —
// EVERY length below it is em off that, so nothing may be converted to px.
// Routes that actually render the announcement banner. CLONE_SPEC_CORE_A
// measured /pricing, /esg and /our-purpose with NO banner — their nav starts at
// y=0 — so the banner is per-route, not global. Add routes here as recon
// confirms them rather than assuming every page has it.
const BANNER_ROUTES = new Set(['/'])

// `/blog/:slug` also renders the banner (CLONE_SPEC_CONTENT_A §0.1) — worth
// 51.74px on every y-offset there. It is parameterised, so it cannot live in
// the exact-pathname Set above. The trailing slash matters: `/blog` itself is
// bannerless, only its articles carry it.
const BANNER_PREFIXES = ['/blog/']

export default function Layout({ children }) {
  const { pathname } = useLocation()
  const showBanner =
    BANNER_ROUTES.has(pathname) ||
    BANNER_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  // Next.js App Router restores to top on navigation; match that.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <TrialModalProvider>
      <div className="marketing-root bg-cream">
        {/* A — announcement banner (52px, bg #000000). Per-route, see above. */}
        {showBanner && <AnnouncementBanner />}

        {/* B — nav: static position:relative, NOT sticky, no blur, no shadow */}
        <Nav />

        {/* The original's <main> is `relative w-full overflow-hidden` — the overflow
            clip is load-bearing: the 120em divider bands and the leaf layers extend
            past the gutters and would otherwise create horizontal scroll. */}
        <main className="relative w-full overflow-hidden">{children}</main>

        {/* I — footer (outside the overflow clip, owns its own wrapper + py-[5em]) */}
        <Footer />

        {/* Trial modal overlay, opened by every TrialButton (§5.11) */}
        <TrialModal />
      </div>
    </TrialModalProvider>
  )
}

// Container contract, verbatim from CLONE_SPEC §1, applied to every section
// wrapper on every page. The -mt-[3em] (-32px @1280) overlap is LOAD-BEARING
// (§10.3): it is what makes the divider bands and background transitions line
// up. Do not remove it.
export const SECTION_WRAPPER =
  'mx-auto -mt-[3em] w-full max-w-[1920px] px-[6em] max-wf-tablet:px-[6vw]'
