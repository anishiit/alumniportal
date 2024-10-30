// 


"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonCard = () => (
  <Card className="w-full">
    <CardContent className="p-4">
      <Skeleton className="h-12 w-12 rounded-full mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </CardContent>
  </Card>
)

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
          <nav className="hidden md:flex space-x-4">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-4 w-20" />
            ))}
          </nav>
          <Skeleton className="h-10 w-10 rounded-full md:hidden" />
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gray-50 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/5 mb-6" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="w-full md:w-1/2">
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-8 w-48 mb-8 mx-auto" />
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {[1, 2, 3, 4, 5, 6].map((card) => (
                <motion.div
                  key={card}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <Skeleton className="h-8 w-32 mb-4 md:mb-0" />
          <div className="flex space-x-4">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-8 w-8 rounded-full" />
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}