'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function CollegeDetailsDialog({ college }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" onClick={() => setIsOpen(true)}>
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{college.name} Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Name:</span>
            <span className="col-span-3">{college.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Plan:</span>
            <span className="col-span-3">{college.plan}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Status:</span>
            <span className="col-span-3">
              <span className={`px-2 py-1 rounded-full text-xs ${college.isVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                {college.isVerified ? "Verified" : "Pending"}
              </span>
            </span>
          </div>
          {college.remainingTime && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Remaining Time:</span>
              <span className="col-span-3">{college.remainingTime}</span>
            </div>
          )}
          {college.revenue && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Revenue:</span>
              <span className="col-span-3">${college.revenue.toLocaleString()}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}