import React, { useContext, useState } from "react";

import upload from "../../assets_admin/upload_area.svg";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [speciality, setSpeciality] = useState('General Physician')
    const [education, setEducation] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [about, setAbout] = useState('')
    const [degree, setDegree] = useState('')
        
          const {backendUrl,aToken} = useContext(AdminContext)

        const onSubmitHandler = async (e) => {
         e.preventDefault();
 try {
    if(!docImg){
        return toast.error(' Image not selected')
    }
    const formData = new FormData()
    formData.append('image',docImg)
    formData.append('name',name)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('experience',experience)
    formData.append('fees',Number(fees))
    formData.append('speciality',speciality)
    formData.append('degree',degree)
    formData.append('address',JSON.stringify({line1:address1,line2:address2}))
    // formData.append('address2',{line2:address2})
    formData.append('about',about)
    console.log({
      docImg, name, email, password, experience, fees, speciality, degree, 
      address: { line1: address1, line2: address2 }, about
  });
    // console.log(formData)
    // formData.forEach((value,key)=>{
    //     console.log(key,value ,"key value")
    // })
    const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{
        headers: {
            Authorization: aToken ? `Bearer ${aToken}` : "",
            "Content-Type": "multipart/form-data"
        }
    })
    if(data.success){
        toast.success(data.message)
        console.log("gaya data")
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setFees('')
        setSpeciality('General Physician')
        setEducation('')
        setAddress1('')
        setAddress2('')
        setAbout('')
        setDegree('')
        
    }else{
        toast.error(data.message)
    }
    console.log(data ,"message")

 } catch (error) {
    console.log("nhi hua add ",error)
 }
        }


  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full ">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded- w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-5 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={ docImg ? URL.createObjectURL(docImg) : upload}
              alt=""
            />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" name="" id="doc-img" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input  onChange={(e)=>setName(e.target.value)} className=" border rounded px-3 py-2" type="text" placeholder="Name" value={name} id="" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="flex-1 flex flex-col gap-1">Doctor Email</p>
              <input  onChange={(e)=>setEmail(e.target.value)} className=" border rounded px-3 py-2" type="email" placeholder="Email" value={email} id="" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
               onChange={(e)=>setPassword(e.target.value)}
               className=" border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                value={password}
                id=""
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select  onChange={(e)=>setExperience(e.target.value)} className=" border rounded px-3 py-2" name="" id="">
                <option value="1 Yeat">1 Year</option>
                <option value="2 Yeat">2 Year</option>
                <option value="3 Yeat">3 Year</option>
                <option value="4 Yeat">4 Year</option>
                <option value="5 Yeat">5 Year</option>
                <option value="6 Yeat">6 Year</option>
                <option value="7 Yeat">7 Year</option>
                <option value="8 Yeat">8 Year</option>
                <option value="9 Yeat">9 Year</option>
                <option value="10 Yeat">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} className=" border rounded px-3 py-2" type="number" placeholder="Fees" value={fees} id="" required />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} className=" border rounded px-3 py-2" value={speciality} id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatolgist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
              onChange={(e)=>setDegree(e.target.value)}
              className=" border rounded px-3 py-2"
                type="text"
                placeholder="Education"
               value={degree}
                id=""
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
              onChange={(e)=>setAddress1(e.target.value)}
              className=" border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
             value={address1}
                id=""
                required
              />
              <input
              onChange={(e)=>setAddress2(e.target.value)}
              className=" border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
               value={address2}
                id=""
                required
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p>About Doctor</p>
          <textarea
            onChange={(e)=>setAbout(e.target.value)}
          className="w-full px-4 pt-2 border rounded"
            type="text"
            placeholder="Write about doctor"
             value={about}
            rows={5}
            required
          />
        </div>

        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">Add Doctor</button>
      </div>
    </form>
  );
};

export default AddDoctor;
