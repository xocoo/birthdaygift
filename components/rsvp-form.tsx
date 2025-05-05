"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitRsvp } from "@/lib/gift-actions"

export default function RsvpForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [guests, setGuests] = useState(1)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("guests", guests.toString())
      formData.append("message", message)

      await submitRsvp(formData)
      setSubmitted(true)

      // Reset form
      setName("")
      setEmail("")
      setGuests(1)
      setMessage("")
    } catch (error) {
      console.error("Failed to submit RSVP:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p>Your RSVP has been submitted successfully.</p>
        </div>
        <Button onClick={() => setSubmitted(false)} className="mt-4">
          Submit Another RSVP
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="guests">Number of Guests (including yourself)</Label>
        <Input
          id="guests"
          type="number"
          min="1"
          max="10"
          value={guests}
          onChange={(e) => setGuests(Number.parseInt(e.target.value, 10) || 1)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Any special notes or dietary requirements?"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isSubmitting}>
        <Mail className="w-4 h-4 mr-2" />
        {isSubmitting ? "Submitting..." : "Submit RSVP"}
      </Button>
    </form>
  )
}
