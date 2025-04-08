import { AppContent } from "@/components/AppContent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/lessons/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AppContent title="Lesson Plans"></AppContent>;
}
