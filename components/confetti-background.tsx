"use client"

import { useEffect, useRef } from "react"

export default function ConfettiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const confettiColors = ["#f9c5d1", "#b8e0f9", "#f9f9b8", "#c5f9c5", "#e0b8f9"]
    const confettiPieces: ConfettiPiece[] = []

    interface ConfettiPiece {
      x: number
      y: number
      size: number
      color: string
      speed: number
      angle: number
      rotation: number
      rotationSpeed: number
    }

    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 5,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speed: Math.random() * 1 + 0.5,
        angle: Math.random() * 360,
        rotation: 0,
        rotationSpeed: Math.random() * 0.2 - 0.1,
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      confettiPieces.forEach((piece) => {
        ctx.save()
        ctx.translate(piece.x, piece.y)
        ctx.rotate(piece.rotation)

        ctx.fillStyle = piece.color
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size)

        ctx.restore()

        // Update position
        piece.y += piece.speed
        piece.rotation += piece.rotationSpeed

        // Reset if off screen
        if (piece.y > canvas.height) {
          piece.y = -piece.size
          piece.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}
