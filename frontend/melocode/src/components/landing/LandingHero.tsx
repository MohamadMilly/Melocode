import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router";

export function LandingHero() {
  return (
    <section
      className="grid min-h-[530px] grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] items-center gap-[clamp(2rem,8vw,7rem)] py-16 max-md:grid-cols-1 max-md:gap-4 max-md:py-12"
      aria-labelledby="landing-title"
    >
      <div className="max-w-[600px] max-md:text-center">
        <div className="mb-5 inline-flex items-center gap-2 text-[var(--accent-11)]">
          <Sparkles size={16} aria-hidden="true" />
          <Text size="2" weight="bold">
            طريقك إلى عالم البرمجة
          </Text>
        </div>
        <Heading
          size={{ lg: "9", initial: "8" }}
          mb={"3"}
          weight="bold"
          className="leading-[1.15]! animate-slideUp"
        >
          تعلّم تطوير الويب,
          <span className="block text-[var(--accent-11)]">
            بلغتك ومن أفضل المصادر العالمية.
          </span>
        </Heading>
        <Text
          as="p"
          size={{ initial: "3", sm: "4" }}
          color="gray"
          className="mt-5 max-w-[560px] leading-[1.9]"
        >
          دروس قصيرة وتحديات عملية تساعدك على بناء أساس قوي في البرمجة، مهما كان
          مستوى خبرتك.
        </Text>
        <Flex
          gap="3"
          wrap="wrap"
          justify={{ initial: "center", sm: "start" }}
          className="mt-8"
        >
          <Button asChild size="3" variant="solid">
            <Link to="/register">
              أنشئ حساباً
              <ArrowLeft size={18} aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="3" variant="soft">
            <Link to="/login">لديّ حساب بالفعل</Link>
          </Button>
          <Button size={"3"} asChild variant="solid">
            <Link to={"/app"}>
              جرب درساً
              <ArrowLeft size={18} aria-hidden="true" />
            </Link>
          </Button>
        </Flex>
      </div>

      <div
        className="relative isolate grid min-h-[360px] place-items-center max-md:order-first max-md:min-h-[230px]"
        aria-hidden="true"
      >
        <div className="absolute aspect-square w-[min(80%,340px)] rotate-[22deg] skew-x-[-12deg] rounded-full border border-[color-mix(in_srgb,var(--accent-8)_42%,transparent)] animate-spin [animation-duration:24s]" />
        <div className="absolute aspect-square w-[min(80%,340px)] scale-y-[0.56] -rotate-[50deg] skew-x-[12deg] rounded-full border border-[color-mix(in_srgb,var(--blue-8)_35%,transparent)]" />
        <img
          src="/react_logo.webp"
          alt=""
          className="w-[clamp(150px,25vw,245px)] drop-shadow-[0_20px_24px_color-mix(in_srgb,var(--accent-9)_28%,transparent)] animate-spin [animation-duration:18s] motion-reduce:animate-none"
        />
      </div>
    </section>
  );
}
