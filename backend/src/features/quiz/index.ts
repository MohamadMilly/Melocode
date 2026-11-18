import type { Feature } from "../../shared/types/feature.js";
import quizRouter from "./quiz.routes.js";

const quizFeature: Feature = {
  name: "quizzes",
  version: "1.0.0",
  enabled: true,
  router: quizRouter,
  path: "/quizzes",
};

export default quizFeature;
