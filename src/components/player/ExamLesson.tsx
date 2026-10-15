"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Exam } from "@/types/course";
import { LessonPoster } from "./LessonPoster";

const ExamModal = dynamic(() =>
  import("@/components/modals/ExamModal").then((m) => m.ExamModal),
);

/** An exam lesson keeps the poster frame and starts the exam in the modal. */
export function ExamLesson({ exam }: { exam: Exam }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LessonPoster
        action={{
          icon: "trophy",
          label: "Start the exam",
          meta: `${exam.questions.length} questions · ${Math.round(exam.timeLimit / 60)} min`,
          onClick: () => setOpen(true),
        }}
      />
      <ExamModal open={open} onClose={() => setOpen(false)} exam={exam} />
    </>
  );
}
