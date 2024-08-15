import mongoose from "mongoose";
import { users } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { generateCookie } from "../utils/feature.js";

export const ragisterUser = async (req, res) => {
  try {
    const { username, password, confirmPassword, email } = req.body;

    // Check if all fields are present
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ status: 400, message: "All fields are required" });
    }

    // Check if email is already in use
    let emailAvl = await users.findOne({ email });
    if (emailAvl) {
      return res
        .status(409)
        .json({ status: 409, message: `${email} is already in use` });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: 400, message: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await users.create({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ status: 201, message: "Successfully registered. Good Luck!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailVerify = await users.findOne({ email }).select("+password");
    if (!emailVerify) {
      return res.status(404).json({ status: 404, message: "Email not found" });
    }
    const passwordVerify = await bcrypt.compare(password, emailVerify.password);
    if (!passwordVerify) {
      return res
        .status(401)
        .json({ status: false, message: "Incorrect password" });
    }
    const token = generateCookie(emailVerify?.email, res);

    res.cookie('AuthToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: 'Lax',
    });

    return res.status(200).json({
      status: true,
      message: "Welcome :) login sucsessfully!",
      token,
    });
    
    // sendCokie(emailVerify, res, `Welcome Back ${emailVerify.username}`)
  } catch (error) {
    console.log(error, "Error, please check again");
    return res.status(500).json({ status: 500, message: "Server error" });
  }
};

export const logOutUser = (req, res) => {
  try {

    const  token  = req.cookies.AuthToken;

    if (token) {
      return res
        .cookie("AuthToken", null, {
          httpOnly: true,
          expires: new Date(Date.now()),
        })
        .status(200)
        .json({ status: 200, message: "Logout sucssesfully done " });
    } else {
      return res.status(200).json({ status: 200, message: "already logout " });
    }
  } catch (error) {
    console.log(error);
  }
};

// export const MyprofileDetail = async (req, res) => {
//   try {
//     if (req.user) {
//       const name=users.name
//       return res.status(201).json({
//         status: true,
//         message: "sucssesfully done",
//         data: {
//           user: req.user,name
//         },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const MyprofileDetail = async (req, res) => {
  try {
    const token = req.cookies.AuthToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JsonWEBToken); // Ensure JWT_SECRET is your secret key used during token generation

    const user = await users.findOne({ email: decoded.email }); // Use `email` or `id` depending on your token payload structure
    console.log({user})
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Successfully retrieved user profile details",
      data: {
        user,
        name: user.name, // Directly get the name from the user object
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while retrieving profile details",
    });
  }
};