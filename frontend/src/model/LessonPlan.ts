import type { EssayError } from "./EssayError";

export type LessonPlan = {
  lessonPlanId: string;
  userId: string;
  summary: string;
  essayContent: string;
  essayErrors: EssayError[];
};
