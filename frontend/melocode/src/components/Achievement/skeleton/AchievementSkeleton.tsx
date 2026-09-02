import { Box, Card, Flex, Grid, Skeleton } from "@radix-ui/themes";

type AchievementSkeletonProps = {
  count?: number;
};

export function AchievementSkeleton({ count = 4 }: AchievementSkeletonProps) {
  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="4">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          size="3"
          className="border border-[var(--gray-5)] bg-[var(--gray-2)]"
        >
          <Flex direction="column" align="center" gap="3" p="2">
            <Skeleton>
              <Box className="h-28 w-28 rounded-full bg-[var(--accent-3)]" />
            </Skeleton>
            <Skeleton width="120px" height="18px" />
            <Skeleton width="160px" height="24px" />
            <Skeleton width="180px" height="28px" />
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}
