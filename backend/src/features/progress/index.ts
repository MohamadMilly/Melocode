import type { Feature } from "../../shared/types/feature.js";
import NestedprogressRouter from "./progress.routes.js";

const progressFeature: Feature = {
  name: "progresses",
  version: "1.0.0",
  enabled: true,
  router: NestedprogressRouter,
  path: "/lessons/:slug/progresses",
};

export default progressFeature;
