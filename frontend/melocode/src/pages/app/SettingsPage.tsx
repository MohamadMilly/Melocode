import { Button, Card, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { PageMain } from "../../components/shared/PageMain";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

export function SettingsPage() {
  const { logout, user } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const navigate = useNavigate();
  const handleToggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <PageMain>
      <Section size="2" className="relative z-10">
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">
              تفضيلات الحساب
            </Text>

            <Heading
              size={{ initial: "7", md: "8" }}
              className="text-[var(--accent-11)] flex items-center gap-4"
            >
              {" "}
              <Settings size={34} aria-hidden="true" />
              الإعدادات
            </Heading>
            <Text as="p" color="gray">
              تحكم في مظهر ميلوكود وإدارة جلسة حسابك.
            </Text>
          </Flex>

          <Card
            size="3"
            className="border border-[var(--gray-5)] bg-[var(--gray-2)]"
          >
            <Flex direction="column" gap="5">
              <Flex direction="column" gap="1">
                <Text size="4" weight="bold">
                  المظهر
                </Text>
                <Text size="2" color="gray">
                  اختر المظهر المريح لك أثناء التعلم.
                </Text>
              </Flex>

              <Flex
                direction={{ initial: "column", sm: "row" }}
                align={{ initial: "stretch", sm: "center" }}
                justify="between"
                gap="4"
                className="border-t border-[var(--gray-4)] pt-4"
              >
                <Flex align="center" gap="3">
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                  <Flex direction="column" gap="1">
                    <Text weight="medium">
                      الوضع {isDarkMode ? "الداكن" : "الفاتح"}
                    </Text>
                    <Text size="2" color="gray">
                      {isDarkMode ? "ألوان داكنة" : "ألوان فاتحة"}
                    </Text>
                  </Flex>
                </Flex>
                <Button
                  type="button"
                  variant="soft"
                  color="gray"
                  onClick={handleToggleTheme}
                >
                  {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
                  تبديل المظهر
                </Button>
              </Flex>
            </Flex>
          </Card>

          {user && (
            <Card
              size="3"
              className="border border-[var(--gray-5)] bg-[var(--gray-2)]"
            >
              <Flex
                direction={{ initial: "column", sm: "row" }}
                align={{ initial: "stretch", sm: "center" }}
                justify="between"
                gap="4"
              >
                <Flex direction="column" gap="1">
                  <Text size="4" weight="bold">
                    جلسة الحساب
                  </Text>
                  <Text size="2" color="gray">
                    تسجيل الخروج من هذا الجهاز.
                  </Text>
                </Flex>
                <Button
                  type="button"
                  color="red"
                  variant="soft"
                  onClick={handleLogout}
                >
                  <LogOut size={17} />
                  تسجيل الخروج
                </Button>
              </Flex>
            </Card>
          )}
        </Flex>
      </Section>
    </PageMain>
  );
}
