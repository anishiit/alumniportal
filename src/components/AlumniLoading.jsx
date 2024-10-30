"use client"

import jwt from "jsonwebtoken"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

const SkeletonCard = () => (
  <Card className="overflow-hidden h-full flex flex-col">
    <CardHeader className="p-0">
      <motion.div
        className="h-24 bg-gradient-to-r from-blue-200 to-indigo-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </CardHeader>
    <CardContent className="pt-0 pb-6 px-6 flex-grow flex flex-col">
      <div className="flex justify-center -mt-12 mb-4">
        <motion.div
          className="w-24 h-24 rounded-full bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <motion.div
        className="h-6 bg-gray-200 rounded mb-2 mx-auto w-3/4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="h-4 bg-gray-200 rounded mb-4 mx-auto w-1/2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="space-y-2 flex-grow">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-4 bg-gray-200 rounded mx-auto w-2/3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-8 bg-gray-200 rounded w-1/3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          />
        ))}
      </div>
    </CardContent>
  </Card>
)

export default function AlumniDirectoryLoading() {
  return (
    <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Alumni Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alumni..."
                  className="pl-10 py-6 text-lg rounded-full shadow-md"
                  disabled
                />
              </div>
              <Select disabled>
                <SelectTrigger className="w-full sm:w-[180px] rounded-full shadow-md">
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
              </Select>
              <Select disabled>
                <SelectTrigger className="w-full sm:w-[180px] rounded-full shadow-md">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
              </Select>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all" disabled>All</TabsTrigger>
                <TabsTrigger value="batch" disabled>By Batch</TabsTrigger>
                <TabsTrigger value="branch" disabled>By Branch</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}