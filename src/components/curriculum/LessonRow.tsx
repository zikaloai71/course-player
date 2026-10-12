import Link from "next/link";
import type { Lesson } from "@/types/course";
import { Icon } from "@/components/ui/Icon";
import styles from "./LessonRow.module.css";

function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "S"}`;
}

export function LessonRow({
  courseSlug,
  lesson,
  current = false,
}: {
  courseSlug: string;
  lesson: Lesson;
  /** The lesson open in the player right now. */
  current?: boolean;
}) {
  const body = (
    <>
      <span className={styles.icon}>
        <Icon name="file" size={17} />
      </span>
      <span className={styles.name}>{lesson.title}</span>
      {lesson.locked ? (
        <span className={styles.icon}>
          <span className="visually-hidden">Locked</span>
          <Icon name="lock" size={17} />
        </span>
      ) : (
        <span className={styles.badges}>
          {lesson.questionsCount > 0 && (
            <span className={`${styles.badge} ${styles.questions}`}>
              {plural(lesson.questionsCount, "QUESTION")}
            </span>
          )}
          <span className={`${styles.badge} ${styles.minutes}`}>
            {plural(lesson.duration, "MINUTE")}
          </span>
        </span>
      )}
    </>
  );

  const className = `${styles.lesson} ${current ? styles.current : ""}`;

  return (
    <li className={styles.row}>
      {lesson.locked ? (
        // A locked lesson is text, not a link: nothing to open yet.
        <span className={className}>{body}</span>
      ) : (
        <Link
          className={className}
          href={`/courses/${courseSlug}?lesson=${lesson.id}`}
          aria-current={current ? "true" : undefined}
        >
          {body}
        </Link>
      )}
    </li>
  );
}
