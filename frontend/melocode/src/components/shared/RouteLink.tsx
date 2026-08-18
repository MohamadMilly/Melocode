import type { JSX, ReactNode } from "react";
import { Link } from "react-router";

export function RouteLink({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Link
      className="bg-[var(--accent-10)] text-[var(--gray-1)] px-4 py-1 rounded-[var(--radius-3)] text-sm"
      to={"/register"}
    >
      {children}
    </Link>
  );
}
