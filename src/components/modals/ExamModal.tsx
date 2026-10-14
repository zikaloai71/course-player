"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { clock } from "@/lib/time";
import type { Exam } from "@/types/course";
import styles from "./ExamModal.module.css";

/** Index of the chosen option, by question id. */
type Answers = Record<string, number>;

/** What an interrupted exam leaves behind for the next visit. */
type Saved = {
  answers: Answers;
  index: number;
  left: number;
  handedIn: boolean;
};

function score(exam: Exam, answers: Answers): number {
  return exam.questions.filter((q) => answers[q.id] === q.answer).length;
}

export function ExamModal({
  open,
  onClose,
  exam,
}: {
  open: boolean;
  onClose: () => void;
  exam: Exam;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [left, setLeft] = useState(exam.timeLimit);
  const [handedIn, setHandedIn] = useState(false);
  const key = `exam:${exam.id}`;

  // Reading on open rather than on mount keeps the server markup untouched and
  // picks up a paper left behind in an earlier visit.
  useEffect(() => {
    if (!open) return;
    const raw = localStorage.getItem(key);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as Saved;
      setAnswers(saved.answers);
      setIndex(saved.index);
      setLeft(saved.left);
      setHandedIn(saved.handedIn);
    } catch {
      // A broken entry is not worth a crash: start the exam fresh instead.
      localStorage.removeItem(key);
    }
  }, [open, key]);

  // ponytail: one write per answer and per tick. The payload is a few hundred
  // bytes, so there is nothing to debounce yet.
  useEffect(() => {
    if (!open) return;
    const saved: Saved = { answers, index, left, handedIn };
    localStorage.setItem(key, JSON.stringify(saved));
  }, [open, key, answers, index, left, handedIn]);

  function restart() {
    localStorage.removeItem(key);
    setAnswers({});
    setIndex(0);
    setLeft(exam.timeLimit);
    setHandedIn(false);
  }

  // One timeout per second rather than an interval, so the countdown cannot run
  // on behind a closed modal and cannot drift past zero.
  useEffect(() => {
    if (!open || handedIn) return;
    if (left <= 0) {
      setHandedIn(true);
      return;
    }
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [open, handedIn, left]);

  const question = exam.questions[index];
  const answered = Object.keys(answers).length;
  const last = index === exam.questions.length - 1;

  return (
    <Modal open={open} onClose={onClose} title={exam.title}>
      {handedIn ? (
        <div className={styles.result}>
          <p className={styles.score}>
            {score(exam, answers)} / {exam.questions.length}
          </p>
          <p>
            {left <= 0
              ? "Time is up — this is what you had answered."
              : "Exam handed in."}
          </p>
          <button type="button" className={styles.again} onClick={restart}>
            Take it again
          </button>
          <ol className={styles.review}>
            {exam.questions.map((q, i) => {
              const right = answers[q.id] === q.answer;
              return (
                <li key={q.id} className={right ? styles.right : styles.wrong}>
                  <span className={styles.reviewNumber}>{i + 1}</span>
                  <span>{q.text}</span>
                  <span className={styles.reviewMark}>{right ? "✓" : "✗"}</span>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <div className={styles.exam}>
          <div className={styles.status}>
            <span>
              Question {index + 1} of {exam.questions.length}
            </span>
            {/* The countdown is read out as it changes, politely. */}
            <span
              className={`${styles.timer} ${left <= 60 ? styles.urgent : ""}`}
              role="timer"
              aria-live="polite"
            >
              {clock(left)}
            </span>
          </div>

          <p className={styles.question}>{question.text}</p>

          <fieldset className={styles.options}>
            <legend className="visually-hidden">{question.text}</legend>
            {question.options.map((option, i) => (
              <label key={option} className={styles.option}>
                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === i}
                  onChange={() => setAnswers((a) => ({ ...a, [question.id]: i }))}
                />
                {option}
              </label>
            ))}
          </fieldset>

          <div className={styles.nav}>
            <button
              type="button"
              className={styles.step}
              onClick={() => setIndex((i) => i - 1)}
              disabled={index === 0}
            >
              Back
            </button>

            <ol className={styles.dots}>
              {exam.questions.map((q, i) => (
                <li key={q.id}>
                  <button
                    type="button"
                    className={`${styles.dot} ${i === index ? styles.here : ""} ${
                      answers[q.id] === undefined ? "" : styles.filled
                    }`}
                    onClick={() => setIndex(i)}
                    aria-label={`Question ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ol>

            {last ? (
              <button
                type="button"
                className={styles.hand}
                onClick={() => setHandedIn(true)}
                disabled={answered === 0}
              >
                Hand in
              </button>
            ) : (
              <button
                type="button"
                className={styles.step}
                onClick={() => setIndex((i) => i + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
