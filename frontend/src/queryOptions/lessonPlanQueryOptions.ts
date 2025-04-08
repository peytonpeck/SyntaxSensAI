import { Api } from "@/api";
import { queryOptions } from "@tanstack/react-query";

export const lessonPlanQueryOptionsKey = "lessonPlan";

export function lessonPlanQueryOptions() {
  return queryOptions({
    queryKey: [lessonPlanQueryOptionsKey],
    queryFn: () => Api.LessonPlan.getLessonPlans(),
  });
}
