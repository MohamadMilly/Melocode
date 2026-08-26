import type { SortDirection, SortMetric } from "@app/types";
import { ArrowDownAZ, ArrowUpAZ, SlidersHorizontal } from "lucide-react";

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
        <div className="relative">
          <SlidersHorizontal
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent-11)]"
          />
          <select
            id="leaderboard-metric"
            value={metric}
            onChange={(event) =>
              onMetricChange(event.target.value as SortMetric)
            }
            className="h-10 w-full appearance-none rounded-md border border-[var(--gray-6)] bg-[var(--color-panel-solid)] px-9 text-sm outline-none focus:border-[var(--accent-8)]"
          >  
            <option value="submissions">الإجابات الصحيحة</option>
            <option value="progress">الدروس المكتملة</option>
            <option value="streak">سلسلة التعلم</option>
          </select>
        </div>
      </div>

      <div className="flex min-w-44 flex-1 flex-col gap-1">
        <label htmlFor="leaderboard-direction" className="text-sm font-medium">
          اتجاه الترتيب
        </label>
        <div className="relative">
          {direction === "-" ? (
            <ArrowDownAZ
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent-11)]"
            />
          ) : (
            <ArrowUpAZ
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent-11)]"
            />
          )}
          <select
            id="leaderboard-direction"
            value={direction}
            onChange={(event) =>
              onDirectionChange(event.target.value as SortDirection)
            }
            className="h-10 w-full appearance-none rounded-md border border-[var(--gray-6)] bg-[var(--color-panel-solid)] px-9 text-sm outline-none focus:border-[var(--accent-8)]"
          >  
            <option value="-">الأعلى أولاً</option>
            <option value="+">الأدنى أولاً</option>
          </select>
        </div>
      </div>
    </div>
  );
}
