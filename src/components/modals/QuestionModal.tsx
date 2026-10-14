"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import styles from "./QuestionModal.module.css";

/** One draft per course, kept for the browser session only. */
function draftKey(courseSlug: string) {
  return `question-draft:${courseSlug}`;
}

export function QuestionModal({
  open,
  onClose,
  courseSlug,
  lessonTitle,
}: {
  open: boolean;
  onClose: () => void;
  courseSlug: string;
  lessonTitle: string;
}) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  // The draft is read on open, so closing the modal and coming back — even
  // after switching lessons — keeps what the student had typed.
  useEffect(() => {
    if (open) setText(sessionStorage.getItem(draftKey(courseSlug)) ?? "");
  }, [open, courseSlug]);

  function edit(value: string) {
    setText(value);
    sessionStorage.setItem(draftKey(courseSlug), value);
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    // There is no backend yet: the question is acknowledged and the draft goes.
    sessionStorage.removeItem(draftKey(courseSlug));
    setText("");
    setSent(true);
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setSent(false);
        onClose();
      }}
      title="Ask a Question"
    >
      {sent ? (
        <p className={styles.sent}>
          <strong>Your question is on its way.</strong>
          Eng. Ali Shaheen answers questions within a day.
        </p>
      ) : (
        <form className={styles.form} onSubmit={send}>
          <p className={styles.lesson}>About: {lessonTitle}</p>
          <textarea
            /* The field is what the student came for; <dialog> would otherwise
               open with the close button focused. */
            autoFocus
            className={styles.field}
            value={text}
            onChange={(e) => edit(e.target.value)}
            placeholder="What is not clear yet?"
            aria-label="Your question"
            required
          />
          <div className={styles.actions}>
            <span className={styles.hint}>Saved as a draft while you are here.</span>
            <button type="submit" className={styles.send} disabled={!text.trim()}>
              Send
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
