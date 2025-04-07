import { useAccountQuery } from "@/hooks/useAccountQuery";
import { CircleUserRound } from "lucide-react";
import type { FC } from "react";

export const ProfilePhoto: FC = () => {
  const { data } = useAccountQuery();

  return (
    <div className="w-10 h-10">
      <CircleUserRound
        className="w-full h-full text-gray-800"
        strokeWidth={1}
      />
    </div>
  );
};
