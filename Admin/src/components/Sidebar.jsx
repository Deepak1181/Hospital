import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import dashboard from "../assets_admin/home_icon.svg"; 
import appointment from "../assets_admin/appointment_icon.svg"; 
import addicon from "../assets_admin/add_icon.svg";
import peopleIcon from "../assets_admin/people_icon.svg";
// import Logo from "../assets_admin/admin_logo.svg"; 
import Logo from "../assets_admin/admin_logo.svg"; 

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
  return (
    <div className='min-h-screen bg-white border-r w-1/5'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary ":""}`} to={'/admin-dashboard'}>
            <img src={dashboard}  />
            <p>Dashboard</p>
           </NavLink>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary ":""}`}  to={'/all-appointments'}>
            <img src={appointment}   />
            <p>Appointment</p>
           </NavLink>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary ":""}`}  to={'/add-doctor'}>
           <img src={addicon}  />
            <p>Add Doctor</p>
           </NavLink>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary ":""}`} to={'/doctor-list'}>
            <img src={peopleIcon}  />
            <p>Doctor List</p>
           </NavLink>
        </ul>
      }


  
    </div>
  )
}

export default Sidebar