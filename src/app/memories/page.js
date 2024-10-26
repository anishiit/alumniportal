'use client'

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Search, Heart, MessageCircle, Send, Image as ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar2 from "@/components/header/Navbar2"
import axios from "axios"
import { getAllMemoriesUrl ,getMemoryByIdUrl , createMemoryUrl, addLikeOnMemoryUrl, addCommentOnMemoryUrl } from "@/urls/urls.js"

export default function AlumniMemories() {
  const [memories, setMemories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newMemory, setNewMemory] = useState("")
  const [newImage, setNewImage] = useState(null)
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null)
  const [currentUser, setCurrentUser] = useState({})

  const getUser =()=>{
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem("user-threads"))
      console.log(userData._id)
      setCurrentUser(userData) 
    }
  }

  useEffect(() => {
    getUser()
  }, [])


  const getAllMemories = async()=>{
    try {
      const response = await axios.get(getAllMemoriesUrl)
      console.log(response.data)
      setMemories(response.data)

    } catch (error) {
      console.log(error);
    }
  }
      
  useEffect(() => {
    getAllMemories()
  }, [])

  const filteredMemories = memories.filter((memory) =>
    String(memory?.content)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(memory?.author?.name)?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const postNewMemory = async()=>{
    try {
      const formData = new FormData();
        
      // Append memory details to formData
      formData.append('content', newMemory);  // Assuming newMemory is an object
      formData.append('postedBy', currentUser._id);  // Assuming currentUser is a simple value (string)
      
      // Append the image file
      formData.append('image', image);  
      const response =await axios.post(createMemoryUrl ,formData)
      console.log(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }


  const handleLike = (memoryId) => {
    setMemories(memories.map(memory => {
      if (memory._id === memoryId) {
        const userLikedIndex = memory.likes.indexOf(currentUser._id)
        if (userLikedIndex > -1) {
          memory.likes.splice(userLikedIndex, 1)
        } else {
          memory.likes.push(currentUser._id)
        }
        // api req for adding a like on a memory
        try {
          axios.post(addLikeOnMemoryUrl,{
            memoryId: memoryId, userId:currentUser._id
          }).then()
        } catch (error) {
          console.log(error)
        }
      }
      return memory
    }))
  }

  const handleComment = (memoryId, comment) => {
    setMemories(memories.map( memory => {
      if (memory._id === memoryId) {
        memory.comments.push({
          _id: memory.comments.length + 1,
          author: currentUser._id,
          authorname:currentUser.name,
          content: comment,
          avatar: currentUser.avatar
        })
        // api req to push the comment
        try {
          axios.post(addCommentOnMemoryUrl, {
            memoryId:memoryId, postedBy:currentUser._id, content:comment
          }).then((res) => {console.log(res.data.message)})
          .catch((err) => {console.log(err)})
        } catch (error) {
          console.log(error)
        }

      }
      return memory
    }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    setImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const formatContent = (content) => {
    const words = content.split(' ')
    return words.map((word, index) => {
      if (word.startsWith('@')) {
        return <span key={index} className="text-blue-500">{word} </span>
      } else if (word.startsWith('#')) {
        return <span key={index} className="text-indigo-500">{word} </span>
      }
      return word + ' '
    })
  }

  return (
    <div>
    <Navbar2 />
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Alumni Memories</h1>
        
        <Card className="mb-8">
          <CardContent className="p-4">
            <Textarea
              placeholder="Share your memory..."
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-between items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => fileInputRef.current.click()}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              {newImage && <img src={newImage} alt="Preview" className="h-10 w-10 object-cover rounded" />}
              <Button onClick={postNewMemory}>
                <Send className="w-4 h-4 mr-2" />
                Share Memory
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search memories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <AnimatePresence>
          {filteredMemories?.slice().reverse().map((memory) => (
            <motion.div
              key={memory._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center mb-4">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage src={memory?.authorAvatar} alt={memory?.author.name} />
                      <AvatarFallback>{memory.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{memory?.author.name}</p>
                      <p className="text-sm text-gray-500">{memory?.date}</p>
                    </div>
                  </div>
                  {memory.image && (
                    <img 
                      src={memory?.image} 
                      alt="Memory" 
                      className="w-full h-64 object-cover rounded-lg mb-4" 
                    />
                  )}
                  <p className="text-gray-700 mb-4">{formatContent(memory?.content)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`text-gray-500 ${memory.likes.includes(currentUser._id) ? 'text-red-500' : ''}`}
                        onClick={() => handleLike(memory._id)}
                      >
                        <Heart className={`w-5 h-5 mr-1 ${memory.likes.includes(currentUser._id) ? 'fill-current' : ''}`} />
                        {memory.likes.length}
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <MessageCircle className="w-5 h-5 mr-1" />
                            {memory.comments.length}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <div className="max-h-[50vh] overflow-y-auto">
                            {memory.comments.map((comment) => (
                              <div key={comment.id} className="flex items-start space-x-2 mb-4">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={comment.avatar} alt={comment.author} />
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
                                  handleComment(memory._id, e.target.value)
                                  e.target.value = ''
                                }
                              }}
                              className="flex-grow mr-2"
                            />
                            <Button size="sm" onClick={() => {
                              const input = document.querySelector('input[placeholder="Add a comment..."]')
                              handleComment(memory._id, input.value)
                              input.value = ''
                            }}>
                              Post
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
    </div>
  )
}