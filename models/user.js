import mongoose from "mongoose"
// schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    number: Number,
})
// modal
export const users = mongoose.model("users", userSchema)

