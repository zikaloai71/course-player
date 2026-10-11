import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/types/course";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { allLessons, courseProgress, courseStatus, nextLesson } from "@/lib/progress";
import styles from "./CourseCard.module.css";

const ACTION: Record<string, string> = {
  "not-started": "Start",
  "in-progress": "Continue",
  completed: "Review",
};

const STATUS_LABEL: Record<string, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  completed: "Completed",
};

const STATUS_CLASS: Record<string, string> = {
  "not-started": styles.notStarted,
  "in-progress": styles.inProgress,
  completed: styles.completed,
};

export function CourseCard({ course, priority }: { course: Course; priority?: boolean }) {
  const progress = courseProgress(course);
  const status = courseStatus(progress);
  const lessons = allLessons(course);
  const target = `/courses/${course.slug}?lesson=${nextLesson(course).id}`;

  return (
    <li className={styles.card}>
      <div className={styles.media}>
        <Image
          src={course.image}
          alt={`Cover art for ${course.title}`}
          width={800}
          height={450}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
        <span className={`${styles.status} ${STATUS_CLASS[status]}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>

      <div className={styles.body}>
        <div>
          <h2 className={styles.title}>{course.title}</h2>
          <p className={styles.instructor}>{course.instructor}</p>
        </div>

        <p className={styles.desc}>{course.shortDescription}</p>

        <p className={styles.meta}>
          <span>
            {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}
          </span>
          <span>{course.materials.durationHours} hours</span>
        </p>

        <div className={styles.progressRow}>
          <ProgressBar value={progress} label={`${course.title} progress`} />
          <span className={styles.percent}>{progress}%</span>
        </div>

        {/* Stretched over the whole card, so the card is one link and one tab stop. */}
        <Link
          className={styles.action}
          href={target}
          aria-label={`${ACTION[status]}: ${course.title}`}
        >
          {ACTION[status]} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </li>
  );
}
