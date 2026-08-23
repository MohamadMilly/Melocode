import App from "./App";
import { LoginPage } from "./pages/auth/Login";
import { SignUpPage } from "./pages/auth/SignUp";
import { LessonPage } from "./pages/app/LessonPage";
import { MainPage } from "./pages/app/MainPage";
import { ProfilePage } from "./pages/app/ProfilePage";

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
      {
        path: "profile",
        element: <ProfilePage />,
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
