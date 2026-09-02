import type { JSX } from "react/jsx-runtime";

export function Mark({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <mark className="bg-[var(--accent-11)]/90 text-[var(--accent-1)] rounded-md px-1 py-[1px]">
      {children}
    </mark>
  );
}
