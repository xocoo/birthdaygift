import Link from "next/link"
import { Gift, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import BirthdayCountdown from "@/components/birthday-countdown"
import PartyDetails from "@/components/party-details"
import ConfettiBackground from "@/components/confetti-background"

export default function HomePage() {
  // You can customize these details
  const childName = "Enerlen"
  const age = "first"
  const date = "June 10, 2025"
  const time = "3:00 PM - 12:00 AM"
  const location = "954 Wilshire Ct, Vernon Hills, IL, 60061"

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100">
      <ConfettiBackground />

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-pink-500 mb-2">
            {childName}&apos;s {age} Birthday!
          </h1>
          <p className="text-xl text-blue-600 font-medium">Join us for a day full of fun and celebration!</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-200 rounded-full opacity-50" />
          <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-blue-200 rounded-full opacity-50" />

          <div className="relative">
            <BirthdayCountdown targetDate={date} />

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <img
                  src="https://gk7rbqg3puv9z4b0.public.blob.vercel-storage.com/Screenshot%20from%202025-04-30%2016-28-35-FP31kS42JbgvJZE3DDXvetIN7ukoHR.png?height=300&width=400"
                  alt="Birthday Party"
                  className="w-full h-64 object-cover rounded-2xl shadow-md"
                />
              </div>

              <PartyDetails date={date} time={time} location={location} />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/gifts" className="block">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all h-full">
              <div className="flex items-center mb-4">
                <Gift className="w-8 h-8 text-purple-500 mr-3" />
                <h2 className="text-2xl font-bold text-purple-700">Gift Registry</h2>
              </div>
              <p className="text-purple-800">
                See what {childName} would love for their birthday! Reserve a gift to avoid duplicates.
              </p>
              <Button className="mt-4 bg-purple-500 hover:bg-purple-600">View Gifts</Button>
            </div>
          </Link>

          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-6 shadow-md h-full">
            <div className="flex items-center mb-4">
              <Mail className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-green-700">RSVP</h2>
            </div>
            <p className="text-green-800">Let us know if you can make it to {childName}&apos;s special day!</p>
            <Button className="mt-4 bg-green-500 hover:bg-green-600">RSVP Now</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
