import type { Feature } from "../../shared/types/feature.js";
import userRouter from "./user.routes.js";

const userFeature: Feature = {
  name: "users",
  version: "1.0.0",
  enabled: true,
  path: "/users",
  router: userRouter,
};

export default userFeature;
