import type { Router, Express } from "express";
import type { Feature } from "../shared/types/feature.js";
import achievementFeature from "./achievement/index.js";
import authFeature from "./auth/index.js";
import giveUpFeature from "./giveUp/index.js";
import lessonFeature from "./lesson/index.js";
import meFeature from "./me/index.js";
import pathFeature from "./path/index.js";
import progressFeature from "./progress/index.js";
import quizFeature from "./quiz/index.js";
import submissionFeature from "./submission/index.js";
import testCaseFeature from "./testCase/index.js";
import userFeature from "./user/index.js";

export const features: Feature[] = [
  achievementFeature,
  authFeature,
  userFeature,
  lessonFeature,
  progressFeature,
  quizFeature,
  testCaseFeature,
  submissionFeature,
  giveUpFeature,
  meFeature,
  pathFeature,
];

export function getEnabledFeatures(features: Feature[]) {
  return features.filter((feature) => feature.enabled === true);
}

export function registerFeatures(app: Express, features: Feature[]): void {
  const enabledFeatures = features.filter((f) => f.enabled);

  enabledFeatures.forEach((feature) => {
    app.use(feature.path,feature.router);
  });
}
