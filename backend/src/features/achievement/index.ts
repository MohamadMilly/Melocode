import type { Feature } from "../../shared/types/feature.js";
import achievementRouter from "./achievement.routes.js";
import "./events/listeners.js";

const achievementFeature: Feature = {
  name: "achievements",
  version: "1.0.0",
  enabled: true,
  router: achievementRouter,
  path: "/achievements",
};

export default achievementFeature;
