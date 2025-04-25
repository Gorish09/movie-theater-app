import BookingForm from "@/components/booking-form"

export default function BookingPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Book Tickets</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BookingForm />
        </div>
        <div>
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">Booking Information</h2>
            <div className="space-y-4 text-sm">
              <p>
                <span className="font-medium">Cancellation Policy:</span> Free cancellation up to 4 hours before
                showtime. After that, a 50% cancellation fee applies.
              </p>
              <p>
                <span className="font-medium">Seating:</span> Seats are allocated on a first-come, first-served basis.
                You can select your preferred seats during booking.
              </p>
              <p>
                <span className="font-medium">Payment:</span> We accept all major credit cards, debit cards, and digital
                wallets.
              </p>
              <p>
                <span className="font-medium">Ticket Collection:</span> You can collect your tickets at the theater
                using the booking reference or QR code sent to your email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
