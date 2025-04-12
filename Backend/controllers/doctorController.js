import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const changeAvailablity = async(req,res)=>{
    try {
        const {docId}  = req.body
       const docData = await doctorModel.findById(docId)
       await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
       res.json({success:true,message:"Availablity Changed"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message });
    }
}




const doctorList  = async(req,res) =>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})

    } catch (error) {
          console.log(error)
        return res.status(500).json({ success: false, message: error.message });
    }
}



//  api for doctor login

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        // if (!email || !password) {
        //     return res.status(400).json({ success: false, message: "Please provide email and password" });
        // }
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        const isMatch = await   bcrypt.compare(password,doctor.password);
        if (!isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
           
            res.json({ success: true, token });
        }else{
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {changeAvailablity,doctorList,loginDoctor}