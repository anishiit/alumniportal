"use client"

import { useRef, useState ,useEffect} from "react"
import { motion, useAnimationControls } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"



const testimonials = [
  {
    id: 1,
    name: "Mohan Das",
    role: "Software Engineer",
    company: "TechCorp",
    testimonial: "LinkLum was instrumental in my career switch. The network I built here opened doors I never thought possible.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Data Scientist",
    company: "AI Innovations",
    testimonial: "The workshops and events organized through LinkLum significantly boosted my professional growth. It's an invaluable resource for any alumnus.",
  },
  {
    id: 3,
    name: "Rahul Gupta",
    role: "Entrepreneur",
    company: "StartUp Hub",
    testimonial: "LinkLum's mentorship program connected me with industry leaders, which was crucial for my startup's success. I'm grateful for this community.",
  },
  {
    id: 4,
    name: "Ananya Patel",
    role: "Product Manager",
    company: "InnovateTech",
    testimonial: "The diverse network on LinkLum helped me gain insights from various industries, shaping my product strategy skills immensely.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Research Scientist",
    company: "BioTech Solutions",
    testimonial: "LinkLum's research collaboration features helped me find partners for my projects, accelerating our breakthroughs in biotechnology.",
  }
]

export default function TestimonialSection() {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimationControls()

  const handleMouseEnter = () => {
    setIsHovered(true)
    controls.stop()
  }

  useEffect(() => {
    controls.start({
        x: ["0%", "-100%"],
        transition: {
          duration: 70,
          ease: "linear",
          repeat: Infinity,
        },
      })
  },[])
  const handleMouseLeave = () => {
    setIsHovered(false)
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        duration: 70,
        ease: "linear",
        repeat: Infinity,
      },
    })
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
      <div className="container px-2 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
          What Our Users Say
        </h2>
        <div 
          className="relative" 
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex flex-nowrap gap-4 overflow-hidden">
            <motion.div
              className="flex gap-4 flex-nowrap"
              animate={controls}
              initial={{
                x: "0%"
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-[300px]"
                >
                  <Card className="border-none shadow-xl bg-gradient-to-br from-blue-400/90 to-indigo-500/90 backdrop-blur-sm text-white h-[400px] transform transition-transform duration-300 hover:scale-105">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <svg className="w-10 h-10 text-blue-200 mb-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="text-lg italic flex-grow">{testimonial.testimonial}</p>
                      </div>
                      <div className="mt-4">
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-blue-200">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

