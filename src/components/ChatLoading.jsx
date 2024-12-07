"use client"

import jwt from "jsonwebtoken"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Search, Users } from 'lucide-react'
import Navbar2 from "./header/Navbar2"

const SkeletonLine = ({ width = "w-full" }) => (
  <motion.div
    className={`h-4 bg-gray-200 my-1 rounded ${width}`}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
)

const SkeletonAvatar = () => (
  <motion.div
    className="w-10 h-10 rounded-full bg-gray-200"
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
)

const SkeletonChatItem = () => (
  <div className="flex items-center space-x-4 p-4 hover:bg-gray-100">
    <SkeletonAvatar />
    <div className="flex-grow">
      <SkeletonLine width="w-1/3" />
      <SkeletonLine width="w-2/3" />
    </div>
  </div>
)

const SkeletonChatView = () => (
  <div className="flex flex-col h-full">
    <div className="flex items-center space-x-4 px-4 py-[14px] bg-gradient-to-r from-blue-600 to-indigo-600">
      <Button variant="ghost" size="icon" disabled>
        <motion.div className="w-6 h-6 bg-gray-200 rounded" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
      </Button>
      <SkeletonAvatar />
      <SkeletonLine width="w-1/4" />
    </div>
    <ScrollArea className="flex-grow p-4">
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-2 `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <motion.div
              className={`max-w-64 md:max-w-lg p-2 rounded-lg ${index % 2 === 0 ? 'bg-blue-500' : 'bg-gray-100 my-2'}`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >

              {/* <SkeletonLine width="md:w-[600px] w-[100px]" /> */}
              {/* <SkeletonLine width="w-2/3" /> */}
              <p className="md:w-[600px] h-3 "></p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
    <div className="p-4 border-t">
      <div className="flex space-x-2">
        <Input className="flex-grow" disabled />
        <Button size="icon" disabled>
          <motion.div className="w-4 h-4 bg-gray-200 rounded" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
        </Button>
      </div>
    </div>
  </div>
)

export default function ChatAppLoading() {
  return (
    <div className="flex flex-col">
      <Navbar2 />
    <div className="flex w-full h-screen bg-background">
      <div className="w-full md:w-96 flex flex-col border-r">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-primary-foreground">
          <h1 className="text-xl font-bold">Chat</h1>
          <Button variant="outline" disabled>
            <Users className="h-5 w-5" />
            <span className="sr-only">New Group</span>
          </Button>
        </div>

        <div className="p-4 bg-secondary">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search chats..."
              className="pl-8"
              disabled
            />
          </div>
        </div>

        <Tabs defaultValue="chats" className="flex-grow flex flex-col mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chats" disabled>Chats</TabsTrigger>
            <TabsTrigger value="groups" disabled>Groups</TabsTrigger>
          </TabsList>
          <TabsContent value="chats" className="flex-grow">
            <ScrollArea className="h-[calc(100vh-200px)]">
              {[...Array(10)].map((_, index) => (
                <SkeletonChatItem key={index} />
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden md:block flex-grow">
        <SkeletonChatView />
      </div>
    </div>
    </div>
  )
}