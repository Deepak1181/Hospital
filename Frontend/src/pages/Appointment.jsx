import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
// import verify from "../pres_Scripto/assets/assets_frontend/veified_icon.svg";
import verify from "../pres_Scripto/assets/assets_frontend/verified_icon.svg";
import info_icon from "../pres_Scripto/assets/assets_frontend/info_icon.svg";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from 'react-toastify'
import axios from "axios";
const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol,backendUrl,token,getDoctorsData ,userId} = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, SetSlotTime] = useState("");
  const navigate = useNavigate()
  

  // console.log(userId,"userId"); 
const daysOfWeek = ["Sun","MON","TUE","WED","THU","FRI","SAT"]
  //  console.log(docId,"doctors")
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    // console.log(docInfo,"docInfo")
  };

const getAvailableSlots = async () => {
    let today = new Date();
    let allSlots = []; // Temporary array to store slots before updating state
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i); 
  
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); 
  
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
  
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
         let day = currentDate.getDate()
          let month = currentDate.getMonth() + 1 // Months are zero-based in JavaScript
          let year = currentDate.getFullYear();

          const slotDate= day+ "_"+ month +"_"+ year
          const slotTime = formattedTime

          const  isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false :true  
         
           if(isSlotAvailable){
            timeSlots.push({
              datetime: new Date(currentDate),
              time: formattedTime,
            });
          }

      
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      allSlots.push(timeSlots); 
    }
  
    setDocSlots(allSlots); // Update state once after loop
  };



  const bookAppointment = async () => {
    if(!token){
      toast.warn("Please login to book an appointment")
      return  navigate('/login')
    }
   
    try {
         const date = docSlots[slotIndex][0].datetime
         let day = date.getDate()
          let month = date.getMonth() + 1 // Months are zero-based in JavaScript
          let year = date.getFullYear();
         const slotDate =  day +"_"+ month +"_"+ year
        //  console.log(slotDate,"slotDate")


      const { data } = await axios.post(backendUrl + `/api/user/book-appointment`,{
          docId,
          slotDate,
          slotTime,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log({ docId, slotDate, slotTime });
      if (data.success) {
        toast.success(data.message);
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };



  
//   useEffect(() => {
//     getAvailableSlots();
   
//   }, []); // Run only on mount
  
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    // getDocSlots()
    // console.log(docSlots,"docSlots");
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        <div className="flex flex-col  sm:flex-row gap-4 ">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-whitw mx-2 sm:">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name} <img className="w-5" src={verify} alt="" />
            </p>
            <div className="flex gap-2 items-center">
              <p className="flex  items-center gap-2 text-sm mt-1 text-gray-600">
                {docInfo.degree}-{docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-600">
                {currencySymbol} {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slot */}
                 <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                    <p>Booking Slots</p>
                    <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                        {
                          docSlots.length && docSlots.map((item,index)=>(
                            <div  
                            onClick={()=>setSlotIndex(index)}
                            key={index} 
                            className={` flex flex-col items-center py-6 min-w-16 rounded-full cursor-pointer 
                            ${slotIndex === index ? "bg-primary text-white" : "border border-gray-600"}`}
                          >
                          
                            <p >{item[0]&& daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p>{item[0]&& item[0].datetime.getDate()}</p>
                                </div>
                          ))
                        }
                    </div>
                    <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                    {docSlots.length && docSlots[slotIndex].map((item,index)=>(
                            <p  onClick={()=>SetSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ?  "bg-primary text-white" : "border border-gray-600"}` } key={index}>
                                {item.time.toLowerCase()}
                            </p>

                    ))}
                 </div>
                 <button className="bg-primary text-white text-sm  font-light px-14 py-3 rounded-full mt-4" onClick={bookAppointment}>Book an Appointment</button>
                 </div>
             {/* listing related doctos */}
             <RelatedDoctors docId={docId }  speciality={docInfo.speciality}/>
               
      </div>
    )
  );
};

export default Appointment;
