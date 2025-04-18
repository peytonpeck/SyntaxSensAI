import { Api } from "@/api";
import { queryOptions } from "@tanstack/react-query";

export const specificLessonPlanQueryOptionsKey = "specificLessonPlan";

export function specificLessonPlanQueryOptions(lessonPlanId: string) {
  return queryOptions({
    queryKey: [specificLessonPlanQueryOptionsKey, lessonPlanId],
    queryFn: async ({ queryKey }) => {
      const result = await Api.LessonPlan.getLessonPlans(queryKey[1]);
      return result[0];
    },
    enabled: !!lessonPlanId,
  });
}
