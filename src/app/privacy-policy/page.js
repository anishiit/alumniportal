"use client"

import { Card, CardContent } from "@/components/ui/card"
import NavForSlash from '@/components/header/NavForSlash'
import Navbar2 from "@/components/header/Navbar2"
import { useState, useEffect } from "react"
import Link from "next/link"
import Footer from "@/components/footer/Footer"

export default function PrivacyPolicy() {

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
        <h1 className="text-4xl font-bold md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-lg text-white/90">
          How we handle and protect your information at LinkLum
        </p>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Card className="space-y-8 p-8">
          <CardContent className="space-y-6">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
              <p className="text-gray-600">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Name and contact information</li>
                <li>Educational history and professional experience</li>
                <li>Profile information and content you share</li>
                <li>Communications with other members</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. How We Use Your Information</h2>
              <p className="text-gray-600">
                We use the information we collect to:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Provide and improve our services</li>
                <li>Connect you with other alumni</li>
                <li>Send updates about events and opportunities</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. Information Sharing</h2>
              <p className="text-gray-600">
                We do not sell your personal information. We share your information only:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>With other members as part of the platform&apos;s functionality</li>
                <li>With service providers who assist in our operations</li>
                <li>When required by law or to protect rights</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal information. However, no security system is impenetrable and we cannot guarantee the security of our systems 100%.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Your Rights</h2>
              <p className="text-gray-600">
                You have the right to:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of communications</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2 text-gray-600">
                Email: team.linklum@gmail.com
              </p>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </CardContent>
        </Card>
      </div>

    </div>

    <Footer />
    </>
  )
}

