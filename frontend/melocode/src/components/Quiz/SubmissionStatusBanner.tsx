import { Flex, Text } from "@radix-ui/themes";
import { SuccessConfetti } from "../shared/ui/SuccessConfetti";
import { SuccessCheckMark } from "../shared/ui/SuccessCheckMark";
import { WrongCheckMark } from "../shared/ui/WrongCheckMark";

export function SubmissionStatusBanner({
  isCompleted,
}: {
  isCompleted: boolean;
}) {
  const title = isCompleted ? "تم حله بنجاح" : "إجابة خاطئة";
  const statusText = isCompleted ? "مكتمل" : "غير صحيح";

  const textColor = isCompleted
    ? "text-[var(--accent-11)]"
    : "text-[var(--red-11)]";
  const iconBg = isCompleted ? "bg-[var(--accent-2)]" : "bg-[var(--red-2)]";
  const iconBorder = isCompleted
    ? "border-[var(--accent-4)]"
    : "border-[var(--red-4)]";

  return (
    <>
      <Flex className="w-full flex-row-reverse items-center justify-between gap-4 px-5 py-3 mb-4 rounded-xl border border-[var(--gray-4)] bg-[var(--gray-2)] shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
        <Flex className="flex-row-reverse items-center gap-3">
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-lg border ${iconBg} ${iconBorder}`}
          >
            {isCompleted ? <SuccessCheckMark /> : <WrongCheckMark />}
          </div>

          <Text className={`${textColor} font-bold text-base m-0`}>
            {title}
          </Text>
        </Flex>

        <Text className="text-[var(--gray-11)] text-xs font-medium m-0">
          {statusText}
        </Text>
      </Flex>

      {isCompleted && <SuccessConfetti />}
    </>
  );
}
