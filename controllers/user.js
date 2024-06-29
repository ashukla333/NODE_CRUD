import mongoose from "mongoose"
import { users } from "../models/user.js"

export const getAllUser = async (req, res) => {
    const user = await users.find({})
    res.status(201).json({
        status: 200, data: { user },
        message: "succesfully fetch"
    })
}
export const getByID = async (req, res) => {
    try {
        const user = await users.findById(req.params.id)
        res.status(201).json({
            status: 200, data: { user },
            message: "succesfully fetch"
        })
    } catch (error) {
        console.log(error, "not working your code ")
    }
}
export const createUser = async (req, res) => {
    try {
        const { name, password, email, number } = req.body
        await users.create({ name, password, email, number })
        res.json({ status: 200, message: "succesfully done" }).status(201)
    } catch (error) {
        console.log(error, "f not done yet all")
    }
}
export const updateUser = async (req, res) => {
    try {
        const { name, password, email, number } = req.body
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const updatedCode = await users.findByIdAndUpdate(req.params.id, { name, password, email, number }, { new: true })
            res.json({ status: 200, message: "succesfully done", data: { updatedCode }, }).status(201)
        } else {
            res.json({ status: 200, message: `${req.params.id} id is not match ` }).status(400)
        }
    } catch (error) {
        console.log(error, "f not done yet all")
    }
}
export const deleteUser = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            await users.findByIdAndDelete(req.params.id)
            res.json({ status: 200, message: "deleted succesfully " }).status(201)
        } else {
            res.json({ status: 200, message: `${req.params.id} id is not match ` }).status(400)
        }
    } catch (error) {
        console.log(error, "f not done yet all")
    }
}