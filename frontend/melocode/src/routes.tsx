import App from "./App";
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
];
