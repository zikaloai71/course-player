import Image from "next/image";
import type { Comment } from "@/types/course";
import styles from "./CommentItem.module.css";

/** UTC so the server and the browser format the same day. */
const DATE = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <li className={styles.item}>
      <Image
        className={styles.avatar}
        src={comment.avatar}
        alt=""
        width={48}
        height={48}
      />
      <div>
        <p className={styles.author}>{comment.author}</p>
        <p className={styles.date}>
          <time dateTime={comment.date}>{DATE.format(new Date(comment.date))}</time>
        </p>
        <p className={styles.text}>{comment.text}</p>
      </div>
    </li>
  );
}
