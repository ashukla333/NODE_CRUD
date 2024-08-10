import express from 'express';
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import brandRouter from './routes/brand.js'
import categoryRouter from './routes/category.js'
import productRouter from './routes/product.js'
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors';
export const app = express()
// 

app.use(cors({
    
    origin: 'http://localhost:3000', // Replace with your client URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
configDotenv({
    path: "./data/config.env"
})

// // server.js or app.js
// app.use((req, res, next) => {
//     res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
//     next();
//   });

  
// using middleware 
app.use(express.json())
app.use(cookieParser())
app.use("/users", userRouter)
app.use("/task", taskRouter)
app.use("/v1/brand", brandRouter)
app.use("/v1/category", categoryRouter)
app.use("/v1/product", productRouter)
// 

app.get('/', (req, res) => {
    res.send("welcome")
})


