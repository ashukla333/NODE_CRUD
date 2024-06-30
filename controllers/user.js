import mongoose from "mongoose"
import { users } from "../models/user.js"
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { sendCokie } from "../utils/feature.js";

export const ragisterUser = async (req, res) => {
    try {
        const { name, password, email } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        let emailAvl = await users.findOne({ email });
        if (!name || !password || !email) {
            return res.status(400).json({ status: 400, message: "All fields are required" });
        }
        if (emailAvl) {
            res.json({ status: 200, message: `${email} email is already exist` }).status(201)
        } else {
            await users.create({ name, email, password: hashedPassword })
            res.json({ status: 200, message: "succesfully register Good Luck -_-" }).status(201)
        }
    } catch (error) {
        console.log(error, "f not done yet all")
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailVerify = await users.findOne({ email }).select("+password");
        if (!emailVerify) {
            return res.status(404).json({ status: 404, message: "Email not found" });
        }
        const passwordVerify = await bcrypt.compare(password, emailVerify.password);
        if (!passwordVerify) {
            return res.status(401).json({ status: 401, message: "Incorrect password" });
        }
        sendCokie(emailVerify, res, `Welcome Back ${emailVerify.name}`)
    } catch (error) {
        console.log(error, "Error, please check again");
        return res.status(500).json({ status: 500, message: "Server error" });
    }
}

export const logOutUser = (req, res) => {
    try {
        const { token } = req.cookies
        if (token) {
            return res.cookie("token", null, {
                httpOnly: true,
                expires: new Date(Date.now())
            }).status(200).json({ status: 200, message: "Logout sucssesfully done " });
        }else{
            return res.status(500).json({ status: 500, message: "already logout " });
        }

    } catch (error) {
        console.log(error)
    }
}

export const MyprofileDetail = async (req, res) => {
    try {
        // const myuser = await users.findOne({ email: req.user })
        if (req.user) {
            return res.status(201).json({
                status: 201, message: "sucssesfully done", data: {
                    user: req.user
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
}
