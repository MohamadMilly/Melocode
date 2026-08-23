import type { UserLessonProgress } from "@app/types";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type StreakBarChartProps = {
  userLessonProgresses: UserLessonProgress[];
};

export function StreakBarChart({ userLessonProgresses }: StreakBarChartProps) {
  const chartData = Object.values(
    userLessonProgresses.reduce(
      (acc: Record<string, { date: string; count: number }>, progress) => {
        const current = new Date(progress.completedAt)
          .toISOString()
          .split("T")[0];

        if (acc[current]) {
          acc[current].count++;
        } else {
          acc[current] = { date: current, count: 1 };
        }

        return acc;
      },
      {},
    ),
  ).sort((first, second) => first.date.localeCompare(second.date));

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("ar-EG", {
      day: "numeric",
      month: "short",
    }).format(new Date(`${date}T00:00:00`));

  return (
    <Card size="3" className="border border-[var(--gray-5)] bg-[var(--gray-2)] grow">
      <Flex direction="column" gap="4">
        <Flex direction="column" gap="1">
          <Heading size="5">نشاط التعلم اليومي</Heading>
          <Text size="2" color="gray">
            عدد الدروس المكتملة لكل يوم
          </Text>
        </Flex>
        <div className="streak-chart h-64 w-full sm:h-72">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                barCategoryGap="28%"
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={24}
                />
                <YAxis
                  allowDecimals={false}
                  domain={[0, "auto"]}
                  tickLine={false}
                  axisLine={false}
                  width={42}
                />
                <Tooltip
                  cursor={{ fill: "var(--gray-3)" }}
                  labelFormatter={(date) => formatDate(String(date))}
                  formatter={(value) => [value, "الدروس"]}
                />
                <Bar
                  dataKey="count"
                  name="الدروس المكتملة"
                  fill="var(--accent-9)"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={42}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Flex align="center" justify="center" className="h-full">
              <Text size="2" color="gray">
                لا توجد دروس مكتملة بعد
              </Text>
            </Flex>
          )}
        </div>
      </Flex>
    </Card>
  );
}
