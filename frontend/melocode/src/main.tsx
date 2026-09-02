import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "@radix-ui/themes/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

// providers
import { AuthProvider } from "./providers/AuthProvider";

const router = createBrowserRouter(routes);

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Theme
            accentColor="lime"
            grayColor="slate"
            radius="large"
            scaling="95%"
          >
            <RouterProvider router={router} />
          </Theme>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);

/*
TO DO :
[
{slug:""},
{slug:""},
{slug:""},
]
getting the current lesson index
if the next lesson is current or completed => enable the button and go to index+1
if not disable it or hide it
*/
