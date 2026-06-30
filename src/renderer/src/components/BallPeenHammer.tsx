/**
 * Ball-peen hammer icon — a clean, artisanal silhouette rendered as a single
 * SVG path in `currentColor` with a thin dark outline.  No surrounding box or
 * gradient background; it sits inline like a typography glyph.
 *
 * The shape: a short cylindrical head with a flat striking face on one side and
 * a rounded ball peen on the other, mounted on a slightly angled handle.
 */
export function BallPeenHammer({
  size = 16,
  className
}: {
  size?: number
  className?: string
}): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Handle — angled shaft */}
      <line
        x1="10.5"
        y1="13"
        x2="5"
        y2="21.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Head — the rectangular striking block */}
      <rect
        x="6"
        y="3.5"
        width="12"
        height="6"
        rx="1.4"
        fill="currentColor"
        stroke="var(--bg-0, #1a1614)"
        strokeWidth="1"
      />
      {/* Ball peen — rounded end */}
      <circle
        cx="6.5"
        cy="6.5"
        r="3.2"
        fill="currentColor"
        stroke="var(--bg-0, #1a1614)"
        strokeWidth="1"
      />
      {/* Striking face highlight — a subtle line on the flat end */}
      <line
        x1="18"
        y1="4.2"
        x2="18"
        y2="8.8"
        stroke="var(--bg-0, #1a1614)"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}
