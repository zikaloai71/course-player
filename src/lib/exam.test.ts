import { test } from "node:test";
import assert from "node:assert/strict";
import { isCorrect, score } from "./exam";
import { clock } from "./time";
import type { Exam } from "@/types/course";

const exam: Exam = {
  id: "e1",
  title: "Exam",
  timeLimit: 600,
  questions: [
    { id: "q1", text: "", options: ["a", "b"], answer: 1 },
    { id: "q2", text: "", options: ["a", "b"], answer: 0 },
    { id: "q3", text: "", options: ["a", "b"], answer: 1 },
  ],
};

test("only the right option scores", () => {
  assert.equal(score(exam, { q1: 1, q2: 1, q3: 1 }), 2);
});

test("an unanswered question is not a right answer", () => {
  assert.equal(score(exam, {}), 0);
  // Option 0 is right for q2, so a missing q1 must not read as answer 0.
  assert.equal(score(exam, { q2: 0 }), 1);
});

test("isCorrect ignores a question the exam does not have", () => {
  assert.equal(isCorrect(exam, { q1: 1 }, "q1"), true);
  assert.equal(isCorrect(exam, { q1: 0 }, "q1"), false);
  assert.equal(isCorrect(exam, { nope: 0 }, "nope"), false);
});

test("the clock pads seconds and never goes negative", () => {
  assert.equal(clock(600), "10:00");
  assert.equal(clock(65), "1:05");
  assert.equal(clock(9.7), "0:09");
  assert.equal(clock(-5), "0:00");
});
