import express from "express"
import { doctorList } from "../controllers/doctorController.js"

const doctorRouter = express.Router()


// adminRouter.post("/add-doctor",authAdmin,upload.single("image"), addDoctor)
doctorRouter.get("/list",doctorList)



export default doctorRouter



