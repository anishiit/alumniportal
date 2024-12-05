"use client"

import { useState, useEffect } from "react"
import NavForSlash from '@/components/header/NavForSlash'
import Navbar2 from "@/components/header/Navbar2"
import Footer from "@/components/footer/Footer"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

  
  export default function FAQ() {

    const [userData, setUserData] = useState()
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
          <h1 className="text-4xl font-bold md:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-white/90">
            Find answers to common questions about LinkLum
          </p>
        </div>
  
        {/* Content Section */}
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                {/* General Section */}
                <section>
                  <h2 className="mb-4 text-2xl font-semibold">General</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="what-is-linklum">
                      <AccordionTrigger>What is LinkLum?</AccordionTrigger>
                      <AccordionContent>
                        LinkLum is a professional networking platform designed specifically for alumni to connect, share opportunities, and stay updated with their alma mater. It provides tools for networking, career development, and continued learning.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="who-can-join">
                      <AccordionTrigger>Who can join LinkLum?</AccordionTrigger>
                      <AccordionContent>
                        LinkLum is open to verified alumni of participating educational institutions. Current students in their final year may also be eligible for early access to prepare for their transition to alumni status.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="cost">
                      <AccordionTrigger>Is there a cost to join LinkLum?</AccordionTrigger>
                      <AccordionContent>
                        Basic membership is free for all verified alumni. Premium features and additional services may be available through paid subscription tiers.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
  
                {/* Account Section */}
                <section>
                  <h2 className="mb-4 text-2xl font-semibold">Account</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="how-to-join">
                      <AccordionTrigger>How do I join LinkLum?</AccordionTrigger>
                      <AccordionContent>
                        Click the &quot;Join Now&quot; button and follow the verification process. You&apos;ll need to provide your alumni email or other proof of graduation to verify your alumni status.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="profile-visibility">
                      <AccordionTrigger>Who can see my profile?</AccordionTrigger>
                      <AccordionContent>
                        By default, your profile is visible to other verified LinkLum members. You can adjust your privacy settings to control who sees your information and how they can connect with you.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="account-security">
                      <AccordionTrigger>How secure is my account?</AccordionTrigger>
                      <AccordionContent>
                        We implement industry-standard security measures, including two-factor authentication, encrypted data storage, and regular security audits to protect your information.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
  
                {/* Events Section */}
                <section>
                  <h2 className="mb-4 text-2xl font-semibold">Events</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="event-types">
                      <AccordionTrigger>What types of events does LinkLum offer?</AccordionTrigger>
                      <AccordionContent>
                        LinkLum hosts various events including networking meetups, professional development workshops, industry panels, and alumni reunions. Both virtual and in-person events are available.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="event-hosting">
                      <AccordionTrigger>Can I host an event on LinkLum?</AccordionTrigger>
                      <AccordionContent>
                        Yes, verified members can propose and host events. Submit your event proposal through the Events section, and our team will review it to ensure it meets community guidelines.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="event-cost">
                      <AccordionTrigger>Are events free to attend?</AccordionTrigger>
                      <AccordionContent>
                        Many events are free for members. Some specialized workshops or premium events may have associated costs, which will be clearly indicated in the event details.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
  
                {/* Networking Section */}
                <section>
                  <h2 className="mb-4 text-2xl font-semibold">Networking</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="connection-limits">
                      <AccordionTrigger>Is there a limit to how many connections I can make?</AccordionTrigger>
                      <AccordionContent>
                        There are no limits on connections for verified members. We encourage building meaningful professional relationships within the community.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="messaging">
                      <AccordionTrigger>How do I message other members?</AccordionTrigger>
                      <AccordionContent>
                        You can message other members through our secure messaging system once you&apos;ve established a connection. Premium members may have additional messaging privileges.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="groups">
                      <AccordionTrigger>Can I join or create groups?</AccordionTrigger>
                      <AccordionContent>
                        Yes, you can join existing interest groups or create new ones based on industry, location, graduation year, or shared interests. Groups are a great way to network with alumni who share similar backgrounds or goals.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />

      </>
    )
  }
  
  