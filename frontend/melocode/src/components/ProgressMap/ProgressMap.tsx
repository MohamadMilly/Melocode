import type { ReactNode } from "react";
import { MapNode, type Node } from "./MapNode";
import { SvgPath } from "./SvgPath";

type ProgressMapProps = {
  nodes: Node[];
};

export function ProgressMap({ nodes }: ProgressMapProps) {
  const items: ReactNode[] = [];
  let direction: "right" | "left" = "right";

  nodes.forEach((node, index) => {
    items.push(<MapNode key={node.id} index={index + 1} node={node} />);
    if (nodes[index + 1]) {
      items.push(
        <SvgPath
          active={nodes[index + 1].status !== "locked"}
          key={`path-${node.id}`}
          x1={direction === "right" ? "calc(50% - 48px)" : "calc(50% + 48px)"}
          y1={index * 121 + 40 + "px"}
          x2={direction === "right" ? "calc(50% + 48px)" : "calc(50% - 48px)"}
          y2={index * 121 + 121 + 40 + "px"}
        />,
      );
      direction = direction === "right" ? "left" : "right";
    }
  });
  return (
    <div
      className={`relative progressMap max-w-2xl w-full mx-auto flex flex-col items-center gap-8`}
    >
      {items}
    </div>
  );
}
