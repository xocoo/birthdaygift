import { Suspense } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import RsvpManagement from "@/components/rsvp-management"

export default function RsvpManagementPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <Link href="/admin" className="inline-flex items-center text-blue-700 hover:text-blue-900">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Admin
          </Link>
          <Link href="/" className="text-blue-700 hover:text-blue-900">
            Return to Home
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">RSVP Management</h1>
            <p className="text-gray-600">View and manage all RSVPs for the birthday party</p>
          </div>

          <Suspense fallback={<div className="text-center py-12">Loading RSVPs...</div>}>
            <RsvpManagement />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
