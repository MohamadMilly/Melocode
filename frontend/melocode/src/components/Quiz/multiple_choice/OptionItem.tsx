export function OptionItem({
  optionText,
  optionLetter,
  handleSelect,
  isSelected,
  isCorrect,
  isWrong,
}: {
  optionText: string;
  optionLetter: string;
  handleSelect: (optionLetter: string) => void;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
}) {
  //const isThisOptionCorrect =
  //  submission?.content === id && submission.isCorrect;
  //  const isThisOptionWrong =
  //  submission && id === submission.content && !submission.isCorrect;

  return (
    <label
      dir="rtl"
      className={`group flex cursor-pointer items-center gap-3 rounded-(--radius-3) border px-4 py-3 text-(--gray-12) shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-(--accent-7) hover:bg-(--accent-2) hover:shadow-md ${
        isCorrect
          ? "border-(--green-7) bg-(--green-3) text-(--green-11)"
          : isWrong
            ? "border-(--red-7) bg-(--red-3) text-(--red-11)"
            : "border-(--gray-5) bg-(--gray-2) has-checked:border-(--accent-8) has-checked:bg-(--accent-3)"
      }`}
    >
      <input
        onChange={() => handleSelect(optionLetter)}
        type="radio"
        checked={isSelected}
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
