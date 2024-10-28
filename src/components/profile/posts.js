"use client"

import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { deleteMemoryUrl, deletePostUrl, getAllPostsUrl, getUserMemoriesUrl, getUserPostsUrl } from "@/urls/urls"
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import { Trash2, ThumbsUp, MessageCircle } from "lucide-react"
import {formatDistanceToNow} from 'date-fns'

export default function PostsAndMemoriesTabs() {
  const { toast } = useToast()
  const location = usePathname()
  const userId = location.substring(9)
  const [posts, setPosts] = useState([])
  const [memories, setMemories] = useState([])
  const [currUser ,setCurrUser] = useState('');



  useEffect(() => {
    if (typeof window !== "undefined") {
      const currUser = JSON.parse(localStorage.getItem("user-threads"))
     
      if (currUser) {
        setCurrUser(currUser)
      }
    }
  }, [])
  async function getUserMemories(userId) {
    if(!userId) {
      toast({
        description: "User not Logged In",
        variant: "red",
        duration: 2000,
      })
      return
    }
    try {
      const res = await axios.post(getUserMemoriesUrl, { userId })
      setMemories(res.data.memories.reverse())
    } catch (error) {
      console.log(error)
      toast({
        title: "Could not get memories",
        variant: "red",
        duration: 2000,
      })
    }
  }

  async function getUserPosts(userId) {
    if(!userId) {
      toast({
        title: "Error",
        description: "User not Logged In",
        variant: "red",
        duration: 2000
      })
      return
    }
    try {
      const res = await axios.post(getUserPostsUrl, { userId })
      setPosts(res.data.posts.reverse())
    } catch (error) {
      console.log(error)
      toast({
        description:"Could not get posts",
        variant: "red",
      })
    }
  }

  useEffect(() => {
    if (userId) {
      getUserPosts(userId)
      getUserMemories(userId)
    }
  }, [userId])

  const deletePost = async (postId) => {
    try {
      await axios.post(deletePostUrl, { postId: postId })
      setPosts(posts.filter(post => post._id !== postId))
      toast({
        title: "Post deleted successfully",
        variant: "green",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error deleting post",
        variant: "red",
      })
    }
  }

  const deleteMemory = async (memoryId) => {
    try {
      await axios.post(deleteMemoryUrl,{memoryId:memoryId})
      setMemories(memories.filter(memory => memory._id !== memoryId))
      toast({
        title: "Memory deleted successfully",
        variant: "green",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error deleting memory",
        variant: "red",
      })
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
              <div className="w-full max-h-full space-y-6">
                {posts.map((post,index) => (
                  <div key={index} className="rounded-lg border overflow-hidden shadow-md">
                    {post.thumbnail && (
                      <div className="w-full h-48 sm:h-64">
                        <img
                          src={post.thumbnail}
                          alt="Post thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4 flex flex-col">
                      <div className="flex justify-between">
                        <h2 className="text-xl font-semibold line-clamp-2">{post.title}</h2>
                        <p className="text-sm text-gray-500">
                            Posted {formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      <Link href={post.url} className="mt-2 text-sm text-blue-600 hover:underline break-all">
                        {post.url}
                      </Link>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-grow">{post.description}</p>
                      <div className="mt-4 flex flex-row justify-between items-start sm:items-center gap-2">
                        <Link href={`/jobposts/${post._id}`}>
                          <Button
                            className="bg-blue-600 hover:bg-blue-600/80 mr-1"
                            size="sm"
                          >
                            {/* <Trash2 className="w-4 h-4 mr-2" /> */}
                            View full Post
                          </Button>
                        </Link>
                        {currUser._id ===post.postedBy && <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deletePost(post._id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Post
                        </Button>}
                      </div>
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
              <div className="w-full max-h-full space-y-6">
                {memories.map((memory) => (
                  <div key={memory._id} className="rounded-lg border overflow-hidden shadow-md flex flex-col sm:flex-row">
                    {memory.image && (
                      <div className="w-full sm:w-1/3 h-48 sm:h-auto">
                        <img
                          src={memory.image}
                          alt="Memory image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4 flex flex-col w-full sm:w-2/3">
                      <h3 className="text-xl font-semibold line-clamp-3">{memory.content}</h3>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="flex items-center text-sm text-gray-600">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {memory.likes.length} likes
                        </span>
                        <span className="flex items-center text-sm text-gray-600">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {memory.comments.length} comments
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 flex-grow">
                        Posted {formatDistanceToNow(new Date(memory?.createdAt), { addSuffix: true })}
                      </p>
                      <div className="mt-4 flex flex-row md:justify-start justify-between items-start sm:items-center gap-2">
                        <Link href={`/memories/${memory._id}`}>
                        <Button
                          className="bg-blue-600 hover:bg-blue-600/80 mr-1"
                          size="sm"
                        >
                          {/* <Trash2 className="w-4 h-4 mr-2" /> */}
                          View Memory
                        </Button>
                        </Link>
                       { currUser._id ===memory.author._id &&  <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMemory(memory._id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Memory
                        </Button>}
                      </div>
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