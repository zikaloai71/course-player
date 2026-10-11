import coursesJson from "@/data/courses.json";
import commentsJson from "@/data/comments.json";
import leaderboardJson from "@/data/leaderboard.json";
import examsJson from "@/data/exams.json";
import type { Comment, Course, Exam, LeaderboardEntry, Lesson } from "@/types/course";

/**
 * The whole data layer is behind these functions so the JSON can be swapped for
 * a real API without touching a component.
 */
const courses = coursesJson as Course[];
const comments = commentsJson as Comment[];
const leaderboards = leaderboardJson as Record<string, LeaderboardEntry[]>;
const exams = examsJson as Record<string, Exam>;

export function getCourses(): Course[] {
  return courses;
}

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLesson(course: Course, lessonId: string): Lesson | undefined {
  return course.weeks.flatMap((w) => w.lessons).find((l) => l.id === lessonId);
}

export function getComments(courseSlug: string): Comment[] {
  return comments.filter((c) => c.courseSlug === courseSlug);
}

/** Falls back to the sample board so every course has something to show. */
export function getLeaderboard(courseSlug: string): LeaderboardEntry[] {
  return leaderboards[courseSlug] ?? leaderboards["starting-seo-as-your-home"];
}

export function getExam(examId: string): Exam | undefined {
  return exams[examId];
}
