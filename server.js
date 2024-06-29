import {  app } from "./app.js";
import { connectDb } from "./data/database.js";

// db connection
connectDb()

app.listen(process.env.PORT, () => {
    console.log("YOO BOY... server is started")
})