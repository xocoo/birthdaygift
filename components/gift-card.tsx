"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Gift, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { reserveGift } from "@/lib/gift-actions"

interface GiftProps {
  gift: {
    id: string
    name: string
    description: string
    imageUrl: string
    productUrl: string
    reserved: boolean
    reservedBy?: string
  }
}

export default function GiftCard({ gift }: GiftProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isReserving, setIsReserving] = useState(false)
  const [isReserved, setIsReserved] = useState(gift.reserved)
  const [reservedBy, setReservedBy] = useState(gift.reservedBy)

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsReserving(true)

    try {
      await reserveGift(gift.id, name, email)
      setIsReserved(true)
      setReservedBy(name)
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to reserve gift:", error)
    } finally {
      setIsReserving(false)
    }
  }

  return (
    <>
      <Card className={`overflow-hidden transition-all ${isReserved ? "opacity-70" : "hover:shadow-lg"}`}>
        <div className="relative h-48">
          <Image
            src={gift.imageUrl || "/placeholder.svg?height=200&width=400"}
            alt={gift.name}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              ;(e.target as HTMLImageElement).src =
                "/placeholder.svg?height=200&width=400&text=" + encodeURIComponent(gift.name)
            }}
          />
          {isReserved && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-full p-3">
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold">{gift.name}</h3>
            <a
              href={gift.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-500 hover:text-blue-700 flex items-center"
            >
              View <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
          <p className="text-gray-600 text-sm mb-4">{gift.description}</p>

          {isReserved ? (
            <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-600">Reserved by {reservedBy}</div>
          ) : (
            <Button onClick={() => setIsOpen(true)} className="w-full bg-purple-500 hover:bg-purple-600">
              <Gift className="w-4 h-4 mr-2" />
              Reserve This Gift
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reserve Gift</DialogTitle>
            <DialogDescription>
              You're reserving: <span className="font-medium">{gift.name}</span>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleReserve}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isReserving}>
                {isReserving ? "Reserving..." : "Confirm Reservation"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
