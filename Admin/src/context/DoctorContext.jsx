import axios from "axios";
import { createContext, useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const  DoctorContext=createContext()

const DoctorContextProvider=(props)=>{

const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [dToken,setDToken] =  useState(localStorage.getItem('dToken') || "");
   const [appointments,setAppointments] = useState([])

   const getAppointments = async () => {
    try {
        const { data } = await axios.get( backendUrl + '/api/doctor/appointments', {
            headers: {
                Authorization: `Bearer ${dToken}`,
            },
        });
       if(data.success){
            setAppointments(data.appointments)
            toast.success(data.message)
            console.log(data.appointments)
       }

       else{
        toast.error(data.message)
       }

    } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error(error.response?.data?.message || error.message);
    }
}


const value={
    dToken,
    setDToken,
    backendUrl, appointments,setAppointments,getAppointments
}


return(
    <DoctorContext.Provider  value={value}>
        {props.children}
        </DoctorContext.Provider>

)
}

export default DoctorContextProvider