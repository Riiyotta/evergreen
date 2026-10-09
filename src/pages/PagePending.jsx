import { useLocation } from 'react-router-dom'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'

// Temporary stand-in so every sitemap route resolves while its template is
// still being built. Replaced route-by-route as each template lands.
export default function PagePending() {
  const { pathname } = useLocation()
  return (
    <section className="relative bg-cream">
      <div className={`${SECTION_WRAPPER} pb-[12em] pt-[12em] text-center`}>
        <h1 className="font-headline text-[4.5em] font-semibold leading-[1.48] text-black">
          Coming together
        </h1>
        <p className="mx-auto mt-[2em] max-w-[49ch]">
          The template for <code>{pathname}</code> is still being built.
        </p>
      </div>
    </section>
  )
}
