type svgPathProps = {
  x1: string;
  x2: string;
  y1: string;
  y2: string;
  active: boolean;
};

export const SvgPath = ({ x1, y1, x2, y2, active }: svgPathProps) => {
  return (
    <svg
      style={{ minHeight: "100%" }}
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
    >
      <line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        stroke={active ? "var(--accent-6)" : "var(--gray-3)"}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
};
