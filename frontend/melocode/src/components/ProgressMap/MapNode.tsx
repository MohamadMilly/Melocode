import { Text, Tooltip } from "@radix-ui/themes";
import { Check } from "lucide-react";
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

export function MapNode({ node, index }: MapNodeProps) {
  const statusClasses: Record<Node["status"], string> = {
    locked: "bg-[var(--gray-3)] text-[var(--gray-11)] border-[var(gray-8)]",
    current:
      "bg-[var(--accent-5)] shadow-md shadow-[var(--accent-4)] border-[var(--accent-8)] text-[var(--accent-11)] animate-pulse hover:border-b-4 hover:mb-1 active:border-b-1 active:mb-[1px]",
    completed:
      "bg-[var(--accent-9)] text-[var(--accent-12)] border-[var(--accent-8)] hover:border-b-4 hover:mb-1 active:border-b-1 active:mb-[1px]",
  };
  return (
    <Tooltip content={node.title}>
      <Link
        className={`w-20 h-20 rounded-full transition-all duration-300 flex justify-center box-content border border-b-8 items-center ${statusClasses[node.status]}`}
        to={node.status === "locked" ? "#" : `lessons/${node.slug}`}
      >
        <Text size={"6"} weight={"bold"}>
          {node.status === "completed" ? <Check size={32} /> : index}
        </Text>
      </Link>
    </Tooltip>
  );
}
