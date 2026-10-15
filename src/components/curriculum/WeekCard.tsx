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
  // On mobile only the week the student is in starts open, as in the design;
  // picking a lesson in another week opens that one too. Desktop shows every
  // week regardless (see the CSS).
  const hasCurrent = week.lessons.some((l) => l.id === currentLessonId);
  const [open, setOpen] = useState(hasCurrent);
  useEffect(() => {
    if (hasCurrent) setOpen(true);
  }, [hasCurrent]);
  const bodyId = `${week.id}-lessons`;

  return (
    <li className={styles.card}>
      {/*
       * Two headers, one shown at a time by CSS: on mobile the week collapses
       * from a button, on desktop it is a plain heading that never collapses.
       * Swapping them in CSS rather than JavaScript keeps the server and the
       * client markup identical, so there is no flash while the page hydrates.
       */}
      <h3 className={styles.mobileHeader}>
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

      <div className={styles.desktopHeader}>
        <h3 className={styles.title}>{week.title}</h3>
        <p className={styles.desc}>{week.description}</p>
      </div>

      <div id={bodyId} className={`${styles.body} ${open ? "" : styles.collapsed}`}>
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
