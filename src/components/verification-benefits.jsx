import { Check } from 'lucide-react'

const benefits = [
  "Message anyone in the LinkLum network",
  "Post updates and articles",
  "Apply for exclusive jobs and internships",
  "Access to alumni network",
  "Participate in campus-specific events",
  "Showcase verified academic credentials"
]

export default function VerificationBenefits() {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold mb-4 text-blue-800">Benefits of Verification</h3>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center text-blue-700">
            <Check className="h-5 w-5 mr-2 text-green-500" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

