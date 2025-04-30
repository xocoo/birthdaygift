"use server"

import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// In a real app, you would use a database
// For this example, we'll use a simple in-memory store with JSON
let gifts = [
  {
    id: "1",
    name: "LEGO Building Set",
    description: "A fun building set for creative play",
    imageUrl: "/placeholder.svg?height=200&width=400&text=LEGO",
    price: "$24.99",
    reserved: false,
  },
  {
    id: "2",
    name: "Art Supplies Kit",
    description: "Complete kit with paints, markers, and more",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Art+Kit",
    price: "$19.99",
    reserved: false,
  },
  {
    id: "3",
    name: "Plush Teddy Bear",
    description: "Soft and cuddly teddy bear friend",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Teddy",
    price: "$14.99",
    reserved: false,
  },
  {
    id: "4",
    name: "Children's Books Set",
    description: "Collection of 5 popular storybooks",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Books",
    price: "$29.99",
    reserved: false,
  },
  {
    id: "5",
    name: "Remote Control Car",
    description: "Fun RC car with easy controls",
    imageUrl: "/placeholder.svg?height=200&width=400&text=RC+Car",
    price: "$34.99",
    reserved: false,
  },
  {
    id: "6",
    name: "Board Game",
    description: "Family-friendly board game for ages 5+",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Board+Game",
    price: "$21.99",
    reserved: false,
  },
]

export async function getGifts() {
  // In a real app, you would fetch from a database
  return gifts
}

export async function reserveGift(giftId: string, name: string, email: string) {
  // In a real app, you would update a database
  gifts = gifts.map((gift) => {
    if (gift.id === giftId) {
      return {
        ...gift,
        reserved: true,
        reservedBy: name,
        reserverEmail: email,
      }
    }
    return gift
  })

  // Send confirmation email (in a real app)
  // await sendConfirmationEmail(email, name, giftId)

  revalidatePath("/gifts")
  return { success: true }
}

export async function addGift(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = formData.get("price") as string
  const image = formData.get("image") as File

  // Upload image to Vercel Blob
  let imageUrl = "/placeholder.svg?height=200&width=400&text=Gift"

  if (image.size > 0) {
    const blob = await put(image.name, image, {
      access: "public",
      addRandomSuffix: true,
    })
    imageUrl = blob.url
  }

  // Add new gift
  const newGift = {
    id: Date.now().toString(),
    name,
    description,
    imageUrl,
    price: `$${price}`,
    reserved: false,
  }

  gifts.push(newGift)

  revalidatePath("/gifts")
  redirect("/gifts")
}

export async function sendInvitation(formData: FormData) {
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // In a real app, you would send an email here
  console.log(`Sending invitation to ${email} with message: ${message}`)

  // For demo purposes, we'll just wait a bit
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return { success: true }
}
