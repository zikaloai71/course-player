import coursesJson from "@/data/courses.json";
import commentsJson from "@/data/comments.json";
import leaderboardJson from "@/data/leaderboard.json";
import examsJson from "@/data/exams.json";
import type { Comment, Course, Exam, LeaderboardEntry, Lesson } from "@/types/course";

/**
 * The whole data layer is behind these functions so the JSON can be swapped for
 * a real API without touching a component.
 *
 * They are async although the JSON is already in memory: that is the shape a
 * fetch has, so the day this talks to a server no caller changes. Lookups that
 * work inside a course the caller already holds stay synchronous.
 */
const courses = coursesJson as Course[];
const comments = commentsJson as Comment[];
const leaderboards = leaderboardJson as Record<string, LeaderboardEntry[]>;
const exams = examsJson as Record<string, Exam>;

export async function getCourses(): Promise<Course[]> {
  return courses;
}

export async function getCourse(slug: string): Promise<Course | undefined> {
  return courses.find((c) => c.slug === slug);
}

export function getLesson(course: Course, lessonId: string): Lesson | undefined {
  return course.weeks.flatMap((w) => w.lessons).find((l) => l.id === lessonId);
}

export async function getComments(courseSlug: string): Promise<Comment[]> {
  return comments.filter((c) => c.courseSlug === courseSlug);
}

/** Falls back to the sample board so every course has something to show. */
export async function getLeaderboard(courseSlug: string): Promise<LeaderboardEntry[]> {
  return leaderboards[courseSlug] ?? leaderboards["starting-seo-as-your-home"];
}

export async function getExam(examId: string): Promise<Exam | undefined> {
  return exams[examId];
}
