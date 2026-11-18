import { LessonSectionHeading } from "./LessonSectionHeading";
import { LessonTitle } from "./LessonTitle";
import { LessonText } from "./LessonText";
import { Section } from "@radix-ui/themes";
import { HighLight } from "../ui/HighLight";
import { UnOrderedList } from "../ui/UnOrderedList";
import { LessonConclusionHeading } from "./LessonConclusionTitle";
import { Mark } from "../ui/Mark";
import { LessonImage } from "./LessonImage";
import { ExternalLink } from "../ui/ExternalLink";
import { LessonNote } from "./LessonNote";
import { LessonSubSectionHeading } from "./LessonSubSectionHeading";
import { OrderedList } from "../ui/OrderedList";
import { HorizontalRule } from "../ui/HorizontalRule";
import type { ReactNode } from "react";

export const markDownComponents = {
  h1: LessonTitle,
  h2: LessonSectionHeading,
  h3: LessonSubSectionHeading,
  h4: LessonConclusionHeading,
  p: LessonText,
  hr: HorizontalRule,
  a: ExternalLink,
  section: Section,
  code: HighLight,
  ul: UnOrderedList,
  ol: OrderedList,
  Mark: Mark,
  img: LessonImage,
  LessonNote: LessonNote,
  table: ({ children }: { children: ReactNode }) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-[var(--gray-5)]">
      <table className="!my-0">{children}</table>
    </div>
  ),
  
};
