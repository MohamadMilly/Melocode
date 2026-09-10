import { Text } from "@radix-ui/themes";
import { CheckCircle2, Circle, LockKeyhole } from "lucide-react";
import { Link } from "react-router";
import type { Node } from "../ProgressMap/MapNode";
import { SidePanelContainer } from "../shared/ui/SidePanel/SidePanelContainer";
import { SidePanelHeader } from "../shared/ui/SidePanel/SidePanelHeader";
import { SidePanelList } from "../shared/ui/SidePanel/SidePanelList";
import { SidePanelListItem } from "../shared/ui/SidePanel/SidePanelListItem";

type MainSideNavProps = {
  nodes: Node[];
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

export function MainSideNav({ nodes }: MainSideNavProps) {
  return (
    <SidePanelContainer position="right">
      <SidePanelHeader>
        <Text size="3" weight="bold" highContrast>
          دروس المسار
        </Text>
        <Text size="2" color="gray">
          {nodes.length} دروس
        </Text>
      </SidePanelHeader>
      <SidePanelList>
        {nodes.map((node, index) => {
          const isLocked = node.status === "locked";
          const StatusIcon = statusIcons[node.status];
          return (
            <SidePanelListItem
              className={statusClasses[node.status]}
              key={index}
            >
              {/* those items will not be deleted or edited so index is fine */}
              <Link
                aria-disabled={isLocked}
                tabIndex={isLocked ? -1 : undefined}
                to={isLocked ? "#" : `lessons/${node.slug}`}
                className={` flex gap-3 ${isLocked ? "cursor-not-allowed" : ""}`}
                onClick={(event) => {
                  if (isLocked) event.preventDefault();
                }}
              >
                <StatusIcon
                  className={`${node.status === "completed" ? "text-[var(--accent-11)]" : ""}`}
                  size={19}
                  aria-hidden="true"
                />
                <Text
                  size="2"
                  weight={node.status === "current" ? "bold" : "medium"}
                >
                  {index + 1}. {node.title}
                </Text>
              </Link>
            </SidePanelListItem>
          );
        })}
      </SidePanelList>
    </SidePanelContainer>
  );
}
