import { useQuizAnswerContext } from "../../../contexts/QuizAnswerContext";

export function OptionItem({ optionText }: { optionText: string }) {
  const { selectedOption, setSelectedOption } = useQuizAnswerContext();

  return (
    <label
      dir="auto"
      className="group flex cursor-pointer items-center gap-3 rounded-(--radius-3) border border-(--gray-5) bg-(--gray-2) px-4 py-3 text-(--gray-12) shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-(--accent-7) hover:bg-(--accent-2) hover:shadow-md has-checked:border-(--accent-8) has-checked:bg-(--accent-3)"
    >
      <input
        onChange={(e) => setSelectedOption(e.target.value)}
        type="radio"
        checked={selectedOption === optionText}
        name="quiz-option"
        value={optionText}
        className="size-4 shrink-0 accent-(--accent-9)"
      />
      <span className="min-w-0 flex-1 text-sm leading-6 font-medium sm:text-base">
        {optionText}
      </span>
    </label>
  );
}
