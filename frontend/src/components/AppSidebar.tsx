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
import { ArrowRight, GraduationCap, Home, Loader, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { lessonPlanQueryOptions } from "@/queryOptions/lessonPlanQueryOptions";
import { Skeleton } from "./ui/skeleton";
import syntaxSensaiLogo from "../assets/syntaxsensailogo.png";

const items = [
  {
    title: "New Lesson",
    url: "/app/lessons/new",
    icon: Plus,
  },
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: Home,
  },
  {
    title: "Lessons",
    url: "/app/lessons",
    icon: GraduationCap,
  },
];
export const AppSidebar: FC = () => {
  const { data: lessons, isPending: isLoadingLessons } = useQuery(
    lessonPlanQueryOptions()
  );

  return (
    <Sidebar>
      <SidebarHeader className="font-bold text-2xl flex justify-center items-center w-full">
        <img className="w-50" src={syntaxSensaiLogo}></img>
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
          {(!lessons || lessons.length > 0) && (
            <SidebarGroupLabel>Past Lessons</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {(!lessons || isLoadingLessons) && (
                <>
                  <Skeleton className="h-4 w-40 ml-2" />
                  <Skeleton className="h-4 w-36 ml-2" />
                  <Skeleton className="h-4 w-38 ml-2" />
                  <Skeleton className="h-4 w-42 ml-2" />
                  <Skeleton className="h-4 w-34 ml-2" />
                </>
              )}
              {lessons &&
                lessons
                  .map((lesson) => ({
                    ...lesson,
                    url: `/app/lessons/${lesson.lessonPlanId}`,
                  }))
                  .map((lesson) => (
                    <SidebarMenuItem key={lesson.lessonPlanId}>
                      <SidebarMenuButton asChild>
                        <Link to={lesson.url} className="flex justify-between">
                          <span className="h-5 w-full text-ellipsis overflow-hidden">
                            {lesson.summary}
                          </span>
                          <ArrowRight />
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
