import { Suspense } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import AddGiftForm from "@/components/add-gift-form"

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-blue-700 hover:text-blue-900 mb-6">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">Add New Gift</h1>
            <p className="text-gray-600">Add gifts to the registry for your child's birthday</p>
          </div>

          <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
            <AddGiftForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
