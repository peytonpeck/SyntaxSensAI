import { AppContent } from "@/components/AppContent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AppContent title="Home"></AppContent>;
}
