import { Button, Tooltip } from "@radix-ui/themes";
import { useCallback, type JSX, type ReactNode } from "react";
import { useNavigate } from "react-router";

export function RouteLink({
  children,
  route,
  tipContent = "",
}: {
  children: ReactNode;
  route: string;
  tipContent?: string;
}): JSX.Element {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(route);
  }, [route, navigate]);
  // navigate always has the same reference so it does not matter just to shut the linter up
  return (
    <Tooltip hidden={!tipContent} content={tipContent}>
      <Button
        className="p-3! min-w-[35px]! h-[38px]!"
        onClick={handleNavigate}
        aria-label="Route Link"
        size={"2"}
        variant="soft"
      >
        {children}
      </Button>
    </Tooltip>
  );
}
