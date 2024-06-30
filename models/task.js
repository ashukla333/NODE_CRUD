import mongoose, { Types } from "mongoose"
// schema
const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    },
    title: {
        type: String,
        reduired: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    }
    ,
    isCompleted: {
        type: Boolean,
        default: false
    },
    number: {
        type: Number,
        reduired: true,
        unique: true

    },
    createdAT: {
        type: Date,
        default: Date.now
    }
})
// modal
export const users = mongoose.model("task", userSchema)

