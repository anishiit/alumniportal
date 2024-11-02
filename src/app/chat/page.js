'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Users, Plus, ArrowLeft, Send, User } from 'lucide-react'
import axios from 'axios'
import { io } from 'socket.io-client'
import jwt from "jsonwebtoken"
import dayjs from 'dayjs'
import { getUserChatsUrl, getChatByIdUrl, chat_backend_url } from '@/urls/urls.js'
import Navbar2 from '@/components/header/Navbar2'
import ChatLoading from "@/components/ChatLoading"
import { useRouter, useSearchParams } from 'next/navigation'
// Socket io connection => 

// const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL_CHAT}`


// let username;

// // Check if window is defined (i.e., code is running in the browser)
// if (typeof window !== undefined) {
//   // Check if localStorage is available
//   username = (localStorage.getItem("username") ? (localStorage.getItem("username")) : ("three"));
// }
// const getUserDataUrl = `${ process.env.NEXT_PUBLIC_BACKEND_URL }/api/user/getuser`;
// const createNewChatUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL_CHAT}/api/chat/createnewchat`;
// const getUserChatsUrl = `${ process.env.NEXT_PUBLIC_CHAT_BACKEND_URL }/chat/getuserchats`;
// const getChatByIdUrl = `${process.env.NEXT_PUBLIC_CHAT_BACKEND_URL}/chat/getchatbyid`;
const getGroupChatByIdUrl = `${process.env.NEXT_PUBLIC_CHAT_BACKEND_URL}/groupchat/getgroupchatbyid`;
const createGroupUrl = `${process.env.NEXT_PUBLIC_CHAT_BACKEND_URL}/groupchat/creategroup`;

function ChatView({ chat, onBack }) {

  let user;
  if (typeof window !== "undefined") {
    // Check if localStorage is available
    user = JSON.parse(localStorage.getItem("user"));
    // setCurrentUser(user);
  }


  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)
  const [currentUser, setCurrentUser] = useState(user);
  const [roomId, setRoomId] = useState(chat._id)
  const [change, setChange] = useState(1);
  const [Chat, setChat] = useState(chat);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" })
  }

  const socket = useMemo(() => {
    return (io(`${chat_backend_url}`));

  }, [roomId])

  useEffect(() => {
    // console.log(change)
    chat = Chat;
    // console.log(chat , Chat);
    scrollToBottom()
  }, [chat.messages, change, roomId])

  useEffect(() => {
    let currUser = {}
    if (typeof window !== undefined) {
      currUser = localStorage.getItem("amsjbckumr")
      currUser = jwt.verify(currUser, process.env.NEXT_PUBLIC_JWT_SECRET)
      setCurrentUser(currUser);
    }
    const userId = currUser._id;

    // join the room as soon as user open chat
    socket.emit("join_room", { roomId: roomId, userId: userId })

    // listen for any recieving message on room
    socket.on('receive_message', ({ message, fromUserId, fromUserName, updatedChat, isGroupChat }) => {
      const newChat = {
        _id: updatedChat.chat._id,
        avatar: Chat.avatar,
        isGroup: isGroupChat,
        messages: [...updatedChat.chat.allMessages],
        lastMessage: updatedChat.chat.lastMessage,
        name: chat.name,
      }
      setChat(newChat);
      setChange(Math.random() * 10);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [roomId])


  const handleSendMessage = async (e) => {
    e.preventDefault();
    // handle new message for one to one chat
    if (newMessage.trim() !== "" && chat.isGroup === false) {
      // emit a message to the roomId from current user
      socket.emit('send_message', { message: newMessage, roomId: roomId, fromUserName: currentUser.name, fromUserId: currentUser._id, isGroupChat: false });
      setNewMessage("");
    }
    // handle new message for group chat
    else if (newMessage.trim() !== "" && chat.isGroup === true) {
      socket.emit('send_message', { message: newMessage, roomId: roomId, fromUserName: currentUser.username, fromUserId: currentUser._id, isGroupChat: true });
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full pt-16 sm:pt-0">
      <div className="flex items-center space-x-4 px-4 py-[14px] bg-gradient-to-r from-blue-600 to-indigo-600 text-primary-foreground">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <Avatar>
          <AvatarImage src={Chat?.avatar} alt={Chat.name} />
          <AvatarFallback className="text-black">{Chat.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{Chat.name}</h2>
          {
            Chat.isGroup === true ? (
              <p className='text-xs' >{Chat.members?.length} Members</p>
            ) : (
              <></>
            )
          }
        </div>
      </div>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {chat ? (
            <div key={Chat?._id}>
              {
                Chat?.messages?.map((message) => (
                  <div
                    key={message?._id}
                    className={`flex ${message.sender === currentUser?.name ? 'justify-end' : 'justify-start'} mb-2`}
                  >
                    <div className={`max-w-64 md:max-w-lg p-2 break-words whitespace-normal rounded-lg 
                ${message.sender === currentUser?.name ? 'bg-blue-500 text-white' : 'bg-gray-100'
                      }`}
                    >
                      {(chat.isGroup === true && message?.sender !== currentUser?.name) ? (
                        <p className='text-sm font-semibold text-blue-500'>{message.sender} </p>
                      ) : (<></>)}
                      <p className='break-words whitespace-normal text-base' >{message.message}</p>
                      <p className='text-xs font-light flex justify-end'>{message.time}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <></>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            className="flex-grow"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}




export default function WhatsAppClone() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('chats')
  const [selectedChat, setSelectedChat] = useState(null)
  const [chats, setChats] = useState([])
  const [groups, setGroups] = useState([])
  const [newGroupName, setNewGroupName] = useState("")
  const [selectedContacts, setSelectedContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("amsjbckumr")
        if (token) {
          const decodedUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
          setCurrentUser(decodedUser)
          await getUserChats(decodedUser._id)
        }
      }
    }

    fetchCurrentUser()
  }, [])

  useEffect(() => {
    if (userId && chats.length > 0) {
      const chat = chats.find(c => c.userId._id === userId)
      if (chat) {
        handleChatClick(chat)
      }
    }
  }, [userId, chats])

  async function getUserChats(userId) {
    try {
      setLoading(true)
      const res = await axios.post(getUserChatsUrl, { userId: userId })
      const formattedChats = res.data.chats.map((chat) => ({
        avatar: chat.userId1._id !== userId ? chat.userId1?.profileImage : chat.userId2?.profileImage,
        _id: chat._id,
        name: chat.userId1._id !== userId ? chat.username1 : chat.username2,
        lastMessage: chat.lastMessage,
        messages: chat.allMessages,
        isGroup: false,
        userId: chat.userId1._id !== userId ? chat.userId1 : chat.userId2
      }))
      const sortedChats = sortChats(formattedChats)
      setChats(sortedChats)
    } catch (error) {
      console.error("Error fetching chats:", error)
    } finally {
      setLoading(false)
    }
  }

  const sortChats = (chatsToSort) => {
    return [...chatsToSort].sort((a, b) => {
      const lastMessageA = a.messages.length > 0 ? a.messages[a.messages.length - 1] : { timestamp: 0 }
      const lastMessageB = b.messages.length > 0 ? b.messages[b.messages.length - 1] : { timestamp: 0 }
      return new Date(lastMessageB.timestamp) - new Date(lastMessageA.timestamp)
    })
  }

  const filteredChats = chats.filter(chat =>
    chat?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleChatClick = async (chat) => {
    try {
      setSelectedChat(null)
      const res = await axios.post(getChatByIdUrl, { chatId: chat._id })
      const newChat = { ...chat, messages: res.data.chat.allMessages }
      setSelectedChat(newChat)
    } catch (error) {
      console.error("Error fetching chat:", error)
      setSelectedChat(chat)
    }
  }

  const handleBackClick = () => {
    if(userId){
      router.push(`/profile/${userId._id}`)
    }
    setSelectedChat(null)
    if (currentUser) {
      getUserChats(currentUser._id)
    }
  }

  const handleCreateGroup = async () => {
    // Implement group creation logic here
  }

  if (loading) return <ChatLoading />

  return (
    <div className='relative'>
      <Navbar2 />
      <div className="flex w-full h-[91%] bg-background fixed bottom-0 overflow-x-clip">
        <div className="w-full md:w-96 flex flex-col border-r">
          {/* Chat list header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-primary-foreground">
            <h1 className="text-xl font-bold">Chat</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Users className="h-5 w-5" />
                  <span className="sr-only">New Group</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-white text-black'>
                {/* Group creation dialog content */}
              </DialogContent>
            </Dialog>
          </div>

          {/* Search input */}
          <div className="p-4 bg-secondary">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search chats..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Chat list */}
          <Tabs defaultValue="chats" className="flex-grow flex flex-col mt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chats" onClick={() => setActiveTab('chats')}>Chats</TabsTrigger>
              <TabsTrigger value="groups" onClick={() => setActiveTab('groups')}>Groups</TabsTrigger>
            </TabsList>
            <TabsContent value="chats" className="flex-grow">
              <ScrollArea className="h-[calc(92vh-200px)]">
                {filteredChats.map(chat => (
                  <div
                    key={chat._id}
                    className={`flex items-center space-x-4 p-4 ${selectedChat && selectedChat._id === chat._id ? "bg-gray-200" : ""}  hover:bg-gray-100 cursor-pointer`}
                    onClick={() => handleChatClick(chat)}
                  >
                    <Avatar>
                      <AvatarImage src={chat.userId.profileImage} alt={chat.name} />
                      <AvatarFallback>{chat.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{chat.name}</h3>
                      <div className='flex justify-between'>
                        <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                        <p className="text-xs text-muted-foreground">
                          {chat.messages[chat.messages.length - 1]?.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="groups" className="flex-grow">
              {/* Group list content */}
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat view */}
        <div className="hidden md:block flex-grow">
          {selectedChat ? (
            <ChatView chat={selectedChat} onBack={handleBackClick} />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a chat to start messaging
            </div>
          )}
        </div>
        {selectedChat && (
          <div className="fixed inset-0 bg-background md:hidden">
            <ChatView chat={selectedChat} onBack={handleBackClick} />
          </div>
        )}
      </div>
    </div>
  )
}