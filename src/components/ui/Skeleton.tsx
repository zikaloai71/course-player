import styles from "./Skeleton.module.css";

type Props = {
  /** Any CSS length; defaults to the full width of the slot. */
  width?: number | string;
  height?: number | string;
  /** A circle (avatars, the round icons) or a pill (badges, buttons). */
  shape?: "circle" | "pill";
  className?: string;
};

/**
 * A grey placeholder in the shape of what is loading. Loading screens build
 * from these inside the page's own layout classes, so nothing shifts when the
 * real content arrives. Hidden from assistive tech: the screen announces
 * "loading" once instead.
 */
export function Skeleton({ width = "100%", height = 14, shape, className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.bone} ${shape ? styles[shape] : ""} ${className ?? ""}`}
      style={{ width, height }}
    />
  );
}
