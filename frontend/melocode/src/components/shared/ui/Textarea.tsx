import { TextArea } from "@radix-ui/themes";
import type { ComponentPropsWithoutRef } from "react";

type TextareaProps = ComponentPropsWithoutRef<typeof TextArea>;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <TextArea
      className={`w-full resize-none ${className}`}
      size="2"
      variant="surface"
      {...props}
    />
  );
}