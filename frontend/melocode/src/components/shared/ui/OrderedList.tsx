import type { ReactNode } from "react";

export function OrderedList({ children }: { children: ReactNode }) {
  return <ol className="list-decimal pl-5 space-y-2 my-4 mx-5">{children}</ol>;
}
