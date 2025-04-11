import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { toast } from 'react-toastify'
const MyAppointment = () => {
  const { backendUrl,token , getDoctorsData} = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
const months =[ "" ,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
// const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const slotDateFormat =(slotDate)=>{
const dateArray = slotDate.split("_")
return dateArray[0]+" "+ months[ Number(dateArray[1])] + " " + dateArray[2]
}
  const getUserAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl+ `/api/user/appointments`, {
     
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      //  console.log(data,"data from my appointment")
      if(data.success){
        setAppointments(data.appointments.reverse())
        // console.log(data.appointments,"data from myAppointment page")
      }
      
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  } 




  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl+ `/api/user/cancel-appointment`, {appointmentId}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if(data.success){
        toast.success(data.message)
         getUserAppointments()
         getDoctorsData()
         setAppointments(appointments.filter(item => item._id !== appointmentId))
      }
    }
    catch (error) {
      toast.error("Error cancelling appointment:", error.response.data.message);
        console.error("Error cancelling appointment:", error);
    }
  } 

  // const cancelAppointment = async (appointmentId) => {
  //   try {
  //     const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, 
  //       { appointmentId },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
      
  //     if (data.success) {
  //       toast.success(data.message);
  //       getUserAppointments(); // refresh
  //       setAppointments(prev => prev.filter(item => item._id !== appointmentId));
  //     }
  //   } catch (error) {
  //     toast.error("Error cancelling appointment:", error.response.data.message);
  //     console.error("Error cancelling appointment:", error);
  //   }
  // };
  
  // const cancelAppointment = async (appointmentId) => {
  //   try {
  //     const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, 
  //       { appointmentId },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  
  //     if (data.success) {
  //       toast.success(data.message);
  //       getUserAppointments(); // Refresh list
  //     }
  //   } catch (error) {
  //     console.error("Error cancelling appointment:", error);
  //     toast.error("Failed to cancel appointment");
  //   }
  // };
  
useEffect(()=>{
if(token){
  getUserAppointments() 
}
},[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
            <div>
              <img  className="w-32 bg-indigo-50" src={item.docData.image} alt="Doctor" />
            </div>
            <div className='flex-1 text-sm text-zinc-'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p >{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address?.line1}</p>
              <p className='text-xs mt-1'>{item.docData.address?.line2}</p>
              <p className='text-xs mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {  slotDateFormat (item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center border  sm:min-w-48 py-2 hover:text-white  hover:bg-primary transition-all duration-500'>Pay Online</button>
              <button onClick={()=>cancelAppointment(item._id)}   className='text-sm text-stone-500 text-center border  sm:min-w-48 py-2 hover:text-white  hover:bg-red-500 transition-all duration-500'>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
