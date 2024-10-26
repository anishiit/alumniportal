"use client"

import { useState, useEffect } from "react"
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
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
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

export default function CollegeDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddEventDialog, setShowAddEventDialog] = useState(false)
  const [showAddFeaturedAlumniDialog, setShowAddFeaturedAlumniDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [eventSearchTerm, setEventSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Dummy data (unchanged)
  const [alumniData, setAlumniData] = useState([
    { id: 1, name: "John Doe", graduationYear: 2020, email: "john@example.com" },
    { id: 2, name: "Jane Smith", graduationYear: 2019, email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", graduationYear: 2021, email: "bob@example.com" },
    { id: 4, name: "Alice Williams", graduationYear: 2018, email: "alice@example.com" },
    { id: 5, name: "Charlie Brown", graduationYear: 2022, email: "charlie@example.com" },
  ])

  const [studentData, setStudentData] = useState([
    { id: 1, name: "Emma Davis", year: 3, email: "emma@example.com" },
    { id: 2, name: "Liam Wilson", year: 2, email: "liam@example.com" },
    { id: 3, name: "Olivia Moore", year: 4, email: "olivia@example.com" },
    { id: 4, name: "Noah Taylor", year: 1, email: "noah@example.com" },
    { id: 5, name: "Ava Anderson", year: 3, email: "ava@example.com" },
  ])

  const [featuredAlumni, setFeaturedAlumni] = useState([
    { id: 1, name: "Dr. Emily Clark", achievement: "Nobel Prize in Physics", image: "/placeholder.svg" },
    { id: 2, name: "Michael Chen", achievement: "CEO of Tech Innovators Inc.", image: "/placeholder.svg" },
    { id: 3, name: "Sarah Johnson", achievement: "Pulitzer Prize-winning Journalist", image: "/placeholder.svg" },
  ])

  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, name: "Annual Alumni Gala", date: "2024-06-15", image: "/placeholder.svg" },
    { id: 2, name: "Career Fair", date: "2024-09-20", image: "/placeholder.svg" },
    { id: 3, name: "Homecoming Weekend", date: "2024-10-05", image: "/placeholder.svg" },
    { id: 4, name: "Research Symposium", date: "2024-11-12", image: "/placeholder.svg" },
  ])

  const [fundingData, setFundingData] = useState({
    totalRaised: 1500000,
    goal: 2000000,
    recentDonations: [
      { id: 1, name: "Sarah Johnson", amount: 10000, date: "2024-03-01" },
      { id: 2, name: "David Lee", amount: 5000, date: "2024-02-28" },
      { id: 3, name: "Emily Brown", amount: 7500, date: "2024-02-25" },
      { id: 4, name: "Michael Wilson", amount: 3000, date: "2024-02-22" },
      { id: 5, name: "Jessica Taylor", amount: 15000, date: "2024-02-20" },
    ]
  })

  const removeItem = (id, type) => {
    switch (type) {
      case 'alumni':
        setAlumniData(alumniData.filter(alumni => alumni.id !== id))
        break
      case 'student':
        setStudentData(studentData.filter(student => student.id !== id))
        break
      case 'event':
        setUpcomingEvents(upcomingEvents.filter(event => event.id !== id))
        break
      case 'featuredAlumni':
        setFeaturedAlumni(featuredAlumni.filter(alumni => alumni.id !== id))
        break
      default:
        console.log(`Unknown type: ${type}`)
    }
  }

  const addEvent = (event) => {
    setUpcomingEvents([...upcomingEvents, { ...event, id: upcomingEvents.length + 1 }])
    setShowAddEventDialog(false)
  }

  const addFeaturedAlumni = (alumni) => {
    setFeaturedAlumni([...featuredAlumni, { ...alumni, id: featuredAlumni.length + 1 }])
    setShowAddFeaturedAlumniDialog(false)
  }

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
      setAlumniData(filteredAlumni)
      setStudentData(filteredStudents)
      setIsSearching(false)
    }, 500)
  }

  const handleEventSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      const filteredEvents = upcomingEvents.filter(event => 
        event.name.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
        event.date.includes(eventSearchTerm)
      )
      setUpcomingEvents(filteredEvents)
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
            event.id === id ? { ...event, image: imageDataUrl } : event
          ))
        } else if (type === 'featuredAlumni') {
          setFeaturedAlumni(featuredAlumni.map(alumni => 
            alumni.id === id ? { ...alumni, image: imageDataUrl } : alumni
          ))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (searchTerm) {
      handleSearch()
    } else {
      // Reset to original data if search term is cleared
      setAlumniData([
        { id: 1, name: "John Doe", graduationYear: 2020, email: "john@example.com" },
        { id: 2, name: "Jane Smith", graduationYear: 2019, email: "jane@example.com" },
        { id: 3, name: "Bob Johnson", graduationYear: 2021, email: "bob@example.com" },
        { id: 4, name: "Alice Williams", graduationYear: 2018, email: "alice@example.com" },
        { id: 5, name: "Charlie Brown", graduationYear: 2022, email: "charlie@example.com" },
      ])
      setStudentData([
        { id: 1, name: "Emma Davis", year: 3, email: "emma@example.com" },
        { id: 2, name: "Liam Wilson", year: 2, email: "liam@example.com" },
        { id: 3, name: "Olivia Moore", year: 4, email: "olivia@example.com" },
        { id: 4, name: "Noah Taylor", year: 1, email: "noah@example.com" },
        { id: 5, name: "Ava Anderson", year: 3, email: "ava@example.com" },
      ])
    }
  }, [searchTerm])

  useEffect(() => {
    if (eventSearchTerm) {
      handleEventSearch()
    } else {
      // Reset to original event data if search term is cleared
      setUpcomingEvents([
        { id: 1, name: "Annual Alumni Gala", date: "2024-06-15", image: "/placeholder.svg" },
        { id: 2, name: "Career Fair", date: "2024-09-20", image: "/placeholder.svg" },
        { id: 3, name: "Homecoming Weekend", date: "2024-10-05", image: "/placeholder.svg" },
        { id: 4, name: "Research Symposium", date: "2024-11-12", image: "/placeholder.svg" },
      ])
    }
  }, [eventSearchTerm])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl sm:text-2xl text-black">College Dashboard</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Profile</Button>
            <Button variant="ghost">Settings</Button>
            <Button variant="ghost">Logout</Button>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
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
                    <div className="text-2xl font-bold">{alumniData.length}</div>
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
                    <div className="text-2xl font-bold">{studentData.length}</div>
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
                    <div className="text-2xl font-bold">{upcomingEvents.length}</div>
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
                    <div className="text-2xl font-bold">${fundingData.totalRaised.toLocaleString()}</div>
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
                  <Button>Add New Alumni</Button>
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
                              <th className="text-left p-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {alumniData.map((alumni) => (
                              <motion.tr
                                key={alumni.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                              >
                                <td className="p-2">{alumni.name}</td>
                                <td className="p-2">{alumni.graduationYear}</td>
                                <td className="p-2">{alumni.email}</td>
                                <td className="p-2">
                                  <Button variant="ghost"  className="hover:bg-red-500 hover:text-white" size="sm" onClick={() => removeItem(alumni.id, 'alumni')}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td>
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
                  <Button>Add New Student</Button>
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
                              <th className="text-left p-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentData.map((student) => (
                              <motion.tr
                                key={student.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                              >
                                <td className="p-2">{student.name}</td>
                                <td className="p-2">{student.year}</td>
                                <td className="p-2">{student.email}</td>
                                <td className="p-2">
                                  <Button variant="ghost" size="sm" onClick={() => removeItem(student.id, 'student')}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td>
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
                  <Button onClick={() => setShowAddEventDialog(true)}>Add New Event</Button>
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
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                      >
                        {upcomingEvents.map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card>
                              <CardHeader>
                                <CardTitle>{event.name}</CardTitle>
                                <CardDescription>{event.date}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="aspect-video relative overflow-hidden rounded-md">
                                  <img 
                                    src={event.image} 
                                    alt={event.name} 
                                    className="object-cover w-full h-full"
                                  />
                                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    <Upload className="h-6 w-6 text-white" />
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="image/*"
                                      onChange={(e) => handleImageUpload(event.id, 'event', e)}
                                    />
                                  </label>
                                </div>
                              </CardContent>
                              <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => removeItem(event.id, 'event')}>
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
                            key={donation.id}
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
                      key={alumni.id}
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
                                onChange={(e) => handleImageUpload(alumni.id, 'featuredAlumni', e)}
                              />
                            </label>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="w-full"
                            onClick={() => removeItem(alumni.id, 'featuredAlumni')}
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
              <Input id="event-name" className="col-span-3" />
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
              <Input id="event-image" type="file" accept="image/*" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => addEvent({ name: "New Event", date: "2024-01-01", image: "/placeholder.svg" })}>
              Add Event
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

      <footer className="w-full border-t bg-white py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; 2024 Alumni Portal. All rights reserved.</p>
          <nav className="flex gap-4">
            <a href="#" className="text-sm text-gray-500 hover:underline">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:underline">Privacy Policy</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}