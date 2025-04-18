// import axios from "axios";
// import { createContext, useState } from "react";
// import { toast } from "react-toastify";

// export const  AdminContext=createContext()

// const AdminContextProvider=(props)=>{
//     const [aToken,setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "")
    
   
//     const [doctors,setDoctors] = useState([])
//     const [appointments,setAppointments] = useState([])
//       const backendUrl = import.meta.env.VITE_BACKEND_URL

//       const getAlDoctors = async () => {
//         try {
//             const { data } = await axios.get(
//                 backendUrl + "/api/admin/all-doctors",
//                 {
//                     headers: { Authorization: aToken ? `Bearer ${aToken}` : "" },
//                 }
//             );
    
//             if (data.success) {
//                 setDoctors(data.doctors);
//                 console.log(data.doctors)
//             }
//             else {toast.error(data.message);}
//         } catch (error) {
//             console.error("Error fetching doctors:", error);
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };
    




// const changeAvailability = async (docId) => {
//     try {
//         const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId},
           
//             {
//                 headers: { Authorization: aToken ? `Bearer ${aToken}` : "" },
//             }
        
//         )
//         if(data.success){
//               toast.success(data.message) 
//               getAlDoctors() 
//         }
//         else{
//             toast.error(data.message)
//         }
//     } catch (error) {
//         toast.error(error.message)
//     }
// }
  

// const getAllAppointments = async () => {
//     try {
//         const {data} = await axios.get(backendUrl + '/api/admin/appointments', {
//             headers: { Authorization: aToken ? `Bearer ${aToken}` : "" },
//         })
//         if(data.success){
//             setAppointments(data.appointments)
//             toast.success(data.message)
//             console.log(data.appointments)
//         }else{
//             toast.error(data.message)
//         }
//     }
//     catch (error) {
//         toast.error(error.message)
//     }
// }

// const value={
//     aToken,
//     setAToken,
//     backendUrl,
//     doctors,getAlDoctors,
//     changeAvailability,
//     getAllAppointments,
//     appointments,setAppointments
// }


// return(
//     <AdminContext.Provider  value={value}>
//         {props.children}
//         </AdminContext.Provider>

// )
// }

// export default AdminContextProvider








import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || "");
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData,setDashData] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const setAuthToken = (token) => {
        setAToken(token);
        if (token) {
            localStorage.setItem("aToken", token);
        } else {
            localStorage.removeItem("aToken");
        }
    };

    const logout = () => {
        setAuthToken("");
        toast.success("Logged out successfully!");
    };

    const getAlDoctors = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/admin/all-doctors",
                {
                    headers: { Authorization: aToken ? `Bearer ${aToken}` : "" },
                }
            );
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/change-availability",
                { docId },
                {
                    headers: { Authorization: aToken ? `Bearer ${aToken}` : "" },
                }
            );
            if (data.success) {
                toast.success(data.message);
                getAlDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
                headers: { Authorization: aToken ? `Bearer ${aToken}` : "" },
            });
            if (data.success) {
                setAppointments(data.appointments);
                toast.success(data.message);
                // console.log(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };



    const cancelAppointement= async(appointmentId)=>{
     try {
         const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId}, {
                headers: { Authorization: aToken ? `Bearer ${aToken}` : "" }  }
            )

            if (data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
          toast.error(data.message)
            }
     } catch (error) {
        toast.error(error.message)
     }
    }



    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
                headers: { Authorization: aToken ? `Bearer ${aToken}` : "" },
            });
            if (data.success) {
                setDashData(data.dashData);
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    }
    const value = {
        aToken,
        setAToken: setAuthToken,
        backendUrl,
        doctors,
        getAlDoctors,
        changeAvailability,
        getAllAppointments,
        appointments,
        setAppointments,
        logout,
        cancelAppointement,
        getDashData,
        dashData,
        setDashData 
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
