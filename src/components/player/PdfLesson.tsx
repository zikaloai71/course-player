"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LessonPoster } from "./LessonPoster";

const PdfModal = dynamic(() =>
  import("@/components/modals/PdfModal").then((m) => m.PdfModal),
);

/** A PDF lesson keeps the poster frame and opens the file in the modal. */
export function PdfLesson({ title, url }: { title: string; url: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LessonPoster
        action={{ icon: "file", label: "Open the PDF", onClick: () => setOpen(true) }}
      />
      <PdfModal open={open} onClose={() => setOpen(false)} title={title} url={url} />
    </>
  );
}
