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
 * The icon row under the player. Jumps are plain anchors, so the browser does
 * the smooth scrolling (and skips it for anyone who asked for less motion).
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
          <a className={styles.item} href="#topics-heading">
            <Icon name="lessons" size={18} />
            Curriculum
          </a>
        </li>
        <li>
          <a className={styles.item} href="#comments-heading">
            <Icon name="comment" size={18} />
            Comments
          </a>
        </li>
        <li>
          <button type="button" className={styles.item} onClick={() => setAsking(true)}>
            <Icon name="question" size={18} />
            Ask a Question
          </button>
        </li>
        <li>
          <button type="button" className={styles.item} onClick={() => setRanking(true)}>
            <Icon name="trophy" size={18} />
            Leaderboard
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
