import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseCard } from "@/components/courses/CourseCard";
import { getCourses } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse the ITLegend catalogue and pick up where you left off.",
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Courses" }]}
        title="Courses"
      />
      <main id="main" className={`container ${styles.main}`}>
        <p className={styles.intro}>
          {courses.length} courses. Pick up where you stopped, or start something new.
        </p>
        <ul className={styles.grid}>
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} priority={i < 3} />
          ))}
        </ul>
      </main>
    </>
  );
}
