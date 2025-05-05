import type { Lesson } from "./Lesson";

export type EssayError = {
  essayErrorId: string;
  lessonPlanId: string;
  type: "grammar" | "spelling" | "style";
  issue: string;
  correction: string;
  start: number;
  end: number;
  lesson: Lesson;
};
