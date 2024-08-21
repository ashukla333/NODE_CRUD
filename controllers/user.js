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
      return res.status(401).json({ status:false, message: "Invalid email " });
    }
    const passwordVerify = await bcrypt.compare(password, emailVerify.password);
    if (!passwordVerify) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid  password" });
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
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

export const logOutUser = (req, res) => {
  try {
    // Check if the AuthToken cookie exists
    const token = req.cookies.AuthToken;

    if (token) {
      // Clear the AuthToken cookie by setting it to null and expiring it immediately
      res.cookie("AuthToken", null, {
        httpOnly: true,
        expires: new Date(Date.now()), // Set the cookie to expire immediately
        sameSite: 'Lax', // Add sameSite attribute for better security
        secure: process.env.NODE_ENV === 'production', // Use secure flag only in production
      });

      // Send success response
      return res.status(200).json({ status: 200, message: "Logout successfully done" });
    } else {
      // If there's no token, it means the user is already logged out
      return res.status(200).json({ status: 200, message: " logged out successfully" });
    }
  } catch (error) {
    console.error("Logout error:", error.message);

    // Send an error response if something goes wrong
    return res.status(500).json({ status: false, message: "Server error during logout" });
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
        name: users.name, // Directly get the name from the user object
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