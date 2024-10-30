// "use client"
// import {React, useState, useEffect } from 'react';
// import { ArrowRight } from 'lucide-react'
// import {collegeName} from '/src/data/college.js'
// // import userAtom from "/src/atom/userAtom.js";
// // import { useSetRecoilState } from 'recoil';
// import axios from 'axios';
// import { useRouter } from 'next/navigation'
// import Link from 'next/link';
// import { registerUserUrl } from '@/urls/urls';
// import { useToast } from '@/hooks/use-toast';

// function Page() {
//   const router = useRouter();  
//   // const setUser = useSetRecoilState(userAtom);
//   const { toast } = useToast();

//   const [error ,setError] =useState("")
//   const [inputs, setInputs] = useState({
//       name: "",
//       email: "",
//       password: "",
//       collegeName: "",
//     });
//   const [isLoading, setLoading] = useState(false);


//   const handleSignup = async () => {
//     setLoading(true);
//     console.log(inputs);
//     setError("");
//     // Check if any field is empty
//     if (!inputs.name || !inputs.email || !inputs.password || !inputs.collegeName) {
//       // setError("All filds are required!");
//       toast({
//         variant: "red",
//         title: "All fields are required!",
//         // description: "All fields are required!",
//       })
//       setLoading(false);
//       return; // Exit the function if any field is empty
//     }

//     try {
//       await axios.post(registerUserUrl , {
//         name: inputs.name,
//         email: inputs.email,
//         password: inputs.password,
//         collegeName: inputs.collegeName,
//       })
//       .then((res) => {
//         // console.log(res.data);
//         if(typeof window !== undefined){
//           const user = JSON.stringify(res.data.user);
//           localStorage.setItem("amsjbckumr" , user)
//         }
//         router.push('/login')
//         setLoading(false)
//       })
//       .catch((err) => {
//         console.log(err);
//         // setError(err.response.data.msg);
//         toast({
//           variant: "red",
//           title: err.response.data.msg,
//         })
//         setLoading(false)
//       })

//     } catch (error) {
//       console.error(error);
//       // setError(error.message);
//       toast({
//         variant: "red",
//         title: error.message,
//       })
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//     <section>
//       <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
//         <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
//           {/* <div className="mb-2 flex justify-center">
//             <svg
//               width="50"
//               height="56"
//               viewBox="0 0 50 56"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
//                 fill="black"
//               />
//             </svg>
//           </div> */}
//           <h2 className="text-center text-2xl font-bold leading-tight text-black">
//             Sign up to Alumni Portal
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600 ">
//             Already have an account?{' '}
//             <Link
//               href="../login"
//               title=""
//               className="font-semibold text-black transition-all duration-200 hover:underline"
//             >
//               Login to your account
//             </Link>
//           </p>
//           <form action="#" method="POST" className="mt-8">
//             <div className="space-y-5">
//             <div>
//                 <label htmlFor="" className="text-base font-medium text-gray-900">
//                   {' '}
//                   Enter Your Name{' '}
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="text"
//                     placeholder="Name"
//                     onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
// 										value={inputs.name}
//                   ></input>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="" className="text-base font-medium text-gray-900">
//                   {' '}
//                   Email address{' '}
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="email"
//                     placeholder="Email"
//                     onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//                     value={inputs.email}
//                   ></input>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex items-center justify-between">
//                   <label htmlFor="" className="text-base font-medium text-gray-900">
//                     {' '}
//                     Password{' '}
//                   </label>

//                 </div>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="password"
//                     placeholder="Password"
//                     onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
// 									value={inputs.password}
//                   ></input>
//                 </div>
//               </div>
//               <div>
//                <div  className="mt-2 w-full flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
//                <select className="w-full">
//                   <option>Select Role</option>
//                   <option>Alumni</option>
//                   <option>Student</option>
//                   <option>Guest</option>
//                 </select>
//                </div>
//                 <div className="mt-2 w-full flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">

//                 <select 
//   onChange={(e) => setInputs({ ...inputs, collegeName: e.target.value })} 
//   className="w-full"
//   value={inputs.collegeName} // Bind the select element to the state
// >
//   <option value="">Select College</option>
//   {collegeName.map((college, index) => (
//     <option key={index} value={college}>
//       {college}
//     </option>
//   ))}
// </select>

//                 </div>
//               </div>
//               <div>
//               <p className='text-red-500 text-center font-semibold text-lg' >{error}</p>
//                 <button
//                   disabled={isLoading}
//                   type="button"
//                   className="inline-flex w-full items-center justify-center rounded-md bg-blue-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-700/80"
//                   onClick={handleSignup}>
//                   {
//                     isLoading === true ? (
//                       <>Signing up..</>
//                     ) :( 
//                       <>Signup<ArrowRight className="ml-2" size={16} /> </>
//                     )}
//                 </button>
//               </div>
//             </div>
//           </form>
//           <div className="mt-3 space-y-3">


//           </div>
//         </div>
//       </div>
//     </section>


//     </div>
//   )
// }

// export default Page



'use client'

import jwt from "jsonwebtoken"

import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { registerUserUrl } from '@/urls/urls'
import { collegeName } from '/src/data/college.js'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SignupForm() {
  const router = useRouter()
  const { toast } = useToast()

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    collegeName: "",
  })
  const [isLoading, setLoading] = useState(false)
  const [collegeSearch, setCollegeSearch] = useState("")

  const handleSignup = async () => {
    setLoading(true)
    if (!inputs.name || !inputs.email || !inputs.password || !inputs.role || !inputs.collegeName) {
      toast({
        variant: "red",
        title: "All fields are required!",
      })
      setLoading(false)
      return
    }

    try {
      const res = await axios.post(registerUserUrl, inputs)
      if (typeof window !== "undefined") {
        const user = JSON.stringify(res.data.user);
        const token = jwt.sign({user:user}, process.env.NEXT_PUBLIC_JWT_SECRET)
        localStorage.setItem("amsjbckumr", token)
      }
      router.push('/login')
    } catch (error) {
      toast({
        variant: "red",
        title: error.response?.data?.msg || "An error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredColleges = collegeName.filter(college =>
    college.toLowerCase().includes(collegeSearch.toLowerCase())
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign up to Alumni Portal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="../login" className="font-medium text-blue-600 hover:text-blue-500">
              Login to your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value) => setInputs({ ...inputs, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alumni">Alumni</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="college">College</Label>
              <Input
                type="text"
                placeholder="Search for your college"
                value={collegeSearch}
                onChange={(e) => setCollegeSearch(e.target.value)}
                className="mb-2"
              />
              <Select onValueChange={(value) => setInputs({ ...inputs, collegeName: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select College" />
                </SelectTrigger>
                <SelectContent>
                  {filteredColleges.map((college, index) => (
                    <SelectItem key={index} value={college}>
                      {college}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            type="button"
            className="w-full"
            onClick={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
            {!isLoading && <ArrowRight className="ml-2" size={16} />}
          </Button>
        </form>
      </div>
    </div>
  )
}