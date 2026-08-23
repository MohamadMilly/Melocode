import { matchedData } from "express-validator";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../shared/errors/HttpError.js";
import { sign, verify } from "../shared/utils/auth/jwt.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
    const { password, username, fullname } = matchedData(req);
    const user = await prisma.user.create({
        data: {
            password: await bcrypt.hash(password, 10),
            username,
            fullname,
            profile: {
                create: {},
            },
        },
    });
    const jwtPayload = {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        createdAt: user.createdAt,
    };
    const accessToken = sign(jwtPayload, { expiresIn: "15min" });
    const refreshToken = sign(jwtPayload, { expiresIn: "7d" });
    res.json({ user: jwtPayload, accessToken, refreshToken });
};
export const login = async (req, res) => {
    const { username, password } = matchedData(req);
    const user = await prisma.user.findUnique({
        where: { username },
    });
    if (!user) {
        throw new HttpError(400, "اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new HttpError(400, "اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
    const jwtPayload = {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        createdAt: user.createdAt,
    };
    const accessToken = sign(jwtPayload, { expiresIn: "15min" });
    const refreshToken = sign(jwtPayload, { expiresIn: "7d" });
    res.json({ user: jwtPayload, accessToken, refreshToken });
};
export const refreshToken = async (req, res) => {
    const { refreshToken: token } = req.body;
    if (!refreshToken) {
        return res.status(401).json({
            message: "UnAuthorized: refreshToken is required.",
        });
    }
    const payload = verify(token);
    const { exp, iat, ...clearnPayLoad } = payload;
    const accessToken = sign(clearnPayLoad, { expiresIn: "15min" });
    res.json({
        accessToken: accessToken,
    });
};
