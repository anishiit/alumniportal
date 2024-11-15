'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { postFeedbackUrl } from "@/urls/urls.js"
import { useToast } from "@/hooks/use-toast"
import { StarIcon } from 'lucide-react'

export default function FeedbackPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(postFeedbackUrl, { name, feedback, email })
      setLoading(false)
      toast({
        variant: "green",
        title: "Feedback Submitted",
        description: "Thank you for your feedback. We appreciate your input!",
      })
      setName('')
      setFeedback('')
      setEmail('')
      setRating(0)
    } catch (error) {
      console.error(error)
      toast({
        variant: "red",
        title: "Error",
        description: "Error while submitting the feedback",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <div className="mx-auto max-w-max rounded-full border bg-secondary p-1 px-3">
            <p className="text-center text-xs font-semibold leading-normal md:text-sm">
              Your opinion matters
            </p>
          </div>
          <h1 className="text-center text-3xl font-bold md:text-5xl md:leading-10">
            Share Your Experience
          </h1>
          <p className="mx-auto max-w-4xl text-center text-base text-muted-foreground md:text-xl">
            We value your feedback. Please take a moment to let us know about your experience with our product or service.
          </p>
        </div>
        <div className="mx-auto max-w-7xl py-12 md:py-24">
        <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <h2 className="text-2xl font-bold md:text-4xl">Leave Your Feedback</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Your feedback helps us improve our services.
                </p>
                <form onSubmit={handleFormSubmit} className="mt-8 space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      id="email"
                      placeholder="Your email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      id="name"
                      placeholder="Your name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="rating"
                    >
                      Rating
                    </label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-6 w-6 cursor-pointer ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="feedback"
                    >
                      Feedback
                    </label>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="feedback"
                      placeholder="Share your experience with us"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Feedback"}
                  </button>
                </form>
              </div>
            </div>
        </div>
      </div>
      <hr className="mt-6" />
    </div>
  )
}
















// 'use client'

// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import {postFeedbackUrl} from "@/urls/urls.js"
// import { useToast } from "@/hooks/use-toast"

// export default function ContactPageOne() {
// const [name, setName] = useState('')
// const [email, setEmail] = useState('')
// const [feedback, setFeedback] = useState('')
// const [loading, setLoading] = useState(false)
//   const { toast } = useToast();
//   const handleFormSubmit = async(e) => {
//     e.preventDefault();
    
//     setLoading(true)
   
//       try {
//         const res =  await axios.post(postFeedbackUrl,{name:name , feedback:feedback , email:email})
        
//         setLoading(false)
//         toast({
//           variant: "green",
//         title: "Message Sent",
//         description: "Thank you for your message. We'll get back to you soon!",
//       })
//         setName('')
//         setFeedback('')
//         setEmail('')
//       } catch (error) {
//         console.log(error)
//         toast({
//           variant: "red",
//         title: "Error",
//         description: "Error while sending the feedback",
//       })
//       }
  
//   }

//   return (
//     <div>
     

//       <div className="mx-auto max-w-7xl px-4">
//         {/* Hero Map */}
//         <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
//           <div className="mx-auto max-w-max rounded-full border bg-gray-50 p-1 px-3">
//             <p className="text-center text-xs font-semibold leading-normal md:text-sm">
//               Share your thoughts
//             </p>
//           </div>
//           <p className="text-center text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
//             Love to hear from you
//           </p>
//           <p className="mx-auto max-w-4xl text-center text-base text-gray-600 md:text-xl">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis voluptates
//             neque itaque repudiandae sint, explicabo assumenda quam ratione placeat?
//           </p>
//         </div>
//         <div className="mx-auto max-w-7xl py-12 md:py-24">
//           <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
//             {/* contact from */}
//             <div className="flex items-center justify-center">
//               <div className="px-2 md:px-12">
//                 <p className="text-2xl font-bold text-gray-900 md:text-4xl">Get in touch</p>
//                 <p className="mt-4 text-lg text-gray-600">
//                   Our friendly team would love to hear from you.
//                 </p>
//                 <form onSubmit={handleFormSubmit} className="mt-8 space-y-4">
                
//                   <div className="grid w-full  items-center gap-1.5">
//                     <label
//                       className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       htmlFor="email"
//                     >
//                       Email
//                     </label>
//                     <input
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
//                       type="text"
//                       id="email"
//                       placeholder="email"
//                       onChange={(e) => setEmail(e.target.value)}
//                       value={email}
//                     />
//                   </div>
//                   <div className="grid w-full  items-center gap-1.5">
//                     <label
//                       className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       htmlFor="name"
//                     >
//                       name
//                     </label>
//                     <input
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
//                       type="text"
//                       id="name"
//                       placeholder="name"
//                       onChange={(e) => setName(e.target.value)}
//                       value={name}
//                     />
//                   </div>
//                   <div className="grid w-full  items-center gap-1.5">
//                     <label
//                       className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       htmlFor="message"
//                     >
//                       Message
//                     </label>
//                     <textarea
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
//                       id="message"
//                       placeholder="Leave us a message"
//                       cols={3}
//                       value={feedback}
//                       onChange={(e) => setFeedback(e.target.value)}

//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                   >
//                   {loading ? "Sending..." : "Send Message"}
            
//                   </button>
//                 </form>
//               </div>
//             </div>
//             <img
//               alt="Contact us"
//               className="hidden max-h-full w-full rounded-lg object-cover lg:block"
//               src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=800&q=80"
//             />
//           </div>
//         </div>
//       </div>
//       <hr className="mt-6" />

//     </div>
//   )
// }

