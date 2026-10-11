export type LessonType = "video" | "pdf" | "exam";

export type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  /** Minutes. */
  duration: number;
  questionsCount: number;
  locked: boolean;
  completed: boolean;
  videoUrl?: string;
  pdfUrl?: string;
  examId?: string;
};

export type Week = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type CourseMaterials = {
  /** Total hours, shown as "12 Hours". */
  durationHours: number;
  enrolled: number;
  language: string;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  shortDescription: string;
  image: string;
  materials: CourseMaterials;
  weeks: Week[];
};

export type CourseStatus = "not-started" | "in-progress" | "completed";

export type Comment = {
  id: string;
  courseSlug: string;
  author: string;
  avatar: string;
  date: string;
  text: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  isYou: boolean;
};

export type ExamQuestion = {
  id: string;
  text: string;
  options: string[];
  /** Index into options. */
  answer: number;
};

export type Exam = {
  id: string;
  title: string;
  /** Seconds. */
  timeLimit: number;
  questions: ExamQuestion[];
};
