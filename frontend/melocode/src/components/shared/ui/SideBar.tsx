import { Heading, Text } from "@radix-ui/themes";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./Button";

type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
};

export function SideBar({
  isOpen,
  onClose,
  title,
  closeLabel,
  description,
  icon,
  children,
}: SideBarProps) {
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[1000] ${isOpen ? "" : "pointer-events-none"}`}
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
        className={`absolute inset-0 h-full w-full border-0 bg-black/35 p-0 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        inert={!isOpen}
        className={`absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col border-l border-[var(--gray-6)] bg-[var(--color-panel-solid)] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-[var(--gray-6)] px-4 py-3">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-3)] text-[var(--accent-11)]">
                {icon}
              </span>
            )}
            <div>
              <Heading size="2" as="h2">
                {title}
              </Heading>
              {description && (
                <Text as="p" size="1" color="gray">
                  {description}
                </Text>
              )}
            </div>
          </div>
          <Button
            aria-label={closeLabel}
            className="!h-9 !w-9 !p-0"
            onClick={onClose}
            variant="ghost"
          >
            <X size={19} />
          </Button>
        </header>
        {children}
      </aside>
    </div>
  );
}
