"use client"

import jwt from "jsonwebtoken"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Home, FolderClosed, Plus, Activity, User, Bell, Calendar, LayoutDashboard, SmilePlus, LogOut, Mail, Menu, Users, X, GraduationCap, Briefcase, Search, ChevronDown } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Navbar2() {
  const [user, setUser] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [userData, setUserData] = useState({ collegeName: '', name: '' })
  const router = useRouter()

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    let user = (localStorage.getItem('amsjbckumr'))
    user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET);
    if (user) {
      const { collegeName, name } = user
      setUserData({ collegeName, name })
    }
  }, [])

  const getUser = () => {
    if (typeof window !== "undefined") {
      let data = (localStorage.getItem('amsjbckumr'))
      data = (jwt.verify(data, process.env.NEXT_PUBLIC_JWT_SECRET))
      if (data) {
        setUser(data)
      }
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    try {
      if (typeof window !== "undefined") {
        localStorage.clear()
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const navItems = [
    { name: "Reconnect", href: "/search", icon: <Users className="h-4 w-4 mr-2" /> },
    { name: "Careers", href: "/jobposts", icon: <Search className="h-4 w-4 mr-2" /> },
    { name: "Messages", href: "/chat", icon: <Mail className="h-4 w-4 mr-2" /> },
    { name: "Memories", href: "/memories", icon: <SmilePlus className="h-4 w-4 mr-2" /> },
    { name: "Student Hub", href: "/student-hub", icon: <Calendar className="h-4 w-4 mr-2" /> },
  ]

  const mobileNavItems = [
    { name: "Home", href: "/home", icon: <Home className="h-6 w-6" /> },
    { name: "Files", href: "/files", icon: <FolderClosed className="h-6 w-6" /> },
    { name: "Activity", href: "/activity", icon: <Activity className="h-6 w-6" /> },
    { name: "Account", href: `/profile/${user._id}`, icon: <User className="h-6 w-6" /> },
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 md:block hidden">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/home" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-2xl text-black">{userData.collegeName}</span>
          </Link>

          <nav className="flex gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 m-4 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href={`/profile/${user._id}`}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 md:hidden">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/home" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg text-black">{userData.collegeName}</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </header>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-xl text-black">{userData.collegeName}</span>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-6 w-6" />
                </Button>
              </SheetClose>
            </div>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <SheetClose asChild key={item.name}>
                  <Link href={item.href} className="text-lg font-semibold hover:text-blue-600 transition-colors flex items-center">
                    {item.icon}
                    {item.name}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto space-y-4">
              <SheetClose asChild>
                <Button onClick={handleLogout} className="w-full text-lg" variant="outline">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white border-t md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {mobileNavItems.slice(0, 2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
            >
              {item.icon}
              <span className="text-xs text-gray-500 group-hover:text-blue-600">{item.name}</span>
            </Link>
          ))}
          
          {/* Center Plus Button */}
          <button className="inline-flex flex-col items-center justify-center px-5">
            <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full -mt-6">
              <Plus className="h-6 w-6 text-white" />
            </div>
          </button>

          {mobileNavItems.slice(2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
            >
              {item.icon}
              <span className="text-xs text-gray-500 group-hover:text-blue-600">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar2

