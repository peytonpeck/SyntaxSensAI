import { AppContent } from "@/components/AppContent";
import { queryClient } from "@/main";
import { specificLessonPlanQueryOptions } from "@/queryOptions/specificLessonPlanQueryOptions";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/app/lessons/$lessonPlanId/")({
  loader: ({ params }) =>
    queryClient.ensureQueryData(
      specificLessonPlanQueryOptions(params.lessonPlanId)
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const lesson = useLoaderData({ from: "/app/lessons/$lessonPlanId/" });

  return <AppContent title={lesson.summary}></AppContent>;
}
