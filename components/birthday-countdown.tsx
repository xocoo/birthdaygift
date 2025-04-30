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
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-pink-50 rounded-2xl p-6 shadow-inner">
      <div className="flex items-center justify-center mb-4">
        <Cake className="w-6 h-6 text-pink-500 mr-2" />
        <h2 className="text-xl font-bold text-pink-600">Countdown to the Big Day!</h2>
      </div>

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
    </div>
  )
}
