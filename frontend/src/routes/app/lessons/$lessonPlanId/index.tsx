import { AppContent } from "@/components/AppContent";
import { ErrorSidebar } from "@/components/learning/ErrorSidebar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { queryClient } from "@/main";
import type { EssayError } from "@/model/EssayError";
import type { LessonPlan } from "@/model/LessonPlan";
import { specificLessonPlanQueryOptions } from "@/queryOptions/specificLessonPlanQueryOptions";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { CheckIcon } from "lucide-react";
import React, { useMemo, useState, type ReactNode } from "react";

export const Route = createFileRoute("/app/lessons/$lessonPlanId/")({
  loader: ({ params }) =>
    queryClient.ensureQueryData(
      specificLessonPlanQueryOptions(params.lessonPlanId)
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedError, setSelectedError] = useState<EssayError | undefined>();
  const lessonPlan: LessonPlan = {
    ...useLoaderData({ from: "/app/lessons/$lessonPlanId/" }),
    essayContent:
      "The quick brown fox jump over the lazy dog. It are fast. The phrase “The quick brown fox jumps over the lazy dog” is known to many as a pangram—a sentence that contains every letter of the English alphabet at least once. While its original use is primarily typographic, training typewriters and testing fonts, it holds an unexpected charm. Let us imagine that sentence not as a linguistic tool but as the beginning of a whimsical tale, full of energy, contrast, and personality.\nThe story begins with a fox—quick, brown, alert. Its very description paints a vivid picture of motion and agility. The fox is not just fast in body but also in spirit, curious about its surroundings and eager to leap past obstacles. In contrast, the lazy dog rests nearby, unmoved, perhaps uninterested in the world around it. The two characters are symbolic of two different approaches to life: one active and impulsive, the other calm and passive.\nThe fox jumps. Not simply runs, walks, or creeps—but jumps. There is something decisive and determined in this action. It doesn’t wait for a path to open or for permission. It springs forward and upward, both literally and metaphorically. The lazy dog may be an obstacle or merely a witness, but either way, it represents a moment of choice: to rest or to leap.\nIn the whimsical continuation of this idea, one might say, “It is fast.” Though a grammatical error appears in “It are fast,” the sentiment is still clear: the fox is swift—perhaps faster than expected. But speed here is not merely about movement. It also implies wit, reaction, and adaptability. In a world full of passive obstacles and daily routines, the fox embodies a refusal to slow down or settle. It reacts quickly, thinks quickly, and acts without hesitation.\nAnd what of the dog? Is it truly lazy, or simply content? In many stories, dogs symbolize loyalty, stability, and domestic comfort. Perhaps the dog isn’t lazy in a negative sense—it could be a foil to the fox, representing rest and peace in contrast to the fox’s restlessness. One might argue that both characters, when taken together, provide a balance—movement and stillness, action and reflection. One leaps, the other waits. One explores the world, the other watches it pass by.\nThe value of this sentence, beyond its linguistic use, lies in its imaginative potential. It encourages us to consider how we interact with the world. Are we the fox—eager, bold, and always in motion? Or the dog—thoughtful, reserved, perhaps at peace with the world as it is?\nIn the end, the sentence “The quick brown fox jumps over the lazy dog” is more than just a typist’s exercise. It is a miniature fable—one that captures the spirit of motion, choice, and character. Whether we leap or lounge, it reminds us that both states have their time and place in the alphabet—and in life.",
    essayErrors: [
      {
        essayErrorId: "essayError1",
        lessonPlanId: "lessonPlan1",
        correction: "jumps",
        start: 20,
        end: 24,
        issue: "Verb 'jump' is incorrect for third person singular",
        lesson: {
          lessonId: "1",
          lessonPlanId: "lessonPlan1",
          explanation:
            "Third person singular subjects require verbs ending in -s, such as 'jumps'",
          name: "Subject Agreement",
          questions: [
            {
              questionId: "questionId1",
              lessonId: "lesson1",
              question: "Which verb agrees with 'The dog'?",
              options: ["run", "runs", "running", "ran"],
            },
            {
              questionId: "questionId2",
              lessonId: "lesson1",
              question:
                "The sentence 'He walk to school' is grammatically correct.",
              options: ["True", "False"],
            },
          ],
        },
        type: "grammar",
      },
      {
        essayErrorId: "essayError2",
        lessonPlanId: "lessonPlan1",
        correction: "jumps",
        start: 586,
        end: 646,
        issue: "Verb 'jump' is incorrect for third person singular",
        type: "grammar",
        lesson: {
          lessonId: "lesson2",
          lessonPlanId: "lessonPlan1",
          explanation:
            "Third person singular subjects require verbs ending in -s, such as 'jumps'",
          name: "Subject Agreement",
          questions: [
            {
              questionId: "questionId3",
              lessonId: "lesson2",
              question: "Which verb agrees with 'The dog'?",
              options: ["run", "runs", "running", "ran"],
            },
            {
              questionId: "questionId4",
              lessonId: "lesson2",
              question:
                "The sentence 'He walk to school' is grammatically correct.",
              options: ["True", "False"],
            },
          ],
        },
      },
      {
        essayErrorId: "essayError3",
        lessonPlanId: "lessonPlan1",
        correction: "an",
        start: 1422,
        end: 1431,
        issue: "Incorrect article usage before a vowel sound",
        type: "grammar",
        lesson: {
          lessonId: "lesson3",
          lessonPlanId: "lessonPlan1",
          explanation:
            "Use 'an' instead of 'a' before words that begin with a vowel sound.",
          name: "Article Usage",
          questions: [
            {
              questionId: "questionId5",
              lessonId: "lesson3",
              question:
                "Which article correctly completes the sentence: 'She adopted ___ unusual pet.'",
              options: ["a", "an", "the", "no article"],
            },
            {
              questionId: "questionId6",
              lessonId: "lesson3",
              question: "True or False: 'a elephant' is grammatically correct.",
              options: ["True", "False"],
            },
          ],
        },
      },
    ],
  };

  const editorContent = useMemo(() => {
    const { essayErrors: errors, essayContent } = lessonPlan;
    const sortedErrors = errors.sort((a, b) => a.start - b.start);
    const children: ReactNode[] = [];
    let index = 0;
    let content = essayContent;

    const replaceNewLineWithBreaks = (content: string) =>
      content.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < content.split("\n").length - 1 && (
            <>
              <br />
              <div className="mt-2"></div>
            </>
          )}
        </React.Fragment>
      ));

    for (let i = 0; i < sortedErrors.length; i++) {
      const error = sortedErrors[i] as EssayError;

      if (index < error.start) {
        children.push(
          <span key={`${i}-start`} className="whitespace-pre-wrap">
            {replaceNewLineWithBreaks(content.substring(index, error.start))}
          </span>
        );
        index = error.start;
      }

      children.push(
        <span
          key={i}
          className={cn(
            "whitespace-pre-wrap bg-red-100 hover:bg-red-200 px-1 border-b-2 border-b-red-500 rounded-t-[var(--radius-sm)] cursor-pointer",
            {
              "bg-yellow-100 hover:bg-yellow-100 border-b-yellow-400":
                selectedError?.essayErrorId === error.essayErrorId,
            }
          )}
          aria-label={`Select error`}
          role="button"
          onClick={() =>
            setSelectedError(
              selectedError?.essayErrorId === error.essayErrorId
                ? undefined
                : error
            )
          }
        >
          {replaceNewLineWithBreaks(content.substring(index, error.end))}
        </span>
      );
      index = error.end;
    }

    if (index < content.length) {
      children.push(
        <span className="whitespace-pre-wrap" key="end">
          {replaceNewLineWithBreaks(content.substring(index, content.length))}
        </span>
      );
    }

    return children;
  }, [lessonPlan, selectedError]);

  return (
    <AppContent title={lessonPlan.summary} excludeMainPadding={true}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          className="flex justify-center bg-gray-100 min-h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] !overflow-auto no-scrollbar"
          minSize={50}
        >
          <div className="mx-8 my-4 py-4 px-4 bg-white border-gray-300 border-1 rounded-none min-h-[calc(100vh-3.5rem)] h-fit max-w-[50rem]">
            {editorContent}
          </div>
        </ResizablePanel>
        {selectedError && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel
              className="p-4 bg-white"
              defaultSize={33}
              minSize={20}
            >
              <ErrorSidebar
                key={selectedError.essayErrorId}
                error={selectedError}
              />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </AppContent>
  );
}
