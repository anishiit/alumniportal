"use client"

import jwt from "jsonwebtoken"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar2 from "@/components/header/Navbar2"

export default function ProposalForm() {
  const [proposalTitle, setProposalTitle] = useState("")
  const [proposalDescription, setProposalDescription] = useState("")
  const [proposalFile, setProposalFile] = useState(null)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams();

  // Access query parameter
  const type = searchParams.get('type');

  const handleProposalSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the proposal data to your backend
    console.log({ type, proposalTitle, proposalDescription, proposalFile })
    toast({
      variant: "green",
      title: "Proposal Submitted!",
      description: "Your proposal has been received and will be reviewed shortly.",
    })
    router.push("/event") // Redirect to events page after submission
  }

  return (
    <div>
      <Navbar2 />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Submit a Proposal: {type}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProposalSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="file">Upload PDF</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setProposalFile(e.target.files[0])}

                />
              </div>
              <Button type="submit" className="w-full">Propose</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}