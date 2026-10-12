"use client";

import { useState } from "react";
import type { Comment } from "@/types/course";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import styles from "./CommentSection.module.css";

export function CommentSection({
  courseSlug,
  comments,
}: {
  courseSlug: string;
  comments: Comment[];
}) {
  const [list, setList] = useState(comments);

  // New comments live in this page view only: there is no backend to post to.
  function add(text: string) {
    setList((current) => [
      {
        id: `local-${Date.now()}`,
        courseSlug,
        author: "You",
        avatar: "/images/avatars/a6.webp",
        // en-CA gives YYYY-MM-DD for the local day, not the UTC one.
        date: new Date().toLocaleDateString("en-CA"),
        text,
      },
      ...current,
    ]);
  }

  return (
    <>
      <ul className={styles.list}>
        {list.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
      <CommentForm onAdd={add} />
    </>
  );
}
