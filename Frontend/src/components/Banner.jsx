import React from 'react'
import appointmentImage from "../pres_Scripto/assets/assets_frontend/appointment_img.png";
import { useNavigate } from 'react-router-dom';
const Banner = () => {
     const navigate = useNavigate()
  return (
    <div className='flex   bg-primary rounded-lg px-6 sm:px-10 md:px-14  lg:px-12 my-20 md:mx-10'>
   <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
   <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold '>
    <p>Book Appointment</p>
    <p className='mt-4'> With 100+ Trusted Doctor</p>
   </div>
   <button onClick={()=>{navigate("/login");scrollTo(0,0)}} className='bg-white mt-5 text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full'>Create account</button>
   </div>
   <div className='hidden md:block md:w-[250px] lg:w-[370px] relative '>
    <img className='w-full absolute bottom-0 right-0 max-w-md' src={appointmentImage} alt="" />
   </div>
    </div>
  )
}

export default Banner