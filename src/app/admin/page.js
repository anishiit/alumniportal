"use client"

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
import {getFeedbacksUrl} from "@/urls/urls.js"
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAdmin , setIsAdmin] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  const colleges = [
    { id: 1, name: "Tech University", plan: "Premium", students: 5000, alumni: 20000, status: "Approved", remainingTime: "11 months", revenue: 50000 },
    { id: 2, name: "Liberal Arts College", plan: "Medium", students: 2000, alumni: 8000, status: "Approved", remainingTime: "5 months", revenue: 20000 },
    { id: 3, name: "Community College", plan: "Free", students: 1000, alumni: 3000, status: "Pending", remainingTime: "N/A", revenue: 0 },
    { id: 4, name: "Business School", plan: "Premium", students: 3000, alumni: 15000, status: "Approved", remainingTime: "8 months", revenue: 50000 },
    { id: 5, name: "Engineering Institute", plan: "Medium", students: 4000, alumni: 18000, status: "Pending", remainingTime: "N/A", revenue: 0 },
  ]

  // const feedbacks = [
  //   { id: 1, user: "John Doe", message: "Great platform for connecting with alumni!", rating: 5 },
  //   { id: 2, user: "Jane Smith", message: "Could use more networking features.", rating: 4 },
  //   { id: 3, user: "Bob Johnson", message: "Excellent resource for job opportunities!", rating: 5 },
  //   { id: 4, user: "Alice Brown", message: "The mentorship program is fantastic!", rating: 5 },
  //   { id: 5, user: "Charlie Wilson", message: "User interface could be more intuitive.", rating: 3 },
  // ]

  const totalRevenue = colleges.reduce((sum, college) => sum + college.revenue, 0)

  const handleViewDetails = (collegeId) => {
    // This function will be called when the "View Details" button is clicked
    // You can implement the logic to show college details here
    console.log(`Viewing details for college with ID: ${collegeId}`);
    // For example, you could open a modal or navigate to a new page
    // depending on your application's structure
  };
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
  
 useEffect(() => {
    getAllFeedbacks()
  },[])
  useEffect(() => {
    let currUser;
    if(typeof window !== undefined){
      currUser = JSON.parse(localStorage.getItem("user-threads"))
    
    }
    if(currUser.role === "admin" ){
        setIsAdmin(true)
    }else{
        setIsAdmin(false)
    }

  },[])

  if(!isAdmin){
    return (
        <div>
            <h1>Unauthorized</h1>
        </div>
    )
  }

  return (
    <>
    {
        isAdmin === true && (
            <>
            <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {/* <header className="flex items-center justify-between p-4 bg-white border-b">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu />
          </Button>
          <h1 className="text-2xl font-bold lg:hidden">Alumni Portal</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell />
            </Button>
            <div className="flex items-center space-x-2">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">Admin</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </header> */}

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Colleges</CardTitle>
                <School className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150,000</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">500,000</div>
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
                      {colleges.map((college) => (
                        <TableRow key={college.id}>
                          <TableCell className="font-medium">{college.name}</TableCell>
                          <TableCell>{college.plan}</TableCell>
                          <TableCell>{college.students.toLocaleString()}</TableCell>
                          <TableCell>{college.alumni.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              college.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {college.status}
                            </span>
                          </TableCell>
                          <TableCell>{college.remainingTime}</TableCell>
                          <TableCell>${college.revenue.toLocaleString()}</TableCell>
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
                      {colleges.filter(c => c.status === "Pending").map((college) => (
                        <TableRow key={college.id}>
                          <TableCell className="font-medium">{college.name}</TableCell>
                          <TableCell>{college.plan}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => handleViewDetails(college.id)}>
                              View Details
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" className="mr-2">Approve</Button>
                            <Button size="sm" variant="outline">Reject</Button>
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
                        <hr/>
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
            </>
        )
    }
    </>
  )
}