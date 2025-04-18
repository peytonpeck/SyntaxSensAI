import type { LessonPlan } from "@/model/LessonPlan";
import type { FC } from "react";

type Props = {
  lessonPlan: LessonPlan;
};

export const LessonPlanCard: FC<Props> = ({ lessonPlan }) => (
  <div className="bg-accent border-border border-1 rounded-[var(--radius-sm)] p-2">
    <header className="text-xl font-medium">{lessonPlan.summary}</header>
    <p>{lessonPlan.essayContent}</p>
  </div>
);
