import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      ProfilePhoto
      <Outlet />
    </div>
  );
}
