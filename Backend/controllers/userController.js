// import validator  from "validator"
// import bycrypt from "bcrypt"
// import userModel from "../models/userModel.js"
// import jwt from 'jsonwebtoken'
// const registerUser = async(req,res)=>{
//     try {
//         const {name,email,password} = req.body
//          if(!name || !email || !password){
//             return res.json({  success:false, message:"Please fill in all fields"})
//          }


//          if(!validator.isEmail(email)){
//             return res.json({  success:false, message:"enter valid email"})

//          }
//          if(password.length<8){
//             return res.json({  success:false, message:"enter strong and 8 dight password"})

//          }

//         //  hashing user password 

//         const salt= await bycrypt.genSalt(10)
//         const hashedPassword = await bycrypt.hash(password,salt)

//         const userData = {
//             name,email,password:hashedPassword
//         }

//         const newUser = new userModel(userData)
//         const user = await newUser.save()
  
//         // _id  create token so user can login



//         const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
//         res.json({success:true,token})

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ success: false, message: error.message });
//     }
// }


// export {registerUser}











import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const userData = { name, email, password: hashedPassword };
        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({ success: true, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//  Api for userlogin

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"User doest not exist "})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({success:true,token})

        }else{
            res.json({success:false,message:"invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}




//Api to get user data 




const getProfile = async (req, res) => {
    try {
      const userId = req.userId; // Correct way to access userId
  
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID not found' });
      }
  
      const userData = await userModel.findById(userId).select('-password');
      
      if (!userData) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json({ success: true, userData });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  

//   api to update userProfile 

// const updateProfile = async (req, res) => {
//     try {
//         const userId = req.userId; 
//         const {name,phone,address,dob,gender} = req.userId; 
//            const imageFile = req.imageFile



//         if (!userId || !phone || !address  || !dob  || !gender) {
//             return res.status(400).json({ success: false, message: 'User ID not found' });
//         }

//         await userModel.findByIdAndUpdate(userId, { name,phone,address:JSON.parse(address) ,dob,gender}, { new: true }).select('-password');
//          if(imageFile){
//             // upload image to claudinary 
//             const imageUpload = await cloudinary.uploader.upload(imageFile.path, {  resource_type: 'image', })
//             const imageURL = imageUpload.secure_url
//             await userModel.findByIdAndUpdate(userId, { image:imageURL });
//          }  
      

//          return res.status(500).json({ success: false, message: 'Profile updated' });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// }

const updateProfile = async (req, res) => {
    try {
      const userId = req.userId;
      const { name, phone, addressLine1, addressLine2, dob, gender } = req.body;
      const imageFile = req.file;
  
      if (!userId || !phone || !addressLine1 || !dob || !gender) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
  
      const address = {
        line1: addressLine1,
        line2: addressLine2,
      };
  
      await userModel.findByIdAndUpdate(
        userId,
        { name, phone, address, dob, gender },
        { new: true }
      );
  
      if (imageFile) {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageURL = imageUpload.secure_url;
        await userModel.findByIdAndUpdate(userId, { image: imageURL });
      }
  
      return res.status(200).json({ success: true, message: 'Profile updated' });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  


//    Api to book appointment

const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime, userId } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData.available) {
            return res.status(400).json({ success: false, message: 'Doctor is not available' });
        }
        const slots_booked = docData.slots_booked ;
        // checking for slot availability
        // if (slots_booked[slotDate] && slots_booked[slotDate][slotTime]) {
        //     return res.status(400).json({ success: false, message: 'Slot is already booked' });
        // }
        if (slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){ 
                return res.status(400).json({ success: false, message: 'Slot is not available' });
            }
            else {
           slots_booked[slotDate].push(slotTime);
            }
            
           
        }
        else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }
        
        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            slotTime,
            slotDate,
            amount: docData.fees,
            date: Date.now(),
        };

        const  newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();
        // save new slot data in doctor data
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.status(201).json({ success: true, message: 'Appointment booked successfully' });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message }); 
    }
};

// const bookAppointment = async (req, res) => {
//     try {
//         const { docId, slotDate, slotTime, userId } = req.body;

//         const docData = await doctorModel.findById(docId).select('-password').lean();
//         if (!docData.available) {
//             return res.status(400).json({ success: false, message: 'Doctor is not available' });
//         }

//         const slots_booked = docData.slots_booked || {};

//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.status(400).json({ success: false, message: 'Slot is already booked' });
//             }
//             slots_booked[slotDate].push(slotTime);
//         } else {
//             slots_booked[slotDate] = [slotTime];
//         }

//         const userData = await userModel.findById(userId).select('-password');

//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData,
//             slotDate,
//             slotTime,
//             amount: docData.fees,
//             date: Date.now(),
//         };

//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         return res.status(201).json({ success: true, message: 'Appointment booked successfully' });

//     } catch (error) {
//         console.error('Error booking appointment:', error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// const getProfile = async(req,res)=>{
// try {
     
//     const {userId} = req.body 

//     // user give the token  by using token we get user ID 
//     // const token = req.header('Authorization').replace('Bearer ', '');
//     const userData = await userModel.findById(userId).select('-password')
//     res.json({success:true,userData})
     

// } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
// }
// }

export { registerUser,loginUser ,getProfile,updateProfile, bookAppointment};
