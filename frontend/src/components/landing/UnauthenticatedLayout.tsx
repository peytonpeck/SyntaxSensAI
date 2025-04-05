import type { FC, PropsWithChildren } from "react";
import { LandingNavbar } from "./LandingNavbar";

export const UnauthenticatedLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <LandingNavbar />
    <main className="flex justify-center pt-20">{children}</main>
  </>
);
