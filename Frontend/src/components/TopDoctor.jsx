// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// // import { doctors } from "../pres_Scripto/assets/assets_admin/assets";


// const TopDoctor = () => {
//   const navigate = useNavigate();
//   const doctors = useContext(AppContext);

// //   if (!Array.isArray(doctors)) {
// //     return <div>Loading...</div>;
// //   }
// console.log(doctors,"top")
//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-500 md:mx-16">
//       <h1 className="text-3xl font-medium">Top Doctor to Book</h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Simply browse through our extensive list of trusted doctors.
//       </p>
//       <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
//         {doctors.slice(0, 10).map((item, index) => (
//           <div
//             onClick={() => navigate(`/appointment/${item._id}`)}
//             className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
//             key={index}
//           >
//             <img className="bg-blue-50" src={item.image} alt={item.name} />
//             <div className="p-4">
//               <div className="flex items-center gap-2 text-center text-sm text-green-500">
//                 <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                 <p>Available</p>
//               </div>
//               <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//               <p className="text-gray-900 text-sm">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="bg-blue-50 text-gray-500 px-12 py-3 rounded-full mt-10">
//         more
//       </button>
//     </div>
//   );
// };

// export default TopDoctor;






import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctor = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  if (!Array.isArray(doctors)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-500 md:mx-16">
      <h1 className="text-3xl font-medium">Top Doctor to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
          onClick={() => {navigate(`/appointment/${item._id}`);;scrollTo(0,0)}}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50" src={item.image} alt={item.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-center text-sm text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-900 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{navigate("/doctor"); scrollTo(0,0)}} className="bg-blue-50 text-gray-500 px-12 py-3 rounded-full mt-10">
        more
      </button>
    </div>
  );
};

export default TopDoctor;