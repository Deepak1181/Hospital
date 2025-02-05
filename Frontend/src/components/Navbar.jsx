import React, { useState } from "react";
import logo from "../pres_Scripto/assets/assets_frontend/logo.svg";
// import Profile from '../pres_Scripto/assets/assets_frontend/profile_pic'
import Profile from "../pres_Scripto/assets/assets_frontend/profile_pic.png";
import Dropdown from "../pres_Scripto/assets/assets_frontend/dropdown_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center cursor-pointer justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-44 border" src={logo} alt="Logo" />
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
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-10 rounded-full" src={Profile} />{" "}
            <img className="w-2.5" src={Dropdown} />{" "}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 p-4  hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p className="hover:text-black cursor-pointer" onClick={()=>navigate("my-profile ")}>My Profile</p>
                <p className="hover:text-black cursor-pointer" onClick={()=>navigate("my-appointment")}>My Appointment</p>
                <p className="hover:text-black cursor-pointer" onClick={()=>setToken(false)}>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block  ">  Create Account</button>
        )}
        {/* <button onClick={()=>navigate("/login")}  className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block  '> */}

      </div>
    </div>
  );
};

export default Navbar;
