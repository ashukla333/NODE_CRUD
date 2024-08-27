
// import jwt from "jsonwebtoken";
// import { users } from "../models/user.js";

// export const isAuthenticated = async (req, res, next) => {
//     const token = req.cookies.AuthToken; // Ensure this matches the cookie name
// console.log(token,"token")
//     if (!token) {
//         return res.status(401).json({ status: 401, message: "Please log in again" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JsonWEBToken); // Ensure correct secret key
//         console.log("Decoded token:", decoded);
//         req.user = await users.findOne({ email: decoded.email });
//         console.log("Authenticated user:", req.user);
//         if (!req.user) {
//             return res.status(401).json({ status: 401, message: "User not found" });
//         }

//         next();
//     } catch (error) {
//         console.error("Authentication error:", error.message);
//         return res.status(401).json({ status: 401, message: "Invalid or expired token" });
//     }
// };
import jwt from "jsonwebtoken";
import { users } from "../models/user.js";
export const isAuthenticated = async (req, res, next) => {
    // Extract token from cookies or Authorization header
    const token = req.cookies.AuthToken || req.headers.authorization?.split(" ")[1];
    console.log("Extracted token:", token);

    if (!token) {
        return res.status(200).json({ status: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JsonWEBToken);
        console.log("Decoded token:", decoded);

        req.user = await users.findOne({ email: decoded.email });
        console.log("Authenticated user:", req.user);

        if (!req.user) {
            return res.status(200).json({ status: false, message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(200).json({ status: false, message: "Invalid or expired token" });
    }
};
