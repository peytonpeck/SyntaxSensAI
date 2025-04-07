import type { FC } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import { Home } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Lesson } from "@/model/Lesson";

const items = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: Home,
  },
];
export const AppSidebar: FC = () => {
  const lessons: Lesson[] = [];

  return (
    <Sidebar>
      <SidebarHeader className="font-bold text-2xl">
        <span>
          Syntax Sens<span className="text-red-500">AI</span>
        </span>
        {<SidebarTrigger className="absolute top-0 right-0" />}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Lessons</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {lessons.map((lesson) => (
                <SidebarMenuItem key={lesson.id}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <span>{lesson.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
