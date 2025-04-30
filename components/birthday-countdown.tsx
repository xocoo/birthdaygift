"use client"

import { useState, useEffect } from "react"
import { Cake } from "lucide-react"

interface CountdownProps {
  targetDate: string
}

export default function BirthdayCountdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Create target date at the end of the day (23:59:59)
      const [monthDay, year] = targetDate.split(", ")
      const [month, day] = monthDay.split(" ")

      // Map month names to their numeric values (0-based)
      const monthMap: Record<string, number> = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      }

      // Create date with the end of the target day
      const targetDateTime = new Date(
        Number.parseInt(year),
        monthMap[month],
        Number.parseInt(day),
        23,
        59,
        59,
      ).getTime()

      // Get current time
      const now = new Date().getTime()

      // Calculate difference
      const difference = targetDateTime - now

      if (difference > 0) {
        // Calculate days, ensuring we count the full day
        const days = Math.ceil(difference / (1000 * 60 * 60 * 24))

        // For display purposes, calculate hours, minutes, seconds
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        })
      } else {
        // If the date has passed, set all values to 0
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const isCountdownOver =
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <div className="bg-pink-50 rounded-2xl p-6 shadow-inner">
      <div className="flex items-center justify-center mb-4">
        <Cake className="w-6 h-6 text-pink-500 mr-2" />
        <h2 className="text-xl font-bold text-pink-600">
          {isCountdownOver ? "It's Party Time!" : "Countdown to the Big Day!"}
        </h2>
      </div>

      {isCountdownOver ? (
        <div className="text-center py-4">
          <div className="text-2xl font-bold text-pink-500">The big day is here!</div>
          <div className="text-pink-700">Time to celebrate!</div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="text-3xl font-bold text-pink-500">{timeLeft.days}</div>
            <div className="text-xs text-pink-700">Days</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="text-3xl font-bold text-pink-500">{timeLeft.hours}</div>
            <div className="text-xs text-pink-700">Hours</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="text-3xl font-bold text-pink-500">{timeLeft.minutes}</div>
            <div className="text-xs text-pink-700">Minutes</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="text-3xl font-bold text-pink-500">{timeLeft.seconds}</div>
            <div className="text-xs text-pink-700">Seconds</div>
          </div>
        </div>
      )}
    </div>
  )
}
