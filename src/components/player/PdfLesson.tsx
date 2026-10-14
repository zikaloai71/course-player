"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Icon } from "@/components/ui/Icon";
import styles from "./PdfLesson.module.css";

const PdfModal = dynamic(() =>
  import("@/components/modals/PdfModal").then((m) => m.PdfModal),
);

/** A PDF lesson keeps the poster frame and opens the file in the modal. */
export function PdfLesson({ title, url }: { title: string; url: string }) {
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
      <button type="button" className={styles.open} onClick={() => setOpen(true)}>
        <Icon name="file" size={18} />
        Open the PDF
      </button>

      <PdfModal open={open} onClose={() => setOpen(false)} title={title} url={url} />
    </>
  );
}
