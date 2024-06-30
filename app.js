import express from 'express';
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser'
export const app = express()
// 

configDotenv({
    path: "./data/config.env"
})
// using middleware 
app.use(express.json())
app.use(cookieParser())
app.use("/users", userRouter)
app.use("/task", taskRouter)
// 

app.get('/', (req, res) => {
    res.send("welcome")
})


