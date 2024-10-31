"use client"

import jwt from "jsonwebtoken"
import { useState, useCallback, useEffect } from "react"
import { Bell, ChevronDown, Layout, LogOut, Menu, MessagesSquare, PieChart, School, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { getFeedbacksUrl, getAllCollegesUrl, getNonVarifiedCollegesUrl, verifyCollegeUrl, rejectverifyCollegeUrl, blockCollegeUrl ,getAllCollegeCountUrl, getAllStudentsCountUrl, getAllAlumniCountUrl} from "@/urls/urls.js"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { set } from "date-fns"

export default function AdminDashboard() {
  const { toast } = useToast()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  const [registerdColleges, setRegisterdColleges] = useState([])
  const [nonVerifiedColleges, setNonVerifiedColleges] = useState([])
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [totalColleges, setTotalColleges] = useState(0)
  const [totalStudents, setTotalStudents] = useState(0)
  const [totalAlumni, setTotalAlumni] = useState(0)

  const colleges = [
    { id: 1, name: "Tech University", plan: "Premium", students: 5000, alumni: 20000, status: "Approved", remainingTime: "11 months", revenue: 50000 },
    { id: 2, name: "Liberal Arts College", plan: "Medium", students: 2000, alumni: 8000, status: "Approved", remainingTime: "5 months", revenue: 20000 },
    { id: 3, name: "Community College", plan: "Free", students: 1000, alumni: 3000, status: "Pending", remainingTime: "N/A", revenue: 0 },
    { id: 4, name: "Business School", plan: "Premium", students: 3000, alumni: 15000, status: "Approved", remainingTime: "8 months", revenue: 50000 },
    { id: 5, name: "Engineering Institute", plan: "Medium", students: 4000, alumni: 18000, status: "Pending", remainingTime: "N/A", revenue: 0 },
  ]

  const totalRevenue = colleges.reduce((sum, college) => sum + college.revenue, 0)

  const handleViewDetails = (college) => {
    setSelectedCollege(college)
    setIsDialogOpen(true)
  }

  const getCollegeCount= async () => {
    try {
      await axios
        .post(getAllCollegeCountUrl)
        .then((res) => {
          console.log(res.data.count)
          setTotalColleges(res.data.count)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getAllAlumniCount = async () => {
    try {
      await axios
        .get(getAllAlumniCountUrl)
        .then((res) => {
          console.log(res.data.count)
          setTotalAlumni(res.data.count)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getAllStudentCount = async () => {
    try {
      await axios
        .get(getAllStudentsCountUrl)
        .then((res) => {
          console.log(res.data.count)
          setTotalStudents(res.data.count)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getAllFeedbacks = async () => {
    try {
      await axios
        .get(getFeedbacksUrl)
        .then((res) => {
          console.log(res.data.feedbacks)
          setFeedbacks(res.data.feedbacks)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getAllregisteredColleges = async () => {
    let currUser;
    if (typeof window !== undefined) {
      currUser = localStorage.getItem("amsjbckumr")
      currUser = jwt.verify(currUser, process.env.NEXT_PUBLIC_JWT_SECRET)
    }
    try {
      await axios.post(getAllCollegesUrl, { userId: currUser._id })
        .then((res) => {
          console.log(res.data)
          setRegisterdColleges(res.data.colleges)
        })
        .catch((err) => {
          console.log(err)
          toast({
            description: "err",
            variant: "red",
          })
        })
    } catch (error) {
      console.log(error)
      toast({
        description: "error",
        variant: "red",
      })
    }
  }

  const getNonVerifiedColleges = async () => {
    let currUser;
    if (typeof window !== undefined) {
      currUser = localStorage.getItem("amsjbckumr")
      currUser = jwt.verify(currUser, process.env.NEXT_PUBLIC_JWT_SECRET)
    }
    try {
      await axios.post(getNonVarifiedCollegesUrl, { userId: currUser._id })
        .then((res) => {
          console.log(res.data)
          setNonVerifiedColleges(res.data.colleges)
        })
        .catch((err) => {
          console.log(err)
          toast({
            description: "err",
            variant: "red",
          })
        })
    } catch (error) {
      console.log(error)
      toast({
        description: "error",
        variant: "red",
      })
    }
  }

  const handleVerifyCollege = async (collegeId) => {
    try {
      await axios
        .post(verifyCollegeUrl, { collegeId })
        .then((res) => {
          console.log(res.data)
          toast({
            description: "college verified",
            variant: "green",
          })
        })
        .catch((err) => {
          console.log(err)
          toast({
            description: "error",
            variant: "red",
          })
        })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleRejectCollege = async (collegeId) => {
    try {
      await axios
        .post(rejectverifyCollegeUrl, { collegeId })
        .then((res) => {
          console.log(res.data)
          toast({
            description: "college rejected",
            variant: "green",
          })
        })
        .catch((err) => {
          console.log(err)
          toast({
            description: "error",
            variant: "red",
          })
        })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleBlockCollege = async (collegeId) => {
    try {
      await axios
        .post(blockCollegeUrl, { collegeId })
        .then((res) => {
          console.log(res.data)
          toast({
            description: "college blocked",
            variant: "green",
          })
        })
        .catch((err) => {
          console.log(err)
          toast({
            description: "error",
            variant: "red",
          })
        })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    getAllregisteredColleges()
    getNonVerifiedColleges()
    getAllFeedbacks()
    getCollegeCount()
    getAllAlumniCount()
    getAllStudentCount()
  }, [])

  useEffect(() => {
    let currUser;
    if (typeof window !== undefined) {
      currUser = localStorage.getItem("amsjbckumr")
      currUser = jwt.verify(currUser, process.env.NEXT_PUBLIC_JWT_SECRET)
    }
    if (currUser.role === "admin") {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [])

  if (!isAdmin) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    )
  }

  return (
    <>
      {isAdmin === true && (
        <>
          <div className="flex h-screen bg-gray-100">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h1 className="text-2xl font-bold">Alumni Portal</h1>
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                      <Menu />
                    </Button>
                  </div>
                  <div className="flex-1 px-4 py-6 space-y-4">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/">
                        <Layout className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/analytics">
                        <PieChart className="mr-2 h-4 w-4" />
                        Analytics
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <School className="mr-2 h-4 w-4" />
                      Colleges
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Users
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <MessagesSquare className="mr-2 h-4 w-4" />
                      Feedback
                    </Button>
                  </div>
                  <div className="p-4 border-t">
                    <Button variant="ghost" className="w-full justify-start text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex-1 flex flex-col overflow-hidden">
              <main className="flex-1 overflow-y-auto p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Colleges</CardTitle>
                      <School className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalColleges}</div>
                      <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalStudents}</div>
                      <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalAlumni}</div>
                      <p className="text-xs text-muted-foreground">+2% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">50,000</div>
                      <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">From all college plans</p>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="colleges" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="colleges">Colleges</TabsTrigger>
                    <TabsTrigger value="approval">Approval Panel</TabsTrigger>
                    <TabsTrigger value="feedback">User Feedback</TabsTrigger>
                  </TabsList>
                  <TabsContent value="colleges">
                    <Card>
                      <CardHeader>
                        <CardTitle>Registered Colleges</CardTitle>
                        <CardDescription>Manage colleges and their subscription plans.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Plan</TableHead>
                              <TableHead>Students</TableHead>
                              <TableHead>Alumni</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Remaining Time</TableHead>
                              <TableHead>Revenue</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {registerdColleges?.map((college) => (
                              <TableRow key={college._id}>
                                <TableCell className="font-medium">{college.name}</TableCell>
                                <TableCell>{college?.plan}</TableCell>
                                <TableCell>{college?.students?.toLocaleString()}</TableCell>
                                <TableCell>{college?.alumni?.toLocaleString()}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${college?.isVerified === true ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                    {college.isVerified === true ? "Verified" : "Pending"}
                                  </span>
                                </TableCell>
                                <TableCell>{college?.remainingTime}</TableCell>
                                <TableCell>${college?.revenue?.toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="approval">
                    <Card>
                      <CardHeader>
                        <CardTitle>College Approval Panel</CardTitle>
                        <CardDescription>Review and approve new college registrations.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Requested Plan</TableHead>
                              <TableHead>Details</TableHead>
                              <TableHead>Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {nonVerifiedColleges?.map((college) => (
                              <TableRow key={college._id}>
                                <TableCell className="font-medium">{college?.name}</TableCell>
                                <TableCell>{college?.plan}</TableCell>
                                <TableCell>
                                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(college)}>
                                    View Details
                                  </Button>
                                </TableCell>
                                <TableCell className="flex gap-2">
                                  <Button onClick={() => handleVerifyCollege(college._id)} size="sm" className="mr-2">Approve</Button>
                                  <Button disabled={college?.isBlocked} className='bg-yellow-600 text-white hover:bg-yellow-500/70 hover:text-white' onClick={() => handleBlockCollege(college._id)} size="sm" variant="outline">{college?.isBlocked ? "Blocked" : "Block"} </Button>
                                  <Button className=' mx-2 bg-red-500 text-white  hover:bg-red-500/70 hover:text-white' onClick={() => handleRejectCollege(college._id)} size="sm" variant="outline">Reject</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="feedback">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Feedback</CardTitle>
                        <CardDescription>Recent feedback from alumni portal users.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px]">
                          {feedbacks?.map((feedback) => (
                            <div key={feedback._id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center mb-2">
                                <h3 className="font-semibold">{feedback.name}</h3>
                                <p className="text-sm text-gray-600">({feedback.email})</p>
                              </div>
                              <hr />
                              <p className="text-sm text-gray-600 py-2">{feedback.feedback}</p>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </main>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{selectedCollege?.name} Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">Name:</span>
                  <span className="col-span-3">{selectedCollege?.name}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">Plan:</span>
                  <span className="col-span-3">{selectedCollege?.plan}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">email:</span>
                  <span className="col-span-3">{selectedCollege?.email}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">website:</span>
                  <span className="col-span-3">{selectedCollege?.website}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">linkedin:</span>
                  <span className="col-span-3">{selectedCollege?.linkedin}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">Contact No:</span>
                  <span className="col-span-3">{selectedCollege?.phone}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">Status:</span>
                  <span className="col-span-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${selectedCollege?.isVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {selectedCollege?.isVerified ? "Verified" : "Pending"}
                    </span>
                    <span className={`px-2 py-1 rounded-full mx-2 text-xs ${selectedCollege?.isVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {selectedCollege?.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </span>
                </div>
                {selectedCollege?.remainingTime && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">Remaining Time:</span>
                    <span className="col-span-3">{selectedCollege?.remainingTime}</span>
                  </div>
                )}
                {selectedCollege?.revenue && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">Revenue:</span>
                    <span className="col-span-3">${selectedCollege?.revenue?.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  )
}