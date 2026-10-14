"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { getCoachMessage } from "@/data/coachMessages";
import type { LeaderboardEntry } from "@/types/course";
import styles from "./LeaderboardModal.module.css";

/** Share of the other students on the board the learner is ahead of, 0-100. */
function beatPercent(entries: LeaderboardEntry[]): number {
  const you = entries.find((e) => e.isYou);
  if (!you || entries.length < 2) return 0;
  return ((entries.length - you.rank) / (entries.length - 1)) * 100;
}

export function LeaderboardModal({
  open,
  onClose,
  entries,
  progress,
}: {
  open: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
  /** Course completion, 0-100: picks which coach message appears. */
  progress: number;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Leaderboard">
      {/* Eng. Ali Shaheen speaks Egyptian Arabic, so this block is right to left. */}
      <p className={styles.coach} dir="rtl" lang="ar">
        {getCoachMessage(progress, beatPercent(entries))}
      </p>

      <ol className={styles.board}>
        {entries.map((entry) => (
          <li
            key={entry.rank}
            className={`${styles.row} ${entry.isYou ? styles.you : ""}`}
            aria-current={entry.isYou ? "true" : undefined}
          >
            <span className={styles.rank}>{entry.rank}</span>
            <Image
              className={styles.avatar}
              src={entry.avatar}
              alt=""
              width={36}
              height={36}
            />
            <span className={styles.name}>{entry.name}</span>
            <span className={styles.points}>{entry.points.toLocaleString()} pts</span>
          </li>
        ))}
      </ol>
    </Modal>
  );
}
