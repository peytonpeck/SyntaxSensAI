import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { accountQueryOptions } from "@/queryOptions/accountQueryOptions";
import { queryClient } from "@/main";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/lib/constants";

export const Route = createFileRoute("/app")({
  component: App,
  beforeLoad: async ({ location }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (!token) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }

    try {
      await queryClient.ensureQueryData(accountQueryOptions(token));
    } catch (err) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
