import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCourse, getCourses, getLesson } from "@/lib/data";
import { nextLesson } from "@/lib/progress";

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
      <main className="container" style={{ paddingBlock: "32px 64px" }}>
        <h2>{lesson.title}</h2>
      </main>
    </>
  );
}
