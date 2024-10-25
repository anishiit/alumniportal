"use client"

import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"




export default function PostsAndMemoriesTabs() {
  const location = usePathname()
  const userId = location.substring(9)

  const [posts, setPosts] = useState([])
  const [memories, setMemories] = useState([])

  async function getUserPosts() {
    if (typeof window !== "undefined") {
      const allPosts = JSON.parse(localStorage.getItem("posts") || "[]")
      const userPosts = allPosts.filter((post) => post.postedBy.includes(userId))
      setPosts(userPosts)
    }
  }

  async function getUserMemories() {
    // This is a placeholder function. In a real application, you would fetch memories from an API or local storage
    setMemories([])
  }

  useEffect(() => {
    if (userId) {
      getUserPosts()
      getUserMemories()
    }
  }, [userId])

  return (
    <Tabs defaultValue="posts" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="memories">Memories</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Card>
          <CardContent className="p-6">
            {posts.length > 0 ? (
              <div className="w-full max-h-full flex flex-wrap gap-3">
                {posts.map((post) => (
                  <div key={post.id} className="w-[300px] rounded-md border">
                    <img
                      src={post.thumbnail}
                      alt="post thumbnail"
                      className="h-[200px] w-full rounded-md object-cover"
                    />
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
                  <div key={memory.id} className="w-[300px] rounded-md border">
                    <img
                      src={memory.image}
                      alt="memory image"
                      className="h-[200px] w-full rounded-md object-cover"
                    />
                    <div className="p-4">
                      <h1 className="text-lg font-semibold">{memory.title}</h1>
                      <p className="mt-3 text-sm text-gray-600">{memory.date}</p>
                      <p className="mt-3 text-sm text-gray-600">{memory.description}</p>
                    </div>
                  </div>
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