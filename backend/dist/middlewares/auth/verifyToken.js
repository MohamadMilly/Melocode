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
                if (authData.tokenType !== "access") {
                    res.status(401).json({
                        message: "Refresh the token then send accessToken to access protected routes.",
                    });
                    return;
                }
                if (authData) {
                    req.currentUser = authData;
                    req.authStatus = "Authorized";
                }
            }
            else {
                req.authStatus = "UnAuthorized";
            }
            next();
        }
        catch (err) {
            if (!err.status) {
                err.status = 401;
            }
            if (isOptional) {
                req.authStatus = "UnAuthorized";
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
