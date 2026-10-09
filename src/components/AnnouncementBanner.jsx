// Section A — CLONE_SPEC §5.1 / §8 "A — Announcement banner".
// 52px tall @1280: bg #000000, padding 10px 0, text 18.667px/31.73px white,
// text block max-w 49ch (580.714px @1280) centred, 19.05em at <=479px.
// Link is weight 600 + underline, inherits white, no hover change.
export default function AnnouncementBanner() {
  return (
    <div className="flex items-center justify-center bg-black py-[10px]">
      <p className="mx-auto max-w-[49ch] text-center text-white max-wf-mini:max-w-[19.05em]">
        Tired of managing too many workplace apps?{' '}
        <a
          /* external link removed */
          target="_blank"
          rel="noreferrer"
          className="font-semibold underline"
        >
          See our solution.
        </a>
      </p>
    </div>
  )
}
