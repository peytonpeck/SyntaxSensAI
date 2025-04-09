import { AppContent } from "@/components/AppContent";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

  return (
    <AppContent title={lesson.summary}>
      <Label htmlFor="essayContent">Essay</Label>
      <Textarea
        className="mt-2 min-h-24 h-48 max-h-fit"
        id="essayContent"
        readOnly={true}
        value={lesson.essayContent}
      />
    </AppContent>
  );
}
