import { eventEmitter } from "../lib/eventEmitter.js";
import {
  handleProgressAchievement,
  handleSubmissionAchievement,
} from "./handlers.js";

eventEmitter.on("submission-created", handleSubmissionAchievement);
eventEmitter.on("lesson-completed", handleProgressAchievement);
