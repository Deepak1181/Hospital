// import { createContext } from "react";
// import { doctors } from "../pres_Scripto/assets/assets_admin/assets";

// export const AppContext=createContext()

// const AppContextProvider = (props) => {

//   const value={
//   doctors
//   }
  
//   return(
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   )
// }

// export default AppContextProvider



import { createContext } from "react";
import { doctors } from "../pres_Scripto/assets/assets_admin/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
//   console.log(doctors); // Log the doctors data to check if it is being imported correctly
const currencySymbol ="$"
  const value = {
    doctors,
    currencySymbol
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;