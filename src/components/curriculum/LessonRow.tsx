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
}: {
  courseSlug: string;
  lesson: Lesson;
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

  return (
    <li className={styles.row}>
      {lesson.locked ? (
        // A locked lesson is text, not a link: nothing to open yet.
        <span className={styles.lesson}>{body}</span>
      ) : (
        <Link
          className={styles.lesson}
          href={`/courses/${courseSlug}?lesson=${lesson.id}`}
        >
          {body}
        </Link>
      )}
    </li>
  );
}
