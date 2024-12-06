"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import NavForSlash from '@/components/header/NavForSlash'
import Navbar2 from "@/components/header/Navbar2"
import Link from "next/link"
import Footer from "@/components/footer/Footer"

export default function TermsAndConditions() {
    
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
        <h1 className="text-4xl font-bold md:text-5xl">Terms and Conditions</h1>
        <p className="mt-4 text-lg text-white/90">
          Please read these terms carefully before using LinkLum
        </p>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Card className="space-y-8 p-8">
          <CardContent className="space-y-6">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing or using LinkLum, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. User Eligibility</h2>
              <p className="text-gray-600">
                To use LinkLum, you must:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Be a verified alumnus or student of the institution</li>
                {/* <li>Be at least 18 years of age</li> */}
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. User Conduct</h2>
              <p className="text-gray-600">
                Users of LinkLum agree not to:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Share false or misleading information</li>
                <li>Harass or harm other users</li>
                <li>Violate intellectual property rights</li>
                <li>Use the platform for unauthorized commercial purposes</li>
                <li>Attempt to circumvent platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. Content Guidelines</h2>
              <p className="text-gray-600">
                All content posted on LinkLum must:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Be accurate and professional</li>
                <li>Respect others&apos; privacy and rights</li>
                <li>Comply with applicable laws and regulations</li>
                <li>Not contain harmful or malicious material</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Intellectual Property</h2>
              <p className="text-gray-600">
                The LinkLum platform, including its logo, design, and content, is protected by intellectual property rights. Users retain ownership of their content but grant LinkLum a license to use, display, and distribute it on the platform.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. Termination</h2>
              <p className="text-gray-600">
                LinkLum reserves the right to suspend or terminate accounts that violate these terms or engage in inappropriate behavior. Users may also terminate their accounts at any time.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">7. Disclaimer</h2>
              <p className="text-gray-600">
                LinkLum is provided &quot;as is&quot; without warranties of any kind. We are not responsible for user-generated content or any damages resulting from platform use.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">8. Changes to Terms</h2>
              <p className="text-gray-600">
                We may modify these terms at any time. Continued use of LinkLum after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">9. Contact</h2>
              <p className="text-gray-600">
                For questions about these terms, please contact us at:
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

