"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {postFeedbackUrl} from "@/urls/urls.js"
import axios from 'axios'
export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    
    setLoading(true)
   
      try {
        const res =  await axios.post(postFeedbackUrl,{name:name , feedback:feedback , email:email})
        console.log(res.data)
        setLoading(false)
        toast({
          variant: "green",
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      })
        setName('')
        setFeedback('')
        setEmail('')
      } catch (error) {
        console.log(error)
        toast({
          variant: "red",
        title: "Error",
        description: "Error while sending the feedback",
      })
      }
  
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">Get in Touch</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
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
            placeholder="Your Message"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">{loading ? "Sending..." : "Submit"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}