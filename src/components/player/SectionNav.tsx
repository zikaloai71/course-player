"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@/components/ui/Icon";
import type { LeaderboardEntry } from "@/types/course";
import styles from "./SectionNav.module.css";

// The modals are only reached from this row, so they stay out of the page
// bundle until something here is clicked.
const QuestionModal = dynamic(() =>
  import("@/components/modals/QuestionModal").then((m) => m.QuestionModal),
);

const LeaderboardModal = dynamic(() =>
  import("@/components/modals/LeaderboardModal").then((m) => m.LeaderboardModal),
);

/**
 * The icon row under the player, in the place the design keeps its social
 * icons. Jumps are plain anchors, so the browser does the smooth scrolling
 * (and skips it for anyone who asked for less motion); the two modals open
 * from buttons. Each icon carries its name for screen readers and as the
 * native tooltip.
 */
export function SectionNav({
  courseSlug,
  lessonTitle,
  leaderboard,
  progress,
}: {
  courseSlug: string;
  lessonTitle: string;
  leaderboard: LeaderboardEntry[];
  /** Course completion, 0-100, for the coach message. */
  progress: number;
}) {
  const [asking, setAsking] = useState(false);
  const [ranking, setRanking] = useState(false);

  return (
    <nav className={styles.nav} aria-label="Jump to a section">
      <ul className={styles.items}>
        <li>
          <a className={styles.item} href="#topics-heading" title="Curriculum">
            <Icon name="lessons" size={18} />
            <span className="visually-hidden">Curriculum</span>
          </a>
        </li>
        <li>
          <a className={styles.item} href="#comments-heading" title="Comments">
            <Icon name="comment" size={18} />
            <span className="visually-hidden">Comments</span>
          </a>
        </li>
        <li>
          <button
            type="button"
            className={styles.item}
            onClick={() => setAsking(true)}
            title="Ask a Question"
          >
            <Icon name="question" size={18} />
            <span className="visually-hidden">Ask a Question</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.item}
            onClick={() => setRanking(true)}
            title="Leaderboard"
          >
            <Icon name="trophy" size={18} />
            <span className="visually-hidden">Leaderboard</span>
          </button>
        </li>
      </ul>

      <QuestionModal
        open={asking}
        onClose={() => setAsking(false)}
        courseSlug={courseSlug}
        lessonTitle={lessonTitle}
      />

      <LeaderboardModal
        open={ranking}
        onClose={() => setRanking(false)}
        entries={leaderboard}
        progress={progress}
      />
    </nav>
  );
}
