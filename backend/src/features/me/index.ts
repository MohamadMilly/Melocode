import type { Feature } from "../../shared/types/feature.js";
import meRouter from "./me.routes.js";

const meFeature: Feature = {
  name: "me",
  version: "1.0.0",
  enabled: true,
  router: meRouter,
  path: "/me",
};

export default meFeature;
