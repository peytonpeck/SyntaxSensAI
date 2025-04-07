import { AppContent } from "@/components/AppContent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AppContent title="Settings"></AppContent>;
}
