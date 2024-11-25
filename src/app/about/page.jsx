'use client'

import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

function AnimatedSection({ children, className = "" }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeInUp}
      className={`my-12 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Head>
        <title>About LinkLum - Connecting Generations</title>
        <meta
          name="description"
          content="Learn about LinkLum, a cutting-edge platform connecting students, alumni, and institutions. Explore our mission, vision, and values, and meet our founders."
        />
        <meta name="keywords" content="LinkLum, students, alumni, institutions, mission, vision, founders, values" />
        <meta name="author" content="LinkLum Team" />
        <meta property="og:title" content="About LinkLum - Connecting Generations" />
        <meta property="og:description" content="Discover how LinkLum bridges the gap between generations through a seamless digital ecosystem for learning, networking, and growth." />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linklum.com/about" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://linklum.com/about" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          About LinkLum
        </h1>
        
        <AnimatedSection>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            LinkLum is a cutting-edge platform designed to connect college students, alumni, and educational institutions. 
            We provide a virtual space for collaboration, learning, and career development, aiming to bridge the gap between 
            generations and foster meaningful relationships within the academic community.
          </p>
        </AnimatedSection>

        <AnimatedSection id="mission">
          <h2 className="text-3xl font-semibold mb-4 text-center">Our Mission</h2>
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 shadow-lg">
            <CardContent>
              <p className="text-xl italic text-center">
                To create a seamless digital ecosystem that empowers students, alumni, and educational institutions to connect, 
                collaborate, and grow together. We strive to foster mentorship, networking opportunities, and career advancements, 
                turning virtual connections into real-world success.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection id="vision">
          <h2 className="text-3xl font-semibold mb-4 text-center">Our Vision</h2>
          <p className="text-xl text-center mb-4 max-w-3xl mx-auto">
            We envision a future where every student has easy access to guidance, opportunities, and the collective wisdom of 
            alumni across the globe. LinkLum aims to become the go-to platform for educational and professional growth, helping 
            individuals to continuously thrive in their academic and professional endeavors.
          </p>
        </AnimatedSection>

        <AnimatedSection id="values">
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{
              title: 'Innovation',
              description: 'We believe in pushing boundaries and creating innovative solutions that cater to the ever-evolving needs of our users.'
            }, {
              title: 'Collaboration',
              description: 'We value teamwork and collaboration among students, alumni, and educational institutions to build a supportive community.'
            }, {
              title: 'Integrity',
              description: 'We uphold the highest standards of honesty, transparency, and respect in everything we do.'
            }, {
              title: 'Inclusivity',
              description: 'Our platform is built to be open, accessible, and welcoming to all, ensuring that every individual can benefit from the opportunities we provide.'
            }].map((value) => (
              <Card key={value.title} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent>
                  <h3 className="text-2xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="founders">
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{
              name: "Anish Kumar Singh",
              role: "Co-Founder & CEO",
              image: "/placeholder.svg?height=300&width=300"
            }, {
              name: "Abhay Kant Mishra",
              role: "Co-Founder & CTO",
              image: "/placeholder.svg?height=300&width=300"
            }].map((founder) => (
              <Card key={founder.name} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex flex-col items-center">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={200}
                    height={200}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-2xl font-semibold mb-2">{founder.name}</h3>
                  <Badge className="mb-4">{founder.role}</Badge>
                  <p className="text-center mb-4">
                    Passionate about bridging gaps between academic and professional circles. 
                    Expertise in software development and problem-solving, with a deep interest 
                    in building platforms that drive social impact.
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact">
          <h2 className="text-3xl font-semibold mb-6 text-center">Contact Us</h2>
          <Card className="p-6">
            <CardContent>
              <p className="text-center mb-6">
                Feel free to reach out if you have any questions or would like to get involved with LinkLum. We love to hear from you!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center">
                  <Mail className="mr-2 text-blue-600" />
                  <span>contact@linklum.com</span>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="mr-2 text-blue-600" />
                  <span>+1 (123) 456-7890</span>
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="mr-2 text-blue-600" />
                  <span>123 Tech Street, Innovation City, 12345</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection>
          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              Join LinkLum <ArrowRight className="ml-2" />
            </Button>
          </div>
        </AnimatedSection>
      </main>
    </div>
  )
}
