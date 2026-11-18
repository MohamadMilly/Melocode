import type { Feature } from "../../shared/types/feature.js";
import pathRouter from "./path.routes.js";

const pathFeature: Feature = {
  name: "paths",
  version: "1.0.0",
  enabled: true,
  router: pathRouter,
  path: "/paths",
};

export default pathFeature;
