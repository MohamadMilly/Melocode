import type { ReactNode } from "react";

export function SidePanelList({ children }: { children: ReactNode }) {
  return <ul className="space-y-2 overflow-y-auto p-3">{children}</ul>;
}
