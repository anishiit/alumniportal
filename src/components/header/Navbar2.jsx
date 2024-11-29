
// "use client"

// import jwt from "jsonwebtoken"

// import React, { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Bell, Calendar, LayoutDashboard, SmilePlus, LogOut, Mail, Menu, User, Users, X, GraduationCap, Briefcase, Search, ChevronDown } from "lucide-react"
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// function Navbar2() {
//   const [user, setUser] = useState("")
//   const [isOpen, setIsOpen] = useState(false)
//   const [userData, setUserData] = useState({ collegeName: '', name: '' })
//   const router = useRouter()

//   useEffect(() => {
//     getUser()
//   }, [])

//   useEffect(() => {
//     let user = (localStorage.getItem('amsjbckumr'))
//     user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET);
//     if (user) {
//       const { collegeName, name } = user
//       setUserData({ collegeName, name })
//     }
//   }, [])

//   const getUser = () => {
//     if (typeof window !== "undefined") {
//       let data = (localStorage.getItem('amsjbckumr'))
//       data  = (jwt.verify(data, process.env.NEXT_PUBLIC_JWT_SECRET))
//       // data = JSON.parse(data)
//       if (data) {
//         setUser(data)
//       }
//     }
//   }

//   const toggleMenu = () => setIsOpen(!isOpen)

//   const navItems = [
//     { name: "Reconnect", href: "/search", external: true, icon: <Users className="h-4 w-4 mr-2" /> },
//     { name: "Careers", href: "/jobposts", external: true, icon: <Search className="h-4 w-4 mr-2" /> },
//     { name: "Messages", href: "/chat", external: true, icon: <Mail className="h-4 w-4 mr-2" /> },
//     { name: "Memories", href: "/memories", external: true, icon: <SmilePlus className="h-4 w-4 mr-2" /> },
//     { name: "Student Hub", href: "/student-hub", external: true, icon: <Calendar className="h-4 w-4 mr-2" /> },
//     { name: "Profile", href: `/profile/${user._id}`, external: true, className: " md:hidden", icon: <User className="h-4 w-4 mr-2" /> },
//   ]

//   const scrollToSection = (href) => {
//     const element = document.querySelector(href)
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//     }
//     setIsOpen(false)
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll("section")
//       const scrollPosition = window.scrollY + 100

//       sections.forEach((section) => {
//         if (section instanceof HTMLElement) {
//           const sectionTop = section.offsetTop
//           const sectionHeight = section.offsetHeight
//           const sectionId = section.getAttribute("id")

//           if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
//             document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add("text-blue-600")
//           } else {
//             document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.remove("text-blue-600")
//           }
//         }
//       })
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const handleLogout = (e) => {
//     e.preventDefault()
//     try {
//       if (typeof window !== "undefined") {
//         localStorage.clear()
//         router.push('/')
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
//       <div className="container flex h-16 items-center justify-between">
//         <Link href="/home" className="flex items-center space-x-2">
//           <GraduationCap className="h-8 w-8 text-blue-600" />
//           <span className="font-bold text-2xl text-black">{userData.collegeName}</span>
//         </Link>

//         <nav className="hidden md:flex gap-6">
//           {navItems.map((item) => (
//             item.external ? (
//               <Link key={item.name} href={item.href} className={`${item.className} text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center`}>
//                 {item.icon}
//                 {item.name}

//               </Link>
//             ) : (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center"
//                 onClick={(e) => {
//                   e.preventDefault()
//                   scrollToSection(item.href)
//                 }}
//               >
//                 {item.icon}
//                 {item.name}
//               </a>
//             )
//           ))}
//         </nav>

//         <div className="hidden  md:flex items-center gap-4">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-8 w-8 m-4  rounded-full">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={user.profileImage} alt={user.name} />
//                   <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <DropdownMenuItem asChild>
//                 <Link href={`/profile/${user._id}`}>
//                   <User className="mr-2 h-4 w-4" />
//                   <span>Profile</span>
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//           <SheetTrigger asChild>
//             <Button variant="ghost" size="icon" className="md:hidden">
//               <Menu className="h-6 w-6" />
//               <span className="sr-only">Toggle menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//             <div className="flex flex-col h-full">
//               <div className="flex items-center justify-between mb-6">
//                 <span className="font-bold text-2xl text-black">Menu</span>
//                 <SheetClose asChild>
//                   <Button variant="ghost" size="icon">

//                   </Button>
//                 </SheetClose>
//               </div>
//               <nav className="flex flex-col gap-4">
//                 {navItems.map((item) => (
//                   item.external ? (
//                     <SheetClose asChild key={item.name}>
//                       <Link href={item.href} className="text-lg md:text-2xl font-semibold hover:text-blue-600 transition-colors flex items-center">
//                         {item.icon}
//                         {item.name}
//                       </Link>
//                     </SheetClose>
//                   ) : (
//                     <SheetClose asChild key={item.name}>
//                       <a
//                         href={item.href}
//                         className="text-lg md:text-2xl font-semibold hover:text-blue-600 transition-colors flex items-center"
//                         onClick={(e) => {
//                           e.preventDefault()
//                           scrollToSection(item.href)
//                         }}
//                       >
//                         {item.icon}
//                         {item.name}
//                       </a>
//                     </SheetClose>
//                   )
//                 ))}
//               </nav>
//               <div className="mt-auto space-y-4">

//                 <SheetClose asChild>
//                   <Button onClick={handleLogout} className="w-full text-lg" variant="outline">
//                     <LogOut className="h-4 w-4 mr-2" />
//                     Log Out
//                   </Button>
//                 </SheetClose>
//               </div>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   )
// }

// export default Navbar2



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
    if(!user){
      return;
    }
    user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET);
    if (user) {
      const { collegeName, name } = user
      setUserData({ collegeName, name })
    }
  }, [])

  const getUser = () => {
    if (typeof window !== "undefined") {
      let data = (localStorage.getItem('amsjbckumr'))
      if(!data){
        return;
      }
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
    { name: "Campus", href: "/student-hub", icon: <Calendar className="h-4 w-4 mr-2" /> },
  ]

  const mobileNavItems = [
    { name: "Home", href: "/home", icon: <Home className="h-5 w-5" /> },
    { name: "Reconnect", href: "/search", icon: <Users className="h-5 w-5" /> },
    { name: "Careers", href: "/jobposts", icon: <Search className="h-5 w-5" /> },
    { name: "Memories", href: "/memories", icon: <SmilePlus className="h-5 w-5" /> },
   { name: "Messages", href: "/chat", icon: <Mail className="h-5 w-5" /> },
    // { name: "Profile", href: `/profile/${user._id}`, icon: 
    //   <Avatar className="h-6 w-6">
    //     <AvatarImage src={user.profileImage} alt={user.name} />
    //     <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
    //   </Avatar>
    // },
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
          <div className="flex items-center gap-4">
          <Link href={"/student-hub"}>
          <div className="flex items-center justify-center -mx-3 w-10 h-10 rounded-full ">
              <Calendar className="h-6 w-6 text-black" />
            </div></Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 m-4 rounded-full">
                  <Avatar className="h-10 w-10">
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
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-40 w-full h-14 bg-blue-50 rounded-t-3xl md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto relative">
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
          {/* <div className="flex items-center justify-center">
            <button onClick={() => router.push("/jobposts")} className="absolute -top-2 inline-flex items-center justify-center w-12 h-12 bg-black rounded-full">
              <Search className="h-6 w-6 text-white" />
            </button>
          </div> */}

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

