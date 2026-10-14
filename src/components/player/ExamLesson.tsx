"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Icon } from "@/components/ui/Icon";
import type { Exam } from "@/types/course";
import styles from "./ExamLesson.module.css";

const ExamModal = dynamic(() =>
  import("@/components/modals/ExamModal").then((m) => m.ExamModal),
);

/** An exam lesson keeps the poster frame and starts the exam in the modal. */
export function ExamLesson({ exam }: { exam: Exam }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image
        src="/images/lesson-poster.webp"
        alt=""
        width={1280}
        height={720}
        sizes="(max-width: 1023px) 100vw, 65vw"
        priority
      />
      <button type="button" className={styles.start} onClick={() => setOpen(true)}>
        <Icon name="trophy" size={28} />
        Start the exam
        <span className={styles.meta}>
          {exam.questions.length} questions · {Math.round(exam.timeLimit / 60)} min
        </span>
      </button>

      <ExamModal open={open} onClose={() => setOpen(false)} exam={exam} />
    </>
  );
}
