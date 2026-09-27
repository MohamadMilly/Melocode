import { TextField } from "@radix-ui/themes";
import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<typeof TextField.Root>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <TextField.Root
      className={`w-full ${className}`}
      size="2"
      variant="surface"
      {...props}
    />
  );
}