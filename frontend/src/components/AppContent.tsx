import type { FC, PropsWithChildren, ReactNode } from "react";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { ProfilePhoto } from "./ProfilePhoto";
import { useQueryClient } from "@tanstack/react-query";
import { accountQueryOptionsKey } from "@/queryOptions/accountQueryOptions";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/lib/constants";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CreditCard, LogOut, Settings } from "lucide-react";
import { DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const links = [
  {
    to: "/app/settings",
    text: "Settings",
    icon: Settings,
  },
  {
    to: "/app/settings/subscriptions",
    text: "Subscriptions",
    icon: CreditCard,
  },
];

type Props = React.ComponentProps<"main"> & {
  title: ReactNode;
};

export const AppContent: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  className,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const sidebar = useSidebar();

  const handleLogoutClick = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    queryClient.setQueryData([accountQueryOptionsKey], undefined);
    navigate({ to: "/" });
  };

  return (
    <div className="h-[100vh] flex flex-col">
      <header className="flex p-2 w-full items-center justify-between border-b-sidebar-border border-b-1">
        <div>
          {isMobile || (!sidebar.open && <SidebarTrigger />)}
          <span className="ml-1 text-2xl">{title}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ProfilePhoto />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background w-56 border-border border-1 px-1 rounded-[var(--radius-sm)]">
            <DropdownMenuLabel className="pt-2 pb-1">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {links.map((link) => (
                <DropdownMenuItem className="hover:outline-0" key={link.text}>
                  <Link
                    to={link.to}
                    className="font-bol flex text-sm items-center cursor-pointer hover:bg-accent p-1 rounded-[var(--radius-sm)]"
                  >
                    <link.icon className="w-4" />
                    <span className="ml-2">{link.text}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="pb-1">
              <DropdownMenuItem
                onClick={handleLogoutClick}
                className=" text-red-700 flex text-sm items-center cursor-pointer hover:bg-accent hover:outline-0 p-1 rounded-[var(--radius-sm)]"
              >
                <LogOut className="w-4" />
                <span className="ml-2">Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main
        className={cn("p-4", className, {
          "w-[100vw]": isMobile || !sidebar.open,
          "w-[calc(100vw-16rem)]": !isMobile && sidebar.open,
        })}
      >
        {children}
      </main>
    </div>
  );
};
