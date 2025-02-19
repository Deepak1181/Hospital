import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"


const app = express()
const port =  process.env.PORT ||  4000    
connectDB() 
connectCloudinary()

//middleware
 app.use(express.json) 
 app.use(cors())
               
 //api endpoint

 app.get("/", (req,res)=>{
    res.send("Hello")
// console.log("server is running")
} )


app.listen(port,()=> console.log("server is running at port 4000"))