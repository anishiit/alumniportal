"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Briefcase, Rocket, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar2 from "@/components/header/Navbar2"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const events = [
  {
    id: 1,
    title: "Annual Alumni Meet 2024",
    date: "August 15-17, 2024",
    description: "Join us for three days of networking, knowledge sharing, and celebration of our alma mater.",
    image: "/image/event1.jpeg",
    icon: <Users className="w-6 h-6" />,
    details: "The Annual Alumni Meet 2024 is our flagship event, bringing together graduates from all over the world. This year's theme is 'Innovating for Tomorrow,' featuring keynote speeches from industry leaders, panel discussions on emerging technologies, and opportunities to reconnect with old friends and make new connections. The event will also showcase the latest developments at our university and how alumni can contribute to its growth."
  },
  {
    id: 2,
    title: "Tech Symposium",
    date: "October 5-6, 2024",
    description: "Explore the latest trends in technology with industry experts and academic leaders.",
    image: "/image/event2.jpeg",
    icon: <Rocket className="w-6 h-6" />,
    details: "The Tech Symposium is a two-day event focused on cutting-edge technologies shaping our future. Attendees will have the opportunity to participate in workshops on AI, blockchain, and quantum computing, hear from pioneering researchers, and engage in hands-on demonstrations of emerging tech. This event is perfect for alumni looking to stay at the forefront of technological advancements and network with like-minded professionals."
  },
  {
    id: 3,
    title: "Career Fair for Current Students",
    date: "November 12, 2024",
    description: "Help shape the future of our current students by participating in our annual career fair.",
    image: "/image/event3.jpeg",
    icon: <Briefcase className="w-6 h-6" />,
    details: "The Career Fair for Current Students is an excellent opportunity for alumni to give back to their alma mater. By participating, you can showcase your company, offer internships or job opportunities, and provide valuable career advice to the next generation of professionals. The fair will feature company booths, one-on-one mentoring sessions, and panel discussions on various career paths and industry trends."
  },
  {
    id: 4,
    title: "Student Startup Showcase",
    date: "December 3, 2024",
    description: "Witness the entrepreneurial spirit of our current students and support their innovative ventures.",
    image: "/image/event1.jpeg",
    icon: <Rocket className="w-6 h-6" />,
    details: "The Student Startup Showcase is an exciting event that highlights the entrepreneurial talent within our university. Current students will present their startup ideas and prototypes to an audience of alumni, investors, and industry experts. This is your chance to discover the next big innovation, offer mentorship, or even consider investment opportunities. The event will include pitch presentations, a startup expo, and networking sessions."
  }
]

export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { toast } = useToast()

  const handleWelcomeClick = () => {
    toast({
      variant: "green",
      title: "Request Submitted!",
      description: "We've sent your event participation request to the college team. They'll be in touch soon!",
    });
  }

  return (
    <div>
      <Navbar2 />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Upcoming Events
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Raise a Proposal</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/event/proposal-form?type=Problem">Raise a Problem</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/event/proposal-form?type=Startup">Proposal for Startup</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/event/proposal-form?type=Hackathon">Proposal for Hackathon</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/event/proposal-form?type=New">Proposal for New</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key="event-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedEvent(null)}
                    className="mb-4"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
                  </Button>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold flex items-center">
                        {selectedEvent.icon}
                        <span className="ml-2">{selectedEvent.title}</span>
                      </CardTitle>
                      <CardDescription>{selectedEvent.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={selectedEvent.image}
                        alt={selectedEvent.title}
                        width={600}
                        height={400}
                        className="w-full rounded-lg mb-4"
                      />
                      <p className="text-muted-foreground mb-4">{selectedEvent.details}</p>
                      <Button onClick={handleWelcomeClick}>Participate Now</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="event-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    {events.map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center">
                            {event.icon}
                            <span className="ml-2">{event.title}</span>
                          </CardTitle>
                          <CardDescription>{event.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Image
                            src={event.image}
                            alt={event.title}
                            width={600}
                            height={400}
                            className="w-full rounded-lg mb-4"
                          />
                          <p className="text-muted-foreground mb-4">{event.description}</p>
                          <div className="flex justify-between items-center">
                            <Button variant="outline" onClick={() => setSelectedEvent(event)}>
                              Learn More
                            </Button>
                            <Button onClick={handleWelcomeClick}>Participate</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}