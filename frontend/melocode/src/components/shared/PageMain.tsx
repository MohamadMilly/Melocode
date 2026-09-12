import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PageMainProps = ComponentPropsWithoutRef<"main"> & {
  children: ReactNode;
  showGrid?: boolean;
};

export function PageMain({
  children,
  className = "",
  showGrid = true,
  ...props
}: PageMainProps) {
  return (
    <main
      dir="rtl"
      {...props}
      className={`relative min-h-screen border-x border-[var(--gray-4)] bg-[var(--gray-1)] ${className}`}
    >
      {showGrid && (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,var(--gray-3)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      )}
      {children}
    </main>
  );
}
