import { toast } from "sonner";
import { Api } from "@/api";
import { AppContent } from "@/components/AppContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { queryClient } from "@/main";
import { accountQueryOptions } from "@/queryOptions/accountQueryOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useLoaderData,
  useNavigate,
} from "@tanstack/react-router";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { lessonPlanQueryOptionsKey } from "@/queryOptions/lessonPlanQueryOptions";

export const Route = createFileRoute("/app/lessons/new/")({
  component: RouteComponent,
  loader: () => queryClient.ensureQueryData(accountQueryOptions()),
});

function RouteComponent() {
  const navigate = useNavigate();
  const [essay, setEssay] = useState<string>("");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: Api.LessonPlan.createLessonPlan,
    onSuccess: (lessonPlan) => {
      queryClient.setQueryData([lessonPlanQueryOptionsKey], undefined);
      navigate({ to: `/app/lessons/${lessonPlan.lessonPlanId}` });
    },
    onError: ({ name, message }) => {
      toast(name, {
        description: message,
      });
    },
  });
  const user = useLoaderData({ from: "/app/lessons/new/" });

  const handleClearTextButtonClick = () => {
    setEssay("");
  };

  const handleCreateLesson = () => {
    if (!essay || essay.length < 20) {
      return;
    }

    mutate({
      essayContent: essay,
    });
  };

  return (
    <AppContent
      title="Create New Lesson Plan"
      className="flex justify-center items-center flex-col flex-1 w-full"
    >
      <div className="max-w-[48rem] w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 ">
          Welcome to Syntax SensAI
        </h1>
        <div className="flex items-center flex-col text-gray-500 ">
          <h2 className="text-l mt-4">What sort of things can I help with?</h2>
          <p className="text-sm">
            <ul className="list-disc pl-10">
              <li>Helping you with your grammar</li>
              <li>Finding syntax errors in your writing</li>
              <li>Generating lesson plans to help you learn</li>
            </ul>
          </p>
        </div>
        <Textarea
          className="min-h-30 max-h-[calc(100vh-12rem)] resize-none w-full mt-10 bg-white"
          placeholder="Type your essay here."
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
        />
        <div className="w-full text-left text-sm text-gray-500 flex flex-row justify-between">
          <span>
            {essay.length} / {user?.characterCredits}
          </span>
          {essay.length > user.characterCredits && (
            <span className="text-red-700">
              {" "}
              You do not have enough credits.{" "}
              <Link to="/app/settings/subscriptions" className="underline">
                View Subscription
              </Link>
            </span>
          )}
        </div>
        <div className="flex justify-between pt-2 w-full">
          <Button
            variant="outline"
            onClick={handleClearTextButtonClick}
            disabled={isPending}
          >
            <X /> Clear Text
          </Button>
          <Button
            disabled={
              isPending ||
              essay.length < 20 ||
              user.characterCredits < essay.length
            }
            onClick={handleCreateLesson}
          >
            {isPending ? <Loader2 /> : <Plus />} Create Lesson
          </Button>
        </div>
      </div>
    </AppContent>
  );
}
