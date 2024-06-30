import jwt, { decode } from "jsonwebtoken";
import { users } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({ status: 404, message: "login Again" });
    }

    const decoded = await decode(token, process.env.JsonWEBToken)
    req.user = await users.findOne({ email: decoded.email })
    next()
}