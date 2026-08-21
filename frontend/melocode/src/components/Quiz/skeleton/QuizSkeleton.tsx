import { Flex, Tabs, Button, Skeleton } from "@radix-ui/themes";

type QuizSkeletonProps = {
  name: string;
};

export function QuizSkeleton({ name }: QuizSkeletonProps) {
  return (
    <Tabs.Content value={name}>
      <Flex direction={"column"} align={"end"} mb={"4"} p={"2"} gap={"3"}>
        <Skeleton width="150px" height="32px" />

        <Flex gap={"2"}>
          <Skeleton width="80px" height="24px" />
          <Skeleton width="60px" height="24px" />
        </Flex>

        <Skeleton width="100%" height="280px" />
      </Flex>

      <Flex direction={"column"} gap={"2"} align={"end"} my={"2"}>
        <Skeleton width="100px" height="20px" />

        <Flex gap={"2"}>
          <Skeleton>
            <Button>إظهار الحل</Button>
          </Skeleton>
          <Skeleton>
            <Button>تحقق من الحل</Button>
          </Skeleton>
        </Flex>

        <Skeleton width="100%" height="0px" />
      </Flex>
    </Tabs.Content>
  );
}
