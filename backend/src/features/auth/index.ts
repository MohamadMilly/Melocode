import type { Feature } from "../../shared/types/feature.js";
import authRouter from "./auth.routes.js";

const authFeature: Feature = {
  name: "auth",
  version: "1.0.0",
  enabled: true,
  path: "/auth",
  router: authRouter,
};

export default authFeature;
