import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import Logo from "../assets_admin/admin_logo.svg"; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate()
   const logout =()=>{
    navigate("/")
aToken && setAToken("")
aToken && localStorage.removeItem('aToken')
   }
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white  p-4">
      {/* <p>hdjkjhdj</p> */}
     <div className="flex items-center gap-2 text-sm">
     <img   src={Logo} alt="Admin Logo" className="w-36  h-16  sm:w-40 cursor-pointer" />
     <p className="px-2.5 py-0.5 border rounded-full ">{aToken ? "Admin" : "Doctor"}</p>
     </div>
     <button onClick={logout} className="bg-primary text-white text-sm px-10 py-2 rounded-full">logout</button>
    </div>
  );
};

export default Navbar;
