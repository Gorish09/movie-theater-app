"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Booking } from "@/lib/data"

interface BookingCardProps {
  booking: Booking
  onCancelBooking?: (id: string) => void
}

export default function BookingCard({ booking, onCancelBooking }: BookingCardProps) {
  const statusColor = {
    upcoming: "bg-blue-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-40 w-full sm:h-auto sm:w-1/3">
          <Image src={booking.poster || "/placeholder.svg"} alt={booking.movieTitle} fill className="object-cover" />
        </div>
        <CardContent className="flex-1 p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">{booking.movieTitle}</h3>
            <Badge className={`${statusColor[booking.status]} text-white hover:${statusColor[booking.status]}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
          <div className="mb-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>
                {new Date(booking.date).toLocaleDateString()} at {booking.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{booking.theater}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>Seats: {booking.seats.join(", ")}</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="font-medium">Booking ID:</span> {booking.id}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex flex-wrap justify-between gap-2 border-t bg-muted/50 p-4">
        <Button variant="outline" asChild>
          <Link href={`/movies/${booking.movieId}`}>View Movie</Link>
        </Button>
        {booking.status === "upcoming" && (
          <Button variant="destructive" onClick={() => onCancelBooking && onCancelBooking(booking.id)}>
            Cancel Booking
          </Button>
        )}
        {booking.status === "completed" && <Button variant="outline">Write Review</Button>}
      </CardFooter>
    </Card>
  )
}
