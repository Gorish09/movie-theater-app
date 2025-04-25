"use client"

import { useState } from "react"
import { useAppContext } from "@/lib/context/app-context"
import BookingCard from "@/components/booking-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

export default function MyBookingsPage() {
  const { bookings, deleteBooking, updateBooking } = useAppContext()
  const { toast } = useToast()
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null)

  const upcomingBookings = bookings.filter((booking) => booking.status === "upcoming")
  const pastBookings = bookings.filter((booking) => booking.status === "completed" || booking.status === "cancelled")

  const handleCancelBooking = (id: string) => {
    setCancelBookingId(id)
  }

  const confirmCancelBooking = () => {
    if (cancelBookingId) {
      updateBooking(cancelBookingId, { status: "cancelled" })
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      })
      setCancelBookingId(null)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">My Bookings</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} onCancelBooking={handleCancelBooking} />
            ))
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <h3 className="mb-2 text-lg font-semibold">No Upcoming Bookings</h3>
              <p className="text-muted-foreground">
                You don't have any upcoming bookings. Browse movies and book your tickets now!
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length > 0 ? (
            pastBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <h3 className="mb-2 text-lg font-semibold">No Past Bookings</h3>
              <p className="text-muted-foreground">You don't have any past bookings.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AlertDialog open={!!cancelBookingId} onOpenChange={(open) => !open && setCancelBookingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Booking</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancelBooking}>Yes, Cancel Booking</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
