import React, { useContext, useState } from "react";
import logo from "../pres_Scripto/assets/assets_frontend/logo.svg";
// import Profile from '../pres_Scripto/assets/assets_frontend/profile_pic'
import Profile from "../pres_Scripto/assets/assets_frontend/profile_pic.png";
import menu from "../pres_Scripto/assets/assets_frontend/menu_icon.svg";
import crossIcon from "../pres_Scripto/assets/assets_frontend/cross_icon.png";


import Dropdown from "../pres_Scripto/assets/assets_frontend/dropdown_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import App from "../App";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
     const {token,setToken,userData} = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false);
  // const [token, setToken] = useState(true);
  
const logout =() =>{
  setToken(false)
  localStorage.removeItem("token")
}

  return ( 
    <div className="flex items-center cursor-pointer justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img onClick={()=>navigate("/")} className="w-44 " src={logo} alt="Logo" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-10 rounded-full" src={userData.image} />{" "}
            <img className="w-2.5" src={Dropdown} />{" "}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 p-4  hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p className="hover:text-black cursor-pointer" onClick={()=>navigate("my-profile ")}>My Profile</p>
                <p className="hover:text-black cursor-pointer" onClick={()=>navigate("my-appointments")}>My Appointment</p>
                <p className="hover:text-black cursor-pointer" onClick={logout}>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block  ">  Create Account</button>
        )}
        {/* <button onClick={()=>navigate("/login")}  className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block  '> */}
   <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={menu} alt="" />
   {/* mobile menu */}
   <div className={` ${ showMenu? "fixed w-full" :"h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
    <div className="flex items-center justify-between px-5 py-6">
      <img className="w-36" src={logo} alt="" srcset="" />
      <img  className="w-7" onClick={()=>setShowMenu(false)} src={crossIcon} alt="" srcset="" />

    </div>
    <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
      <NavLink   to="/"><p className={"px-4 py-2 rounded full inline-block"} onClick={()=>setShowMenu(false)} >Home</p></NavLink>
      <NavLink to="/doctors"><p className={"px-4 py-2 rounded full inline-block"} onClick={()=>setShowMenu(false)}>All Doctors</p></NavLink>
      <NavLink to="/about"> <p className={"px-4 py-2 rounded full inline-block"} onClick={()=>setShowMenu(false)}>About</p></NavLink>
      <NavLink to="/contact"> <p className={"px-4 py-2 rounded full inline-block"} onClick={()=>setShowMenu(false)}>Contact</p></NavLink>
    </ul>
   </div>
      </div>
    </div>
  );
};

export default Navbar;
