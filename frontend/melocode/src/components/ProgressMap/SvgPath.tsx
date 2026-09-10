type svgPathProps = {
  x1: string | number;
  x2: string | number;
  y1: string | number;
  y2: string | number;
  active: boolean;
  parentX: number;
  parentY: number;
};

export const SvgPath = ({
  x1,
  y1,
  x2,
  y2,
  active,
  parentX,
  parentY,
}: svgPathProps) => {
  return (
    <svg
      viewBox={`0 0 ${parentX} ${parentY}`}
      style={{ minHeight: "100%" }}
      className={`absolute top-0 left-0 w-full h-full pointer-events-none z-0 ${active ? "opacity-90 drop-shadow-[0_2px_3px_color-mix(in_srgb,var(--gray-12)_14%,transparent)]" : "opacity-55"}`}
    >
      <line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        stroke={active ? "var(--accent-8)" : "var(--gray-7)"}
        strokeWidth="18"
        strokeLinecap="round"
      />
      <line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        stroke={active ? "var(--accent-5)" : "var(--gray-4)"}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        stroke={active ? "var(--accent-12)" : "var(--gray-6)"}
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
    </svg>
  );
};
