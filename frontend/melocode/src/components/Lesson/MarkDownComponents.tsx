import { LessonSectionHeading } from "./LessonSectionTitle";
import { LessonTitle } from "./LessonTitle";
import { LessonText } from "./LessonText";
import { Section, Text } from "@radix-ui/themes";
import { HighLight } from "../shared/ui/HighLight";
import { List } from "../shared/ui/List";
import { LessonConclusionHeading } from "./LessonConclusionTitle";

export const markDownComponents = {
  h1: LessonTitle,
  h2: LessonSectionHeading,
  h3: LessonConclusionHeading,
  p: LessonText,
  section: Section,
  code: HighLight,
  ul: List,
};
