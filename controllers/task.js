import { task } from "../models/task.js"


export const AddTask = async (req, res) => {
    try {

        const { description, title } = req.body
        const tasks = await task.create({ description, title, user: req.user })
        if (description && title) {
            res.status(200).json({
                status: true,
                message: "task created sucsessfully",
                data: { tasks }
            })
        } else {
            res.json({
                status: true,
                message: "check again title & description missing",
            })
        }
    } catch (error) {
        console.log(error)
    }
}



export const allList = async (req, res) => {
    try {
        const taskList = await task.find({})
        if (taskList) {
            res.status(200).json({
                status: true,
                message: "task fetched sucsessfully",
                data: { tasks: taskList }
            })
        } else {
            res.status(402).json({
                status: false,
                message: "task not sucsessfully",
                data: { tasks: null }
            })
        }

    } catch (error) {
        console.log(error, "error")
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const taskList = await task.findByIdAndDelete({ _id: id })
        if (taskList) {
            res.status(200).json({
                status: true,
                message: "task Deleted sucsessfully",

            })
        } else {
            res.status(402).json({
                status: false,
                message: "task not deleted sucsessfully",

            })
        }

    } catch (error) {
        console.log(error, "error")
    }
}



export const updatedTask = async (req, res) => {
    try {
        const { id } = req.params
        const { } = req.body
        const taskList = await task.findByIdAndUpdate({ _id: id })
        taskList.isCompleted = !taskList.isCompleted;
        await taskList.save();
        if (taskList) {
            res.status(200).json({
                status: true,
                message: "task updated sucsessfully",
            })
        } else {
            res.status(402).json({
                status: false,
                message: "task not updated sucsessfully",

            })
        }

    } catch (error) {
        console.log(error, "error")
    }
}
