import { useEffect, useRef, useState, type ReactNode } from "react";
import { MapNode, type Node } from "./MapNode";
import { SvgPath } from "./SvgPath";
import { Spinner } from "@radix-ui/themes";
import type { AxiosError } from "axios";
import { ErrorElement } from "../shared/ui/ErrorElement";

type ProgressMapProps = {
  nodes: Node[];
  isLoading: boolean;
  error: AxiosError<{ message: string }> | null;
};

export function ProgressMap({ nodes, isLoading, error }: ProgressMapProps) {
  const items: ReactNode[] = [];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer || isLoading) return;

    setDimensions({
      x: mapContainer.clientWidth,
      y: mapContainer.clientHeight,
    });
  }, [isLoading]);

  useEffect(() => {
    function onResize() {
      const mapContainer = mapContainerRef.current;
      if (!mapContainer) return;
      setDimensions({
        x: mapContainer.clientWidth,
        y: mapContainer.clientHeight,
      });
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  let direction: "right" | "left" = "right";
  nodes.forEach((node, index) => {
    items.push(<MapNode key={node.id} index={index + 1} node={node} />);
    if (nodes[index + 1]) {
      items.push(
        <SvgPath
          parentX={dimensions["x"]}
          parentY={dimensions["y"]}
          active={nodes[index + 1].status !== "locked"}
          key={`path-${node.id}`}
          x1={
            direction === "right"
              ? `${dimensions["x"] / 2 - 48}`
              : `${dimensions["x"] / 2 + 48}`
          }
          y1={index * 121 + 40}
          x2={
            direction === "right"
              ? `${dimensions["x"] / 2 + 48}`
              : `${dimensions["x"] / 2 - 48}`
          }
          y2={index * 121 + 121 + 40}
        />,
      );
      direction = direction === "right" ? "left" : "right";
    }
  });
  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner size={"3"} />
      </div>
    );
  if (error) return <ErrorElement axiosError={error} />;
  return (
    <div
      ref={mapContainerRef}
      className={`relative isolate max-w-2xl w-full mx-auto flex flex-col items-center gap-8`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 -z-10 overflow-hidden rounded-[2rem] border border-[var(--accent-4)] bg-[var(--gray-2)] shadow-[0_16px_40px_color-mix(in_srgb,var(--gray-12)_8%,transparent)]"
      >
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,var(--accent-7)_1px,transparent_1.5px)] [background-size:28px_28px]" />
      </div>
      {items}
    </div>
  );
}
