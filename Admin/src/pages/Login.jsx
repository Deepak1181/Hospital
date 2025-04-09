import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";

import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);

//   ADMIN_EMAIL="admin@prescripto.com"
//   ADMIN_PASSWORD="admin123"

  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (state === "Admin") {
  //       const { data } = await axios.post(`${backendUrl}api/admin/login`, {
  //         email,
  //         password,
  //       });
  //       if (data.success) {
  //         setAToken(data.token);
  //         console.log("Login Successful: ", data.token);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };
  const onSubmitHandler = async (e) => {
    console.log("hello ")
    e.preventDefault();
    console.log("Backend URL:", backendUrl);
    
    try {
      if (state === "Admin") {
      const { data } = await axios.post( 'http://localhost:4000/api/admin/login', {
        email,
        password,
      });
         console.log('api is working')
      if (data.success) {
        localStorage.setItem("token", data.token);
        setAToken(data.token);
        toast.success("Login Successful");
        console.log("Login Successful: ", data.token);
      } else {
        alert("")
        toast.error(data?.message || "Invalid email or password");
        console.error("Login failed: ", data);
      }
    }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Invalid email or password")
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white shadow-xl p-8 rounded-3xl border border-gray-200"
      >
      
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          <span className="text-[#5F6FFF]">{state}</span> Login
        </h2>

        <div className="mb-6">
          <label className="text-gray-700 block text-sm font-medium mb-2">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#5F6FFF]"
          />
        </div>

        <div className="mb-6">
          <label className="text-gray-700 block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#5F6FFF]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5F6FFF] text-white font-semibold py-3 rounded-lg hover:bg-[#4E5EFF]"
        >
          Login
        </button>

        <p className="text-gray-700 text-center mt-6 text-sm cursor-pointer">
          {state === "Admin" ? (
            <>
              Doctor Login? {" "}
              <span className="text-[#5F6FFF] font-semibold hover:underline" onClick={() => setState("Doctor")}>
                Click Here
              </span>
            </>
          ) : (
            <>
              Admin Login? {" "}
              <span className="text-[#5F6FFF] font-semibold hover:underline" onClick={() => setState("Admin")}>
                Click Here
              </span>
            </>
          )}
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;






// import React, { useContext, useState } from "react";
// import { AdminContext } from "../context/AdminContext";
// import axios from "axios";

// const Login = () => {
//   const [state, setState] = useState("Admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); // State for error messages

//   const { setAToken, backendUrl } = useContext(AdminContext);

//   // const onSubmitHandler = async (e) => {
//   //   e.preventDefault();
//   //   // setErrorMessage(""); // Reset error message

//   //   console.log("Backend URL:", backendUrl);

//   //   try {
//   //     if (state === "Admin") {
//   //       const { data } = await axios.post(
//   //         backendUrl +'/api/admin/login',
//   //         { email, password },
//   //         // {
//   //         //   headers: { "Content-Type": "application/json" },
//   //         //   withCredentials: true, 
//   //         // }
//   //       );

//   //       console.log("API Response:", data);

//   //       if (data.success ) {
//   //         // setAToken(data.token);
//   //         console.log("Login Successful:", data.token);
//   //       } else {
//   //         // setErrorMessage("Invalid credentials. Please try again.");
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.log("Error during login:", error.response?.data || error.message);
//   //     // setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
//   //   }
//   // };
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setErrorMessage(""); // Reset error message
  
//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/admin/login`,
//         { email, password },
//         { headers: { "Content-Type": "application/json" }, withCredentials: true }
//       );
  
//       if (data.success) {
//         console.log("Login Successful:", data.token);
//         setAToken(data.token);
//       } else {
//         setErrorMessage(data.message); // Show actual backend error message
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
//     }
//   };
  
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white p-6">
//       <form
//         onSubmit={onSubmitHandler}
//         className="w-full max-w-md bg-white shadow-xl p-8 rounded-3xl border border-gray-200"
//       >
//         <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
//           <span className="text-[#5F6FFF]">{state}</span> Login
//         </h2>

//         {/* Display error message */}
//         {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

//         <div className="mb-6">
//           <label className="text-gray-700 block text-sm font-medium mb-2">Email</label>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type="email"
//             required
//             placeholder="Enter your email"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#5F6FFF]"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="text-gray-700 block text-sm font-medium mb-2">Password</label>
//           <input
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//             placeholder="Enter your password"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#5F6FFF]"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#5F6FFF] text-white font-semibold py-3 rounded-lg hover:bg-[#4E5EFF]"
//         >
//           Login
//         </button>

//         <p className="text-gray-700 text-center mt-6 text-sm cursor-pointer">
//           {state === "Admin" ? (
//             <>
//               Doctor Login?{" "}
//               <span className="text-[#5F6FFF] font-semibold hover:underline" onClick={() => setState("Doctor")}>
//                 Click Here
//               </span>
//             </>
//           ) : (
//             <>
//               Admin Login?{" "}
//               <span className="text-[#5F6FFF] font-semibold hover:underline" onClick={() => setState("Admin")}>
//                 Click Here
//               </span>
//             </>
//           )}
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
