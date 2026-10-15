import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import card from "@/components/courses/CourseCard.module.css";
import styles from "./page.module.css";

/**
 * Six cards in the real grid and the real card classes, so the page fills in
 * without anything moving.
 */
export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <main id="main" className={`container ${styles.main}`} aria-busy="true">
        <p className="visually-hidden" role="status">
          Loading courses…
        </p>
        <Skeleton className={styles.intro} width={320} height={14} />

        <ul className={styles.grid}>
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className={card.card}>
              <Skeleton className={card.media} height="auto" />
              <div className={card.body}>
                <Skeleton width="75%" height={18} />
                <Skeleton width="40%" height={12} />
                <Skeleton height={12} />
                <Skeleton width="85%" height={12} />
                <Skeleton height={6} shape="pill" />
                <Skeleton height={44} />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
