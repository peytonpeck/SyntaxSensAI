import type { FC, ReactNode } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { ProfilePhoto } from "./ProfilePhoto";

type Props = {
  title: ReactNode;
};

export const AppContent: FC<Props> = ({ title }) => (
  <header className="flex h-16 w-full">
    <div>
      <SidebarTrigger />
      {title}
    </div>
    <ProfilePhoto />
  </header>
);
