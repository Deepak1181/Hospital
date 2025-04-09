import doctorModel from "../models/doctorModel.js";

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

export {changeAvailablity,doctorList}