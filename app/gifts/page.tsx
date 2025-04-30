import { Suspense } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import GiftList from "@/components/gift-list"

export default function GiftsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">Birthday Gift Registry</h1>
            <p className="text-gray-600">Choose a gift to bring! Once reserved, others will see it's been claimed.</p>
          </div>

          <Suspense fallback={<div className="text-center py-12">Loading gifts...</div>}>
            <GiftList />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
