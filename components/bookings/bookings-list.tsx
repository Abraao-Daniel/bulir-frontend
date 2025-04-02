"use client"

import { useEffect } from "react"
import { useBookingsStore } from "@/store/bookings-store"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, X, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function BookingsList() {
  const { bookings, isLoading, error, fetchBookings, cancelBooking } = useBookingsStore()
  const { user } = useAuthStore()

  const { toast } = useToast()

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const handleCancel = async (id: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(id)
        toast({
          title: "Booking cancelled",
          description: "The booking has been successfully cancelled.",
        })
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to cancel the booking.",
          variant: "destructive",
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="py-12 text-center">
  //       <p className="text-red-500">{error}</p>
  //       <Button onClick={() => fetchBookings()} className="mt-4">
  //         Try Again
  //       </Button>
  //     </div>
  //   )
  // }

  if (bookings.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No bookings found.</p>
          <Button asChild className="mt-4">
            <a href="/dashboard/services">Book a Service</a>
          </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{booking.service?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{new Date(booking.bookingDate).toLocaleTimeString()}</span>
              </div>

              {/* {user?.userType === "provider" && ( */}
                <div className="text-sm">
                  <span className="text-muted-foreground">Client: </span>
                  <span>{booking.clientName}</span>
                </div>
              {/* )} */}

              <div className="flex items-center justify-between mt-2">
                <span
                  className={`px-2 py-1 text-sm rounded-full capitalize ${
                    booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status}
                </span>

                {booking.status === "pending" && (
                  <Button variant="destructive" size="sm" onClick={() => handleCancel(booking.id)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

