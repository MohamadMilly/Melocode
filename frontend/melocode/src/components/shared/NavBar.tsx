import { Text } from "@radix-ui/themes";

export function NavBar() {
  return (
    <nav className="sticky top-0 z-100 backdrop-blur-md px-4 py-3 border-b border-[var(--accent-6)]">
      <Text className="text-[var(--accent-11)]" size={"6"} weight={"medium"}>
        ميلوكود
      </Text>
    </nav>
  );
}
