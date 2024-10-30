"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, GraduationCap, Users, Gift, Rocket, BookOpen, Calendar } from "lucide-react"
import Navbar2 from "@/components/header/Navbar2"

const involvementOptions = [
  {
    id: "mentor",
    title: "Mentor a Student",
    icon: <UserPlus className="w-6 h-6" />,
    description: "Guide and support current students in their academic and professional journey.",
    items: [
      "One-on-one mentoring sessions",
      "Career guidance workshops",
      "Resume review and interview preparation",
      "Industry insights and networking opportunities"
    ]
  },
  {
    id: "scholarships",
    title: "Contribute to Scholarships",
    icon: <GraduationCap className="w-6 h-6" />,
    description: "Help deserving students achieve their educational goals through financial support.",
    items: [
      "Annual scholarship fund donations",
      "Named scholarship opportunities",
      "Emergency student aid fund",
      "Book and supplies sponsorship"
    ]
  },
  {
    id: "meetups",
    title: "Organize Alumni Meetups",
    icon: <Users className="w-6 h-6" />,
    description: "Bring alumni together for networking, knowledge sharing, and community building.",
    items: [
      "Regional alumni chapter events",
      "Industry-specific networking sessions",
      "Annual homecoming celebration",
      "Virtual global alumni meetups"
    ]
  },
  {
    id: "donate",
    title: "Donate",
    icon: <Gift className="w-6 h-6" />,
    description: "Support various initiatives and projects that enhance the university experience.",
    items: [
      "Campus improvement projects",
      "Research and innovation funds",
      "Student life enhancement programs",
      "Community outreach initiatives"
    ]
  },
  {
    id: "startups",
    title: "Fund Startups",
    icon: <Rocket className="w-6 h-6" />,
    description: "Invest in innovative ideas and support entrepreneurial alumni ventures.",
    items: [
      "Startup incubator program",
      "Seed funding for alumni-led startups",
      "Mentorship for student entrepreneurs",
      "Annual startup pitch competition"
    ]
  },
  {
    id: "guestLecture",
    title: "Guest Lecture Series",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Share your expertise and experiences with current students through guest lectures.",
    items: [
      "Industry expert talks",
      "Alumni success story presentations",
      "Technical workshops and seminars",
      "Career path guidance sessions"
    ]
  },
  {
    id: "events",
    title: "Participate in Events",
    icon: <Calendar className="w-6 h-6" />,
    description: "Join various alumni events and activities throughout the year.",
    items: [
      "Annual alumni gala",
      "Homecoming weekend festivities",
      "Sports tournaments and tailgates",
      "Cultural and art exhibitions"
    ]
  }
]

export default function GetInvolvedPage() {
  const [activeOption, setActiveOption] = useState(involvementOptions[0].id)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const selectedOption = involvementOptions.find(option => option.id === activeOption)

  return (
    <div>
      <Navbar2 />
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-xl overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-center">
              Get Involved
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 relative">
              <Select
                value={activeOption}
                onValueChange={setActiveOption}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option">
                    {selectedOption && (
                      <span className="flex items-center">
                        {selectedOption.icon}
                        <span className="ml-2">{selectedOption.title}</span>
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="z-50">
                  {involvementOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      <span className="flex items-center">
                        {option.icon}
                        <span className="ml-2">{option.title}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {selectedOption && (
                  <motion.div
                    key={selectedOption.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900">
                        <CardTitle className="text-2xl font-semibold flex items-center text-blue-800 dark:text-blue-200">
                          {selectedOption.icon}
                          <span className="ml-2">{selectedOption.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-muted-foreground mb-4">{selectedOption.description}</p>
                        <ul className="space-y-2">
                          {selectedOption.items.map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-center text-sm"
                            >
                              <span className="mr-2 text-blue-500 dark:text-blue-400">•</span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                        <Button className="mt-6 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                          Get Involved Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}