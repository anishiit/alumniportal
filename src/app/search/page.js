"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, UserPlus, UserCheck, GraduationCap, Briefcase, MapPin ,User} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { batch } from '@/data/batch'
import { branch } from '@/data/branch'
import { getAllCollegeUsersUrl, connectUsersUrl, createChatOfUsers } from "@/urls/urls.js"
import Navbar2 from "@/components/header/Navbar2"
import AlumniLoading from '@/components/AlumniLoading'
import { useRouter } from 'next/navigation'



export default function UserConnectionPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [activeTab, setActiveTab] = useState("all")
  const [selectedBatch, setSelectedBatch] = useState("All")
  const [selectedBranch, setSelectedBranch] = useState("All")
  const [loading , setLoading] =useState(false);
  const [noAlumni , setNoAlumni] = useState(true);
  const batches = ["All", "2015", "2016", "2017", "2018",]
  const branches = ["All", "Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"]
  const router = useRouter() 

  async function getAllCollegeUsers({ collegeName }) {
    setLoading(true)
    try {
      let currUser = {}
      if (typeof window !== "undefined") {
        currUser = JSON.parse(localStorage.getItem("user-threads"))
      }

      const res = await axios.post(getAllCollegeUsersUrl, { collegeName: collegeName })
      console.log(res.data)
      const allUsers = res.data.users
      const formattedUsers = allUsers.map((user) => {
        if(user._id === currUser._id){
          return ({
            ...user,
            isConnected: user.connectedUsers?.includes(String(currUser._id)) || false,
            batch: user.batch || "2015", // Assuming batch information is available, otherwise defaulting to "2015"
            branch: user.branch || "Computer Science", // Assuming branch information is available, otherwise defaulting
            isCurrentUser:true
          })
        }else{
          return ({
            ...user,
            isConnected: user.connectedUsers?.includes(String(currUser._id)) || false,
            batch: user.batch || "2016", // Assuming batch information is available, otherwise defaulting to "2015"
            branch: user.branch || "Computer Science", // Assuming branch information is available, otherwise defaulting
            isCurrentUser:false
          })
        }
      })
      setUsers(formattedUsers)
      setLoading(false)
      setNoAlumni(false)
    } catch (error) {
      console.error(error)
    }
  }


  const handleConnect = async (id) => {
    setUsers(users.map(user => 
      user._id === id ? { ...user, isConnected: !user.isConnected } : user
    ))
    try {
      await axios.post(connectUsersUrl, { userId1: currentUser?._id, userId2: id })
      await axios.post(createChatOfUsers, { userId1: currentUser?._id, userId2: id })
    } catch (error) {
      console.log(error)
    }
  }

  const filteredUsers = users?.filter(user => 
    (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedBatch === "All" || user.batch === selectedBatch) &&
    (selectedBranch === "All" || user.branch === selectedBranch)
  )

  const groupedUsers = filteredUsers.reduce((acc, user) => {
    if (activeTab === "batch") {
      acc[user.batch] = [...(acc[user.batch] || []), user]
    } else if (activeTab === "branch") {
      acc[user.branch] = [...(acc[user.branch] || []), user]
    } else {
      acc["All"] = [...(acc["All"] || []), user]
    }
    return acc
  }, {})

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currUser = JSON.parse(localStorage.getItem("user-threads"))
      setCurrentUser(currUser)
      if (currUser) {
        getAllCollegeUsers({ collegeName: currUser.collegeName })
      }
    }
  }, [])

  if (!users) {
    return <></>
  }

  return (
    <div>

    <Navbar2 />

    {loading === true ? (<AlumniLoading />):(<div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Alumni Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alumni..."
                  className="pl-10 py-6 text-lg rounded-full shadow-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedBatch !== "All" ? selectedBatch : ""} onValueChange={setSelectedBatch}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-full shadow-md">
                <SelectValue placeholder="Select Batch">
      {selectedBatch === "All" ? "Select Batch" : selectedBatch}
    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {batch.map((batch) => (
                    <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedBranch !== "All" ? selectedBranch : ""} onValueChange={setSelectedBranch}>
  <SelectTrigger className="w-full sm:w-[180px] rounded-full shadow-md">
    <SelectValue placeholder="Select Branch">
      {selectedBranch === "All" ? "Select Branch" : selectedBranch}
    </SelectValue>
  </SelectTrigger>
  <SelectContent>
    {branch.map((branch) => (
      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
    ))}
  </SelectContent>
</Select>

            </div>
            
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="batch">By Batch</TabsTrigger>
                <TabsTrigger value="branch">By Branch</TabsTrigger>
              </TabsList>
            </Tabs>

            <AnimatePresence>
              {Object.entries(groupedUsers).slice().reverse().map(([group, groupUsers]) => (
                <motion.div
                  key={group}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {activeTab !== "all" && (
                    <h2 className="text-2xl font-semibold mb-4">{group}</h2>
                  )}
                  <motion.div 
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8"
                  >
                    {groupUsers.slice().reverse().map((user) => (
                      <motion.div
                        key={user._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                          <CardHeader className="p-0">
                            <div className="h-24 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                          </CardHeader>
                          <CardContent className="pt-0 pb-6 px-6 flex-grow flex flex-col">
                            <div className="flex justify-center -mt-12 mb-4">
                              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                              </Avatar>
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-2">{user.name}{user.isCurrentUser === true ? (<p className="text-sm text-muted-foreground" >(You)</p>):(<></>)}</h3>
                            <p className="text-sm text-muted-foreground text-center mb-4">{user.jobTitle || "Position not specified"}</p>
                            <div className="space-y-2 text-sm flex-grow">
                              <div className="flex items-center justify-center">
                                <GraduationCap className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{user.branch}, {user.batch}</span>
                              </div>
                              <div className="flex items-center justify-center">
                                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{user.location || "Location not specified"}</span>
                              </div>
                            </div>
                            <div className="mt-6 flex justify-center space-x-4">
                              <Button  variant="outline" size="sm" className="w-full" onClick={() => router.push(`/profile/${user._id}`)}>
                                <User className="w-4 h-4 mr-2" />
                                View Profile
                              </Button>
                              <Button
                                disabled={user.isConnected || user.isCurrentUser}
                                variant={user.isConnected ? "secondary" : "default"}
                                size="sm"
                                onClick={() => handleConnect(user._id)}
                                className={`w-full ${user.isConnected ? "bg-green-500 hover:bg-green-600 text-white" : ""}`}
                              >
                                {user.isConnected ? (
                                  <>
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Connected
                                  </>
                                ) : (
                                  <>
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Connect
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading === true ? (  <p className="text-center text-muted-foreground">Just a moment, preparing alumni information...</p>):(<></>)}
            { loading === false && noAlumni===false && filteredUsers.length === 0 && (
              <p className="text-center text-muted-foreground">No alumni found matching your criteria.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>)}
    
    </div>
  )
}