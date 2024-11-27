import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Github, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'About LinkLum - Connecting Generations',
  description: 'Learn about LinkLum, a cutting-edge platform connecting students, alumni, and institutions. Explore our mission, vision, and values, and meet our founders.',
  keywords: 'LinkLum, students, alumni, institutions, mission, vision, founders, values',
  authors: [{ name: 'LinkLum Team' }],
  openGraph: {
    title: 'About LinkLum - Connecting Generations',
    description: 'Discover how LinkLum bridges the gap between generations through a seamless digital ecosystem for learning, networking, and growth.',
    images: [{ url: '/path-to-image.jpg' }],
    type: 'website',
    url: 'https://linklum.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            About LinkLum
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            LinkLum is a cutting-edge platform designed to connect college students, alumni, and educational institutions. 
            We provide a virtual space for collaboration, learning, and career development, bridging the gap between 
            generations and fostering meaningful relationships within the academic community.
          </p>
        </section>

        <section id="mission-vision" className="mb-16 grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                To create a seamless digital ecosystem that empowers students, alumni, and educational institutions to connect, 
                collaborate, and grow together. We strive to foster mentorship, networking opportunities, and career advancements, 
                turning virtual connections into real-world success.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600">
                We envision a future where every student has easy access to guidance, opportunities, and the collective wisdom of 
                alumni across the globe. LinkLum aims to become the go-to platform for educational and professional growth, helping 
                individuals to continuously thrive in their academic and professional endeavors.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="values" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Innovation',
                description: 'Pushing boundaries and creating innovative solutions for evolving user needs.',
                icon: <CheckCircle2 className="h-8 w-8 text-blue-500" />
              },
              {
                title: 'Collaboration',
                description: 'Fostering teamwork among students, alumni, and educational institutions.',
                icon: <CheckCircle2 className="h-8 w-8 text-green-500" />
              },
              {
                title: 'Integrity',
                description: 'Upholding the highest standards of honesty, transparency, and respect.',
                icon: <CheckCircle2 className="h-8 w-8 text-purple-500" />
              },
              {
                title: 'Inclusivity',
                description: 'Building an open, accessible, and welcoming platform for all individuals.',
                icon: <CheckCircle2 className="h-8 w-8 text-orange-500" />
              }
            ].map((value) => (
              <Card key={value.title} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent>
                  {value.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        <section id="founders" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Meet Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "Anish Kumar Singh",
                role: "Co-Founder & CEO",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Passionate about bridging gaps between academic and professional circles. Anish brings years of experience in educational technology and a vision for transforming how students and alumni connect."
              },
              {
                name: "Abhay Kant Mishra",
                role: "Co-Founder & CTO",
                image: "/placeholder.svg?height=400&width=400",
                bio: "With expertise in software development and a deep interest in AI, Abhay leads our technical innovations. His problem-solving skills drive LinkLum's cutting-edge features and user-centric design."
              }
            ].map((founder) => (
              <Card key={founder.name} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={400}
                      height={400}
                      className="h-48 w-full object-cover md:h-full md:w-48"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-2">{founder.name}</h3>
                    <Badge className="mb-4">{founder.role}</Badge>
                    <p className="text-gray-600 mb-4">{founder.bio}</p>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="icon">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn profile of {founder.name}</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub profile of {founder.name}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Get in Touch</h2>
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-8">
              <p className="text-center text-lg mb-8">
                We would love to hear from you! Whether you have questions, want to get involved, or just want to say hello, 
                don not hesitate to reach out.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <Mail className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-600">contact@linklum.com</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Phone className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (123) 456-7890</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <MapPin className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                  <p className="text-gray-600">123 Tech Street, Innovation City, 12345</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg px-8 py-3 rounded-full hover:shadow-lg transition-shadow duration-300">
            Join LinkLum Today <ArrowRight className="ml-2" />
          </Button>
        </section>
      </main>
    </div>
  )
}

