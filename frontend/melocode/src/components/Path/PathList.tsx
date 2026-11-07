import type { Path } from "@app/types";
import { Grid } from "@radix-ui/themes";
import { PathItem } from "./PathItem";

type PathListProps = {
  paths: Path[];
};

export function PathList({ paths }: PathListProps) {
  return (
    <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="4">
      {paths.map((path) => (
        <PathItem key={path.id} path={path} />
      ))}
    </Grid>
  );
}
