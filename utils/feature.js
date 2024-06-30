import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const sendCokie = (user, res, message, status = 200) => {

    // Generate JWT token
    const token = jwt.sign({ email: user.email  }, process.env.JsonWEBToken, { expiresIn: '24h' });
    // console.log(token, "token");

    // Send response with token
    return res.cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    }).status(status).json({ status: status, message: message });
}