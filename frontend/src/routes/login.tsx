import { LoginForm } from "@/components/LoginForm";
import { UnauthenticatedLayout } from "@/components/landing/UnauthenticatedLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UnauthenticatedLayout>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </UnauthenticatedLayout>
  );
}
