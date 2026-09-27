import { Button as RadixButton } from "@radix-ui/themes";
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<typeof RadixButton>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <RadixButton className={`cursor-pointer ${className}`} {...props} />
  );
}