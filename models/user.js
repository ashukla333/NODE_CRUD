import mongoose, { Types, now } from "mongoose"
// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        reduired: true
    },
    email: {
        type: String,
        reduired: true,
        unique: true
    },
    password: {
        type: String,
        select: false

    },
    createdAT: {
        type: Date,
        default: Date.now
    }
})
// modal
export const users = mongoose.model("users", userSchema)

