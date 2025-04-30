import { CalendarDays, Clock, MapPin } from "lucide-react"

interface PartyDetailsProps {
  date: string
  time: string
  location: string
}

export default function PartyDetails({ date, time, location }: PartyDetailsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Party Details</h2>

      <div className="flex items-start">
        <div className="bg-blue-100 p-2 rounded-full mr-4">
          <CalendarDays className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h3 className="font-semibold text-blue-700">Date</h3>
          <p>{date}</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="bg-blue-100 p-2 rounded-full mr-4">
          <Clock className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h3 className="font-semibold text-blue-700">Time</h3>
          <p>{time}</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="bg-blue-100 p-2 rounded-full mr-4">
          <MapPin className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h3 className="font-semibold text-blue-700">Location</h3>
          <p>{location}</p>
        </div>
      </div>
    </div>
  )
}
