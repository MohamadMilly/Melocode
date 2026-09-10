import type { ComponentPropsWithRef, ReactNode } from "react";

export function SidePanelListItem({
  children,
  ...props
}: { children: ReactNode } & ComponentPropsWithRef<"li">) {
  return (
    <li
      {...props}
      className={`flex items-center gap-3 rounded-md border border-[var(--gray-6)] px-3 py-3 transition-colors" ${props.className}`}
    >
      {children}
    </li>
  );
}
