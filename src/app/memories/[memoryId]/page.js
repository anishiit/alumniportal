"use client"

import jwt from "jsonwebtoken"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Heart, MessageCircle, Send, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { getMemoryByIdUrl } from "@/urls/urls"
import axios from "axios"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
export default function Page() {
    const location = usePathname()
    const memoryId = location.replace("/memories/", "")
    // console.log(memoryId)

    const { toast } = useToast()

    const [memory, setMemory] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    const getMemory = async () => {
        setIsLoading(true)
        try {
            await axios.post(getMemoryByIdUrl, {
                memoryId: memoryId
            })
                .then((res) => {
                    setMemory(res.data)
                    // console.log(res.data)
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setIsLoading(false)
                    toast({
                        title: `ERROR : ${err.response.data.message}`,
                        variant: "red",
                    })
                })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast({
                title: `ERROR : ${error.message}`,
                variant: "red",
            })
        }
    }

    const handleLike = (memoryId) => {

    }

    const handleComment = (memoryId, comment) => {
        // console.log(comment)
    }

    const formatContent = (content) => {
        const words = content?.split(' ')
        return words?.map((word, index) => {
            if (word.startsWith('@')) {
                return <span key={index} className="text-blue-500">{word} </span>
            } else if (word?.startsWith('#')) {
                return <span key={index} className="text-indigo-500">{word} </span>
            }
            return word + ' '
        })
    }

    const getUser = () => {
        if (typeof window !== 'undefined') {
            let userData = localStorage.getItem("amsjbckumr")
            userData = jwt.verify(userData, process.env.NEXT_PUBLIC_JWT_SECRET)
            // console.log(userData._id)
            setCurrentUser(userData)
        }
    }

    useEffect(() => {
        getUser()
    }, [])


    useEffect(() => {
        getMemory()
    }, [])



    return (
        <>
            <div className="max-w-3xl mx-auto my-auto mt-20">
                <Card className="mb-6 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center mb-4">
                            <Avatar className="w-10 h-10 mr-3">
                                <AvatarImage src={memory?.author?.profileImage} alt={memory?.author?.name} />
                                <AvatarFallback>{memory?.author?.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{memory?.author?.name}</p>
                                <p className="text-sm text-gray-500">{memory?.date}</p>
                            </div>
                        </div>
                        {memory?.image && (
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
                                    className={`text-gray-500 ${memory?.likes?.includes(currentUser._id) ? 'text-red-500' : ''}`}
                                    onClick={() => handleLike(memory?._id)}
                                >
                                    <Heart className={`w-5 h-5 mr-1 ${memory?.likes?.includes(currentUser._id) ? 'fill-current' : ''}`} />
                                    {memory?.likes?.length}
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-gray-500">
                                            <MessageCircle className="w-5 h-5 mr-1" />
                                            {memory?.comments?.length}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <div className="max-h-[50vh] overflow-y-auto">
                                            {memory?.comments?.map((comment) => (
                                                <div key={comment._id} className="flex items-start space-x-2 mb-4">
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
                                                        handleComment(memory?._id, e.target.value)
                                                        e.target.value = ''
                                                    }
                                                }}
                                                className="flex-grow mr-2"
                                            />
                                            <Button size="sm" onClick={() => {
                                                const input = document.querySelector('input[placeholder="Add a comment..."]')
                                                handleComment(memory?._id, input.value)
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
            </div>
        </>
    )
}