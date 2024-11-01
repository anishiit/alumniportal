'use client'

import jwt from "jsonwebtoken"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Rocket,
  Brain,
  Code,
  Lightbulb,
  ArrowLeft,
  Send,
  Users,
  Briefcase,
  Search,
  Filter,
  Calendar,
  Leaf,
  Monitor,
  Book,
  FileText,
  Zap,
  Repeat,
  GitBranch,
  Users2,
  Heart,
  Smartphone,
  Glasses,
  Hammer,
  Globe,
  DollarSign
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Navbar2 from "@/components/header/Navbar2"
import { collegeName } from "@/data/college"
import axios from "axios"
import { createStudenthubUrl, getStudenthubUrl } from "@/urls/urls"
import {formatDistanceToNow} from 'date-fns'

export default function StudentHub() {
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [submittedProposals, setSubmittedProposals] = useState([])
  const [isPosting , setIsPosting] = useState(false)
  const { toast } = useToast()

  const [selectedType , setSelectedType] = useState("")
  const [inputs, setInputs] = useState({})
  const [proposalFile, setProposalFile] = useState(null)

  const proposals = [{
      id: 4,
      type: "Innovation",
      title: "New Initiative",
      description: "Propose a new initiative or project for the student community",
      icon: <Lightbulb className="w-6 h-6" aria-hidden="true" />,
      fields: ["Initiative Title", "Objectives", "Implementation Plan", "Resource Requirements"]
    },
    {
      id: 1,
      type: "Problem",
      title: "Raise a Problem",
      description: "Share a challenge or issue you've identified that needs attention",
      icon: <Brain className="w-6 h-6" aria-hidden="true" />,
      fields: ["Problem Title", "Description", "Proposed Solution", "Expected Impact"]
    },
    {
      id: 2,
      type: "Startup",
      title: "Propose a Startup",
      description: "Present your innovative startup idea to get support and feedback",
      icon: <Rocket className="w-6 h-6" aria-hidden="true" />,
      fields: ["Startup Name", "Business Model", "Market Analysis", "Required Resources"]
    },
    {
      id: 3,
      type: "Hackathon",
      title: "Hackathon Proposal",
      description: "Suggest a hackathon theme and help organize a coding event",
      icon: <Code className="w-6 h-6" aria-hidden="true" />,
      fields: ["Hackathon Theme", "Technical Requirements", "Timeline", "Expected Outcomes"]
    },
    
    {
      id: 5,
      type: "SkillExchange",
      title: "Skill Exchange Network",
      description: "Offer or request mentorship in areas like coding, design, communication, and more",
      icon: <Users className="w-6 h-6" aria-hidden="true" />,
      fields: ["Skill Offered/Requested", "Experience Level", "Availability", "Expected Outcomes"]
    },
    {
      id: 6,
      type: "SustainableCampus",
      title: "Sustainable Campus Challenge",
      description: "Propose eco-friendly projects to reduce waste and promote clean energy",
      icon: <Leaf className="w-6 h-6" aria-hidden="true" />,
      fields: ["Project Title", "Environmental Impact", "Implementation Strategy", "Resource Needs"]
    },
    {
      id: 7,
      type: "TechDemo",
      title: "Tech Demo Day",
      description: "Showcase your tech projects, apps, or inventions for feedback and inspiration",
      icon: <Monitor className="w-6 h-6" aria-hidden="true" />,
      fields: ["Project Name", "Technology Stack", "Demo Requirements", "Feedback Areas"]
    },
    {
      id: 8,
      type: "KnowledgeBase",
      title: "Community Knowledge Base",
      description: "Contribute to a shared database of tutorials, guides, and resources",
      icon: <Book className="w-6 h-6" aria-hidden="true" />,
      fields: ["Resource Title", "Topic/Category", "Content Summary", "Target Audience"]
    },
    {
      id: 9,
      type: "ResearchCollaboration",
      title: "Research Collaboration Portal",
      description: "Share research ideas and find collaborators for projects and grant applications",
      icon: <FileText className="w-6 h-6" aria-hidden="true" />,
      fields: ["Research Topic", "Objectives", "Required Expertise", "Potential Funding Sources"]
    },
    {
      id: 10,
      type: "InnovationSprint",
      title: "Monthly Innovation Sprint",
      description: "Participate in a monthly challenge to solve specific problems rapidly",
      icon: <Zap className="w-6 h-6" aria-hidden="true" />,
      fields: ["Sprint Theme", "Problem Statement", "Proposed Solution", "Team Requirements"]
    },
    {
      id: 11,
      type: "CareerExperience",
      title: "Career Experience Swap",
      description: "Share insights from internships, volunteer work, or projects",
      icon: <Briefcase className="w-6 h-6" aria-hidden="true" />,
      fields: ["Experience Type", "Company/Organization", "Key Learnings", "Advice for Peers"]
    },
    {
      id: 12,
      type: "OpenSource",
      title: "Open Source Contributions Hub",
      description: "Learn about and contribute to open-source projects",
      icon: <GitBranch className="w-6 h-6" aria-hidden="true" />,
      fields: ["Project Name", "Technology/Language", "Contribution Type", "Getting Started Guide"]
    },
    {
      id: 13,
      type: "Interdisciplinary",
      title: "Interdisciplinary Think Tank",
      description: "Collaborate on projects requiring cross-disciplinary expertise",
      icon: <Users2 className="w-6 h-6" aria-hidden="true" />,
      fields: ["Project Title", "Disciplines Involved", "Problem Statement", "Desired Outcomes"]
    },
    {
      id: 14,
      type: "MentalHealth",
      title: "Mental Health & Wellness Lab",
      description: "Propose and participate in mental health and wellness initiatives",
      icon: <Heart className="w-6 h-6" aria-hidden="true" />,
      fields: ["Initiative Type", "Target Audience", "Expected Benefits", "Resource Requirements"]
    },
    {
      id: 15,
      type: "AppDevelopment",
      title: "App Development Incubator",
      description: "Get resources and mentorship for mobile or web app development",
      icon: <Smartphone className="w-6 h-6" aria-hidden="true" />,
      fields: ["App Concept", "Target Platform", "Key Features", "Development Timeline"]
    },
    {
      id: 16,
      type: "InnovationLab",
      title: "Interactive Innovation Lab",
      description: "Participate in workshops on emerging technologies like AR, VR, AI, or IoT",
      icon: <Glasses className="w-6 h-6" aria-hidden="true" />,
      fields: ["Workshop Topic", "Technology Focus", "Learning Objectives", "Prerequisites"]
    },
    {
      id: 17,
      type: "PrototypeChallenge",
      title: "Idea-to-Prototype Challenge",
      description: "Bring an idea from concept to prototype with mentor support",
      icon: <Hammer className="w-6 h-6" aria-hidden="true" />,
      fields: ["Idea Summary", "Target User", "Key Features", "Prototype Goals"]
    },
    {
      id: 18,
      type: "GlobalIssue",
      title: "Global Issue Forum",
      description: "Discuss and brainstorm solutions for global challenges",
      icon: <Globe className="w-6 h-6" aria-hidden="true" />,
      fields: ["Issue Category", "Problem Statement", "Proposed Solution", "Impact Assessment"]
    },
    {
      id: 19,
      type: "FundingPitch",
      title: "Student Funding Pitch Night",
      description: "Pitch innovative ideas to potential sponsors or investors",
      icon: <DollarSign className="w-6 h-6" aria-hidden="true" />,
      fields: ["Project Name", "Funding Amount", "Use of Funds", "Return on Investment"]
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPosting(true)
    let currUser = {};
    if(typeof window !== "undefined") {
        currUser = localStorage.getItem("amsjbckumr")
        currUser = jwt.verify(currUser, process.env.NEXT_PUBLIC_JWT_SECRET) 
    }
    // console.log({...inputs, type:selectedType, proposedBy: currUser._id, collegeName: currUser.collegeName})
    try {
      await axios.post(createStudenthubUrl, {...inputs, type:selectedType, 
        proposedBy: currUser._id, collegeName: currUser.collegeName
        })
    .then((res) => {
        console.log(res.data.studenthub)
        setSubmittedProposals([res.data.studenthub, ...submittedProposals])
        setInputs({})
        setSelectedProposal(null);
        setSelectedType("");
        toast({
            title: "Proposal Submitted!",
            description: "Your proposal has been sent for review to your college.Wait for further updates!.",
            variant: "green",
            duration: 10000
        })
        setIsPosting(false)
        return 
    })
    .catch((err) => {
        console.log(err)
        toast({
            title: "Proposal Submitted!",
            description: err.message,
            variant: "red",
            duration: 10000
        })
        setIsPosting(false)
        return
    })
    } catch (error) {
        console.log(error)
        toast({
            title: "Proposal Submitted!",
            description: error.message,
            variant: "red",
            duration: 10000
        })
        setIsPosting(false)
        return
    }
  }

  const getStudenthub = async () => {
    try {
      let currUser = {};
      if(typeof window !== "undefined") {
          currUser = localStorage.getItem("amsjbckumr")
          currUser = jwt.verify(currUser, process.env.NEXT_PUBLIC_JWT_SECRET) 
      }
      const res = await axios.post(getStudenthubUrl, { collegeName: currUser.collegeName} )
      setSubmittedProposals(res.data.studenthub)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredProposals = submittedProposals.filter(proposal => 
    (filterCategory === "All" || proposal.type === filterCategory) &&
    proposal.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    // Simulating fetched data
    getStudenthub()
    // setSubmittedProposals([
    //   { _id: 1, type: "Problem", title: "Campus Wi-Fi Improvement", createdAt: "2023-05-15", status: "In Progress" },
    //   { _id: 2, type: "Startup", title: "EcoEats: Sustainable Food Delivery", createdAt: "2023-05-10", status: "Under Review" },
    //   { _id: 3, type: "Hackathon", title: "AI for Accessibility", createdAt: "2023-05-05", status: "Approved" },
    //   { _id: 4, type: "SkillExchange", title: "Web Development Mentorship", createdAt: "2023-05-20", status: "Active" },
    //   { _id: 5, type: "SustainableCampus", title: "Solar-Powered Study Areas", createdAt: "2023-05-18", status: "Under Review" },
    // ])
  }, [])

  return (
    <div> 
    <Navbar2 />
    <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Student Innovation Hub
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Transform your ideas into reality and make an impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="submit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="submit">Submit Proposal</TabsTrigger>
              <TabsTrigger value="view">View Proposals</TabsTrigger>
            </TabsList>
            <TabsContent value="submit">
              <AnimatePresence mode="wait">
                {selectedProposal ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedProposal(null)}
                      className="mb-6"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back to Proposals
                    </Button>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex items-center gap-2 mb-6">
                        {proposals.find(p => p.id === selectedProposal).icon}
                        <h2 className="text-2xl font-semibold">
                          {proposals.find(p => p.id === selectedProposal).title}
                        </h2>
                      </div>
                      {/* {proposals
                        .find(p => p.id === selectedProposal)
                        .fields.map((field, index) => (
                          <div key={index} className="space-y-2">
                            <Label htmlFor={field.toLowerCase().replace(/\s+/g, '-')}>
                              {field}
                            </Label>
                            {field === "Description" || 
                             field.includes("Analysis") || 
                             field.includes("Plan") ||
                             field.includes("Summary") ||
                             field.includes("Impact") ? (
                              <Textarea
                                id={field.toLowerCase().replace(/\s+/g, '-')}
                                name={field}
                                placeholder={`Enter ${field.toLowerCase()}`}
                                className="min-h-[100px]"
                                required
                              />
                            ) : (
                              <Input
                                id={field.toLowerCase().replace(/\s+/g, '-')}
                                name={field}
                                placeholder={`Enter ${field.toLowerCase()}`}
                                required
                              />
                            )}
                          </div>
                        ))} */}
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                            id="title"
                            value={inputs.title}
                            onChange={(e) => setInputs({...inputs, title: e.target.value})}
                            required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                            id="description"
                            value={inputs.description}
                            onChange={(e) => setInputs({...inputs, description: e.target.value})}
                            required
                            />
                        </div>
                        <div>
                            <Label htmlFor="file">Upload PDF</Label>
                            <Input
                            id="file"
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setProposalFile(e.target.files[0])}

                            />
                        </div>
                      <Button disabled={isPosting} type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" aria-hidden="true" /> Submit Proposal
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.3,
                      staggerChildren: 0.1,
                    }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {proposals.map((proposal) =>   (
                      <motion.div
                        key={proposal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex"
                      >
                        <Card
                          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col w-full"
                          onClick={() => {setSelectedProposal(proposal.id); console.log(proposal.type); setSelectedType(proposal.type)}}
                        >
                          <CardHeader className="flex-grow">
                            <CardTitle className="flex items-center gap-2">
                              {proposal.icon}
                              {proposal.title}
                            </CardTitle>
                            <CardDescription>{proposal.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
            <TabsContent value="view">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search proposals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {proposals.map((proposal) => (
                        <SelectItem key={proposal.id} value={proposal.type}>
                          {proposal.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  {filteredProposals.map((proposal) => (
                    <Card key={proposal.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {proposals.find(p => p.type === proposal.type)?.icon}
                          {proposal.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p><strong>Type:</strong> {proposal.type}</p>
                        <p><strong>Submitted:</strong> {formatDistanceToNow(new Date(proposal?.createdAt), { addSuffix: true })} <strong> By: </strong> {proposal.proposedBy?.name}</p>
                        <p><strong>Status:</strong> {proposal.status}</p>
                      </CardContent>
                      <CardFooter>
                        {/* <Button onClick={} variant="outline">View Details</Button> */}
                        <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>
                                <p className="text-center my-5" >Details of Proposal</p>
                            </DialogTitle>
                            <h1>Title : {proposal.title}</h1>
                            <p className="text-sm">
                                Submitted By {proposal.proposedBy?.name} {formatDistanceToNow(new Date(proposal.createdAt), { addSuffix: true })}
                            </p >
                            <p className="text-base">Description : </p>
                            <DialogDescription>{proposal.description}</DialogDescription>                            
                            </DialogHeader>
                        </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main></div>
   
  )
}