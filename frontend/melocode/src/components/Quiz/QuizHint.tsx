import { Text } from "@radix-ui/themes";
import { ChevronDown, Lightbulb } from "lucide-react";
import { useId, useState } from "react";
import type { ReactNode } from "react";

export function QuizHint({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = useId();

  return (
    <div className="my-4 w-full border-r-4 border-yellow-500 bg-yellow-500/10 p-3">
      <button
        type="button"
        dir="rtl"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className="flex w-full items-center justify-start gap-1 text-yellow-500"
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        <Lightbulb size={24} />
        <Text>تلميح</Text>
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={contentId}
        dir="rtl"
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        aria-hidden={!isExpanded}
      >
        <div className="min-h-0 overflow-hidden text-balance pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
