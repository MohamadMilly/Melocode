import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "@radix-ui/themes/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme, ThemePanel } from "@radix-ui/themes";

const router = createBrowserRouter(routes);

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Theme accentColor="lime" grayColor="sand" radius="full" scaling="95%">
        <RouterProvider router={router} />
        <ThemePanel />
      </Theme>
    </QueryClientProvider>
  </StrictMode>,
);
