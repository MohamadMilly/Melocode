import type { ReactNode } from "react";

export function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-5 space-y-2 my-4 mx-5">{children}</ul>;
}
