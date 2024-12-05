// 'use client'

// import { useState, useEffect, useCallback, useRef } from "react"
// import axios from "axios"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"
// import { useToast } from "@/hooks/use-toast"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
// import { Search, MapPin, Calendar, MessageCircle, Share2, Plus } from "lucide-react"
// import JobSearchLoading from '@/components/JobSearchLoading'
// import { getAllPostsUrl ,addCommentOnPostUrl} from "@/urls/urls"


// export default function EnhancedJobSearch() {
//   const { toast } = useToast()
//   const [jobs, setJobs] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [page, setPage] = useState(1)
//   const [hasMore, setHasMore] = useState(true)
//   const [currUser, setCurrUser] = useState(null)

//   const observer = useRef()
//   // const getJobPostUrl = "/api/jobs" // Replace with your actual API endpoint

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("amsjbckumr")
// currUser = jwt.verify(currUser, process.env.NEXT_PUBLIC_JWT_SECRET)
//       if (user) setCurrUser(user)
//     }
//   }, [])

//   const getPostData = useCallback(async () => {
//     try {
//       setLoading(true)
//       const res = await axios.get(getAllPostsUrl, { params: { page, limit: 10 } })
//       const newJobs = res.data.jobs.map(job => ({...job}))
//       setJobs(prevJobs => [...prevJobs, ...newJobs])
//       setHasMore(res.data.hasMore)
//       setLoading(false)
//     } catch (error) {
//       console.error(error)
//       setLoading(false)
//     }
//   }, [page])

//   useEffect(() => {
//     getPostData()
//   }, [getPostData])

//   const lastJobRef = useCallback(
//     (node) => {
//       if (loading) return
//       if (observer.current) observer.current.disconnect()
//       observer.current = new IntersectionObserver(entries => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPage(prevPage => prevPage + 1)
//         }
//       })
//       if (node) observer.current.observe(node)
//     },
//     [loading, hasMore]
//   )

//   const filteredJobs = jobs.filter(job =>
//     job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     job.location?.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const handleShare = (url) => {
//     navigator.clipboard.writeText(url).then(() => {
//       toast({ description: "URL copied to clipboard!", duration: 1700 })
//     }).catch(err => console.error('Failed to copy: ', err))
//   }

//   const handleComment = async (jobId, content) => {
//     try {
//       const res = await axios.post("/api/comments", { postId: jobId, postedBy: currUser._id, content })
//       setJobs(jobs.map(job => {
//         if (job._id === jobId) {
//           job.comments.push({
//             _id: job.comments.length + 1,
//             author: currUser._id,
//             authorname: currUser.name,
//             content: content,
//             avatar: currUser.avatar
//           })
//         }
//         return job
//       }))
//       toast({ description: "Comment added successfully!", duration: 1700 })
//     } catch (error) {
//       console.error(error)
//       toast({ description: "Failed to add comment", variant: "destructive", duration: 1700 })
//     }
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
//       <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-primary">JobConnect</h1>
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <Input
//                 type="text"
//                 placeholder="Search jobs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <h2 className="text-lg font-semibold mb-4">Create a New Post</h2>
//                 {/* Add your new post form here */}
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </header>

//       <main className="flex-grow container mx-auto px-4 py-8">
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           <AnimatePresence>
//             {filteredJobs.map((job, index) => (
//               <motion.div
//                 key={job._id}
//                 ref={index === filteredJobs.length - 1 ? lastJobRef : null}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
//                   <CardContent className="p-0">
//                     {job.thumbnail && (
//                       <img
//                         src={job.thumbnail}
//                         alt={`${job.company} banner`}
//                         className="w-full h-48 object-cover"
//                       />
//                     )}
//                     <div className="p-4">
//                       <div className="flex items-center justify-between mb-4">
//                         <Link href={`/profile/${job.postedBy}`} className="flex items-center space-x-3">
//                           <Avatar>
//                             <AvatarImage src={job.postedByAvatar} alt={job.postedByName} />
//                             <AvatarFallback>{job?.postedByName[0]}</AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <p className="font-semibold text-sm">{job?.postedByName}</p>
//                             <p className="text-xs text-muted-foreground">{job.company}</p>
//                           </div>
//                         </Link>
//                       </div>
//                       <h2 className="text-xl font-bold mb-2">{job.title}</h2>
//                       <div className="flex items-center text-sm text-muted-foreground mb-4">
//                         <MapPin className="w-4 h-4 mr-1" />
//                         {job.location}
//                         <span className="mx-2">•</span>
//                         <Calendar className="w-4 h-4 mr-1" />
//                         {new Date(job.createdAt).toLocaleDateString()}
//                       </div>
//                       <p className="text-sm mb-4 line-clamp-2">{job.description}</p>
//                       <div className="flex items-center justify-between">
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button variant="ghost" size="sm" className="text-muted-foreground">
//                               <MessageCircle className="w-4 h-4 mr-1" />
//                               {job.comments.length}
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent className="sm:max-w-[425px]">
//                             <div className="max-h-[50vh] overflow-y-auto space-y-4">
//                               {job.comments.map((comment) => (
//                                 <div key={comment._id} className="flex items-start space-x-2">
//                                   <Avatar className="w-8 h-8">
//                                     <AvatarImage src={comment.avatar} alt={comment.authorname} />
//                                     <AvatarFallback>{comment.authorname[0]}</AvatarFallback>
//                                   </Avatar>
//                                   <div>
//                                     <p className="font-semibold text-sm">{comment.authorname}</p>
//                                     <p className="text-sm text-muted-foreground">{comment.content}</p>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                             <div className="flex items-center mt-4">
//                               <Input
//                                 placeholder="Add a comment..."
//                                 onKeyPress={(e) => {
//                                   if (e.key === 'Enter') {
//                                     handleComment(job._id, e.target.value)
//                                     e.target.value = ''
//                                   }
//                                 }}
//                                 className="flex-grow mr-2"
//                               />
//                               <Button size="sm" onClick={() => {
//                                 const input = document.querySelector('input[placeholder="Add a comment..."]')
//                                 handleComment(job._id, input.value)
//                                 input.value = ''
//                               }}>
//                                 Post
//                               </Button>
//                             </div>
//                           </DialogContent>
//                         </Dialog>
//                         <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => handleShare(job.url)}>
//                           <Share2 className="w-4 h-4 mr-1" />
//                           Share
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//         {loading && <JobSearchLoading />}
//         {!hasMore && <p className="text-center text-muted-foreground mt-8">No more jobs to show</p>}
//       </main>
//     </div>
//   )
// }



'use client'

import jwt from "jsonwebtoken"

import axios from "axios"
import Link from "next/link"
import { getAllPostsUrl, addCommentOnPostUrl } from "@/urls/urls"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Plus, Search, MapPin, Calendar, Bookmark, MessageCircle, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import JobSearchLoading from '@/components/JobSearchLoading'
import Navbar2 from "@/components/header/Navbar2"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatDistanceToNow } from 'date-fns'

export default function SearchJob() {
  const { toast } = useToast()

  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [jobType, setJobType] = useState("all")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const [currUser, setCurrUser] = useState({});



  useEffect(() => {
    if (typeof window !== "undefined") {
      let currUser = localStorage.getItem("amsjbckumr")
      currUser = jwt.verify(currUser, process.env.NEXT_PUBLIC_JWT_SECRET)

      if (currUser) {
        setCurrUser(currUser)
      }
      // if(page === 1){
      //   getPostData(currUser.collegeName)
      // }
    }
  }, [])

  const observer = useRef()

  const getJobPostUrl = getAllPostsUrl

  async function getPostData() {
    let currUser;
    if (typeof window !== "undefined") {
      currUser = localStorage.getItem("amsjbckumr")
      currUser = jwt.verify(currUser, process.env.NEXT_PUBLIC_JWT_SECRET)
    }
    const collegeName = currUser?.collegeName;
    try {
      setLoading(true)
      console.log(currUser)
      const res = await axios.post(getJobPostUrl, {
        params: { page, limit: 15, collegeName }
      })
      const newJobs = res.data.jobs.map(job => ({ ...job }))
      setJobs((prevJobs) => [...prevJobs, ...newJobs])
      setHasMore(res.data.hasMore)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    // if(page > 1){
      getPostData()
    // }
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
    (jobType === "all" || job.category === jobType)
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
      toast({
        description: "URL copied to clipboard!",
        variant: "green",
        duration: 1700
      })
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  const handleComment = async (jobId, content) => {

    try {
      axios.post(addCommentOnPostUrl, {
        postId: jobId, postedBy: currUser._id, content: content
      })
        .then((res) => {
          console.log(res.data.message)
          setJobs(jobs.map(job => {
            if (job._id === jobId) {
              job.comments.push({
                _id: job.comments.length + 1,
                author: currUser._id,
                authorname: currUser.name,
                content: content,
                avatar: currUser.profileImage
              })
            }
            return job
          }))
        })
        .catch((err) => { console.log(err) })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar2 />
      {loading && <JobSearchLoading />}
      <div className="container mx-auto md:p-4 max-w-6xl">
        <header className="sticky top-16 z-10 bg-white dark:bg-gray-800 shadow-sm mb-10">
          <div className="container mx-auto md:px-4 px-2 py-4 flex justify-between items-center">
            <h1 className="md:text-2xl text-base md:font-bold font-semibold  text-primary mr-2">JobConnect</h1>
            <div className="flex items-center md:space-x-4 space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full md:w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Link href={'/postjob'}>
                <Button size="default" className=" bg-primary hover:bg-primary/90">
                  {/* <div className="flex "> */}
                  <Plus className="md:h-6 h-4 md:w-6 w-4 mr-2" /> Post    
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <div className="max-w-2xl mx-auto space-y-4 mb-8">
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for jobs, companies, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-lg"
            />
          </div> */}
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
                          <Link href={`/profile/${job.postedBy._id}`}>
                            <div className="flex flex-row gap-x-4">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={job.postedBy?.profileImage} alt={job.postedByName} />
                                <AvatarFallback>{job?.postedByName[0]}</AvatarFallback>
                              </Avatar>
                              <p className="text-blue-700 font-semibold mt-2">{job?.postedByName}</p>
                            </div>
                            <div className="text-blue-700">
                              <p className="text-sm text-gray-500">{job.company}</p>
                            </div>
                          </Link>
                        </div>
                        {/* <Button variant="ghost" size="icon">
                          <Bookmark className="w-5 h-5" />
                        </Button> */}
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        {/* <MapPin className="w-4 h-4 mr-1" /> */}
                        {job.location}
                        <span className="mx-2">•</span>
                        {`${job.category}`.toLocaleUpperCase()}
                        <span className="mx-2">•</span>
                        <Calendar className="w-4 h-4 mr-1" />
                        <p className="text-sm text-gray-500">
                          Posted {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      <p className="text-gray-700 line-clamp-3">{job.description}</p>
                      <Link href={`/jobposts/${job._id}`} className="text-blue-700 text-sm underline font-semibold mb-4" >see more</Link>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                <MessageCircle className="w-5 h-5 mr-1" />
                                {job.comments.length}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <div className="max-h-[50vh] overflow-y-auto">
                                {job.comments.map((comment) => (
                                  <div key={comment.id} className="flex items-start space-x-2 mb-4">
                                    <Avatar className="w-8 h-8">
                                      <AvatarImage src={comment.avatar} alt={comment.authorname} />
                                      <AvatarFallback>{String(comment?.authorname[0]).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-semibold">{comment.authorname}</p>
                                      <p className="text-sm text-gray-700">{comment.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center mt-4">
                                <Input
                                  placeholder="Add a comment..."
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      handleComment(job._id, e.target.value)
                                      e.target.value = ''
                                    }
                                  }}
                                  className="flex-grow mr-2"
                                />
                                <Button size="sm" onClick={() => {
                                  const input = document.querySelector('input[placeholder="Add a comment..."]')
                                  handleComment(job._id, input.value)
                                  input.value = ''
                                }}>
                                  Post
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
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