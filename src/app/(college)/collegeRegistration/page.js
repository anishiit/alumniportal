'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { Check, GraduationCap, Users, Globe, Mail, Building, Phone, Linkedin, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { registerCollegeUrl } from '@/urls/urls';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import Link from "next/link"

export default function CollegeRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const handleLogin= () =>{
    router.push('/collegeLogin')
  }
  const form = useForm({
    defaultValues: {
      collegeName: "",
      plan: undefined,
      phone: "",
      website: "",
      linkedin: "",
      email: "",
      password: "",
    },
  })

 async function onSubmit(values) {
    setIsSubmitting(true)
    const response = await axios.post(registerCollegeUrl , values)
    console.log(response.data)
   
    // console.log(values)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push('/verificationPage')
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 flex">
        <div className="container ">
        <Link href='/' className="flex h-16 items-center">
        <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
          <span className="font-bold text-2xl text-black">Alumni Portal</span></Link>
          
           
        </div>
        
          <Button size="lg" className="w-3xl mt-1 m-4" onClick={()=>{  handleLogin()}}>College Login</Button>
                  
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Empower Your Alumni Network
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-zinc-200">
                Join our cutting-edge Alumni Portal and unlock a world of opportunities for your institution and alumni.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                { title: "Enhanced Networking", icon: Users, description: "Connect your alumni with each other and current students, fostering meaningful relationships that can lead to mentorship opportunities and career advancements." },
                { title: "Global Reach", icon: Globe, description: "Showcase your alumni's achievements and increase your college's visibility on a global scale, attracting potential students and partnerships worldwide." },
                { title: "Engagement Tools", icon: Mail, description: "Utilize our platform's advanced features to organize events, share news, and maintain strong alumni relations with personalized communication tools." },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="flex flex-col justify-between h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                      <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Choose Your Plan
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                { title: "Free", price: "INR 0", description: "For 45 days only", features: ["Up to 1,000 alumni", "Basic networking features", "Event management"] },
                { title: "Standard", price: "INR 6,000", description: "For medium-sized institutions", features: ["Up to 5,000 alumni", "Advanced networking features", "Job board", "Mentorship program"] },
                { title: "Premium", price: "INR 10,000", description: "For large institutions", features: ["Unlimited alumni", "All Standard features", "Custom branding",  "Dedicated support"] },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="flex flex-col justify-between h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle>{plan.title}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg font-normal">/year</span></p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">{plan.title} Plan</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                Register Your College
              </h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
                  <FormField
                    control={form.control}
                    name="collegeName"
                    rules={{ required: "College name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your college name" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="plan"
                    rules={{ required: "Please select a plan" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Plan</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    rules={{ 
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your contact number" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    rules={{ 
                      required: "College website is required",
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                        message: "Please enter a valid URL"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College Website</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your college website URL" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linkedin"
                    rules={{ 
                      required: "College LinkedIn is required",
                      pattern: {
                        value: /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/,
                        message: "Please enter a valid LinkedIn URL"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College LinkedIn</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Linkedin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your college LinkedIn URL" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your email" type="email" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    rules={{ 
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your password" type="password" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register Your College"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-white py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-sm text-gray-500">&copy; 2024 Alumni Portal. All rights reserved.</p>
          <nav className="flex gap-4">
            <a href="#" className="text-sm text-gray-500 hover:underline">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:underline">Privacy Policy</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}