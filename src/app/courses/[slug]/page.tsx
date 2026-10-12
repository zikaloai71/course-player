import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseMaterials } from "@/components/course/CourseMaterials";
import { Curriculum } from "@/components/curriculum/Curriculum";
import { getCourse, getCourses, getLesson } from "@/lib/data";
import { nextLesson } from "@/lib/progress";
import styles from "./page.module.css";

type Params = { slug: string };
type Search = { lesson?: string };

/** Every course page is built at build time; the lesson lives in the query. */
export function generateStaticParams(): Params[] {
  return getCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
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
  const course = getCourse(slug);
  if (!course) notFound();

  const { lesson: lessonId } = await searchParams;
  // An unknown or missing ?lesson= falls back to where the student stopped.
  const lesson = (lessonId && getLesson(course, lessonId)) || nextLesson(course);

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

      <main className={`container ${styles.layout}`}>
        <section className={styles.player} aria-label="Lesson player">
          <div className={styles.frame}>
            <Image
              src="/images/lesson-poster.webp"
              alt=""
              width={1280}
              height={720}
              sizes="(max-width: 1023px) 100vw, 65vw"
              priority
            />
          </div>
          <h2 className={styles.lessonTitle}>{lesson.title}</h2>
        </section>

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
          <Curriculum course={course} />
        </aside>

        <section className={styles.comments} aria-labelledby="comments-heading">
          <h2 id="comments-heading" className={styles.heading}>
            Comments
          </h2>
        </section>
      </main>
    </>
  );
}
