import { test } from "node:test";
import assert from "node:assert/strict";
import { courseProgress, courseStatus, isLessonOpen, nextLesson } from "./progress";
import type { Course, Lesson } from "@/types/course";

function lesson(id: string, extra: Partial<Lesson> = {}): Lesson {
  return {
    id,
    title: id,
    type: "video",
    duration: 10,
    questionsCount: 0,
    locked: false,
    completed: false,
    ...extra,
  };
}

function course(lessons: Lesson[]): Course {
  return {
    id: "c",
    slug: "c",
    title: "Course",
    instructor: "Instructor",
    shortDescription: "",
    image: "",
    materials: { durationHours: 1, enrolled: 0, language: "English" },
    weeks: [{ id: "w1", title: "Week 1", description: "", lessons }],
  };
}

test("progress is the share of finished lessons, rounded", () => {
  const c = course([lesson("a", { completed: true }), lesson("b"), lesson("c")]);
  assert.equal(courseProgress(c), 33);
});

test("progress reads the live set when one is passed", () => {
  const c = course([lesson("a", { completed: true }), lesson("b")]);
  assert.equal(courseProgress(c, new Set(["a", "b"])), 100);
  assert.equal(courseProgress(c, new Set()), 0);
});

test("a course with no lessons is not a division by zero", () => {
  assert.equal(courseProgress(course([])), 0);
});

test("status follows the ends of the range, not just the middle", () => {
  assert.equal(courseStatus(0), "not-started");
  assert.equal(courseStatus(1), "in-progress");
  assert.equal(courseStatus(99), "in-progress");
  assert.equal(courseStatus(100), "completed");
});

test("the next lesson is the first unfinished one", () => {
  const c = course([
    lesson("a", { completed: true }),
    lesson("b", { completed: true }),
    lesson("c"),
  ]);
  assert.equal(nextLesson(c).id, "c");
});

test("a finished course falls back to its first lesson", () => {
  const c = course([lesson("a", { completed: true })]);
  assert.equal(nextLesson(c).id, "a");
});

test("a locked lesson opens once everything before it is done", () => {
  const locked = lesson("c", { locked: true });
  const c = course([lesson("a"), lesson("b"), locked]);

  assert.equal(isLessonOpen(c, locked, new Set(["a"])), false);
  assert.equal(isLessonOpen(c, locked, new Set(["a", "b"])), true);
  assert.equal(isLessonOpen(c, c.weeks[0].lessons[0], new Set()), true);
});
