"use client"

import type React from "react"

import { useState } from "react"
import { Gift, Upload, X, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addGift } from "@/lib/gift-actions"

export default function AddGiftForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      await addGift(formData)
    } catch (error) {
      console.error("Failed to add gift:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Gift Name</Label>
        <Input id="name" name="name" placeholder="LEGO Set, Teddy Bear, etc." required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="A short description of the gift" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productUrl">Product Link</Label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            id="productUrl"
            name="productUrl"
            type="url"
            placeholder="https://www.amazon.com/product-link"
            className="pl-10"
            required
          />
        </div>
        <p className="text-xs text-gray-500">Add a link to where the gift can be purchased (e.g., Amazon)</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Gift Image</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          {imagePreview ? (
            <div className="relative w-full h-48 mx-auto">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Gift preview"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-4">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            </div>
          )}
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className={imagePreview ? "hidden" : "opacity-0 absolute inset-0 cursor-pointer"}
            onChange={handleImageChange}
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
        <Gift className="w-4 h-4 mr-2" />
        {isSubmitting ? "Adding Gift..." : "Add Gift to Registry"}
      </Button>
    </form>
  )
}
