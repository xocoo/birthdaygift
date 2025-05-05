import Link from "next/link"
import { ChevronLeft, Gift, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-blue-700 hover:text-blue-900 mb-6">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </Link>

        <div className="grid gap-6 mb-8">
          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Amazon Gift List</h2>
                <p className="text-gray-600">View or manage your Amazon gift list</p>
              </div>
            </div>
            <a
              href="https://www.amazon.com/registries/gl/guest-view/10RNSKXTUEKRV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full">
                Open Amazon Gift List
              </Button>
            </a>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">RSVP Management</h2>
                <p className="text-gray-600">View and manage guest RSVPs</p>
              </div>
            </div>
            <Link href="/admin/rsvps">
              <Button variant="outline" className="w-full">
                Manage RSVPs
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Site Settings</h2>
                <p className="text-gray-600">Configure website details</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">RSVP Management</h1>
            <p className="text-gray-600">Manage RSVPs for your child's birthday party</p>
          </div>

          <div className="text-center py-8">
            <p className="mb-4">Use the RSVP Management page to track and manage party guests.</p>
            <Link href="/admin/rsvps">
              <Button className="bg-blue-500 hover:bg-blue-600">Manage RSVPs</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
