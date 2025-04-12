import express from "express"
import { appointementDoctor, doctorList, loginDoctor } from "../controllers/doctorController.js"
import authDoctor from "../middleware/authDoctor.js"

const doctorRouter = express.Router()


// adminRouter.post("/add-doctor",authAdmin,upload.single("image"), addDoctor)
doctorRouter.get("/list",doctorList)
doctorRouter.post("/login",loginDoctor)
doctorRouter.get("/appointments", authDoctor, appointementDoctor)






export default doctorRouter



