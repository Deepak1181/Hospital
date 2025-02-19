import React, { useState } from "react";
import Profile from "../pres_Scripto/assets/assets_frontend/profile_pic.png";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: "Deepak",
    image: Profile,
    email: "dkp041297@gmail.com",
    phone: "1234567890",
    address: {
      line1: " D 213",
      line2: "Rameshwar Park",
    },
    gender: "Male",
    dob: "2000-01-04",
  });

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img className="w-36 rounded" src={userData.image} alt="" />
      {isEdit ? (
        <input
        className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          name=""
          id=""
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500"> {userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
            className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              name=""
              id=""
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">
            Address:
           
          </p>
          <p>
          {isEdit ? (
              <p>
                <input
                className="bg-gray-50"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <br />
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  name=""
                  id=""
                />
              </p>
            ) : (
              <p   className="text-gray-500">
                {userData.address.line1} <br /> {userData.address.line2}
              </p>
            )}
          </p>
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3" >Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500">
          <p className="font-medium ">Gender:</p>

          {isEdit ? (
            <select
            className="max-w-20 bg-gray-100"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              name=""
              id="">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p className="font-medium ">Birthday:</p>
          {
        isEdit ? <input className="bg-gray-50" type="date" value={userData.dob} onChange={(e)=>setUserData(prev=>({...prev,dob:e.target.value}))} name="" id="" /> : <p className="text-gray-400">{userData.dob}</p>
      }
        </div>
      </div>
      <div className="mt-10">
      {
        isEdit ? <button className="border border-primary px-8 py-2 rounded-full hover:text-white hover:bg-primary" onClick={()=>setIsEdit(false)}>Save Information</button> : <button className="border border-primary px-8 py-2 rounded-full  hover:text-white hover:bg-primary" onClick={()=>setIsEdit(true)}>Edit</button>
      }
      </div>
    </div>
  );
};

export default MyProfile;
