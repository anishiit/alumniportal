"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Mail, School } from "lucide-react"
import Link from "next/link"

export default function VerificationPage() {
  const [progress, setProgress] = useState(0)
  const [startTime, setStartTime] = useState(Date.now())

  useEffect(() => {
    const totalDuration = 36 * 60 * 60 * 1000 // 36 hours in milliseconds
    const interval = 60000 // Update every minute

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime
      const newProgress = (elapsedTime / totalDuration) * 100

      if (newProgress >= 100) {
        setProgress(100)
        clearInterval(timer)
      } else {
        setProgress(newProgress)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [startTime])

  const getEstimatedTime = () => {
    const remainingTime = 36 - (36 * progress / 100)
    return Math.ceil(remainingTime)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Verification in Progress</CardTitle>
          <CardDescription className="text-center">Our team is validating your college credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <motion.div
              className="flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <School className="w-24 h-24 text-blue-500" />
            </motion.div>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">
              Estimated time remaining: {getEstimatedTime()} hours
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Received your application</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Verifying college information</span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                </motion.div>
                <span>Final review</span>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                The verification process typically takes up to 36 hours. Once completed, we&apos;ll send you an email with instructions to access your dashboard.
              </p>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" className="w-full sm:w-auto">
                <Mail className="w-4 h-4 mr-2" />
                Check your email
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact support</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}