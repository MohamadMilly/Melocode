import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState, type ReactNode } from "react";

export function SidePanelContainer({
  children,
  position = "right",
}: {
  children: ReactNode;
  position: "left" | "right";
}) {
  const [isOpen, setIsOpen] = useState(true);
  const classes = {
    left: "col-start-1 col-end-2",
    right: "-col-span-1",
  };
  return (
    <nav
      aria-label="دروس المسار"
      className={`sticky ${classes[position]}  z-10 h-[calc(100vh-55px)] backdrop-blur-sm top-[55px]! border-l border-[var(--gray-4)] transition-[width] duration-300 ease-in-out ${isOpen ? "w-80" : "w-0"}`}
    >
      <button
        type="button"
        aria-label={isOpen ? "طي القائمة" : "فتح القائمة"}
        onClick={() => setIsOpen((open) => !open)}
        className="absolute! top-1! left-1! -translate-x-full p-1 rounded border border-[var(--gray-5)] bg-[var(--gray-2)] shadow-sm"
      >
        {isOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
      </button>

      <div className={`w-80  ${isOpen ? "" : "hidden"}`}>{children}</div>
    </nav>
  );
}
