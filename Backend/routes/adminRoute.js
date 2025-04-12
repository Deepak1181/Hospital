import express from "express"
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from "../controllers/adminController.js"
import upload from "../middleware/multer.js"
import authAdmin from "../middleware/authAdmin.js"
import { changeAvailablity } from "../controllers/doctorController.js"
const adminRouter = express.Router()


// adminRouter.post("/add-doctor",authAdmin,upload.single("image"), addDoctor)
adminRouter.post("/add-doctor",authAdmin,upload.single("image"), addDoctor)
adminRouter.post("/login", loginAdmin)
// adminRouter.post("/all-doctors",authAdmin,allDoctors)
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);

adminRouter.get("/appointments", authAdmin, appointmentsAdmin) //  api to get all
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel) 
adminRouter.get("/dashboard", authAdmin, adminDashboard) 


export default adminRouter



