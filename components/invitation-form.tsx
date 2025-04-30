"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sendInvitation } from "@/lib/gift-actions"

export default function InvitationForm() {
  const [emails, setEmails] = useState<string[]>([])
  const [currentEmail, setCurrentEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  const addEmail = () => {
    if (currentEmail && !emails.includes(currentEmail)) {
      setEmails([...emails, currentEmail])
      setCurrentEmail("")
    }
  }

  const removeEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (emails.length === 0) return

    setIsSending(true)

    try {
      // Send invitations to each email
      for (const email of emails) {
        await sendInvitation(new FormData(e.target as HTMLFormElement))
      }

      setSent(true)
      setEmails([])
      setMessage("")
    } catch (error) {
      console.error("Failed to send invitations:", error)
    } finally {
      setIsSending(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold mb-2">Invitations Sent!</h3>
          <p>Your invitations have been sent successfully.</p>
        </div>
        <Button onClick={() => setSent(false)} className="mt-4">
          Send More Invitations
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Invite by Email</Label>
        <div className="flex gap-2">
          <Input
            id="email"
            type="email"
            placeholder="friend@example.com"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
          />
          <Button type="button" onClick={addEmail} disabled={!currentEmail}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {emails.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-700 mb-2">Recipients:</h3>
          <div className="flex flex-wrap gap-2">
            {emails.map((email) => (
              <div key={email} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                <span className="mr-1">{email}</span>
                <button type="button" onClick={() => removeEmail(email)} className="text-blue-600 hover:text-blue-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Personalized Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="We'd love for you to join us for the celebration!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600"
        disabled={emails.length === 0 || isSending}
      >
        <Mail className="w-4 h-4 mr-2" />
        {isSending ? "Sending..." : "Send Invitations"}
      </Button>
    </form>
  )
}
