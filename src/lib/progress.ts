import type { Course, CourseStatus, Lesson } from "@/types/course";

export function allLessons(course: Course): Lesson[] {
  return course.weeks.flatMap((w) => w.lessons);
}

/** Completion of the course as a whole, 0-100, rounded. */
export function courseProgress(course: Course, completedIds?: Set<string>): number {
  const lessons = allLessons(course);
  if (lessons.length === 0) return 0;
  const done = lessons.filter((l) =>
    completedIds ? completedIds.has(l.id) : l.completed,
  ).length;
  return Math.round((done / lessons.length) * 100);
}

export function courseStatus(progress: number): CourseStatus {
  if (progress <= 0) return "not-started";
  if (progress >= 100) return "completed";
  return "in-progress";
}

/** First lesson the student has not finished yet, else the first lesson. */
export function nextLesson(course: Course, completedIds?: Set<string>): Lesson {
  const lessons = allLessons(course);
  const next = lessons.find((l) =>
    completedIds ? !completedIds.has(l.id) : !l.completed,
  );
  return next ?? lessons[0];
}

export function seedCompletedIds(course: Course): string[] {
  return allLessons(course)
    .filter((l) => l.completed)
    .map((l) => l.id);
}

/**
 * A lesson is open when it is the seed-unlocked one or the student already
 * finished everything before it.
 */
export function isLessonOpen(
  course: Course,
  lesson: Lesson,
  completedIds: Set<string>,
): boolean {
  if (!lesson.locked) return true;
  const lessons = allLessons(course);
  const index = lessons.findIndex((l) => l.id === lesson.id);
  return lessons.slice(0, index).every((l) => completedIds.has(l.id));
}

export function totalMinutes(course: Course): number {
  return allLessons(course).reduce((sum, l) => sum + l.duration, 0);
}
