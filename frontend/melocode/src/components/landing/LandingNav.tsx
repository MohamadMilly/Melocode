import { Button, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export function LandingNav() {
  const { user } = useAuth();

  return (
    <nav className="mx-auto flex min-h-[55px] w-[min(1120px,calc(100%-2rem))] items-center justify-between border-b border-[color-mix(in_srgb,var(--gray-7)_20%,transparent)]">
      <Link
        to="/"
        className="text-[var(--accent-11)] no-underline"
        aria-label="ميلوكود - الرئيسية"
      >
        <Text size="5" weight="bold" highContrast>
          ميلوكود
        </Text>
      </Link>
    
      {!user && (
        <Flex align="center" gap="3">
          <Link
            to="/login"
            className="text-sm font-semibold text-[var(--gray-12)] no-underline transition-colors hover:text-[var(--accent-11)] max-sm:hidden"
          >
            تسجيل الدخول
          </Link>
          <Button asChild size="2" variant="solid">
            <Link to="/register">ابدأ التعلم</Link>
          </Button>
        </Flex>
      )}
    </nav>
  );
}
