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
//  app.use(cors({
//     origin: ["*"], 
//     methods: ["GET", "POST", "PUT", "DELETE","UPDATE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   }));
  
               
//  api endpoint
 app.use("/api/admin",adminRouter)
//  localhost:4000/api/admin
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

 app.get("/", (req,res)=>{
    res.send("Hello Doctors")
// console.log("server is running")
} )




app.listen(port,()=> console.log("server is running at port 4000"))





// import express from "express"
// import cors from "cors"
// import dotenv from "dotenv";
// import connectDB from "./config/mongodb.js"
// import connectCloudinary from "./config/cloudinary.js"
// import adminRouter from "./routes/adminRoute.js"
// import doctorRouter from "./routes/doctorRoute.js"
// import userRouter from "./routes/userRoutes.js"

// dotenv.config();

// const app = express()

// connectDB() 
// connectCloudinary()

// app.use(express.json()) 
// app.use(cors({
//     origin: ["*"], 
//     methods: ["GET", "POST", "PUT", "DELETE","UPDATE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use("/api/admin", adminRouter)
// app.use('/api/doctor', doctorRouter)
// app.use('/api/user', userRouter)

// app.get("/", (req, res) => {
//     res.send("Hello from Vercel Serverless Backend!");
// })

// // ✅ This is the key change: export the app
// export default app;


