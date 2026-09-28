import App from "./App";
import { LoginPage } from "./pages/auth/Login";
import { SignUpPage } from "./pages/auth/SignUp";
import { LessonPage } from "./pages/app/LessonPage";
import { PathPage } from "./pages/app/PathPage";
import { PathsListPage } from "./pages/app/PathsListPage";
import { ProfilePage } from "./pages/app/ProfilePage";
import { ErrorPage } from "./components/shared/ui/NotFoundPage";
import { UsersLeaderBoardPage } from "./pages/app/UsersLeaderBoardPage";
import { AchievementsPage } from "./pages/app/AchievementsPage";
import { SettingsPage } from "./pages/app/SettingsPage";
import { LandingPage } from "./pages/LandingPage";
import { Suspense } from "react";
import { LessonSkeleton } from "./components/Lesson/skeleton/LessonSkeleton";
import { Navigate } from "react-router";
export const routes = [
  {
    element: <LandingPage />,
    path: "/",
    errorElement: <ErrorPage />,
  },

  {
    element: <App />,
    path: "/app",
    children: [
      {
        index: true,
        element: <Navigate to={"paths"} />,
      },
      {
        path: "paths",
        element: <PathsListPage />,
      },
      {
        path: "paths/:slug",
        element: <PathPage />,
      },
      {
        path: "lessons/:slug",
        element: (
          <Suspense fallback={<LessonSkeleton />}>
            <LessonPage />
          </Suspense>
        ),
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
      {
        path: "settings",
        element: <SettingsPage />,
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
