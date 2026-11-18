import type { Feature } from "../../shared/types/feature.js";
import lessonRouter from "./lesson.routes.js";

const lessonFeature: Feature = {
  name: "lessons",
  version: "1.0.0",
  enabled: true,
  path:"/lessons",
  router: lessonRouter,
};

export default lessonFeature;
