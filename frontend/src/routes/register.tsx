import { UnauthenticatedLayout } from "@/components/landing/UnauthenticatedLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  return (
    <UnauthenticatedLayout>
      <div className="w-full max-w-sm"></div>
    </UnauthenticatedLayout>
  );
}
