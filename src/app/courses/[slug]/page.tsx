import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseMaterials } from "@/components/course/CourseMaterials";
import { Curriculum } from "@/components/curriculum/Curriculum";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { SectionNav } from "@/components/player/SectionNav";
import { PdfLesson } from "@/components/player/PdfLesson";
import { ExamLesson } from "@/components/player/ExamLesson";
import { LessonPoster } from "@/components/player/LessonPoster";
import { CommentSection } from "@/components/comments/CommentSection";
import {
  getComments,
  getCourse,
  getCourses,
  getExam,
  getLeaderboard,
  getLesson,
} from "@/lib/data";
import { courseProgress, nextLesson } from "@/lib/progress";
import styles from "./page.module.css";

type Params = { slug: string };
type Search = { lesson?: string };

/** Every course page is built at build time; the lesson lives in the query. */
export async function generateStaticParams(): Promise<Params[]> {
  const courses = await getCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.shortDescription,
  };
}

export default async function CoursePlayerPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  const progress = courseProgress(course);
  const [leaderboard, comments] = await Promise.all([
    getLeaderboard(course.slug),
    getComments(course.slug),
  ]);
  const { lesson: lessonId } = await searchParams;
  // An unknown or missing ?lesson= falls back to where the student stopped.
  const lesson = (lessonId && getLesson(course, lessonId)) || nextLesson(course);
  const exam = lesson.examId ? await getExam(lesson.examId) : undefined;

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: "Course Details" },
        ]}
        title={course.title}
      />

      <main id="main" className={`container ${styles.layout}`}>
        <section className={styles.player} aria-label="Lesson player">
          <div className={styles.frame}>
            {lesson.videoUrl ? (
              // Keyed per lesson so switching lessons starts a fresh player
              // instead of carrying the last one's playhead over.
              <VideoPlayer
                key={lesson.id}
                src={lesson.videoUrl}
                poster="/images/lesson-poster.webp"
                title={lesson.title}
              />
            ) : lesson.pdfUrl ? (
              <PdfLesson title={lesson.title} url={lesson.pdfUrl} />
            ) : exam ? (
              <ExamLesson exam={exam} />
            ) : (
              // Nothing to play and nothing to open: the poster holds the frame.
              <LessonPoster />
            )}
          </div>
          <h2 className={styles.lessonTitle}>{lesson.title}</h2>
        </section>

        <div className={styles.nav}>
          <SectionNav
            courseSlug={course.slug}
            lessonTitle={lesson.title}
            leaderboard={leaderboard}
            progress={progress}
          />
        </div>

        <section className={styles.materials} aria-labelledby="materials-heading">
          <h2 id="materials-heading" className={styles.heading}>
            Course Materials
          </h2>
          <CourseMaterials course={course} />
        </section>

        <aside className={styles.topics} aria-labelledby="topics-heading">
          <h2 id="topics-heading" className={styles.heading}>
            Topics for This Course
          </h2>
          <div className={styles.progress}>
            <ProgressBar
              value={progress}
              animate
              marker
              label={`${course.title} progress`}
            />
          </div>
          <Curriculum course={course} currentLessonId={lesson.id} />
        </aside>

        <section className={styles.comments} aria-labelledby="comments-heading">
          <h2 id="comments-heading" className={styles.heading}>
            Comments
          </h2>
          <CommentSection courseSlug={course.slug} comments={comments} />
        </section>
      </main>
    </>
  );
}
