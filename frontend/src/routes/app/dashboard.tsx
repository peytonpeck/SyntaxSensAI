import { AppContent } from "@/components/AppContent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return <AppContent title="Dashboard"></AppContent>;
}
