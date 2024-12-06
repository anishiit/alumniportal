"use client"

import jwt from "jsonwebtoken"

import { useState ,useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Github, Users,GraduationCap, Linkedin, Mail, MapPin, Phone, User, Briefcase, Building, MessageCircle,Plus, SmilePlus , Badged, ShieldOff,ShieldCheck} from "lucide-react"
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { createUserInvitationUrl, getUserInfoUrl } from '@/urls/urls.js';
import { getAllCollegeUsersUrl, connectUsersUrl, createChatOfUsers } from "@/urls/urls.js"
import { useRouter } from 'next/navigation'
import Navbar2 from "../header/Navbar2"
import ProfileLoading from '@/components/ProfileLoading'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export default function ProfileDisplay({ user }) {
  const [activeTab, setActiveTab] = useState("about")
  
  const { toast } = useToast()

  const router = useRouter(); 
  const [isConnected, setIsConnected] = useState(user.isFollowing);

  const location = usePathname(); 

  const userId = location.substring(9);

  const [users ,setUsers]= useState([]);
  const [usr, setUsr] = useState({});
  const [err, setErr] = useState("");
  const [iscurrent, setcurrent] = useState('');
  const [loading ,setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({});

  async function getUser(){
    try {
      let user;
      if(typeof window !== undefined)
        user = localStorage.getItem("amsjbckumr")
      user = jwt.verify(user,process.env.NEXT_PUBLIC_JWT_SECRET)

      setLoading(true);
      await axios.post(getUserInfoUrl,{userId:userId})
      .then((res) => {
        // console.log(res.data);
        setUsr(res.data.user);
        console.log(res.data.user);
        if(user._id === res.data.user._id){
          if (typeof window !== undefined) {
            const token = jwt.sign(res.data.user, process.env.NEXT_PUBLIC_JWT_SECRET)
            localStorage.setItem("amsjbckumr", token)
          }
        }
        setCurrentUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.msg);
 
      })
      setLoading(false);
    } catch (error) {
      console.log(error)

    }
  }

  async function getAllCollegeUsers({ collegeName }) {
    
    try {
      setLoading(true)
      if (typeof window !== "undefined") {
        user= localStorage.getItem("amsjbckumr")
        user = jwt.verify(user,process.env.NEXT_PUBLIC_JWT_SECRET)
        setcurrent(user);
      }

      const res = await axios.post(getAllCollegeUsersUrl, { collegeName: collegeName })
      // console.log(res.data)
      const allUsers = res.data.users
      const formattedUsers = allUsers.map((user) => ({
        ...user,
        isConnected: user.connectedUsers?.includes(String(iscurrent._id)) || false,
        batch: user.batch || "2015", // Assuming batch information is available, otherwise defaulting to "2015"
        branch: user.branch || "Computer Science", // Assuming branch information is available, otherwise defaulting
      }))
      setUsers(formattedUsers)
    setLoading(false)
     
    } catch (error) {
      console.error(error)
    }
  }
  
  
  const handleConnect = async (id) => {
    // setUsers(users.map(user => 
    //   user._id === id ? { ...user, isConnected: !user.isConnected } : user
    // ))
    let loggedInUser ;
    if(typeof window !== undefined){
      loggedInUser = localStorage.getItem("amsjbckumr")
      loggedInUser = jwt.verify(loggedInUser,process.env.NEXT_PUBLIC_JWT_SECRET)
    }
    if(loggedInUser.isVerified === false){
      toast({
        title:"Not a verified user!",
        description: "You need to verify your account first",
        variant: "red", // Blue color for a success message
        duration: 3000, // Show the toast for 1.5 seconds
      })
      return
    }
    try {
      await axios.post(connectUsersUrl, { userId1: loggedInUser?._id, userId2: userId })
      await axios.post(createChatOfUsers, { userId1: loggedInUser?._id, userId2: userId })
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  const handleShare = () => {
    // Get the current page URL
    const url = window.location.href

    // Try to copy the URL to the clipboard
    navigator.clipboard.writeText(url).then(() => {
      // Show a toast notification with a success message
      toast({
        description: "URL copied to clipboard!",
        variant: "blue", // Blue color for a success message
        duration: 1500, // Show the toast for 1.5 seconds
        variant: "blue",
        duration: 1500,
      })
    }).catch(err => {
      // Log the error to the console
      console.error('Failed to copy: ', err)
      // Show a toast notification with an error message
      toast({
        title: "Error", // Red color for an error message
        title: "Error",
        description: "Failed to copy URL. Please try again.",
        variant: "destructive",
      })
    })
  }

  const handleMessage = () => {
    router.push(`/chat?userId=${usr._id}`)
  }
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      let currUser = localStorage.getItem("amsjbckumr")
      currUser = jwt.verify(currUser,process.env.NEXT_PUBLIC_JWT_SECRET)
      setCurrentUser(currUser)
      
      if (currUser) {
        getAllCollegeUsers({ collegeName: currUser.collegeName })
      }
    }
  }, [])

  const handleDonate = () => {
    // Logic to handle donation (e.g., open a payment gateway)
  };
  useEffect(() => {
      let user;
      if(typeof window !== undefined)
        user = localStorage.getItem("amsjbckumr")
      user = jwt.verify(user,process.env.NEXT_PUBLIC_JWT_SECRET)
      if(userId === user?._id){
        setcurrent(true);
      }
    // console.log(userId)
 
getUser();
   

    // console.log(u , user)
  },[])
  const profile = {
    name: "example",
    email: "example@example.com",
    graduationYear: "Graduation Year not specified",
    degree: "Degrees not specified",
    currentPosition: "Senior Software Engineer",
    companyName: "Tech Solutions Inc.",
    jobTitle:"Software Engineer",
    location: "Location not specified",
    contactNumber: "+91 0000000000",
    linkedin: "https://www.linkedin.com/in/rahulkumar",
    github: "https://github.com/rahulkumar",
    bio: "Passionate about leveraging technology to solve real-world problems. Experienced in machine learning and cloud computing.",
    skills: ["Machine Learning", "Cloud Computing", "Data Science", "Blockchain"],
    projects: [],
    education: [
      {
        degree: "B.Tech Engineering",
        institution: "IIT Dhanbad",
        year: "2026",
      },
    ],
    experience: [
      {
        position: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "2019 - Present",
      },
      {
        position: "Software Engineer",
        company: "Innovate Systems",
        duration: "2015 - 2019",
      },
    ],
  }

 

  return (
    <div>
    <Navbar2/>
    {loading === true ?  (<ProfileLoading/>):( <div className="container mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden">
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 pt-20 pb-16 px-4 sm:pt-24 sm:pb-32 sm:px-6 lg:px-8">
          <div className="absolute -bottom-12 left-0 w-full flex justify-center sm:justify-start sm:left-6 lg:left-8">
            <Avatar className="w-[100px] h-[100px] sm:w-32 sm:h-32 border-4 border-white">
              <AvatarImage src={usr?.profileImage} alt={profile.fullName} />
              <AvatarFallback>{usr.name?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            
          </div>
          <div className="text-white text-center sm:text-left sm:pl-36 lg:pl-40">
          <div className="md:flex gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold">{usr?.name }</h1>
          {usr.isVerified === true ? (
        <Badge variant="success" className="hidden md:flex mr-2 -py-2  px-3 text-xs sm:text-sm  text--800 rounded-full">
          <ShieldCheck className="w-4 h-4 mr-2" />
          Verified User
        </Badge>
      ): (
        <div className="mr-2 hidden md:flex flex-row items-center outline outline-1 outline-red-500 px-3 bg-transparent  font-thin text-red-100 text-xs sm:text-xs   rounded-full">
          <ShieldOff className="w-4 h-4 mr-2 text-red-600 font-extrabold" />
          Non-Verified User
        </div>
      )}</div>
            

            <p className="text-sm sm:text-base mt-1">{usr?.jobTitle} at {usr?.companyName}</p>
            {
              iscurrent === true ? (
                <div className="mt-2 flex items-center justify-center sm:justify-start">
                <Users className="w-5 h-5 mr-2" />
                <Link href={iscurrent ? "/network" : "#"} className="text-sm font-medium hover:underline">
                  {usr.connectedUsers?.length || 0} connections
                </Link>
              </div>
              ) : (
                <div className="mt-2 flex items-center justify-center sm:justify-start"><Users className="w-5 h-5 mr-2" />
                <p className="text-sm text-white mt-1">
                {usr.connectedUsers?.length} connections </p>
                </div>
              )
            }
            
          </div>
        </div>
        <CardContent className="pt-16 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-end  gap-2 mb-6">
            <div className="flex items-center">
           
      {usr.isVerified === true ? (
        <Badge variant="success" className="mr-2 md:hidden py-1 px-3 text-xs sm:text-sm bg-green-100 text--800 rounded-full">
          <ShieldCheck className="w-4 h-4 mr-2" />
          Verified User
        </Badge>
      ): (
        <Badge variant="success" className="mr-2 py-1 md:hidden px-3 text-xs sm:text-sm bg-red-100 text--800 rounded-full">
          <ShieldOff className="w-4 h-4 mr-2" />
          Non-Verified User
        </Badge>
      )}
            </div>
        <div className="flex items-center gap-2">
        {iscurrent === true ?  ( <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost"  className=" text-xs sm:text-sm rounded-sm bg-blue-600 hover:bg-blue-600/80 hover:text-white text-white">
                  <Plus className="h-4 w-4 mr-1 -ml-1" />
                  Post
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href="/postjob">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Share Job</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem >
              <Link href="/memories" className='flex'>
                  <SmilePlus className="mr-2 h-4 w-4" />
                  <span>Share Memories</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>):(<></>)
          }
          {(iscurrent === true && currentUser.isVerified === false) && (
              <Button
              onClick={() => router.push('/verify-email')}
              variant="default"
              size="sm"
              className="bg-blue-600 text-primary-foreground hover:bg-primary/90 rounded-md transition-colors duration-200"
            >
              <ShieldCheck className="w-4 h-4 mr-2 " />
              <span className="hidden sm:inline">Verify Account</span>
              <span className="sm:hidden">Verify</span>
            </Button>
      )}
          
          {iscurrent === true ? ( <Button onClick={() => router.push('/update-profile')} variant="outline" size="sm" className="mr-2 text-xs sm:text-sm">
              Edit Profile
            </Button>):(<></>)}
           
           { iscurrent === true ? (
            <>
            {
              currentUser?.role === "admin" ? (
                <Button onClick={() => router.push('/admin')} variant="ghost" size="sm" className="mr-2 text-xs bg-green-400 hover:bg-green-400/80 sm:text-sm">
                  Admin
                </Button>
              ) : (
                <>
                </>
              )
            }
            {
              currentUser?.role === "alumni" ? ( <Button onClick={() => router.push('/donation')} variant="outline" size="sm" className="mr-2 text-xs sm:text-sm">
                  Donate
                </Button>) : (<></>)}
            </>
           ):(
            <> {usr.connectedUsers?.includes(String(iscurrent._id)) ?(<Button onClick={handleMessage} size="sm" className="mr-2 text-xs sm:text-sm bg-blue-600 hover:bg-blue-600/80 text-white">
            
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>):(<>
                    <Button onClick={handleConnect} size="sm" className="mr-2 text-xs sm:text-sm bg-blue-600 hover:bg-blue-600/80 text-white">
                      Connect
                    </Button>
                  </>)}</>
          
            
            )}
          </div>
          
        {/* <Link href="/verify-email"> <Button
         
          size="sm"
          className="mr-2 text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <User className="w-4 h-4 mr-2" />
          Verify Now
        </Button></Link> */}
    
            
            {/* <Button 
                 size="lg"  className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-600/80 text-white flex ">
              {usr.connectedUsers?.includes(String(iscurrent._id)) ? (
                <Link href='/chat'  className="flex">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 " />
                 Message
                </Link>
              ) : (
                'Connect'
              )}  
            </Button> */}
            
          </div>
          <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full flex flex-wrap justify-start mb-6 bg-transparent">
              {["about", "experience", "education", "projects"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-grow sm:flex-grow-0 text-xs sm:text-sm py-2 px-2 sm:px-4 m-0.5 sm:m-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            {/* About Section  */}
            <TabsContent value="about" className="mt-4 sm:mt-6">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">About</h3>
                  <p className="text-xs sm:text-sm">{usr.bio}</p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Contact Information</h3>
                  <div className="grid gap-2 text-xs sm:text-sm">
                    {[
                      { icon: Mail, text: usr?.email },
                      { icon: Phone, text: usr?.contactNumber },
                      { icon: MapPin, text: usr?.location ||profile.location},
                      { icon: Linkedin, text: "LinkedIn Profile", link: usr.linkedin || "" },
                      { icon: Github, text: "GitHub Profile", link: usr.github || "" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <item.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-muted-foreground" />
                        {item.link ? (
                          <Link href={item.link} className="text-blue-600 hover:underline">
                            {item.text}
                          </Link>
                        ) : (
                          <span>{item.text}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Skills</h3>
                  
                    {usr.skills?.length === 0 ? (
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        <h3 className="text-sm">No skills added to Show</h3>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                      {usr?.skills?.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      </div>
                    )}
                </div>
              </div>
            </TabsContent>
            {/* Experience Section  */}
            <TabsContent value="experience" className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Work Experience</h3>
              {
                usr.experiences?.length !== 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {usr?.experiences?.map((exp, index) => (
                      <Card key={index}>
                        <CardHeader className="p-3 sm:p-4">
                          <CardTitle className="text-sm sm:text-base">{exp.position}</CardTitle>
                          <CardDescription className="text-xs sm:text-sm">at {exp.company} • {exp.startDate} ~ {exp.endDate || "Present" }</CardDescription>
                        </CardHeader>
                        <CardContent className="text-[16px]" >{exp.description}</CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                        <h3 className="text-sm">No Experience added to Show</h3>
                  </div>
                )
              }
            </TabsContent>
            {/* Education Section  */}
            <TabsContent value="education" className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Education</h3>
              <div className="space-y-3 sm:space-y-4">
                <Card >
                  <CardHeader className="p-3 sm:p-4">
                    <CardTitle className="text-sm sm:text-base">{usr?.branch}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{usr?.collegeName} • {usr?.batch}</CardDescription>
                  </CardHeader>
                </Card>
                {usr?.education?.map((edu, index) => (
                  <Card key={index}>
                    <CardHeader className="p-3 sm:p-4">
                      <CardTitle className="text-sm sm:text-base">{edu.degree}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">{edu.institution} • {edu.year}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Project Section  */}
            <TabsContent value="projects" className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Projects</h3>
              <div className="grid gap-3 sm:gap-4">
                {
                  profile.projects.length === 0 ? (
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                        <h3 className="text-sm">No Projects added to Show</h3>
                    </div>
                   ) : (
                    profile.projects.map((project, index) => (
                      <Card key={index}>
                        <CardHeader className="p-3 sm:p-4">
                          <CardTitle className="text-sm sm:text-base">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-4 pt-0">
                          <p className="text-xs sm:text-sm">{project.description}</p>
                        </CardContent>
                      </Card>
                  )))
                }
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>)}
   
    </div>
  )
}




// "use client"

// import jwt from "jsonwebtoken"
// import Image from 'next/image';
// import { useState,useEffect } from 'react';
// import { ArrowUpRight } from 'lucide-react'
// import { usePathname } from 'next/navigation';
// import axios from 'axios';
// import { createUserInvitationUrl, getUserInfoUrl } from '@/urls/urls';

// import { useRouter } from 'next/navigation'
// import './profileBtn.css'
// import Navbar2 from '../header/Navbar2';
// const Profile = ({ user }) => {
//   const router = useRouter(); 
//   const [connect, setConnect] = useState(user.isFollowing);

//   const location = usePathname(); 
//   const userId = location.substring(9);
//   const [usr, setUsr] = useState({});
//   const [err, setErr] = useState("");
//   const [iscurrent, setcurrent] = useState(undefined);
   
//     // Logic to handle follow request
//     const handleFollow = async () => {
//       let user;
//       if(typeof window !== undefined)
//         user = localStorage.getItem("amsjbckumr")
      // currUser = jwt.verify(currUser,process.env.NEXT_PUBLIC_JWT_SECRET)
//       // if(userId === user._id){
//       //   setcurrent(true);
//       // }
//         setConnect(!connect);
//         await axios.post(createUserInvitationUrl , {
//           toUserId:usr._id,
//           fromUserId:user._id,
//         })
//         .then((res) => {
//           console.log(res.data);

//         })
//         .catch((err) => {
//           console.log(err);
//         })
//     };

//     async function getUser(){
//       try {
//         await axios.post(getUserInfoUrl,{userId:userId})
//         .then((res) => {
//           // console.log(res.data);
//           setUsr(res.data.user);
//         })
//         .catch((err) => {
//           console.log(err);
//           setErr(err.response.data.msg);
//         })
//       } catch (error) {
//         console.log(error)
//       }
//     }

//   const handleMessage = () => {
//     // Logic to open a messaging interface
//   };

//   const handleDonate = () => {
//     // Logic to handle donation (e.g., open a payment gateway)
//   };
//   useEffect(() => {
//       let user;
//       if(typeof window !== undefined)
//         user = localStorage.getItem("amsjbckumr")
      // currUser = jwt.verify(currUser,process.env.NEXT_PUBLIC_JWT_SECRET)
//       if(userId === user._id){
//         setcurrent(true);
//       }
//     console.log(userId)
//     getUser();
//   },[])

//   return (
//     <div>
//     <Navbar2 />
//    <div className='flex justify-center'>
//     <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row">
//       <div className="h-full w-full md:h-[200px] md:w-[300px]">
//         <img
//           src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
//           alt="Laptop"
//           className="h-full w-full rounded-md object-cover"
//         />
//       </div>
//       <div>
//         <div className="p-4">
//           <h1 className="inline-flex items-center text-lg font-semibold">
//             {usr?.name} <ArrowUpRight className="ml-2 h-4 w-4" />
//           </h1>
//           <p className="mt-3 text-sm text-gray-600">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?
//           </p>
//           <div className="mt-4">
//             <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
//               #Macbook
//             </span>
//             <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
//               #Apple
//             </span>
//             <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
//               #Laptop
//             </span>
//           </div>
//           <div className="mt-3 flex items-center space-x-2">
//           {
//             iscurrent === true ? (
//               <button onClick={()=>{router.push('/donation')}} className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
//                 Donate
//               </button>
//             ) : (
//               <button onClick={handleFollow}
//                className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
//                 {connect ? 'Send Messege' : 'Connect'}
//               </button>
//             )
//           }
//     <button class="Btn" onClick={() => router.push('/update-profile')}   > Update Profile 
//       <svg class="svg" viewBox="0 0 512 512">
//         <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
//     </button>
//           </div>
//         </div>
//       </div>
//     </div>
  


//     </div>
//     </div>
//   );
// };

// export default Profile;
