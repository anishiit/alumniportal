"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { postFeedbackUrl } from "@/urls/urls.js"
import axios from 'axios'
import Link from "next/link"
export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    try {
      const res = await axios.post(postFeedbackUrl, { name: name, feedback: feedback, email: email })
      console.log(res.data)
      setLoading(false)
      toast({
        variant: "green",
        title: "Feedback Submitted",
        description: "Thank you for sharing your experience with us!",
      })
      setName('')
      setFeedback('')
      setEmail('')
    } catch (error) {
      console.log(error)
      toast({
        variant: "red",
        title: "Error",
        description: "Error while submitting your feedback. Please try again later.",
      })
    }
  }

  return (
    <Dialog  onOpenChange={setIsOpen}>
     
      <Link href={'/contact'}><Button size="lg"  className="w-full bg-blue-600 hover:bg-blue-600/80">Share Feedback</Button></Link>
        
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle >Share Your Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Textarea
            placeholder="Your Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">{loading ? "Submitting..." : "Submit Feedback"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
