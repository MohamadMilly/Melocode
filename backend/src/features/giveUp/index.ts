import type { Feature } from "../../shared/types/feature.js";
import giveUpRouter from "./giveUp.routes.js";

const giveUpFeature: Feature = {
  name: "give-ups",
  version: "1.0.0",
  enabled: true,
  router: giveUpRouter,
  path: "/quizzes",
};

export default giveUpFeature;
