"use client";

import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

/**
 * One modal for the whole app, built on <dialog>.showModal(): the browser
 * already gives us the backdrop, the focus trap, the inert page behind and Esc
 * to close, so none of that is written here.
 */
export function Modal({ open, onClose, title, children }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = `${title.replace(/\W+/g, "-").toLowerCase()}-title`;

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby={titleId}
      // Esc and the backdrop both end in the element's own close event.
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      <div className={styles.head}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <button
          type="button"
          className={styles.close}
          onClick={() => dialog.current?.close()}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      <div className={styles.body}>{children}</div>
    </dialog>
  );
}
