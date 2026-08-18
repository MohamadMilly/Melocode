import { HttpError } from "../../shared/errors/HttpError.js";
import { verify } from "../../shared/utils/auth/jwt.js";
export function getVerifyTokenMiddleware({ isOptional, }) {
    return function verifyToken(req, res, next) {
        try {
            const token = req.token;
            if (!token && !isOptional) {
                throw new HttpError(401, "Authentication token required");
            }
            if (token) {
                const authData = verify(token);
                if (authData) {
                    req.currentUser = authData;
                }
            }
            next();
        }
        catch (err) {
            if (!err.status) {
                err.status = 401;
            }
            if (isOptional) {
                next();
            }
            else
                next(err);
        }
    };
}
const optionalVerifyToken = getVerifyTokenMiddleware({ isOptional: true });
const mandatoryVerifyToken = getVerifyTokenMiddleware({ isOptional: false });
export { optionalVerifyToken, mandatoryVerifyToken };
