import mongoose from "mongoose"

export const connectDb = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "userData"
    }).then(() => {
        console.log("db connected broh")
    }).catch((e) => {
        console.log(e, "shiit yr nhi connect hua ")
    })
}