import { capitalizeFirstLetter } from "@/lib/utils";
import type { EssayError } from "@/model/EssayError";
import { CheckIcon } from "lucide-react";
import { useState, type FC } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ErrorQuestion } from "./ErrorQuestion";

type ErrorSidebarProps = {
  error: EssayError;
};

export const ErrorSidebar: FC<ErrorSidebarProps> = ({ error }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const updateAnsweredQuestion = (
    questionIndex: number,
    answeredCorrectly: boolean
  ) => {
    if (answeredCorrectly && !answeredQuestions.includes(questionIndex)) {
      setAnsweredQuestions([...answeredQuestions, questionIndex]);
    } else if (
      !answeredCorrectly &&
      answeredQuestions.includes(questionIndex)
    ) {
      setAnsweredQuestions(
        answeredQuestions.filter((i) => i !== questionIndex)
      );
    }
  };

  const disableCorrectionButton =
    answeredQuestions.length < error.lesson.questions.length;

  return (
    <div>
      <header className="font-bold text-xl">
        {capitalizeFirstLetter(error.type)} Error {error.lesson.name}
      </header>
      <p>
        <CheckIcon className="inline w-4 text-green-700 font-bold" />{" "}
        {error.lesson.explanation}
      </p>
      <Label className="mt-4">Master This Subject</Label>
      {error.lesson.questions.map((question, index) => (
        <ErrorQuestion
          updateAnsweredQuestion={updateAnsweredQuestion}
          key={`question-${index}`}
          index={index}
          question={question}
        />
      ))}
      <Button
        disabled={disableCorrectionButton}
        className="w-full"
        color="primary"
      >
        Correct Error
      </Button>
      <span className="text-sm text-gray-500">
        {disableCorrectionButton &&
          "SyntaxSensAI will allow you to correct this error once you've completed all the questions"}
        {!disableCorrectionButton &&
          `Correcting this error will automatically update your essay with the correction: "${error.correction}"`}
      </span>
    </div>
  );
};
