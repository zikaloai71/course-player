import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./LessonPoster.module.css";

type Props = {
  /** Left out for a lesson with nothing to open, which is poster only. */
  action?: {
    icon: IconName;
    label: string;
    /** A second line under the label, such as "5 questions · 10 min". */
    meta?: string;
    onClick: () => void;
  };
};

/**
 * The frame a lesson shows when there is no video: the poster, and over it the
 * one thing this lesson opens. PDF and exam lessons differ only in that button,
 * so they share this.
 */
export function LessonPoster({ action }: Props) {
  return (
    <>
      <Image
        src="/images/lesson-poster.webp"
        alt=""
        width={854}
        height={569}
        sizes="(max-width: 1023px) 100vw, 65vw"
        priority
      />
      {action && (
        <button type="button" className={styles.action} onClick={action.onClick}>
          <Icon name={action.icon} size={action.meta ? 28 : 18} />
          {action.label}
          {action.meta && <span className={styles.meta}>{action.meta}</span>}
        </button>
      )}
    </>
  );
}
