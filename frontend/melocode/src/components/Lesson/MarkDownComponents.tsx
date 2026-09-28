import { LessonSectionHeading } from "./LessonSectionHeading";
import { LessonTitle } from "./LessonTitle";
import { LessonText } from "./LessonText";
import { Section } from "@radix-ui/themes";
import { HighLight } from "../shared/ui/HighLight";
import { UnOrderedList } from "../shared/ui/UnOrderedList";
import { LessonConclusionHeading } from "./LessonConclusionTitle";
import { Mark } from "../shared/ui/Mark";
import { LessonImage } from "./LessonImage";
import { ExternalLink } from "../shared/ui/ExternalLink";
import { LessonNote } from "./LessonNote";
import { LessonSubSectionHeading } from "./LessonSubSectionHeading";
import { OrderedList } from "../shared/ui/OrderedList";
import { HorizontalRule } from "../shared/ui/HorizontalRule";
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
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
};
