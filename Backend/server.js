import express from "express"
import cors from "cors"
// import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import dotenv from "dotenv";
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoutes.js"
dotenv.config();  


const app = express()
const port =  process.env.PORT || 4000    
connectDB() 
connectCloudinary()

//middleware
 app.use(express.json()) 
 app.use(cors())
               
//  api endpoint
 app.use("/api/admin",adminRouter)
//  localhost:4000/api/admin
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

 app.get("/", (req,res)=>{
    res.send("Hello")
// console.log("server is running")
} )




app.listen(port,()=> console.log("server is running at port 4000"))










// import express from "express";
// import cors from "cors";
// import "dotenv/config";

// const app = express();
// const port = process.env.PORT || 8000;

// // Middleware
// app.use(express.json());  // ✅ FIXED
// app.use(cors());

// // API Endpoint
// app.get("/", (req, res) => {
//     res.send("Hello, Server is Running!");
// });

// // Start Server
// app.listen(port, () => console.log(`Server is running at port ${port}`));  // ✅ FIXED
