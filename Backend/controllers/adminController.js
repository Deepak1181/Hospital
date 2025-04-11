

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";
const addDoctor = async (req, res) => {
    try {
        // Trim keys to remove extra spaces
        // const formattedBody = Object.keys(req.body).reduce((acc, key) => {
        //     acc[key.trim()] = req.body[key];
        //     return acc;
        // }, {});

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // console.log("Received Data:", formattedBody);
        // console.log("Uploaded File:", imageFile);

        // Check if all required fields are present
        if (!name || !email  || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter an 8-character password" });
        }

        if (!imageFile) {
            return res.json({ success: false, message: "Image file is required" });
        }
        // Parse address JSON
        // try {
        //     address = JSON.parse(address);
        // } catch (error) {
        //     return res.json({ success: false, message: "Invalid address format" });
        // }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Create doctor object
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date: Date.now(),
        };



          // address:JSON.parse(address),
        // Save to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        return res.json({ success: true, message: "Doctor Added Successfully" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};




//  Api for Admin login

// const loginAdmin= async(req,res)=>{
// try {
//     const {email,password} = req.body

//     if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
//         const token = jwt.sign(email+password,process.env.JWT_SECRET)
//         res.json({success:true,token})
//     }else{
//         res.json({success:false,message:"Invalid Credentails"})
//     }
// } catch (error) {
//     return res.json({ success: false, message: error.message });
    
// }
// }



const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email: process.env.ADMIN_EMAIL }, 
                process.env.JWT_SECRET, 
              
              
            );

            // const token = jwt.sign(email+password,process.env.JWT_SECRET)

            return res.json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};




const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
        // return res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
         res.json({ success: false, message: error.message });
    }
};




//  Api to get all appointments list 
 const appointmentsAdmin = async(req,res)=>{
    try{

        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }   
    }





    // appointment cancel


    const appointmentCancel = async (req, res) => {
      try {
        const { appointmentId } = req.body;
        // const userId = req.userId; 
    
        // console.log("User from token:", userId); 
    
        const appointmentData = await appointmentModel.findByIdAndDelete(appointmentId);
    
       
    
        // ✅ Soft delete
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
    
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);
    
        if (doctorData && doctorData.slots_booked?.[slotDate]) {
          doctorData.slots_booked[slotDate] = doctorData.slots_booked[slotDate].filter(slot => slot !== slotTime);
          await doctorModel.findByIdAndUpdate(docId, { slots_booked: doctorData.slots_booked });
        }
    
        return res.json({ success: true, message: "Appointment cancelled successfully" });
    
      } catch (error) {
        console.log("Error in cancelAppointment:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }
    };

export { addDoctor,loginAdmin ,allDoctors, appointmentsAdmin, appointmentCancel};
