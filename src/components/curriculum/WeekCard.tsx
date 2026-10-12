import type { Week } from "@/types/course";
import { LessonRow } from "./LessonRow";
import styles from "./WeekCard.module.css";

export function WeekCard({ courseSlug, week }: { courseSlug: string; week: Week }) {
  return (
    <li className={styles.card}>
      <h3 className={styles.title}>{week.title}</h3>
      <p className={styles.desc}>{week.description}</p>
      <ul className={styles.lessons}>
        {week.lessons.map((lesson) => (
          <LessonRow key={lesson.id} courseSlug={courseSlug} lesson={lesson} />
        ))}
      </ul>
    </li>
  );
}
