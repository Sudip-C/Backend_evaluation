const express=require("express")
const { connection } = require("./configs/db")
const { userRouter } = require("./Routes/UserRoutes")
require("dotenv").config()
const cors=require("cors")
const { auth } = require("./Middleware/Authentication")
const { postRoute } = require("./Routes/PostRoute")


const app=express()
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use(auth)
app.use("/posts",postRoute)


app.listen(process.env.Port,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (err) {
        console.log(err)
    }
})