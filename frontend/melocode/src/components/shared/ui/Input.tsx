import { TextField } from "@radix-ui/themes";
import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<typeof TextField.Root>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <TextField.Root
      className={`w-full border border-[var(--gray-6)] ${className}`}
      size="2"
      variant="surface"
      {...props}
    />
  );
}
