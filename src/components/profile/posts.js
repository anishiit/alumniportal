"use client"

import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { getAllPostsUrl } from "@/urls/urls"
import { getUserMemoriesUrl, getUserPostsUrl } from "@/urls/urls.js"
import axios from 'axios';
import { useToast } from "@/hooks/use-toast"
// import { get } from "react-hook-form"

export default function PostsAndMemoriesTabs() {

  const { toast } = useToast()

  const location = usePathname()
  const userId = location.substring(9)

  const [posts, setPosts] = useState([])
  const [memories, setMemories] = useState([])

  // async function getUserPosts() {
  //   if (typeof window !== "undefined") {
  //     const allPosts = JSON.parse(localStorage.getItem("posts") || "[]")
  //     const userPosts = allPosts.filter((post) => post.postedBy.includes(userId))
  //     setPosts(userPosts)
  //   }
  // }

  async function getUserMemories(userId) {
    if(!userId){
      toast({
        title: "Error",
        description: "User not found",
        variant: "red",
      })
      return
    }
    try {
      await axios.post(getUserMemoriesUrl, {
        userId: userId
      })
      .then((res) => {
        let memories = []
        memories = res.data.memories
        memories = memories.reverse()
        setMemories(memories)
      })
      .catch((err) => {
        console.log(err)
        toast({
          title: `Error : Something went wrong while gettiing memories`,
          variant: "red",   
        })
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "red",
      })
      console.log(error)
    }
  }

  async function getUserPosts(userId) {
    if(!userId){
      toast({
        title: "Error",
        description: "User not found",
        variant: "red",
      })
      return
    }
    try {
      await axios.post(getUserPostsUrl, {
        userId: userId
      })
      .then((res) => {
        let posts = []
        posts = res.data.posts
        posts = posts.reverse()
        setPosts(posts)
      })
      .catch((err) => {
        console.log(err)
        toast({
          title: `Error : Something went wrong while gettiing posts`,
          variant: "red",   
        })
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "red",
      })
      console.log(error)
    }
  }

  useEffect(() => {
    if (userId) {
      getUserPosts(userId)
      getUserMemories(userId)
    }
  }, [userId])

  const getJobPostUrl = getAllPostsUrl
  async function getPostData() {
    try {
     
     await axios.get(getJobPostUrl)
        .then((res) => {
          console.log(res.data)
          const userPosts = res.data?.jobs?.filter((post) => post.postedBy.includes(userId))
          setPosts(userPosts)


          // setJobs(res.data.jobs);
          // if (typeof window !== "undefined") {
          //   window.localStorage.setItem("posts", JSON.stringify(res.data.jobs))
          // }
        })
       
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Tabs defaultValue="posts" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="memories">Memories</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Card>
          <CardContent className="p-6">
            {posts?.length > 0 ? (
              <div className="w-full max-h-full flex flex-wrap gap-3">
                {posts.map((post) => (
                  <div key={post.id} className="w-[300px] rounded-md border">
                    {
                      post.thumbnail ? (
                        <img
                          src={post.thumbnail}
                          alt="post thumbnail"
                          className="h-[200px] w-full rounded-md object-cover"
                        />
                      ) : (
                        <></>
                      )
                    }
                    <div className="p-4">
                      <h1 className="text-lg font-semibold">{post.title}</h1>
                      <Link href={post.url}>
                        <p className="mt-3 text-sm text-blue-600">{post.url}</p>
                      </Link>
                      <p className="mt-3 text-sm text-gray-600">{post.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No posts available.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="memories">
        <Card>
          <CardContent className="p-6">
            {memories.length > 0 ? (
              <div className="w-full max-h-full flex flex-wrap gap-3">
                {memories.map((memory) => (
                  <Link key={memory._id} href={`/memories/${memory._id}`}>
                  <div  className="w-[300px] rounded-md border">
                    {
                      memory.image ? (
                        <img
                          src={memory.image}
                          alt="memory image"
                          className="h-[200px] w-full rounded-md object-cover"
                        />
                      ) : (
                        <></>
                      )
                    }
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{memory.content}</h3>
                      <div className="flex justify-between">
                        <p className="mt-3 text-sm text-gray-600 font-semibold">{`${memory.likes.length} likes`|| <></>}</p>
                        <p className="mt-3 text-sm text-gray-600 font-semibold">{`${memory.comments.length} comments`|| <></>}</p>
                      </div>
                     
                      <p className="mt-3 text-sm text-gray-600">Posted on {Date(memory.createdAt).substring(0,24)}</p>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No memories available.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}








// import axios from 'axios';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useEffect, useState } from 'react'

// export default function CardTwo() {
//   const location = usePathname()
//   const userId = location.substring(9);

//   const [userPosts , setPosts] = useState([]);

//    async function getUserPosts(){
//     if(typeof window !== undefined){
//       const allPosts = JSON.parse(localStorage.getItem("posts"));
//       console.log(allPosts)
//       const usrPosts = allPosts?.filter(post => post.postedBy.includes(userId));
//       console.log(usrPosts);
//       setPosts(usrPosts);
//    }
//    }

//    useEffect(() => {
//     if(userId){
//       getUserPosts();
//     }
//    },[])

//   return (<>
//     <div>
//     <h5 className='font-semibold p-3 text-center'>Posts</h5>
//     </div>
//     <div className='w-full max-h-full flex flex-wrap gap-3 p-3'>
//       {
//         userPosts?.map((post) => {
//           return (
//             <>
//             <div className="w-[300px] rounded-md border">
//               <img
//                 src={post?.thumbnail}
//                 alt="post thumbnail"
//                 className="h-[200px] w-full rounded-md object-cover"
//               />
//               <div className="p-4">
//                 <h1 className="text-lg font-semibold">{post?.title}</h1>
//                 <Link href={post?.url}>
//                 <p className="mt-3 text-sm text-blue-600">
//                  {post?.url}
//                 </p>
//                 </Link>
//                 <p className="mt-3 text-sm text-gray-600">
//                  {post?.description}
//                 </p>
//                 {/* <button
//                   type="button"
//                   className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                 >
//                   update
//                 </button> */}
//               </div>
//             </div>
//             </>
//           )
//         })

//       }
//     </div>
//     </>
//   )
// }