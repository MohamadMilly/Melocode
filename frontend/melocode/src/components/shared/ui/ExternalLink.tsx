import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
};

export function ExternalLink({
  href,
  children,
  target,
  rel,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target={target ?? "_blank"}
      rel={rel ?? "noopener noreferrer"}
      className="text-[var(--accent-11)] underline decoration-[var(--accent-10)] underline-offset-4 transition-colors hover:text-[var(--accent-12)]"
      {...props}
    >
      {children}
    </a>
  );
}
