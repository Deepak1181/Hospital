import React, { useContext, useState } from "react";
import Profile from "../pres_Scripto/assets/assets_frontend/profile_pic.png";
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify'
import axios from "axios";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  // const [userData, setUserData] = useState({
  //   name: "Deepak",
  //   image: Profile,
  //   email: "dkp041297@gmail.com",
  //   phone: "1234567890",
  //   address: {
  //     line1: " D 213",
  //     line2: "Rameshwar Park",
  //   },
  //   gender: "Male",
  //   dob: "2000-01-04",
  // });

 const {userData, setUserData, token,  backendUrl, loadUserProfileData} = useContext(AppContext)
 const [image,setImage] = useState(false)

//  const updateUserProfileData = async () => {
// try {
//   const formData = new FormData()
//   formData.append("name", userData.name);
//   formData.append("phone", userData.phone);
//   formData.append("address", JSON.stringify(userData.address));
//   formData.append("gender", userData.gender);
//   formData.append("dob", userData.dob);
//   image && formData.append("image", image) 
//   const {data} = await axios.post( backendUrl+ "/api/user/update-profile", formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
    
//   });

//   if(data.success){
//     toast.success(data.message)
//      await loadUserProfileData()
//      setIsEdit(false)
//      setImage(false)
//   }
//   else{
//     toast.error(data.message)
//   }
// } catch (error) {
//   console.log(error)
//   toast.error(error.message)
// }
//  }



const updateUserProfileData = async () => {
  try {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("userId", userData._id); // Or userData.id

    formData.append("phone", userData.phone);
    formData.append("addressLine1", userData.address.line1); // change this based on backend
    formData.append("addressLine2", userData.address.line2); // change this based on backend
    formData.append("gender", userData.gender);
    formData.append("dob", userData.dob);
    if (image) formData.append("image", image);

    // Debug log
    for (let [key, val] of formData.entries()) {
      console.log(key, val);
    }

    const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't add Content-Type manually
      },
    });

    if (data.success) {
      toast.success(data.message);
      await loadUserProfileData();
      setIsEdit(false);
      setImage(false);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log("Error updating profile:", error?.response?.data || error.message);
    toast.error(error?.response?.data?.message || error.message);
  }
};

  return  userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {
        isEdit ?
        <label htmlFor="image" className="cursor-pointer">
             <div className="inline-block  relative cursor-pointer">
              <img className="w-36 rounded opacity-75 " src={image ? URL.createObjectURL(image) :userData.image} alt="" />
              <img  className="w-10 absolute bottom-12 right" src={image ? "" : Profile } alt="" />
             </div>
             <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image"  hidden/>
        </label>
        :   <img className="w-36 rounded" src={userData.image} alt="" />
      }

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
                  // value={userData.address.line1}
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
        isEdit ? <button className="border border-primary px-8 py-2 rounded-full hover:text-white hover:bg-primary" onClick={updateUserProfileData}>Save Information</button> :
         <button className="border border-primary px-8 py-2 rounded-full  hover:text-white hover:bg-primary" onClick={()=>setIsEdit(true)}>Edit</button>
      }
      </div>
    </div>
  );
};

export default MyProfile;
