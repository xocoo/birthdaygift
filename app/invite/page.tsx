import { Suspense } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import InvitationForm from "@/components/invitation-form"

export default function InvitePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-900 mb-6">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">Send Invitations</h1>
            <p className="text-gray-600">Invite friends and family to the birthday party!</p>
          </div>

          <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
            <InvitationForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
