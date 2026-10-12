import type { Course } from "@/types/course";
import { WeekCard } from "./WeekCard";
import styles from "./Curriculum.module.css";

export function Curriculum({ course }: { course: Course }) {
  return (
    <ul className={styles.weeks}>
      {course.weeks.map((week) => (
        <WeekCard key={week.id} courseSlug={course.slug} week={week} />
      ))}
    </ul>
  );
}
