import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./SectionNav.module.css";

type Jump = { icon: IconName; label: string; href: string };

/**
 * The icon row under the player. Jumps are plain anchors, so the browser does
 * the smooth scrolling (and skips it for anyone who asked for less motion);
 * the modal actions join this row in the next tasks.
 */
const JUMPS: Jump[] = [
  { icon: "lessons", label: "Curriculum", href: "#topics-heading" },
  { icon: "comment", label: "Comments", href: "#comments-heading" },
];

export function SectionNav() {
  return (
    <nav className={styles.nav} aria-label="Jump to a section">
      <ul className={styles.items}>
        {JUMPS.map((jump) => (
          <li key={jump.label}>
            <a className={styles.item} href={jump.href}>
              <Icon name={jump.icon} size={18} />
              {jump.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
