import type { Feature } from "../../shared/types/feature.js";
import testCaseRouter from "./testCase.routes.js";

const testCaseFeature: Feature = {
  name: "test-cases",
  version: "1.0.0",
  enabled: true,
  router: testCaseRouter,
  path: "/quizzes",
};

export default testCaseFeature;
