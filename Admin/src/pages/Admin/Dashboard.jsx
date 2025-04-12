import React, { useContext, useEffect } from "react";
import doctoricon from "../../../src/assets_admin/doctor_icon.svg";
import appointmentsicon from "../../../src/assets_admin/appointments_icon.svg";

import patientsicon from "../../../src/assets_admin/patients_icon.svg";
import listicon from "../../../src/assets_admin/list_icon.svg";


import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
const Dashboard = () => {
  const { backendUrl, aToken, dashData, getDashData, cancelAppointement } =
    useContext(AdminContext);

const {slotDateFormat} = useContext(AppContext)
    
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);



  return (
    dashData && (
      <div className="m-5">
        <div  className="flex flex-wrap gap-5">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
            <img className="w-14" src={doctoricon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.doctors}</p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">

            <img className="w-14" src={appointmentsicon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">

            <img className="w-14" src={patientsicon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={listicon} alt="" />
            <p className="font-semibold">Latest Booking</p>
          </div>

          <div className="pt-4 border border-t-0"></div>
          {
            dashData.latestAppointments.map((el,i)=>(
              <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={i}>
                 <img className="rounded-full w-10"  src={el.docData.image} alt="" />
                 <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{el.docData.name}</p>
                  
                  <p className="text-gray-600">{slotDateFormat(el.slotDate)}</p>
                 </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  );
};

export default Dashboard;
