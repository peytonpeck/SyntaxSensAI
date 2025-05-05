import type { LessonQuestion } from "./LessonQuestion";

export type Lesson = {
  lessonId: string;
  lessonPlanId: string;
  name: string;
  explanation: string;
  questions: LessonQuestion[];
};
