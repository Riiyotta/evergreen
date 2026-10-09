// DateLine — CLONE_SPEC_CONTENT_A §2.2 / §5.8. Blog articles only.
//
// Wrapper `my-[5em]` = margin-block 53.3333px, height 17.06px.
// <time> computes to 10.6667px / 17.0667px / 400 / #333333 / text-align:left —
// ⚠ the smallest type on the whole site, and the ONLY text that inherits the
// `.marketing-root` #333 body colour instead of #000. Deliberate; keep it.
// It carries no size class at all: 1em of the root engine is already 10.6667px.
//
// Format: `D Month YYYY` en-GB ("7 September 2026"); `datetime` is YYYY-MM-DD.
// There is no author, avatar, read time or share row next to it (§2.2).
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function formatDate(iso) {
  const [year, month, day] = iso.split('-')
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`
}

export default function DateLine({ date }) {
  return (
    <div className="my-[5em] flex w-full items-center justify-center">
      <span className="flex flex-col items-start">
        <time dateTime={date} className="text-left">
          {formatDate(date)}
        </time>
      </span>
    </div>
  )
}
