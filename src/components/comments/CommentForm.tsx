"use client";

import { useState } from "react";
import styles from "./CommentForm.module.css";

export function CommentForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState("");
  const empty = text.trim() === "";

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (empty) return;
        onAdd(text.trim());
        setText("");
      }}
    >
      <label className="visually-hidden" htmlFor="comment-text">
        Write a comment
      </label>
      <textarea
        id="comment-text"
        className={styles.field}
        placeholder="Write a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className={styles.submit} disabled={empty}>
        Submit Review <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
