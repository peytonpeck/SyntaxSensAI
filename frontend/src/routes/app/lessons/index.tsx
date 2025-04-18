import { AppContent } from "@/components/AppContent";
import { LessonPlanCard } from "@/components/LessonPlanCard";
import { queryClient } from "@/main";
import { lessonPlanQueryOptions } from "@/queryOptions/lessonPlanQueryOptions";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/app/lessons/")({
  component: RouteComponent,
  loader: () => queryClient.ensureQueryData(lessonPlanQueryOptions()),
});

function RouteComponent() {
  const lessonPlans = useLoaderData({ from: "/app/lessons/" });
  return (
    <AppContent title="Lesson Plans">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-2">
        {lessonPlans.map((lp) => (
          <LessonPlanCard lessonPlan={lp} key={lp.lessonPlanId} />
        ))}
      </div>
    </AppContent>
  );
}
