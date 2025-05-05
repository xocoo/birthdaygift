import { redirect } from "next/navigation"

export default function GiftsPage() {
  // Redirect to the Amazon gift list
  redirect("https://www.amazon.com/registries/gl/guest-view/10RNSKXTUEKRV")
}
