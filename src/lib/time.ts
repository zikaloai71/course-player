/** "754" -> "12:34". Nothing here runs longer than an hour, so mm:ss is enough. */
export function clock(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(whole / 60);
  return `${mins}:${String(whole % 60).padStart(2, "0")}`;
}
