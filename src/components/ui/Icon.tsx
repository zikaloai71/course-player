/**
 * The few line icons the design uses, drawn inline so there is no icon library
 * and no extra request. All of them inherit `currentColor`.
 */
const PATHS = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  lessons: (
    <>
      <path d="M5 4h4v16H5z" />
      <path d="M10 4h4v16h-4z" />
      <path d="m15.5 5 3.5.9-3.1 14.6-3.5-.9z" />
    </>
  ),
  enrolled: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 11a3 3 0 0 0 0-6" />
      <path d="M17 20h3.5a4.5 4.5 0 0 0-3-4.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  instructor: (
    <>
      <circle cx="12" cy="6.5" r="3" />
      <path d="M7 13.5a5 5 0 0 1 10 0" />
      <path d="M4 17.5h16" />
      <path d="M6.5 21 8 17.5M17.5 21 16 17.5" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 16.5h4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
    </>
  ),
  play: <path d="M8 5.5l11 6.5-11 6.5z" fill="currentColor" />,
  pause: (
    <>
      <path d="M9 5.5v13M15 5.5v13" strokeWidth="2.5" />
    </>
  ),
  volume: (
    <>
      <path d="M4 9.5h3L11.5 6v12L7 14.5H4z" fill="currentColor" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M17.5 7a7 7 0 0 1 0 10" />
    </>
  ),
  muted: (
    <>
      <path d="M4 9.5h3L11.5 6v12L7 14.5H4z" fill="currentColor" />
      <path d="m15.5 10 5 4M20.5 10l-5 4" />
    </>
  ),
  expand: <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" />,
  collapse: <path d="M4 9h5V4M20 9h-5V4M20 15h-5v5M4 15h5v5" />,
  comment: (
    <>
      <path d="M20 14.5a2.5 2.5 0 0 1-2.5 2.5H8l-4 3.5v-14A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.8.7-.8 1.3v.6" />
      <path d="M12 17h.01" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
      <path d="M8 5.5H5.5v1A3.5 3.5 0 0 0 8 9.8M16 5.5h2.5v1a3.5 3.5 0 0 1-2.5 3.3" />
      <path d="M12 13v3.5M9 20h6l-.5-3.5h-5z" />
    </>
  ),
  wide: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M8 9.5 5.5 12 8 14.5M16 9.5l2.5 2.5-2.5 2.5" />
    </>
  ),
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
