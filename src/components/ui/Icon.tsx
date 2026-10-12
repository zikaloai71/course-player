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
