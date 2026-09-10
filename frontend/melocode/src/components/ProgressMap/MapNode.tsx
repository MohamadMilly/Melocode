import { Text, Tooltip } from "@radix-ui/themes";
import { Check, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

export type Node = {
  id: number;
  status: "completed" | "locked" | "current";
  title: string;
  slug: string;
};

type MapNodeProps = {
  node: Node;
  index: number;
};

const nodeIcons: Record<"completed" | "locked" | "current", ReactNode> = {
  completed: <Check size={32} />,
  locked: <Lock size={32} />,
  current: null,
};

export function MapNode({ node, index }: MapNodeProps) {
  const statusClasses: Record<Node["status"], string> = {
    locked:
      "bg-gradient-to-br from-(--gray-2) via-(--gray-4) to-(--gray-6) text-(--gray-11) border-(--gray-8)",
    current:
      "bg-gradient-to-br from-(--accent-3) via-(--accent-5) to-(--accent-7) shadow-sm shadow-(--accent-6) border-(--accent-8) text-(--accent-11) hover:border-b-4 hover:mb-1 active:border-b-1 active:mb-[1px] animate-pulse",
    completed:
      "bg-gradient-to-br from-(--accent-8) via-(--accent-9) to-(--accent-10) text-(--accent-12) border-(--accent-8) hover:border-b-4 hover:mb-1 active:border-b-1 active:mb-[1px]",
  };
  const icon = nodeIcons[node.status];
  return (
    <Tooltip content={node.title}>
      <Link
        className={`relative nth-of-type-[2n-1]:-translate-x-12 nth-of-type-[2n]:translate-x-12 z-10 w-20 h-20 overflow-hidden rounded-full transition-all duration-300 flex justify-center box-content border border-b-8 items-center shadow-[inset_2px_3px_5px_color-mix(in_srgb,white_45%,transparent),inset_-3px_-5px_6px_color-mix(in_srgb,var(--gray-12)_20%,transparent),0_5px_14px_color-mix(in_srgb,var(--gray-12)_12%,transparent)] ${statusClasses[node.status]}`}
        to={node.status === "locked" ? "#" : `lessons/${node.slug}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1 rounded-full border-t border-l border-white/35"
        />
        <Text
          size={"6"}
          weight={"bold"}
          className="relative z-10 drop-shadow-[0_1px_1px_color-mix(in_srgb,var(--gray-12)_20%,transparent)]"
        >
          {icon ?? index}
        </Text>
      </Link>
    </Tooltip>
  );
}
