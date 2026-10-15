import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import materials from "@/components/course/CourseMaterials.module.css";
import week from "@/components/curriculum/WeekCard.module.css";
import styles from "./page.module.css";
import loading from "./loading.module.css";

/**
 * The player page in outline, laid out by the page's own grid: the player and
 * its title, the four icons, Course Materials, the curriculum beside it on
 * desktop, then comments. Every block sits where the real one will land.
 */
export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <main id="main" className={`container ${styles.layout}`} aria-busy="true">
        <p className="visually-hidden" role="status">
          Loading course…
        </p>

        <section className={styles.player}>
          <div className={styles.frame}>
            <Skeleton className={loading.poster} shape="circle" width={64} height={64} />
          </div>
          <Skeleton className={styles.lessonTitle} width="45%" height={20} />
        </section>

        <div className={`${styles.nav} ${loading.row}`}>
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} shape="circle" width={44} height={44} />
          ))}
        </div>

        <section className={styles.materials}>
          <Skeleton className={styles.heading} width={210} height={26} />
          <div className={materials.card}>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className={materials.row}>
                <Skeleton width="55%" height={14} />
                <Skeleton width={72} height={14} />
              </div>
            ))}
          </div>
        </section>

        <aside className={styles.topics}>
          <Skeleton className={styles.heading} width={240} height={26} />
          <div className={styles.progress}>
            <Skeleton height={6} shape="pill" />
          </div>
          <div className={loading.stack}>
            {Array.from({ length: 2 }, (_, w) => (
              <div key={w} className={`${week.card} ${loading.week}`}>
                <Skeleton width={110} height={19} />
                <Skeleton width="85%" height={13} />
                {Array.from({ length: 5 }, (_, l) => (
                  <div key={l} className={loading.lesson}>
                    <Skeleton width={17} height={17} />
                    <Skeleton height={14} />
                    <Skeleton width={78} height={20} shape="pill" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        <section className={styles.comments}>
          <Skeleton className={styles.heading} width={150} height={26} />
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className={loading.comment}>
              <Skeleton shape="circle" width={48} height={48} />
              <div className={loading.lines}>
                <Skeleton width={160} height={14} />
                <Skeleton width={90} height={12} />
                <Skeleton height={12} />
                <Skeleton width="70%" height={12} />
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
