import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const  AdminContext=createContext()

const AdminContextProvider=(props)=>{
    const [aToken,setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "")
    const [doctors,setDoctors] = useState([])
      const backendUrl = import.meta.env.VITE_BACKEND_URL

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
                console.log(data.doctors)
            }
            else {toast.error(data.message);}
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };
    
//       const getAlDoctors = async () => {
//         try {
//             const {data} = await axios.get(backendUrl + '/api/admin/all-doctors', {
//                 headers: {
//                     Authorization: aToken ? `Bearer ${aToken}` : ""
//                 }
//             });

// if(data.success){
//     console.log(data.doctors);
//     setDoctors(data.doctors);
// }else{
//     toast.error(data.message);
//     console.log(data.message);
// }
      
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message );
//             }
//             }



// const getAlDoctors = async () => {
//     try {
//         const { data } = await axios.get(backendUrl + "/api/admin/all-doctors", { // ✅ Change to GET
//             headers: {
//                 Authorization: aToken ? `Bearer ${aToken}` : ""
//             }
//         });

//         if (data.success) {
//             setDoctors(data.doctors);
//         } else {
//             toast.error(data.message);
//             console.log(data.message);
//         }
//     } catch (error) {
//         console.error("Error fetching doctors:", error);
//         toast.error(error.response?.data?.message || error.message);
//     }
// };



const changeAvailability = async (docId) => {
    try {
        const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId},
           
            {
                headers: { Authorization: aToken ? `Bearer ${aToken}` : "" },
            }
        
        )
        if(data.success){
              toast.success(data.message) 
              getAlDoctors() 
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}


const value={
    aToken,
    setAToken,
    backendUrl,
    doctors,getAlDoctors,
    changeAvailability
}


return(
    <AdminContext.Provider  value={value}>
        {props.children}
        </AdminContext.Provider>

)
}

export default AdminContextProvider