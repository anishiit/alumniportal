"use client"

import { React, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import jwt from "jsonwebtoken"
import { collegeName } from '/src/data/college.js'
// import userAtom from "/src/atom/userAtom.js";
// import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import axios from 'axios';
import { loginUserUrl } from '@/urls/urls';
import { useToast } from '@/hooks/use-toast';
import Navbar from "@/components/header/Navbar"

function Page() {
  const { toast } = useToast();
  const router = useRouter();
  // const setUser = useSetRecoilState(userAtom);
  const [error, setError] = useState("")
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault();
    setError("")
    // console.log(inputs);
    setError("");
    // Check if any field is empty
    if (!inputs.email || !inputs.password) {
      toast({
        variant: "red",
        title: "All fields are required!",
        // description: "All fields are required!",
      })
      setLoading(false)
      return; // Exit the function if any field is empty
    }

    try {
      await axios.post(loginUserUrl, {
        email: inputs.email,
        password: inputs.password,
      })
        .then((res) => {
          // console.log(res.data);
          if (typeof window !== undefined) {
            let user =(res.data.user);
            // user = J(user)
            // let user = JSON.parse(JSON.stringify(res.data.user));
           
            const token = jwt.sign(user, process.env.NEXT_PUBLIC_JWT_SECRET)
           
            localStorage.setItem("amsjbckumr", token)
          }
          router.push('/home')
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "red",
            title: err.response.data.msg || err.message,
          })
          setLoading(false)
          return
        })

    } catch (error) {
      console.error(error);
      setLoading(false)
      return
    }
  };


  // const [colleges, setColleges] = useState([]);

  // useEffect(() => {
  //   // Fetch the colleges from the JSON file
  //   const fetchColleges = async () => {
  //     const res = await fetch('/src/data/college.json');
  //     const data = await res.json();
  //     setColleges(data);
  //   };

  //   fetchColleges();
  // }, []);





  return (
    <div>
      <Navbar />
      <div className="flex justify-center min-h-screen bg-white">
      <div className="w-full max-w-md max-h-fit mt-32 p-8 space-y-8 bg-white rounded-xl">  
          {/* <div className="mb-2 flex justify-center">
            <svg
              width="50"
              height="56"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="black"
              />
            </svg>
          </div> */}
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-blue-600 ">
              Do not have an account?{' '}
              <Link
                href="../registration"
                title=""
                className="font-semibold text-blue-600 underline transition-all duration-200 hover:text-blue-500"
            >
                Create your account
              </Link>
            </p>

            <form onSubmit={handleSignup} className="mt-8">
              <div className="space-y-5">

                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                      value={inputs.email}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>


                    <Link
                      href="/login/reset-password"
                      title=""
                      className="text-sm text-gray-600  transition-all duration-200 hover:underline"
                    >
                      Forgot Password?{' '}
                    </Link>

                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                      value={inputs.password}
                    ></input>
                  </div>
                </div>

                <div>
                  <p className='text-red-500 text-center font-semibold text-base my-1' >{error}</p>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-600/80"
                    //onClick={handleSignup}
                  >
                    {isLoading === false ? (<> Login <ArrowRight className="ml-2" size={16} /> </>) : (<>Loging In..</>)}

                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">


            </div>
          </div>
        </div>
    </div>
  )
}

export default Page
