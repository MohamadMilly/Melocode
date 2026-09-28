import { Flex, Text } from "@radix-ui/themes";
import { CheckCircle2, ChevronDown, Circle, LockKeyhole } from "lucide-react";
import { Accordion } from "radix-ui";
import { Link } from "react-router";
import type { Module } from "@app/types";
import type { Node } from "../ProgressMap/MapNode";
import { SidePanelContainer } from "../shared/layout/SidePanel/SidePanelContainer";
import { SidePanelHeader } from "../shared/layout/SidePanel/SidePanelHeader";
import { SidePanelList } from "../shared/layout/SidePanel/SidePanelList";
import { SidePanelListItem } from "../shared/layout/SidePanel/SidePanelListItem";

type MainSideNavProps = {
  modules: Module[];
};

const statusIcons = {
  completed: CheckCircle2,
  current: Circle,
  locked: LockKeyhole,
} as const;

const statusClasses: Record<Node["status"], string> = {
  completed: "",
  current:
    "border-[var(--accent-7)] bg-[var(--accent-3)] text-[var(--accent-11)] hover:bg-[var(--accent-4)]",
  locked: "border-[var(--gray-5)] bg-[var(--gray-2)] text-[var(--gray-9)]",
};

export function PathSideNav({ modules }: MainSideNavProps) {
  const lessonCount = modules.reduce(
    (total, module) => total + (module.lessons?.length ?? 0),
    0,
  );

  return (
    <SidePanelContainer position="right">
      <SidePanelHeader>
        <Text size="3" weight="bold" highContrast>
          دروس المسار
        </Text>
        <Text size="2" color="gray">
          {lessonCount} دروس
        </Text>
      </SidePanelHeader>
      {modules.length > 0 && (
        <Accordion.Root
          type="multiple"
          defaultValue={modules.map((module) => String(module.id))}
          className="min-h-0 overflow-y-auto px-2 pb-4"
        >
          {modules.map((module, moduleIndex) => {
            const moduleLessons = module.lessons ?? [];
            const lessonOffset = modules
              .slice(0, moduleIndex)
              .reduce(
                (total, previous) => total + (previous.lessons?.length ?? 0),
                0,
              );

            return (
              <Accordion.Item
                value={String(module.id)}
                key={module.id}
                className="border-b border-(--gray-4)"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-3 py-4 text-right">
                    <Flex direction="column" align="start" gap="1">
                      <Text size="2" weight="bold" highContrast>
                        {module.title}
                      </Text>
                      <Text size="1" color="gray">
                        {moduleLessons.length} دروس
                      </Text>
                    </Flex>
                    <ChevronDown
                      size={17}
                      className="shrink-0 text-(--accent-9) transition-transform group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <SidePanelList>
                    {moduleLessons.map((node, index) => {
                      const isLocked = node.status === "locked";
                      const StatusIcon = statusIcons[node.status];
                      const nodeStatus = node.status as Node["status"];

                      return (
                        <SidePanelListItem
                          className={statusClasses[nodeStatus]}
                          key={node.id}
                        >
                          <Link
                            aria-disabled={isLocked}
                            tabIndex={isLocked ? -1 : undefined}
                            to={isLocked ? "#" : `/app/lessons/${node.slug}`}
                            className={`flex gap-3 ${isLocked ? "cursor-not-allowed" : ""}`}
                            onClick={(event) => {
                              if (isLocked) event.preventDefault();
                            }}
                          >
                            <StatusIcon
                              className={
                                node.status === "completed"
                                  ? "text-(--accent-11)"
                                  : ""
                              }
                              size={19}
                              aria-hidden="true"
                            />
                            <Text
                              size="2"
                              weight={
                                node.status === "current" ? "bold" : "medium"
                              }
                            >
                              {lessonOffset + index + 1}. {node.title}
                            </Text>
                          </Link>
                        </SidePanelListItem>
                      );
                    })}
                  </SidePanelList>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      )}
    </SidePanelContainer>
  );
}
