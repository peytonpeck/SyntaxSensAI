import { cn } from "@/lib/utils";
import type { LessonQuestion } from "@/model/LessonQuestion";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState, type FC } from "react";

type Props = {
  question: LessonQuestion;
  index: number;
  updateAnsweredQuestion: (questionIndex: number, answered: boolean) => void;
};

export const ErrorQuestion: FC<Props> = ({
  question,
  index,
  updateAnsweredQuestion,
}) => {
  const answer = useMemo(
    () => question.options[Math.floor(Math.random() * question.options.length)],
    [question]
  );
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const {
    mutate,
    data: correctAnswer,
    isPending,
  } = useMutation<string, Error, string>({
    mutationFn: (option: string) => {
      // call api and return correct question here
      return new Promise((resolve) => {
        setSelectedOption(-1);
        setTimeout(() => {
          resolve(answer);
        }, 250);
      });
    },
    onSuccess: (answer, option) => {
      setSelectedOption(question.options.findIndex((o) => o === option));
      updateAnsweredQuestion(index, answer === option);
    },
  });

  const handleOptionClick = (option: string, optionIndex: number) => {
    if (!correctAnswer) {
      mutate(option);
      updateAnsweredQuestion(index, false);
    } else {
      setSelectedOption(optionIndex);
      updateAnsweredQuestion(index, option === correctAnswer);
    }
  };

  return (
    <div key={question.questionId} className="mb-2">
      <div>
        {index + 1}) {question.question}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-1">
        {question.options.map((option, optionIndex) => (
          <button
            type="button"
            disabled={isPending}
            key={`option-${optionIndex}`}
            onClick={() => handleOptionClick(option, optionIndex)}
            className={cn(
              "bg-gray-200 b-2 border-gray-300 hover:bg-gray-300 rounded-[var(--radius-sm)] py-2 px-4",
              {
                "bg-green-300 hover:bg-green-300 text-green-950":
                  correctAnswer === option,
                "border-black": selectedOption === optionIndex,
                "bg-red-300 hover:bg-red-300 text-red-950":
                  selectedOption === optionIndex && correctAnswer !== option,
              }
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
