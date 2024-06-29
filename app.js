import express from 'express';
import userRouter from './routes/user.js'
import { configDotenv } from 'dotenv';


export const app = express()
// 

configDotenv({
    path:"./data/config.env"
})
// using middleware 
app.use(express.json())
app.use("/users", userRouter)
// 

app.get('/', (req, res) => {
    res.send("welcome")
})


