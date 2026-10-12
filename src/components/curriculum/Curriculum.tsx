import type { Course } from "@/types/course";
import { WeekCard } from "./WeekCard";
import styles from "./Curriculum.module.css";

export function Curriculum({
  course,
  currentLessonId,
}: {
  course: Course;
  /** The lesson the player is showing, highlighted in its week. */
  currentLessonId: string;
}) {
  return (
    <ul className={styles.weeks}>
      {course.weeks.map((week) => (
        <WeekCard
          key={week.id}
          courseSlug={course.slug}
          week={week}
          currentLessonId={currentLessonId}
        />
      ))}
    </ul>
  );
}
