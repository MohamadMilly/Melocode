import { Flex, Spinner, Text } from "@radix-ui/themes";
import type { SortMetric } from "@app/types";
import { UserItem, type LeaderBoardUser } from "./UserItem";

export function UserList({
  users,
  metric,
  isLoading,
}: {
  users: LeaderBoardUser[];
  metric: SortMetric;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <Flex justify="center" py="8">
        <Spinner size="3" />
      </Flex>
    );
  }

  if (users.length === 0) {
    return (
      <Text align="center" color="gray" className="py-8">
        لا يوجد مستخدمون لعرضهم بعد.
      </Text>
    );
  }

  return (
    <Flex direction="column" gap="3">
      {users.map((user, index) => (
        <UserItem key={user.id} user={user} rank={index + 1} metric={metric} />
      ))}
    </Flex>
  );
}
