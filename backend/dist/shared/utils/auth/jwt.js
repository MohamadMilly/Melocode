import "dotenv/config";
import jwt from "jsonwebtoken";
import { HttpError } from "../../errors/HttpError.js";
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is required , please add this env variable in .env first.");
}
export function sign(payload, options = {}) {
    return jwt.sign(payload, SECRET_KEY, options);
}
export function verify(token, options = {}) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY, {
            clockTolerance: 60,
            ...options,
        });
        if (typeof decoded === "string") {
            throw new Error("Token payload is a raw string, expected an object.");
        }
        return decoded;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Token invalid or expired";
        throw new HttpError(401, `Unauthorized: ${message}`);
    }
}
