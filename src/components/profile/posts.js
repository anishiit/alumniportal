"use client"

import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllPostsUrl, getUserMemoriesUrl, getUserPostsUrl } from "@/urls/urls"
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import { Trash2 } from "lucide-react"

export default function PostsAndMemoriesTabs() {
  const { toast } = useToast()
  const location = usePathname()
  const userId = location.substring(9)
  const [posts, setPosts] = useState([])
  const [memories, setMemories] = useState([])

  async function getUserMemories(userId) {
    if(!userId) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "red",
      })
      return
    }
    try {
      const res = await axios.post(getUserMemoriesUrl, { userId })
      setMemories(res.data.memories.reverse())
    } catch (error) {
      console.log(error)
      toast({
        title: "Error getting memories",
        description: error.message,
        variant: "red",
      })
    }
  }

  async function getUserPosts(userId) {
    if(!userId) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "red",
      })
      return
    }
    try {
      const res = await axios.post(getUserPostsUrl, { userId })
      setPosts(res.data.posts.reverse())
    } catch (error) {
      console.log(error)
      toast({
        title: "Error getting posts",
        description: error.message,
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
      await axios.delete(`${getAllPostsUrl}/${postId}`)
      setPosts(posts.filter(post => post.id !== postId))
      toast({
        title: "Post deleted successfully",
        variant: "green",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error deleting post",
        description: error.message,
        variant: "red",
      })
    }
  }

  const deleteMemory = async (memoryId) => {
    try {
      await axios.delete(`${getUserMemoriesUrl}/${memoryId}`)
      setMemories(memories.filter(memory => memory._id !== memoryId))
      toast({
        title: "Memory deleted successfully",
        variant: "green",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error deleting memory",
        description: error.message,
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
              <div className="w-full max-h-full flex flex-wrap gap-3">
                {posts.map((post) => (
                  <div key={post.id} className="w-[300px] rounded-md border flex flex-col">
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        alt="post thumbnail"
                        className="h-[200px] w-full rounded-t-md object-cover"
                      />
                    )}
                    <div className="p-4 flex-grow flex flex-col">
                      <h1 className="text-lg font-semibold line-clamp-2">{post.title}</h1>
                      <Link href={post.url} className="mt-2 text-sm text-blue-600 break-all hover:underline">
                        {post.url}
                      </Link>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.description}</p>
                      <div className="mt-auto pt-4">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deletePost(post.id)}
                          className="w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Post
                        </Button>
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
              <div className="w-full max-h-full flex flex-wrap gap-3">
                {memories.map((memory) => (
                  <div key={memory._id} className="w-[300px] rounded-md border flex flex-col">
                    {memory.image && (
                      <img
                        src={memory.image}
                        alt="memory image"
                        className="h-[200px] w-full rounded-t-md object-cover"
                      />
                    )}
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-lg font-semibold line-clamp-3">{memory.content}</h3>
                      <div className="flex justify-between mt-2">
                        <p className="text-sm text-gray-600 font-semibold">{`${memory.likes.length} likes`}</p>
                        <p className="text-sm text-gray-600 font-semibold">{`${memory.comments.length} comments`}</p>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        Posted on {new Date(memory.createdAt).toLocaleString()}
                      </p>
                      <div className="mt-auto pt-4">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMemory(memory._id)}
                          className="w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Memory
                        </Button>
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