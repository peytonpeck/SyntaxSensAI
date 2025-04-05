import type { FC } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Link } from "@tanstack/react-router";

export const LandingNavbar: FC = () => (
  <header className="sticky flex items-center h-[3rem] border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/login">Login</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
);
