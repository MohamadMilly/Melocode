import App from "./App";
import { LoginPage } from "./pages/auth/Login";
import { SignUpPage } from "./pages/auth/SignUp";
import { LessonPage } from "./pages/app/LessonPage";
import { MainPage } from "./pages/app/MainPage";
import { ProfilePage } from "./pages/app/ProfilePage";
import { ErrorPage } from "./components/shared/ui/NotFoundPage";
import { UsersLeaderBoardPage } from "./pages/app/UsersLeaderBoardPage";
import { AchievementsPage } from "./pages/app/AchievementsPage";

export const routes = [
  {
    element: <App />,
    path: "/",
    errorElement: <ErrorPage />,
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
      {
        path: "leaderboard",
        element: <UsersLeaderBoardPage />,
      },
      {
        path: "achievements",
        element: <AchievementsPage />,
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
