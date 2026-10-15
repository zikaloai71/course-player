"use client";

import { useEffect, useState } from "react";
import type { Week } from "@/types/course";
import { LessonRow } from "./LessonRow";
import styles from "./WeekCard.module.css";

export function WeekCard({
  courseSlug,
  week,
  currentLessonId,
}: {
  courseSlug: string;
  week: Week;
  currentLessonId: string;
}) {
  // Only the week the student is in starts open; picking a lesson in another
  // week opens that one too. The rest stay one tap away.
  const hasCurrent = week.lessons.some((l) => l.id === currentLessonId);
  const [open, setOpen] = useState(hasCurrent);
  useEffect(() => {
    if (hasCurrent) setOpen(true);
  }, [hasCurrent]);
  const bodyId = `${week.id}-lessons`;

  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <h3>
          {/* The whole title row is the tap target. */}
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={bodyId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.title}>{week.title}</span>
            <span className={styles.sign} aria-hidden="true">
              {open ? "−" : "+"}
            </span>
          </button>
        </h3>
        <p className={styles.desc}>{week.description}</p>
      </div>

      <div id={bodyId} hidden={!open}>
        <ul className={styles.lessons}>
          {week.lessons.map((lesson) => (
            <LessonRow
              key={lesson.id}
              courseSlug={courseSlug}
              lesson={lesson}
              current={lesson.id === currentLessonId}
            />
          ))}
        </ul>
      </div>
    </li>
  );
}
