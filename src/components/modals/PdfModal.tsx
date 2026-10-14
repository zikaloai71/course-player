"use client";

import { Modal } from "@/components/ui/Modal";
import styles from "./PdfModal.module.css";

/**
 * The browser's own PDF viewer does the work. Phones that have none fall back
 * to the link inside <object>, which hands the file to their reader app.
 */
export function PdfModal({
  open,
  onClose,
  title,
  url,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  url: string;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <object className={styles.viewer} data={url} type="application/pdf">
        <p className={styles.fallback}>
          This browser cannot show the PDF here.{" "}
          <a href={url} target="_blank" rel="noopener">
            Open it in a new tab
          </a>
          .
        </p>
      </object>
    </Modal>
  );
}
