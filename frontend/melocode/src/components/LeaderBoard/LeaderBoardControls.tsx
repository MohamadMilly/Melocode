import type { SortDirection, SortMetric } from "@app/types";
import { Select } from "@radix-ui/themes";

type LeaderBoardControlsProps = {
  metric: SortMetric;
  direction: SortDirection;
  onMetricChange: (metric: SortMetric) => void;
  onDirectionChange: (direction: SortDirection) => void;
};

export function LeaderBoardControls({
  metric,
  direction,
  onMetricChange,
  onDirectionChange,
}: LeaderBoardControlsProps) {
  return (
    <div className="flex flex-wrap items-end gap-3 rounded-[var(--radius-3)] border border-[var(--gray-5)] bg-[var(--gray-2)] p-4">
      <div className="flex min-w-44 flex-1 flex-col gap-1">
        <label htmlFor="leaderboard-metric" className="text-sm font-medium">
          الترتيب حسب
        </label>

        <Select.Root onValueChange={onMetricChange} value={metric}>
          <Select.Trigger dir="rtl" />
          <Select.Content>
            <Select.Item value="submissions">الإجابات الصحيحة</Select.Item>
            <Select.Item value="progress">الدروس المكتملة</Select.Item>
            <Select.Item value="streak">سلسلة التعلم</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>

      <div className="flex min-w-44 flex-1 flex-col gap-1">
        <label htmlFor="leaderboard-direction" className="text-sm font-medium">
          اتجاه الترتيب
        </label>

        <Select.Root value={direction} onValueChange={onDirectionChange}>
          <Select.Trigger dir="rtl" />
          <Select.Content>
            <Select.Item value="-">الأعلى أولاً</Select.Item>
            <Select.Item value="+">الأدنى أولاً</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  );
}
