"use client"

import { useState, useEffect ,useCallback} from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users, GraduationCap, Calendar, DollarSign, Star, Trash2, Plus, Search,
  ChevronDown, MoreHorizontal, Edit, X, Menu, Upload, Image as ImageIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,  
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { getCollegeUsersUrl, createCollegeEventUrl, getCollegeEventsUrl, updateCollegeEventUrl, deleteCollegeEventUrl, addFeaturedAlumniUrl } from '@/urls/urls.js'
import { collegeName } from "@/data/college"
import { set } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { batch } from "@/data/batch"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useToast } from "@/hooks/use-toast"

import useCloudinaryImageUploader from '@/services/cloudinary';
import Footer from "@/components/footer/Footer"

export default function CollegeDashboard() {

  const {
    previewUrl,
    uploading,
    error,
    handleImageChange,
    uploadImage
  } = useCloudinaryImageUploader()

  const router = useRouter()

  const { toast } = useToast()

  const [collegeId, setCollegeId] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddEventDialog, setShowAddEventDialog] = useState(false)
  const [showAddFeaturedAlumniDialog, setShowAddFeaturedAlumniDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [eventSearchTerm, setEventSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (typeof window !== undefined) {
      const collegeInfo = JSON.parse(localStorage.getItem('college'))
      if (collegeInfo) {
        setCollegeId(collegeInfo._id)
        getCollegeUsers(collegeInfo.name)
        getCollegeEvents(collegeInfo._id)
        setFeaturedAlumni(collegeInfo.featuredAlumni)
      }
    }
  }, [])

  // Dummy data (unchanged)
  const [alumniData, setAlumniData] = useState([])

  const [studentData, setStudentData] = useState([])

  const [featuredAlumni, setFeaturedAlumni] = useState([
    { _id: 1, name: "Dr. Emily Clark", achievement: "Nobel Prize in Physics", image: "/placeholder.svg" },
    { _id: 2, name: "Michael Chen", achievement: "CEO of Tech Innovators Inc.", image: "/placeholder.svg" },
    { _id: 3, name: "Sarah Johnson", achievement: "Pulitzer Prize-winning Journalist", image: "/placeholder.svg" },
  ])

  const [upcomingEvents, setUpcomingEvents] = useState([])

  const [fundingData, setFundingData] = useState({
    totalRaised: 1500000,
    goal: 2000000,
    recentDonations: [
      { _id: 1, name: "Sarah Johnson", amount: 10000, date: "2024-03-01" },
      { _id: 2, name: "David Lee", amount: 5000, date: "2024-02-28" },
      { _id: 3, name: "Emily Brown", amount: 7500, date: "2024-02-25" },
      { _id: 4, name: "Michael Wilson", amount: 3000, date: "2024-02-22" },
      { _id: 5, name: "Jessica Taylor", amount: 15000, date: "2024-02-20" },
    ]
  })

  const [event, setEvent] = useState({
    name: "",
    description: "",
  })
  useEffect(() => {
    getCollegeEvents(collegeId)
    
  }, [event])
  const [image, setImage] = useState(null)

  const getCollegeUsers = async (collegeName) => {
    try {
      await axios.post(getCollegeUsersUrl, { collegeName: collegeName })
        .then((res) => {
          let alumni = [];
          let student = [];
          res.data.users?.map((user) => {
          if(user.role === "alumni"){
            alumni = [...alumni, user];
          }else{
            student = [...student, user];
          }
         
        })
          //setAlumniData(res.data.users)
          //setFilteredAlumniData(res.data.users)
          setAlumniData(alumni);
          setStudentData(student);
          setFilteredAlumniData(alumni);
        setFilteredStudentData(student);
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getCollegeEvents = async (collegeId) => {
    try {
      await axios.post(getCollegeEventsUrl, { collegeId: collegeId })
        .then((res) => {
          setUpcomingEvents(res.data.events)
          setFilteredEventsData(res.data.events)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const [eventLoading, setEventLoading] = useState(false) ;

  const createCollegeEvent = async () => {
    setEventLoading(true)
    let imageInfo = {}
    try {
      imageInfo = await uploadImage()
    } catch (error) {
      console.log(error)
      toast({
        title: "Error uploading image",
        description: "Please try again later.",
        variant: "red"
      })
      setEvent({ name: "", description: "" })
      setImage(null)
      return
    }

    try {
     
      await axios.post(createCollegeEventUrl, {
        collegeId, name:event.name, description: event.description, imageInfo: imageInfo
      })
        .then((res) => {
          
          setUpcomingEvents([...upcomingEvents, res.data.event])
          setEvent({ name: "", description: "" })
          setImage(null)
          // setUpcomingEvents([...upcomingEvents, { ...event, _id: upcomingEvents.length + 1, image: res.data.image }])

        })
        .catch((err) => {
          console.log(err)
          setEvent({ name: "", description: "" })
          setImage(null)
        })
        setEventLoading(false)
        setShowAddEventDialog(false)
    } catch (error) {
      console.error('Error:', error);
      setEvent({ name: "", description: "" })
      setImage(null)
    }
  }

  const updateCollegeEvent = async (eventId) => {
    try {
      const form = new FormData()
      form.append("image", image)
      form.append("name", event?.name)
      form.append("description", event?.description)
      await axios.post(updateCollegeEventUrl, { eventId: eventId, form })
        .then((res) => {
          
          setEvent({ name: "", description: "" })
          setImage(null)
          // setUpcomingEvents([...upcomingEvents, { ...event, _id: upcomingEvents.length + 1, image: res.data.image }])
        })
        .catch((err) => {
          console.log(err)
          setEvent({ name: "", description: "" })
          setImage(null)
        })
    } catch (error) {
      console.error('Error:', error);
      setEvent({ name: "", description: "" })
      setImage(null)
    }
  }

  const removeCollegeEvent = async (eventId) => {
    try {
      await axios.post(deleteCollegeEventUrl, { eventId: eventId })
        .then((res) => {
        
          setUpcomingEvents(upcomingEvents.filter(event => event._id !== eventId))
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const removeItem = (id, type) => {
    switch (type) {
      case 'alumni':
        setAlumniData(alumniData.filter(alumni => alumni?._id !== id))
        break
      case 'student':
        setStudentData(studentData.filter(student => student?._id !== id))
        break
      case 'event':
        setUpcomingEvents(upcomingEvents.filter(event => event?._id !== id))
        break
      case 'featuredAlumni':
        setFeaturedAlumni(featuredAlumni.filter(alumni => alumni?._id !== id))
        break
      default:
        console.log(`Unknown type: ${type}`)
    }
  }

  const addFeaturedAlumni = (alumni) => {
    setFeaturedAlumni([...featuredAlumni, { ...alumni, id: featuredAlumni.length + 1 }])
    setShowAddFeaturedAlumniDialog(false)
  }

  const [filteredAlumniData, setFilteredAlumniData] = useState(alumniData)
  const [filteredStudentData, setFilteredStudentData] = useState(studentData)
  const [filteredEventsData, setFilteredEventsData] = useState(upcomingEvents)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      const filteredAlumni = alumniData.filter(alumni =>
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      const filteredStudents = studentData.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredAlumniData(filteredAlumni)
      setFilteredStudentData(filteredStudents)
      setIsSearching(false)
    }, 500)
  }

  const handleEventSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      const filteredEvents = upcomingEvents.filter(event =>
        event.name.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
        event?.date?.includes(eventSearchTerm)
      )
      setFilteredEventsData(filteredEvents)
      setIsSearching(false)
    }, 500)
  }

  const handleImageUpload = (id, type, event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageDataUrl = e.target.result
        if (type === 'event') {
          setUpcomingEvents(upcomingEvents.map(event =>
            event?._id === id ? { ...event, image: imageDataUrl } : event
          ))
        } else if (type === 'featuredAlumni') {
          setFeaturedAlumni(featuredAlumni.map(alumni =>
            alumni?._id === id ? { ...alumni, image: imageDataUrl } : alumni
          ))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('college')
    router.replace('/collegeLogin')
  }

  useEffect(() => {
    if (searchTerm) {
      handleSearch()
    } else {
      // Reset to original data if search term is cleared
      setAlumniData(alumniData)
      setStudentData(studentData)
    }
  }, [searchTerm])

  useEffect(() => {
    if (eventSearchTerm) {
      handleEventSearch()
    } else {
      // Reset to original event data if search term is cleared
      setUpcomingEvents(upcomingEvents)
    }
  }, [eventSearchTerm])

  return (
    <>
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl sm:text-2xl text-black">College Dashboard</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button onClick={handleLogout} variant="ghost" className="text-white bg-blue-500 hover:bg-blue-800/80 hover:text-white mr-1 ">Logout</Button>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="inline-flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="alumni">Alumni</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="funding">Funding</TabsTrigger>
              <TabsTrigger value="featured">Featured Alumni</TabsTrigger>
            </TabsList>
          </ScrollArea>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{alumniData?.length}</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{studentData?.length}</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{upcomingEvents?.length}</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Funds Raised</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$100</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="alumni">
            <Card>
              <CardHeader>
                <CardTitle>Alumni Management</CardTitle>
                <CardDescription>Manage your college alumni here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8"
                      placeholder="Search alumni..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* <Button>Add New Alumni</Button> */}
                </div>
                <ScrollArea className="h-[400px]">
                  <AnimatePresence>
                    {isSearching ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center items-center h-full"
                      >
                        <p>Searching...</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left p-2">Name</th>
                              <th className="text-left p-2">Graduation Year</th>
                              <th className="text-left p-2">Email</th>
                              {/* <th className="text-left p-2">Actions</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredAlumniData?.map((alumni) => (

                              <motion.tr
                                key={alumni?._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Link href={`/profile/${alumni._id}`}>
                                  <td className="p-2 text-blue-600 hover:underline">{alumni?.name}</td> </Link>
                                <td className="p-2">{alumni?.batch}</td>
                                <td className="p-2">{alumni?.email}</td>
                                { /* <td className="p-2">
                                  <Button variant="ghost" size="sm" onClick={() => removeItem(alumni._id, 'alumni')}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td> */ }

                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Manage your current students here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* <Button>Add New Student</Button> */}
                </div>
                <ScrollArea className="h-[400px]">
                  <AnimatePresence>
                    {isSearching ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center items-center h-full"
                      >
                        <p>Searching...</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left p-2">Name</th>
                              <th className="text-left p-2">Year</th>
                              <th className="text-left p-2">Email</th>
                                {/* <th className="text-left p-2">Actions</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredStudentData?.map((student) => (
                              <motion.tr
                                key={student._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                              >
                                <td className="p-2">{student?.name}</td>
                                <td className="p-2">{student?.batch}</td>
                                <td className="p-2">{student?.email}</td>
                                {/* <td className="p-2">
                                  <Button variant="ghost" size="sm" onClick={() => removeItem(student?._id, 'student')}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td> */}
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Event Management</CardTitle>
                <CardDescription>Manage your college events here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8"
                      placeholder="Search events..."
                      value={eventSearchTerm}
                      onChange={(e) => setEventSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button  onClick={() => setShowAddEventDialog(true)}>Add New Event</Button>
                </div>
                <ScrollArea className="h-[800px]">
                  <AnimatePresence>
                    {isSearching ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center items-center h-full"
                      >
                        <p>Searching...</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                      >
                        {filteredEventsData?.map((event) => (
                          <motion.div
                            key={event?._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card>
                              <CardHeader>
                                <CardTitle>{event?.name}</CardTitle>
                                <CardDescription>{event?.description}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="aspect-video relative overflow-hidden rounded-md">
                                  <img
                                    src={event?.image}
                                    alt={event?.name}
                                    className="object-cover w-full h-full"
                                  />
                                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    <Upload className="h-6 w-6 text-white" />
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="image/*"
                                      onChange={(e) => { handleImageUpload(event._id, 'event', e); setImage(e.target.files[0]) }}
                                    />
                                  </label>
                                </div>
                              </CardContent>
                              <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm" onClick={() => { updateCollegeEvent(event._id) }} >Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => removeCollegeEvent(event?._id)}>
                                  Remove
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funding">
            <Card>
              <CardHeader>
                <CardTitle>Funding Tracker</CardTitle>
                <CardDescription>Track alumni donations and funding progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label>Funding Progress</Label>
                  <div className="h-4 bg-gray-200 rounded-full mt-2">
                    <motion.div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(fundingData.totalRaised / fundingData.goal) * 100}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(fundingData.totalRaised / fundingData.goal) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    ${fundingData.totalRaised.toLocaleString()} raised of ${fundingData.goal.toLocaleString()} goal
                  </p>
                </div>
                <div>
                  <Label>Recent Donations</Label>
                  <ScrollArea className="h-[200px] mt-2">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Donor</th>
                          <th className="text-left p-2">Amount</th>
                          <th className="text-left p-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fundingData.recentDonations.map((donation) => (
                          <motion.tr
                            key={donation?._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <td className="p-2">{donation.name}</td>
                            <td className="p-2">${donation.amount.toLocaleString()}</td>
                            <td className="p-2">{donation.date}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured">
            <Card>
              <CardHeader>
                <CardTitle>Featured Alumni</CardTitle>
                <CardDescription>Showcase your notable alumni here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button onClick={() => setShowAddFeaturedAlumniDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Featured Alumni
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredAlumni.map((alumni) => (
                    <motion.div
                      key={alumni?._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>{alumni.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-2">{alumni.achievement}</p>
                          <div className="aspect-video relative overflow-hidden rounded-md">
                            <img
                              src={alumni.image}
                              alt={alumni.name}
                              className="object-cover w-full h-full"
                            />
                            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                              <Upload className="h-6 w-6 text-white" />
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(alumni?._id, 'featuredAlumni', e)}
                              />
                            </label>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full"
                            onClick={() => removeItem(alumni?._id, 'featuredAlumni')}
                          >
                            Remove
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>Enter the details for the new event.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-name" className="text-right">
                Event Name
              </Label>
              <Input value={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} id="event-name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-name" className="text-right">
                Description
              </Label>
              <Textarea value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} id="event-description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-date" className="text-right">
                Date
              </Label>
              <Input id="event-date" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-image" className="text-right">
                Image
              </Label>
              {/* <input
                className="col-span-3 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="file"
                placeholder=""
                onChange={(e) => { setImage(e.target.files[0]); console.log(e.target.files[0]) }}
              /> */}
              {/* <Input onChange={(e) => setImage(e.target.value)} id="event-image" type="file" accept="image/*" className="col-span-3" /> */}
              <div className='flex '>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: "30px" }} />}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => createCollegeEvent()}>
              {eventLoading=== true ? ("Creating..."):('Add Event')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddFeaturedAlumniDialog} onOpenChange={setShowAddFeaturedAlumniDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Featured Alumni</DialogTitle>
            <DialogDescription>Enter the details for the featured alumni.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alumni-name" className="text-right">
                Name
              </Label>
              <Input id="alumni-name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alumni-achievement" className="text-right">
                Achievement
              </Label>
              <Input id="alumni-achievement" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alumni-image" className="text-right">
                Image
              </Label>
              <Input id="alumni-image" type="file" accept="image/*" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => addFeaturedAlumni({ name: "New Alumni", achievement: "Notable Achievement", image: "/placeholder.svg" })}>
              Add Featured Alumni
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <footer className="w-full border-t bg-white py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; 2024 LinkLum. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/terms-and-conditions" className="text-sm text-gray-500 hover:underline">Terms of Service</Link>
            <Link href="/privacy-policy" className="text-sm text-gray-500 hover:underline">Privacy Policy</Link>
          </nav>
        </div>
      </footer> */}
    </div>
    <Footer />
    </>
  )
}