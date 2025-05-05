"use server"

import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// In a real app, you would use a database
// For this example, we'll use a simple in-memory store with JSON
let gifts = [
  {
    id: "1",
    name: "Nintendo Switch 2",
    description: "A fun building set for creative play",
    imageUrl:
      "https://gk7rbqg3puv9z4b0.public.blob.vercel-storage.com/Screenshot%20from%202025-04-30%2016-58-34-d2RBs4skUL2MHQYGEr7RCC27nzrpZh.png?height=200&width=400&text=Nintendo+Switch",
    productUrl: "https://www.nintendo.com/us/gaming-systems/switch-2/",
    reserved: false,
  },
  {
    id: "2",
    name: "Wooden Climbing Arch with Comfy Pad",
    description: "Complete kit with paints, markers, and more",
    imageUrl:
      "https://gk7rbqg3puv9z4b0.public.blob.vercel-storage.com/Screenshot%20from%202025-04-30%2017-01-30-0libbtmPY5XdI88XYXYNSnV6wt0ihg.png?height=200&width=400&text=Art+Kit",
    productUrl:
      "https://www.etsy.com/listing/1439478303/extra-large-size-wooden-climbing-arch?ls=a&ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=toddler+wooden+games&ref=sc_gallery-1-6&pro=1&frs=1&sts=1&search_preloaded_img=1&plkey=8ce579bf9563b821068526558b5e8ad5e4350bd1%3A1439478303",
    reserved: false,
  },
  {
    id: "3",
    name: "$100 Amazon Gift Card",
    description: "Gift card for online shopping",
    imageUrl:
      "https://gk7rbqg3puv9z4b0.public.blob.vercel-storage.com/istockphoto-1404476556-612x612-0Pki99VLpPLsjBJiw3lpNnCAJdSk4R.jpg?height=200&width=400&text=Teddy",
    productUrl: "https://www.amazon.com/Amazon-Gift-Card-packaging-Birthday/dp/B01FIS88SY/",
    reserved: false,
  },
  {
    id: "4",
    name: "Gaming Monitor",
    description: "Collection of 5 popular storybooks",
    imageUrl:
      "https://gk7rbqg3puv9z4b0.public.blob.vercel-storage.com/poEEdm6vwRqjyQaHdzExQb-Nj6PKhLuJAa8UYk1ioezJEZnMOMqNB.png?height=200&width=400&text=Books",
    productUrl:
      "https://www.dell.com/en-us/shop/dell-ultrasharp-40-curved-wuhd-monitor-u4021qw/apd/210-becu/monitors-monitor-accessories",
    reserved: false,
  },
  {
    id: "5",
    name: "Remote Control Car",
    description: "Fun RC car with easy controls",
    imageUrl:
      "https://gk7rbqg3puv9z4b0.public.blob.vercel-storage.com/360_F_204392942_tWRRULqk9FkWkhAFoVVCBsvYVdSP66Pq-aSSnLhjGAp7ChfECWwhYs9AzfmK122.jpg?height=200&width=400&text=RC+Car",
    productUrl: "https://www.amazon.com/gp/product/B0DDCT4L6Y/ref=ox_sc_saved_image_1?smid=A2PK9P4BMLQG06&psc=1",
    reserved: false,
  },
  {
    id: "6",
    name: "Magnetic Drawing Board",
    description: "Family-friendly board game",
    imageUrl:
      "https://gk7rbqg3puv9z4b0.public.blob.vercel-storage.com/Magnetic-Drawing-Board-Toddler-Toys-2-3-4-Year-Old-Girls-Doodle-Board-Gift-2-3-4-Year-Old-Girl-Preschool-Learning-Educational-Girls-Toys-Age-2-3-4-Bi_5066b51d-e158-4d24-a5c5-452893274c96.ac9bde726cabae41040caf050384ae7b-5XU4nemazMa2HyTF4vh6cOnGQGW7cu.webp?height=200&width=400&text=Board+Game",
    productUrl: "https://www.amazon.com/dp/B00000DMF5/",
    reserved: false,
  },
]

// RSVP data store
export type RsvpStatus = "pending" | "confirmed" | "declined"

export interface Rsvp {
  id: string
  name: string
  email: string
  guests: number
  message: string
  status: RsvpStatus
  createdAt: string
}

// Sample RSVP data
let rsvps: Rsvp[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    guests: 2,
    message: "Looking forward to the party!",
    status: "confirmed",
    createdAt: "2025-04-28T14:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    guests: 3,
    message: "We are excited to celebrate with you!",
    status: "confirmed",
    createdAt: "2025-04-29T10:15:00Z",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    guests: 1,
    message: "Thanks for the invitation!",
    status: "pending",
    createdAt: "2025-04-30T09:45:00Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    guests: 2,
    message: "Can't wait to see you all!",
    status: "pending",
    createdAt: "2025-04-30T16:20:00Z",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@example.com",
    guests: 4,
    message: "We will bring some extra snacks.",
    status: "declined",
    createdAt: "2025-04-27T11:10:00Z",
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
  const productUrl = formData.get("productUrl") as string
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
    productUrl,
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

// RSVP functions
export async function getRsvps() {
  // In a real app, you would fetch from a database
  return rsvps
}

export async function submitRsvp(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const guestsStr = formData.get("guests") as string
  const guests = Number.parseInt(guestsStr, 10) || 1
  const message = formData.get("message") as string

  const newRsvp: Rsvp = {
    id: Date.now().toString(),
    name,
    email,
    guests,
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  rsvps.push(newRsvp)

  revalidatePath("/admin/rsvps")
  return { success: true }
}

export async function updateRsvpStatus(id: string, status: RsvpStatus) {
  rsvps = rsvps.map((rsvp) => {
    if (rsvp.id === id) {
      return { ...rsvp, status }
    }
    return rsvp
  })

  revalidatePath("/admin/rsvps")
  return { success: true }
}

export async function deleteRsvp(id: string) {
  rsvps = rsvps.filter((rsvp) => rsvp.id !== id)

  revalidatePath("/admin/rsvps")
  return { success: true }
}
