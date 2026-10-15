import type { Exam } from "@/types/course";

/** Index of the chosen option, by question id. */
export type Answers = Record<string, number>;

/** How many questions the student got right. */
export function score(exam: Exam, answers: Answers): number {
  return exam.questions.filter((q) => answers[q.id] === q.answer).length;
}

export function isCorrect(exam: Exam, answers: Answers, questionId: string): boolean {
  const question = exam.questions.find((q) => q.id === questionId);
  return !!question && answers[questionId] === question.answer;
}
