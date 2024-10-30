"use client"

import jwt from "jsonwebtoken"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const SkeletonLine = ({ width = "w-full" }) => (
  <motion.div
    className={`h-4 bg-gray-200 rounded ${width}`}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
)

const SkeletonMemoryCard = () => (
  <Card className="mb-6 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
    <CardContent className="p-4">
      <div className="flex items-center mb-4">
        <motion.div
          className="w-10 h-10 rounded-full bg-gray-200 mr-3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div>
          <SkeletonLine width="w-24" />
          <SkeletonLine width="w-16" />
        </div>
      </div>
      <motion.div
        className="w-full h-64 bg-gray-200 rounded-lg mb-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <SkeletonLine />
      <SkeletonLine width="w-3/4" />
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <motion.div
            className="w-16 h-8 bg-gray-200 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-16 h-8 bg-gray-200 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function AlumniMemoriesLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Alumni Memories</h1>

        <Card className="mb-8">
          <CardContent className="p-4">
            <motion.div
              className="w-full h-24 bg-gray-200 rounded mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="flex justify-between items-center">
              <motion.div
                className="w-8 h-8 bg-gray-200 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="w-32 h-8 bg-gray-200 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </CardContent>
        </Card>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search memories..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            disabled
          />
        </div>

        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <SkeletonMemoryCard />
          </motion.div>
        ))}
      </div>
    </div>
  )
}