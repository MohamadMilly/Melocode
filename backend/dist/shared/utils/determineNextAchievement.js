import { convertFrequency, frequencyToNumber, } from "../constants/achievementsConstants.js";
export function determineNextAchievement(lastAchievement, correctSubmissionsCount) {
    const numberFrequency = lastAchievement
        ? frequencyToNumber[lastAchievement.frequency]
        : 1;
    const isToCreate = !lastAchievement || correctSubmissionsCount / numberFrequency >= 10;
    if (!isToCreate) {
        return { isToCreate: false };
    }
    const nextFrequency = (!lastAchievement ? "ONE" : convertFrequency(numberFrequency * 10));
    return { isToCreate: true, nextFrequency };
}
