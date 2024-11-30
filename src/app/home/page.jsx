"use client"

import jwt from "jsonwebtoken"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, Calendar, LayoutDashboard, LogOut, Mail, Menu, User, Users, X, GraduationCap, Briefcase, Search } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Navbar2 from "@/components/header/Navbar2"

import { useToast } from "@/hooks/use-toast"

const description1=["Stay connected with your Alumni and fellow classmates. Explore the latest updates and opportunities.","Stay connected with your alma mater and fellow alumni. Explore the latest updates and opportunities."]


export default function AlumniHome() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)



  //geting user info 
  const [userData, setUserData] = useState({ collegeName: '', name: '' });
  useEffect(() => {
    let user = (localStorage.getItem('amsjbckumr'));
    user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET);
    if (user) {
      const { collegeName, name, role,  } = user;

      setUserData({ collegeName, name, role });
    }

  }, [])

  //logout 
  const router = useRouter();
  const handleLogout = (e) => {
    e.preventDefault();
    try {
      if (typeof window !== undefined) {
        localStorage.clear();

        router.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar2 />
      <main className="container mx-auto flex-1">
        <section id="dashboard" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome, {userData.name}!
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-zinc-200">
                { 
                  userData.role === "alumni" ? (
                    description1[1]
                  ) : (
                    description1[0]
                  ) 
                }
              </p>
            </div>
          </div>
        </section>

        <section id="events" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                title="Class of 99 Reunites!"
                date="November 22nd & 23rd, 2024"
                description="25 Years of Legacy: Class of '99 Reunites! : As the Millennium Class of '99 celebrates their 25th Graduation Anniversary, IIT (ISM) Dhanbad proudly welcomes our alumni back to campus.

Dates: November 22nd & 23rd, 2024
Venue: IIT (ISM) Dhanbad Campus

A walk down memory lane awaits as we honour their incredible journey and achievements.
#IITISM25Years #ClassOf99 #AlumniReunion #ForeveranISMite"
                image="/image/class of99.png"
              />
              <EventCard
                title="Tech Symposium"
                date="September 5, 2024"
                description="A day-long event featuring talks from distinguished alumni in various tech fields."
                image="/image/event2.jpeg"
              />
              <EventCard
                title="Career Fair for Current Students"
                date="October 10, 2024"
                description="An opportunity for alumni to recruit top talent from their alma mater."
                image="/image/event3.jpeg"
              />
            </div>
          </div>
        </section>
        <section id="alumni" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Featured Alumni</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AlumniCard
                name="Anish Kumar Singh"
                class="2026"
                position="Founder & CEO, LinkLum"
                image="https://res.cloudinary.com/dcqgytpzz/image/upload/v1730562849/PROFILE_oarys0.jpg"
                _id="6707c88b84ba8d7558f522aa"
              />
              <AlumniCard
                name="Abhay Kant Mishra"
                class="2026"
                position="Founder & CTO, LinkLum"
                image="https://res.cloudinary.com/dcqgytpzz/image/upload/v1730579180/WhatsApp_Image_2024-11-02_at_23.07.53_a484b196_trfrdp.jpg"
                _id="670ea6e0602f7597190c86c6"
              />
            </div>
          </div>
        </section>
        <section id="get-involved" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Get Involved</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <InvolvementCard
                icon={<Users className="h-10 w-10 text-blue-600" />}
                title={ userData.role === "alumni" ? ("Mentor a Student") : ("Get Mentorship from Alumni")}
                description={ userData.role === "alumni" ? ("Share your experience and guide current students in their career paths.") : ("Get mentorship from alumni to elevate your career, knowledge, and experience")}
              />
              <InvolvementCard
                icon={<GraduationCap className="h-10 w-10 text-blue-600" />}
                title={ userData.role === "alumni" ? ("Contribute to Scholarships") : ("Get Scholarships from Alumni")}
                description={ userData.role === "alumni" ? ("Help deserving students achieve their dreams by contributing to our scholarship fund.") : ("Recive scholarships from alumni to enhance your education, and unloak future career opportunities")}
              />
              <InvolvementCard
                icon={<Calendar className="h-10 w-10 text-blue-600" />}
                title="Organize Alumni Meetups"
                description="Bring together alumni in one place for networking and nostalgia."
              />
            </div>
          </div>
        </section>

      </main>
      <footer className="container mx-auto border-t bg-white py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-sm text-gray-500">&copy; 2024 IIT Dhanbad Alumni Association. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:underline">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function EventCard({ title, date, description, image }) {



  const [isExpanded, setIsExpanded] = useState(false)
  const maxLength = 100 // Adjust this value to change the number of characters shown initially

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  const truncatedDescription = description.length > maxLength 
    ? `${description.substring(0, maxLength)}...` 
    : description

  return (
    // <Card className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
    //   <Image src={image} alt={title} width={400} height={200} className="object-cover  h-48 w-full" />
    //   <CardContent className="p-6">
    //     <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    //     <p className="text-sm text-gray-500 mb-4">{date}</p>
    //     <p className="text-gray-600 mb-4">{description}</p>
    //     {/* <Button variant="outline">Learn More</Button> */}
    //   </CardContent>
    // </Card>
    <Card className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <Image src={image} alt={title} width={400} height={200} className="object-cover h-48 w-full" />
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{date}</p>
        <p className="text-gray-600 mb-4">
          {isExpanded ? description : truncatedDescription}
        </p>
        {description.length > maxLength && (
          <Button variant="link" onClick={toggleDescription} className="p-0">
            {isExpanded ? "Read Less" : "Read More"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

function AlumniCard({ name, class: classYear, position, image, _id }) {
  const router = useRouter()
  const [userData, setUserData] = useState({ collegeName: '', name: ''});
  useEffect(() => {
    let user = (localStorage.getItem('amsjbckumr'));
    user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET);
    if (user) {
      const { collegeName, name, profileImage } = user;

      setUserData({ collegeName, name, profileImage });
    }

  }, [])

  return (
    <Card className="flex flex-col justify-center items-center text-center p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={image} alt={`${name}'s profile`} />
        <AvatarFallback>{userData.name?.split(' ')?.map(n => n[0])?.join('')}</AvatarFallback>
      </Avatar>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-500 mb-1">Batch of {classYear}</p>
      <p className="text-sm text-gray-600 mb-4">{position}</p>
      <Button onClick={() => { router.push(`/profile/${_id}`) }} variant="outline">View Profile</Button>
    </Card>
  )
}

function InvolvementCard({ icon, title, description }) {

  const { toast } = useToast()

  const handleWelcomeClick = () => {

    toast({
      variant: "green",
      title: "Request Submitted!",
      description: "We've sent your event participation request to the college team. They'll be in touch soon!",
    })
  }
  return (
    <Card className="flex flex-col items-center text-center p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="mb-4 p-3 bg-blue-100 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button onClick={handleWelcomeClick}>Get Started</Button>
    </Card>
  )
}

