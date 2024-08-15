
import jwt from "jsonwebtoken";

export const generateCookie = (email) => {

    // Generate JWT token
    const token = jwt.sign({ email  }, process.env.JsonWEBToken, { expiresIn: '24h' });
    // console.log(token, "token");

    return token

}


