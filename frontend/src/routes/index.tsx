import { UnauthenticatedLayout } from "@/components/landing/UnauthenticatedLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return <UnauthenticatedLayout></UnauthenticatedLayout>;
}
