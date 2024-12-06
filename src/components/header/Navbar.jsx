'use client'

import React, { useState, useEffect } from 'react'
import { GraduationCapIcon, Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const toggleMenu = () => setIsOpen(!isOpen)
  const handleLogin = () => {
    router.push('/login')
  }
  const handleCollegeRegistration = () => {
    router.push('/collegeRegistration');
  }
  const navItems = [
    { name: "Career", href: "/career" },
    { name: "Events", href: "/#events" },
    { name: "Feedback", href: "/review" },
    { name: "Alumni", href: "/#alumni" },
    { name: "About", href: "/about" },
   
  ]


   return (
    <div className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 md:block hidden" >
    <header className="">
        <div className="max-w-[2200px] mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCapIcon className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-2xl text-black">LinkLum</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors"
                //onClick={(e) => {
                //  e.preventDefault()
                //  scrollToSection(item.href)
                //}}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mx-1"><Button onClick={handleCollegeRegistration} className="hidden md:inline-flex" variant="outline" size="lg">
            College Registration
          </Button>
            <Button onClick={handleLogin} className="hidden md:inline-flex mx-2" size="lg">
              Login
            </Button></div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold text-2xl text-black">Menu</span>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      {/* <X className="h-6 w-6" /> */}
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <a
                        href={item.href}
                        className="text-2xl font-semibold hover:text-blue-600 transition-colors"
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.href)
                        }}
                      >
                        {item.name}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto">
                  <SheetClose asChild>
                    <Button onClick={handleCollegeRegistration} variant="outline" size="lg" className="w-full mt-4">
                      College Registration
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button size="lg" className="w-full mt-1" onClick={() => { toggleMenu; handleLogin() }}>Login</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

   </div>
  )
}
