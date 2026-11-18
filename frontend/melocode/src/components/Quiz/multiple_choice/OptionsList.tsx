import { Flex } from "@radix-ui/themes";

import { OptionItem } from "./OptionItem";
import { numberToLetter } from "../../../shared/utils/numberToLetter";
import { useQuizContext } from "../../../contexts/QuizContext";

export function OptionsList({ options }: { options: string[] }) {
  const { userAnswer, handleAnswerChange, submission } = useQuizContext();
  return (
    <Flex asChild direction="column" gap="2" my="4" className="w-full">
      <fieldset aria-label="Quiz options">
        {options.map((optionText, index) => {
          const optionLetter = numberToLetter(index);
          const isSelected = userAnswer === optionLetter;
          const isCorrect =
            submission?.content === optionLetter && submission?.isCorrect;
          const isWrong = submission?.content === optionLetter && !submission?.isCorrect;
          return (
            <OptionItem
              optionLetter={optionLetter}
              key={optionLetter}
              optionText={optionText}
              isSelected={isSelected}
              handleSelect={handleAnswerChange}
              isCorrect={isCorrect}
              isWrong={isWrong}
            />
          );
        })}
      </fieldset>
    </Flex>
  );
}
