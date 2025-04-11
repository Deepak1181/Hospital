import { createContext } from "react";

export const  AppContext=createContext()

const AppContextProvider=(props)=>{
 const currency= "$"

    const calculateAge = (dob)=>{
    const today = new Date()
    const birthDate = new Date(dob)
    const age = today.getFullYear() - birthDate.getFullYear()
    
    return age
   }


   const months =[ "" ,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
// const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const slotDateFormat =(slotDate)=>{
const dateArray = slotDate.split("_")
return dateArray[0]+" "+ months[ Number(dateArray[1])] + " " + dateArray[2]
}
const value={
    calculateAge,
    slotDateFormat,
    currency
} 


return(
    <AppContext.Provider  value={value}>
        {props.children}
        </AppContext.Provider>

)
}

export default AppContextProvider