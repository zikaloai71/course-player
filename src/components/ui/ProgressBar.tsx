"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./ProgressBar.module.css";

type Props = {
  /** 0-100. */
  value: number;
  /** Grow from zero when the bar scrolls into view. */
  animate?: boolean;
  /** Show the "You" bubble and the percentage above and below the bar. */
  marker?: boolean;
  label?: string;
};

export function ProgressBar({ value, animate = false, marker = false, label }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const shown = animate && !inView ? 0 : value;

  return (
    <div
      ref={ref}
      className={`${styles.wrap} ${marker ? styles.withMarker : ""}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Course progress"}
    >
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${shown}%` }} />
        {marker && (
          <div className={styles.marker} style={{ left: `${shown}%` }}>
            <span className={styles.bubble} aria-hidden="true">
              You
            </span>
            <span className={styles.value} aria-hidden="true">
              {value}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
