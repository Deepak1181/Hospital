import React from 'react'
import logo from "../pres_Scripto/assets/assets_frontend/logo.svg";

const Footer = () => {
  return (
 <div className='md:mx-10'>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div>
            <img className='mb-5 w-40' src={logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga delectus veniam nam eum sit odio, omnis repellat laudantium quam optio deleniti reprehenderit, aliquid culpa voluptatibus a voluptatum praesentium dolores nostrum?</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+124567893</li>
                <li>dummy.gmail.com</li>
            </ul>
        </div>
    </div>
    <hr />
    <p className='py-5 text-sm text-center'>Copyright 2024@ Prescripto - All Right Resewed.</p>
 </div>
  )
}

export default Footer