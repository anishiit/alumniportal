'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Footer from '@/components/footer/Footer'
import NavForSlash from '@/components/header/NavForSlash'
import Navbar2 from "@/components/header/Navbar2"

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false)
  const [userData, setUserData] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically handle the form submission
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
        <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>
        <p className="mt-4 text-lg text-white/90">
          Get in touch with the LinkLum team
        </p>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">support@linklum.in</p>
                      <p className="text-gray-600">info@linklum.in</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">+91 (800) 123-4567</p>
                      <p className="text-gray-600">Mon-Fri 9:00 AM - 6:00 PM IST</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Office Location</h3>
                      <p className="text-gray-600">
                        123 Tech Park, Sector 15
                        <br />
                        Bangalore, Karnataka 560001
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                      <p className="text-gray-600">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                {!submitted ? (
                  <>
                    <h2 className="mb-6 text-2xl font-semibold">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <Input id="firstName" name="firstName" required className="mt-1" />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <Input id="lastName" name="lastName" required className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <Input id="email" name="email" type="email" required className="mt-1" />
                      </div>

                      <div>
                        <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700">
                          Inquiry Type
                        </label>
                        <Select name="inquiryType" required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="membership">Membership</SelectItem>
                            <SelectItem value="events">Events</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          className="mt-1"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Thank You!</h2>
                    <p className="text-gray-600">
                      We have received your message and will get back to you within 24-48 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)} className="mt-6">
                      Send Another Message
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    </>
  )
}

