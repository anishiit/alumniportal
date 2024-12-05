"use client"

import jwt from "jsonwebtoken"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, MessageCircle, Share2, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Navbar2 from "@/components/header/Navbar2"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { getPostByIdUrl, addCommentOnPostUrl } from "@/urls/urls.js"
import axios from "axios"
import Link from "next/link"


export default function JobPostDetail() {

  const pathname = usePathname();
  const jobId = pathname.replace('/jobposts/', '');

  const router = useRouter()
  const { toast } = useToast()
  const [job, setJob] = useState({})
  const [currUser, setCurrUser] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      let user = localStorage.getItem("amsjbckumr")
      user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET)
      if (user) setCurrUser(user)
      getJobById(jobId)
    }
  }, [])


  const handleShare = () => {
    // Get the current page URL
    const url = window.location.href

    // Try to copy the URL to the clipboard
    navigator.clipboard.writeText(url).then(() => {
      // Show a toast notification with a success message
      toast({
        description: "URL copied to clipboard!",
        variant: "blue", // Blue color for a success message
        duration: 1500, // Show the toast for 1.5 seconds
        variant: "blue",
        duration: 1500,
      })
    }).catch(err => {
      // Log the error to the console
      console.error('Failed to copy: ', err)
      // Show a toast notification with an error message
      toast({
        title: "Error", // Red color for an error message
        title: "Error",
        description: "Failed to copy URL. Please try again.",
        variant: "destructive",
      })
    })
  }

  const handleComment = async (content) => {
    if (!content) {
      toast({
        description: "ERROR : Please enter a comment.",
        variant: "red",
      })
      return
    }
    if (!currUser) {
      toast({
        title: "Error",
        description: "You must be logged in to comment.",
        variant: "red",
      })
      return
    }

    // Simulating comment addition for dummy data
    try {
      axios.post(addCommentOnPostUrl, {
        postId: jobId, postedBy: currUser._id, content: content
      })
        .then((res) => {
          console.log(res.data.message)
          toast({
            description: "Your comment added successfully.",
            variant: "green",
            duration: 1700
          })
          const newCommnet = {
            _id: job.comments.length + 1,
            author: currUser._id,
            authorname: currUser.name,
            content: content,
            avatar: currUser.profileImage
          }
          const comments = [...job.comments, newCommnet]
          setJob({ ...job, comments: comments })
        })
        .catch((err) => {
          console.log(err)
          toast({
            title: "ERROR : Failed to add comment. Please try again.",
            variant: "red",
            duration: 1700
          })
        })
    } catch (error) {
      console.log(error)
      toast({
        title: "ERROR : Failed to add comment. Please try again.",
        variant: "red",
        duration: 1700
      })
    }
  }

  const getJobById = async (jobId) => {
    try {
      const res = await axios.post(getPostByIdUrl, { postId: jobId })
      setJob(res.data.post)
    } catch (error) {
      console.error(error)
      toast({
        title: "ERROR : Failed to fetch job details. Please try again.",
        variant: "red",
        duration: 1700
      })
    }
  }

  if (!job) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar2 />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-white mb-4"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Button>
              <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
              <Link href={`/profile/${job.postedBy}`} >
                <div className="flex items-center mt-4">
                  <Avatar className="mr-4">
                    <AvatarImage src={job.postedByAvatar} alt={job.postedByName} />
                    <AvatarFallback>{`${job.postedByName}`.at(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{job.postedByName}</p>
                    <p className="text-sm opacity-75">{job.company}</p>
                  </div>
                </div>
              </Link>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6">
                <div className="flex items-center mr-6 mb-2">
                  {/* <MapPin className="w-4 h-4 mr-2" /> */}
                  {job.location}
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Posted on {new Date(job.createdAt).toLocaleDateString()}
                </div>
                {job.category && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    {job.category}
                  </div>
                )}
              </div>

              {job.thumbnail && (
                <img
                  src={job.thumbnail}
                  alt={`${job.company} banner`}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Job Description</h3>
                <p className="whitespace-pre-wrap">{job.description}</p>

                {job.requirements && (
                  <>
                    <h3 className="text-xl font-semibold mt-6 mb-4">Requirements</h3>
                    <ul className="list-disc pl-5">
                      {job.requirements.split('\n').map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </>
                )}

                {job.benefits && (
                  <>
                    <h3 className="text-xl font-semibold mt-6 mb-4">Benefits</h3>
                    <ul className="list-disc pl-5">
                      {job.benefits.split('\n').map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </>
                )}

                {job.salary && (
                  <p className="mt-6">
                    <span className="font-semibold">Salary:</span> {job.salary}
                  </p>
                )}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <a href={job?.url}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Apply Now
                  </Button>
                </a>
                <div className="flex items-center space-x-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Comments ({job.comments?.length})
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <div className="max-h-[50vh] overflow-y-auto space-y-4">
                        {job.comments?.map((comment) => (
                          <div key={comment._id} className="flex items-start space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={comment.avatar} alt={comment.authorname} />
                              <AvatarFallback>{comment.authorname[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm">{comment.authorname}</p>
                              <p className="text-sm text-gray-600">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center mt-4">
                        <Input
                          placeholder="Add a comment..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleComment(e.target.value)
                              e.target.value = ''
                            }
                          }}
                          className="flex-grow mr-2"
                        />
                        <Button size="sm" onClick={() => {
                          const input = document.querySelector('input[placeholder="Add a comment..."]')
                          handleComment(input.value)
                          input.value = ''
                        }}>
                          Post
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}