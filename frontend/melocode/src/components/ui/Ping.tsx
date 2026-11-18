import type { JSX } from "react/jsx-runtime";

export function Ping(): JSX.Element {
  return (
    <div className="relative flex items-center justify-center w-3 h-3">
      <div className="absolute inset-0 rounded-full bg-[var(--accent-11)] opacity-40 animate-ping"></div>
      <div className="relative w-1.5 h-1.5 rounded-full bg-[var(--accent-11)] shadow-[0_0_8px_var(--accent-11)]"></div>
    </div>
  );
}
