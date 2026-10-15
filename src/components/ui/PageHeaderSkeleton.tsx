import { Skeleton } from "./Skeleton";
import styles from "./PageHeader.module.css";

/** The header band while its page loads: breadcrumb, then the title line. */
export function PageHeaderSkeleton() {
  return (
    <header className={styles.band}>
      <div className="container">
        <Skeleton width={190} height={13} />
        <Skeleton className={styles.title} width="min(420px, 80%)" height={30} />
      </div>
    </header>
  );
}
