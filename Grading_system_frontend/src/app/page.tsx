
'use client';

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./login/authProvider"
import toast from "react-hot-toast";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [userType, setUserType] = useState("student");

  const handleUserTypeChange = (e : any) => {
    setUserType(e.target.value);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e : any) => {
    e.preventDefault();
    if(userType === "student") {
      try {
        const res = await fetch("http://localhost:5000/auth/student/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        })
  
        const resData = await res.json();
        const { data } = resData;
        localStorage.setItem('studentId', data)
  
        if (resData.status) {
          toast.success('Login Successfull');
          router.push("/User");
        } else {
          alert("Invalid credentials");
        }
  
      }
      catch (e) {
        console.error(e);
      }
    }
    else if (userType === "faculty") {
      try {
        const res = await fetch("http://localhost:5000/auth/faculty/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        })
  
        const resData = await res.json();
        const { data } = resData;
        localStorage.setItem('facultyId', data)
  
        if (resData.status) {
          toast.success('Login Successfull');
          router.push("/Admin");
        } else {
          alert("Invalid credentials");
        }
  
      }
      catch (e) {
        console.error(e);
      }
    }
    else{
      alert("Invalid User Type");
    }
  }

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-[#514DEC] text-3xl font-semibold text-center mb-6">Login</h2>
        <div className="text-black pb-4 flex align-middle space-x-2">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-blue-500"
            value="student"
            checked={userType === "student"}
            onChange={handleUserTypeChange}
          />
          <span>Student</span>
          <input
            type="radio"
            className="form-radio h-5 w-5 text-blue-500"
            value="faculty"
            checked={userType === "faculty"}
            onChange={handleUserTypeChange}
          />
          <span>Faculty</span>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-black text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-3 bg-[#F3F4F6] text-gray-700 placeholder-[#A9A6FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#514DEC]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-black text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-3 bg-[#F3F4F6] text-gray-700 placeholder-[#A9A6FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#514DEC]"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-400">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-[#514DEC]" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-gray-400 hover:text-gray-700">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#514DEC] text-white font-semibold rounded-lg hover:bg-[#05041F] transition duration-300"
            // onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="text-center text-[#514DEC] text-sm mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-gray-400 hover:text-gray-700 font-semibold" onClick={() => {
            router.push("/signup");
          }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}


// pages/login.js

// export default function Login() {
//     return (
//       <div className="bg-[#05041F] flex items-center justify-center min-h-screen">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-[#514DEC] text-3xl font-semibold text-center mb-6">Login</h2>
//           <form className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-[#05041F] text-sm font-medium mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 required
//                 className="w-full p-3 bg-[#F3F4F6] text-[#05041F] placeholder-[#514DEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#514DEC]"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-[#05041F] text-sm font-medium mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 required
//                 className="w-full p-3 bg-[#F3F4F6] text-[#05041F] placeholder-[#514DEC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#514DEC]"
//                 placeholder="Enter your password"
//               />
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center space-x-2 text-[#05041F]">
//                 <input type="checkbox" className="form-checkbox h-5 w-5 text-[#514DEC]" />
//                 <span>Remember me</span>
//               </label>
//               <a href="#" className="text-[#514DEC] hover:text-[#A9A6FF]">Forgot Password?</a>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 bg-[#514DEC] text-white font-semibold rounded-lg hover:bg-[#05041F] transition duration-300"
//             >
//               Login
//             </button>
//           </form>
//           <p className="text-center text-[#05041F] text-sm mt-6">
//             Don't have an account?{" "}
//             <a href="#" className="text-[#514DEC] hover:text-[#A9A6FF] font-semibold">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }
