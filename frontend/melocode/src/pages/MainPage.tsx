import { Heading, Section } from "@radix-ui/themes";
import type { Node } from "../components/ProgressMap/MapNode";
import { ProgressMap } from "../components/ProgressMap/ProgressMap";

import { lessons } from "../lessons/lessons";

const nodes: Node[] = Object.values(lessons).map((lesson, index) => {
  return {
    id: index,
    status: "completed",
    title: lesson.frontmatter.title,
    slug: lesson.frontmatter.slug,
  };
});

export function MainPage() {
  return (
    <main className="relative max-w-5xl w-full mx-auto p-6 md:p-12 border-x border-[var(--accent-4)] min-h-screen bg-[var(--gray-1)] selection:bg-[var(--accent-3)] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--gray-3)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <Section className="relative z-10 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-8 border-b border-dashed border-[var(--gray-5)]">
          <div className="space-y-2">
            <Heading
              size="8"
              weight="bold"
              mb={"4"}
              className="text-[var(--gray-12)] tracking-tight font-black bg-gradient-to-r from-[var(--gray-12)] to-[var(--accent-11)] bg-clip-text text-transparent"
            >
              مسار تطوير الويب
            </Heading>
            <p className="text-[var(--gray-11)] text-sm md:text-base max-w-xl leading-relaxed">
              رحلة تعليمية تفاعلية مصممة بعناية لمساعدتك في الانتقال من الصفر
              وحتى بناء وإطلاق مشاريع حقيقية متكاملة.
            </p>
          </div>
        </div>
        
        <div className="px-2">
          <ProgressMap nodes={nodes} />
        </div>
      </Section>
    </main>
  );
}
