import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState, type ReactNode } from "react";

function getInitialState() {
  return window.innerWidth > 768 ? true : false;
}

export function SidePanelContainer({
  children,
  position = "right",
}: {
  children: ReactNode;
  position: "left" | "right";
}) {
  const [isOpen, setIsOpen] = useState(() => getInitialState());
  const classes = {
    left: "col-start-1 col-end-2",
    right: "-col-span-1",
  };
  return (
    <nav
      aria-label="دروس المسار"
      className={`md:sticky fixed ${classes[position]}  z-10 h-[calc(100vh-55px)] backdrop-blur-sm bg-[var(--gray-1)]/90 top-[55px]! border-l border-[var(--gray-4)] transition-[width] duration-300 ease-in-out ${isOpen ? "md:w-80 w-5/6" : "w-0"}`}
    >
      <button
        type="button"
        aria-label={isOpen ? "طي القائمة" : "فتح القائمة"}
        onClick={() => setIsOpen((open) => !open)}
        className="absolute! top-1! left-1! -translate-x-full p-1 rounded border border-[var(--gray-5)] bg-[var(--gray-2)] shadow-sm"
      >
        {isOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
      </button>

      <div className={`md:w-80 w-full   ${isOpen ? "" : "hidden"}`}>
        {children}
      </div>
    </nav>
  );
}
