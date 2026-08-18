import { Text } from "@radix-ui/themes";
import { RouteLink } from "./RouteLink";
import { useAuth } from "../../contexts/AuthContext";

export function NavBar() {
  const { user } = useAuth();
  return (
    <nav className="flex justify-between items-baseline sticky top-0 z-100 backdrop-blur-md px-6 py-3 border-b border-[var(--gray-6)]/15">
      <Text className="text-[var(--accent-11)]" size={"6"} weight={"medium"}>
        ميلوكود
      </Text>
      {!user && <RouteLink> ابدأ ←</RouteLink>}
    </nav>
  );
}
