import type { ReactNode } from "react";

export function SidePanelHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-[var(--gray-4)] px-5 py-4">
      {children}
    </div>
  );
}
