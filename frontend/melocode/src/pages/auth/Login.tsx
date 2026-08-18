import { useState, type SubmitEvent } from "react";
import { useLogin } from "../../hooks/api/auth/useLogin";
import { Form } from "radix-ui";
import { Button, Flex, Spinner, Text, TextField } from "@radix-ui/themes";
import type { serverFormError } from "@app/types";
import { AxiosError } from "axios";

export function LoginPage() {
  const { mutate: login, isPending, error } = useLogin();
  const serverErrorMessage =
    error && error.response?.data && "message" in error.response.data
      ? error?.response?.data.message
      : "";
  const [serverErrors, setServerErrors] = useState({
    username: "",
    password: "",
  });

  const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    login(
      {
        username: data.username as string,
        password: data.password as string,
      },
      {
        onError: (error) => {
          const errorData = error.response?.data;
          if (
            error instanceof AxiosError &&
            errorData &&
            "errors" in errorData
          ) {
            const validationErrors: serverFormError[] = errorData.errors;
            if (
              Array.isArray(validationErrors) &&
              validationErrors.length > 0
            ) {
              const usernameError = validationErrors.find(
                (error) => error.field === "username",
              );
              const passwordError = validationErrors.find(
                (error) => error.field === "password",
              );

              setServerErrors({
                username: usernameError?.message ?? "",
                password: passwordError?.message ?? "",
              });
            }
          }
        },
      },
    );
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[var(--gray-1)] px-4">
      <Form.Root
        dir="rtl"
        className="my-auto py-8 px-6 bg-[var(--gray-2)] border border-[var(--gray-4)] max-w-sm w-full min-h-[420px] rounded-xl shadow-sm flex flex-col gap-5"
        onSubmit={handleFormSubmit}
        onClearServerErrors={() =>
          setServerErrors({ username: "", password: "" })
        }
      >
        <div className="text-center mb-2">
          <h1 className="text-xl font-bold text-[var(--gray-12)] mb-1">
            تسجيل الدخول
          </h1>
          <p className="text-xs text-[var(--gray-10)]">
            أدخل بياناتك للوصول إلى حسابك
          </p>

          {serverErrorMessage && (
            <div className="mt-3 p-2.5 bg-red-200/10 text-red-400 rounded-lg text-xs font-medium border">
              <Text as="p">{serverErrorMessage}</Text>
            </div>
          )}
        </div>

        <Form.Field
          name="username"
          serverInvalid={!!serverErrors.username}
          className="flex flex-col gap-1.5"
        >
          <Flex justify="between" align="baseline">
            <Form.Label className="text-sm font-medium text-[var(--gray-11)]">
              اسم المستخدم
            </Form.Label>

            <div className="text-xs text-red-500 font-medium">
              <Form.Message match="valueMissing">
                أدخل اسم المستخدم الخاص بك.
              </Form.Message>
              {serverErrors.username && (
                <Form.Message>{serverErrors.username}</Form.Message>
              )}
            </div>
          </Flex>

          <Form.Control
            onChange={() =>
              setServerErrors((prev) => ({ ...prev, username: "" }))
            }
            asChild
          >
            <TextField.Root
              type="text"
              required
              size="3"
              className="w-full transition-all focus-within:ring-2 focus-within:ring-[var(--accent-8)]"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field
          name="password"
          serverInvalid={!!serverErrors.password}
          className="flex flex-col gap-1.5"
        >
          <Flex justify="between" align="baseline">
            <Form.Label className="text-sm font-medium text-[var(--gray-11)]">
              كلمة المرور
            </Form.Label>

            <div className="text-xs text-red-500 font-medium">
              <Form.Message match="valueMissing">
                يُرجى إدخال كلمة المرور
              </Form.Message>
              {serverErrors.password && (
                <Form.Message>{serverErrors.password}</Form.Message>
              )}
            </div>
          </Flex>

          <Form.Control
            asChild
            onChange={() =>
              setServerErrors((prev) => ({ ...prev, password: "" }))
            }
          >
            <TextField.Root
              type="password"
              placeholder="••••••••"
              required
              size="3"
              className="w-full transition-all focus-within:ring-2 focus-within:ring-[var(--accent-8)]"
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <Button
            type="submit"
            disabled={isPending}
            size="3"
            variant="solid"
            className="w-full font-medium shadow-sm mt-auto!"
          >
            {isPending && <Spinner size="2" />}
            {isPending ? "يتم التسجيل..." : "تسجيل الدخول"}
          </Button>
        </Form.Submit>
      </Form.Root>
    </main>
  );
}
