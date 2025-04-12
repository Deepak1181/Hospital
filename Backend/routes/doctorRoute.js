import express from "express"
import { doctorList, loginDoctor } from "../controllers/doctorController.js"

const doctorRouter = express.Router()


// adminRouter.post("/add-doctor",authAdmin,upload.single("image"), addDoctor)
doctorRouter.get("/list",doctorList)
doctorRouter.post("/login",loginDoctor)





export default doctorRouter



