import type { Course } from "@/types/course";
import { Icon, type IconName } from "@/components/ui/Icon";
import { allLessons } from "@/lib/progress";
import styles from "./CourseMaterials.module.css";

type Row = { icon: IconName; label: string; value: string };

function rows(course: Course): Row[] {
  const { durationHours, enrolled, language } = course.materials;
  return [
    { icon: "instructor", label: "Instructor", value: course.instructor },
    { icon: "clock", label: "Duration", value: `${durationHours} hours` },
    { icon: "lessons", label: "Lessons", value: `${allLessons(course).length}` },
    { icon: "enrolled", label: "Enrolled", value: `${enrolled} students` },
    { icon: "globe", label: "Language", value: language },
  ];
}

export function CourseMaterials({ course }: { course: Course }) {
  return (
    <dl className={styles.card}>
      {rows(course).map((row) => (
        <div key={row.label} className={styles.row}>
          {/* The icon lives in the <dt> so the <dl> stays valid: div > dt + dd. */}
          <dt className={styles.label}>
            <Icon name={row.icon} />
            {row.label}:
          </dt>
          <dd className={styles.value}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
