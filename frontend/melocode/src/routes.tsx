import App from "./App";
import { LoginPage } from "./pages/auth/Login";
import { SignUpPage } from "./pages/auth/SignUp";
import { LessonPage } from "./pages/LessonPage";
import { MainPage } from "./pages/MainPage";

export const routes = [
  {
    element: <App />,
    path: "/",
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "lessons/:slug",
        element: <LessonPage />,
      },
    ],
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <SignUpPage />,
    path: "/register",
  },
];
