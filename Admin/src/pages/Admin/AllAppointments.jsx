import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import cancelicon from "../../../src/assets_admin/cancel_icon.svg"
const AllAppointments = () => {
  const {backendUrl,aToken , getAllAppointments , appointments,cancelAppointement } = useContext(AdminContext)
   const {calculateAge,slotDateFormat,currency} = useContext(AppContext)
// console.log(calculateAge,"calculateAge")

  useEffect(() => {
    getAllAppointments()
  }
  , [aToken])


  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className=' hidden  sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col  px-6 py-3 border-b'>
<p>#</p>
<p>Patient</p>
<p>Age</p>
<p>Date & Time</p>
<p> Doctor</p>
<p>Fees</p>
<p>Action</p>
        </div>

        {appointments.map((el,i)=>{
          return (
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={i}>
              <p className='max-sm-hidden'>{i+1}</p>
        <div className='flex gap-2 items-center'>
         <img className='w-8 rounded-full' src={el.userData.image} alt="" srcset="" />
        <p >{el.userData.name}</p>
       
        
        </div>

        <p  className='max-sm:hidden'> {calculateAge(el.userData.dob)} Years</p>
        <p>{slotDateFormat(el.slotDate)} , {el.slotTime}</p>
    
        <div className='flex gap-2 items-center'>
         <img className='w-8 rounded-full bg-gray-200' src={el.docData.image} alt="" srcset="" />
         <p  className='w-8 rounded-full' >{el.docData.name}</p>
        </div>
        <p> {currency}{el.amount}</p>
        {
          el.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : 
        <img  onClick={()=>cancelAppointement(el._id)} className='cursor-pointer' src={cancelicon} alt="" />
        }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllAppointments