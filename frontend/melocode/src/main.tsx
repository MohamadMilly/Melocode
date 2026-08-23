import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "@radix-ui/themes/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";

// providers
import { AuthProvider } from "./providers/AuthProvider";

const router = createBrowserRouter(routes);

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Theme
          accentColor="lime"
          grayColor="slate"
          radius="large"
          appearance="dark"
          scaling="95%"
        > 
          <RouterProvider router={router} />
        </Theme>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
