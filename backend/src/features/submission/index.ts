import type { Feature } from "../../shared/types/feature.js";
import submissionRouter from "./submission.routes.js";

const submissionFeature: Feature = {
  name: "submissions",
  version: "1.0.0",
  enabled: true,
  router: submissionRouter,
  path: "/quizzes",
};

export default submissionFeature;
