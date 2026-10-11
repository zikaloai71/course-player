import Link from "next/link";
import styles from "./PageHeader.module.css";

export type Crumb = { label: string; href?: string };

export function PageHeader({ crumbs, title }: { crumbs: Crumb[]; title: string }) {
  return (
    <header className={styles.band}>
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className={styles.crumbs}>
            {crumbs.map((crumb, i) => (
              <li key={crumb.label}>
                {i > 0 && (
                  <span className={styles.sep} aria-hidden="true">
                    &rsaquo;
                  </span>
                )}
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span className={styles.current} aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </header>
  );
}
