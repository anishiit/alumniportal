'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarIcon } from 'lucide-react'
import Footer from '@/components/footer/Footer'
import NavForSlash from '@/components/header/NavForSlash'
import Navbar2 from "@/components/header/Navbar2"

export default function ReviewCollector() {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [userData, setUserData] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        // Here you would typically send the form data to your backend
        console.log('Form submitted')
        setSubmitted(true)
    }

    useEffect(() => {
        let user = (localStorage.getItem('amsjbckumr'))
        if(!user){
          return;
        }
        user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET);
        if (user) {
          setUserData(user)
        }
    }, [])

  return (
    <>
    <div className="min-h-[90vh] bg-white">
        {userData ? (<Navbar2></Navbar2>):( <NavForSlash />)}
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 py-16 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">Share Your Experience</h1>
        <p className="mt-4 text-lg text-white/90">
          Help us improve LinkLum by providing your valuable feedback
        </p>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Card className="p-8">
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input id="name" name="name" required className="mt-1" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" required className="mt-1" />
                </div>

                <div>
                  <label htmlFor="graduation-year" className="block text-sm font-medium text-gray-700">
                    Graduation Year
                  </label>
                  <Select name="graduation-year" required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(30)].map((_, i) => (
                        <SelectItem key={i} value={(new Date().getFullYear() - i).toString()}>
                          {new Date().getFullYear() - i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-8 h-8 cursor-pointer ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                    Your Review
                  </label>
                  <Textarea
                    id="review"
                    name="review"
                    rows={4}
                    required
                    className="mt-1"
                    placeholder="Share your thoughts about LinkLum..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Review
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Thank You!</h2>
                <p className="text-gray-600">Your review has been submitted successfully. We appreciate your feedback!</p>
                <Button onClick={() => setSubmitted(false)} className="mt-6">
                  Submit Another Review
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer/>
    </>
  )
}

