'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function VerificationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    // For now, we'll just set the submitted state to true
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 2000)
    
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-12">
        <div className="container mx-auto px-4">
          <Alert className="mx-auto max-w-2xl bg-green-100 text-green-800">
            <AlertTitle className="text-xl font-semibold">Verification Submitted</AlertTitle>
            <AlertDescription className="mt-2">
              The LinkLum team has received your verification request and is currently processing it. We&apos;ll notify you once the verification is complete.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-12">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Alumni Verification</CardTitle>
            <CardDescription>
              Provide any document that proves your alumni status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* <div className="space-y-2">
                <Label htmlFor="college">College/University</Label>
                <Input id="college" placeholder="Enter your college name" required />
              </div> */}

              <div className="space-y-2">
                <Label>Verification Document</Label>
                <Card className="p-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Upload className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium">Upload Proof of Alumni Status</p>
                      <p className="text-xs text-gray-500">
                        Degree, transcript, alumni ID, or any official document (PDF or image, max 5MB)
                      </p>
                    </div>
                    <Input id="verificationDoc" type="file" className="max-w-xs" accept=".pdf,.jpg,.jpeg,.png" required />
                  </div>
                </Card>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentType">Type of Document</Label>
                <Select>
                  <SelectTrigger id="documentType">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="degree">Degree Certificate</SelectItem>
                    <SelectItem value="transcript">Transcript</SelectItem>
                    <SelectItem value="alumniId">Alumni ID Card</SelectItem>
                    <SelectItem value="officialLetter">Official Letter</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Provide any additional details about your document or alumni status"
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-600/80">
                {isSubmitting ? ("Submitting...") : ("Submit for Verification")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

