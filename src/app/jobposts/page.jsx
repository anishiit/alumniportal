

"use client"

import axios from "axios"
import Link from "next/link"
import { getAllPostsUrl } from "@/urls/urls"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Calendar, Bookmark, MessageCircle, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import JobSearchLoading from '@/components/JobSearchLoading'
import Navbar2 from "@/components/header/Navbar2"
import { useToast } from "@/hooks/use-toast"

export default function SearchJob() {

  const { toast } = useToast()

  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [jobType, setJobType] = useState("all")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  
  const observer = useRef()

  const getJobPostUrl = getAllPostsUrl

  async function getPostData() {
    try {
      setLoading(true)
      const res = await axios.get(getJobPostUrl, {
        params: { page, limit: 15 },
      })
      setJobs((prevJobs) => [...prevJobs, ...res.data.jobs])
      setHasMore(res.data.hasMore)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getPostData()
  }, [page])

  const lastJobRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const filteredJobs = jobs.filter((job) =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (jobType === "all" || job.type === jobType)
  )

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const typeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  const handleShare = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      // alert("URL copied to clipboard!")
      toast({
        description: "URL copied to clipboard!",
        variant: "green",
        duration: 1700
      })
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar2 />
      {loading && <JobSearchLoading />}
      <div className="container mx-auto p-4 max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-6">Find Your Dream</h1>
          <motion.div
            variants={typeVariants}
            className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            {jobType === "internship" ? "Internship" : "Job"}
          </motion.div>
        </motion.div>
        <div className="max-w-2xl mx-auto space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for jobs, companies, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-lg"
            />
          </div>
          <RadioGroup
            defaultValue="all"
            name="jobType"
            className="flex justify-center space-x-4"
            onValueChange={setJobType}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="job" id="job" />
              <Label htmlFor="job">Jobs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="internship" id="internship" />
              <Label htmlFor="internship">Internships</Label>
            </div>
          </RadioGroup>
        </div>
        <AnimatePresence>
          {filteredJobs.map((job, index) => (
            <motion.div
              key={index}
              ref={index === filteredJobs.length - 1 ? lastJobRef : null}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8 overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {job.thumbnail && (
                      <div className="lg:w-1/3">
                        <img
                          src={job.thumbnail}
                          alt={`${job.company} banner`}
                          className="w-full h-48 lg:h-full object-cover"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    )}
                    <div className={job.thumbnail ? "lg:w-2/3 p-6" : "w-full p-6"}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 ">
                          <Link href={`/profile/${job.postedBy}`}>
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={job.postedByAvatar} alt={job.postedByName} />
                              <AvatarFallback>{job?.postedByName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-blue-700">
                              <p className="font-semibold">{job?.postedByName}</p>
                              <p className="text-sm text-gray-500">{job.company}</p>
                            </div>
                          </Link>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="w-5 h-5" />
                        </Button>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                        <span className="mx-2">•</span>
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <MessageCircle className="w-5 h-5 mr-1" />
                            {job.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => handleShare(job.url)}>
                            <Share2 className="w-5 h-5 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && <JobSearchLoading />}
        {!hasMore && <p className="text-center text-gray-500 mt-4">No more jobs to show</p>}
      </div>
    </div>
  )
}
