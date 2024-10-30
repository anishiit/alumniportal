"use client"

import jwt from "jsonwebtoken"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const SkeletonLine = ({ width = "w-full" }) => (
  <motion.div
    className={`h-4 bg-gray-200 rounded ${width}`}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
)

const SkeletonAvatar = () => (
  <motion.div
    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200"
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
)

const SkeletonBadge = () => (
  <motion.div
    className="h-6 w-16 bg-gray-200 rounded-full"
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
)

const SkeletonCard = () => (
  <Card>
    <CardHeader className="p-3 sm:p-4">
      <SkeletonLine width="w-3/4" />
      <SkeletonLine width="w-1/2" />
    </CardHeader>
    <CardContent className="p-3 sm:p-4">
      <SkeletonLine />
      <SkeletonLine width="w-5/6" />
    </CardContent>
  </Card>
)

export default function ProfileLoading() {
  return (
    <div className="container mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden">
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 pt-20 pb-16 px-4 sm:pt-24 sm:pb-32 sm:px-6 lg:px-8">
          <div className="absolute -bottom-12 left-0 w-full flex justify-center sm:justify-start sm:left-6 lg:left-8">
            <SkeletonAvatar />
          </div>
          <div className="text-white text-center sm:text-left sm:pl-36 lg:pl-40">
            <SkeletonLine width="w-1/2" />
            <SkeletonLine width="w-1/3" />
          </div>
        </div>
        <CardContent className="pt-16 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-6">
            <motion.div
              className="w-24 h-8 bg-gray-200 rounded-md mr-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="w-24 h-8 bg-gray-200 rounded-md"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-start mb-6 bg-transparent">
              {["about", "experience", "education", "projects"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-grow sm:flex-grow-0 text-xs sm:text-sm py-2 px-2 sm:px-4 m-0.5 sm:m-1 rounded-md"
                  disabled
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="about" className="mt-4 sm:mt-6">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">About</h3>
                  <SkeletonLine />
                  <SkeletonLine />
                  <SkeletonLine width="w-3/4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Contact Information</h3>
                  <div className="grid gap-2">
                    <SkeletonLine width="w-2/3" />
                    <SkeletonLine width="w-1/2" />
                    <SkeletonLine width="w-3/4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {[1, 2, 3, 4].map((_, index) => (
                      <SkeletonBadge key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 space-y-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}