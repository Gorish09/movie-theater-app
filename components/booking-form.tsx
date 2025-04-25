"use client"

import { useState } from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { theaters, showtimes } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppContext } from "@/lib/context/app-context"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export default function BookingForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { addBooking, movies } = useAppContext()
  const [movie, setMovie] = useState("")
  const [theater, setTheater] = useState("")
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [seats, setSeats] = useState<string[]>([])
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSeatToggle = (seat: string) => {
    if (seats.includes(seat)) {
      setSeats(seats.filter((s) => s !== seat))
    } else {
      if (seats.length < 8) {
        setSeats([...seats, seat])
      }
    }
  }

  const totalAmount = seats.length * 15

  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    // Randomly make some seats "unavailable"
    const unavailableSeats = ["A3", "A4", "B5", "C2", "C3", "D7", "D8", "E1", "F10", "G11", "H6"]

    return (
      <div className="mt-4">
        <div className="mb-6 flex justify-center">
          <div className="w-3/4 rounded-lg bg-gray-300 py-2 text-center text-sm dark:bg-gray-700">Screen</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {rows.map((row) => (
            <div key={row} className="flex gap-1">
              <div className="flex w-6 items-center justify-center text-sm font-medium">{row}</div>
              {cols.map((col) => {
                const seat = `${row}${col}`
                const isUnavailable = unavailableSeats.includes(seat)
                const isSelected = seats.includes(seat)
                return (
                  <button
                    key={seat}
                    disabled={isUnavailable}
                    onClick={() => handleSeatToggle(seat)}
                    className={cn(
                      "h-6 w-6 rounded text-xs transition-colors",
                      isUnavailable
                        ? "cursor-not-allowed bg-gray-300 dark:bg-gray-700"
                        : isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
                    )}
                  >
                    {col}
                  </button>
                )
              })}
              <div className="flex w-6 items-center justify-center text-sm font-medium">{row}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-100 dark:bg-gray-800"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-primary"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-300 dark:bg-gray-700"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = () => {
    if (step < 3) {
      setStep(step + 1)
      return
    }

    setIsSubmitting(true)

    // Get the selected movie details
    const selectedMovie = movies.find((m) => m.id === movie)
    if (!selectedMovie) return

    // Create the booking
    const booking = {
      movieId: movie,
      movieTitle: selectedMovie.title,
      poster: selectedMovie.poster,
      theater,
      date: date ? format(date, "yyyy-MM-dd") : "",
      time,
      seats,
      totalAmount: totalAmount + 2, // Adding booking fee
    }

    // Add the booking to our context
    addBooking(booking)

    // Show success message
    toast({
      title: "Booking Successful!",
      description: "Your tickets have been booked successfully.",
      action: (
        <ToastAction altText="View Bookings" onClick={() => router.push("/bookings/my-bookings")}>
          View Bookings
        </ToastAction>
      ),
    })

    // Reset form and redirect
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/bookings/my-bookings")
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Book Your Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Movie</label>
              <Select value={movie} onValueChange={setMovie}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a movie" />
                </SelectTrigger>
                <SelectContent>
                  {movies.map((movie) => (
                    <SelectItem key={movie.id} value={movie.id}>
                      {movie.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Theater</label>
              <Select value={theater} onValueChange={setTheater}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a theater" />
                </SelectTrigger>
                <SelectContent>
                  {theaters.map((theater) => (
                    <SelectItem key={theater} value={theater}>
                      {theater}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Time</label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time">
                    {time ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </div>
                    ) : (
                      "Select a time"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {showtimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-4 space-y-2">
              <h3 className="text-sm font-medium">Select Seats</h3>
              <p className="text-xs text-muted-foreground">Select up to 8 seats. Each seat costs $15.</p>
            </div>
            {renderSeats()}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Booking Summary</h3>
            <div className="rounded-lg border p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Movie:</span>
                  <span className="text-sm font-medium">{movies.find((m) => m.id === movie)?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Theater:</span>
                  <span className="text-sm font-medium">{theater}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="text-sm font-medium">{date ? format(date, "PPP") : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time:</span>
                  <span className="text-sm font-medium">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Seats:</span>
                  <span className="text-sm font-medium">{seats.sort().join(", ")}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tickets ({seats.length} × $15):</span>
                  <span className="text-sm font-medium">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Booking Fee:</span>
                  <span className="text-sm font-medium">$2.00</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">${(totalAmount + 2).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={(step === 1 && (!movie || !theater || !date || !time)) || (step === 2 && seats.length === 0)}
            className="ml-auto"
          >
            Continue
          </Button>
        ) : (
          <Button className="ml-auto" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Proceed to Pay"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
