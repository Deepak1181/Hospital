import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorAppointment = () => {

    const { dToken, appointments, getAppointments } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
    //   console.log("Token available:", dToken);
      getAppointments()
    } else {
      console.warn("No token found, skipping appointment fetch.");
    }
  }, [dToken])
  return (
    <div></div>
  )
}

export default DoctorAppointment