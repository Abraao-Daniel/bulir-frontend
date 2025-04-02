"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useServicesStore } from "@/store/services-store"
import { useBookingsStore } from "@/store/bookings-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Package, Plus } from "lucide-react"

export default function ProviderDashboard() {
  const { services, fetchServices } = useServicesStore()
  const { bookings, fetchBookings } = useBookingsStore()

  useEffect(() => {
    fetchServices()
    fetchBookings()
  }, [fetchServices, fetchBookings])

  const pendingBookings = bookings.filter((booking) => booking.status === "pending")

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">My Services</CardTitle>
          <Package className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{services.length}</div>
          <p className="text-xs text-muted-foreground">Services you offer</p>
          <div className="flex gap-2 mt-4">
            <Button asChild className="w-full" size="sm">
              <Link href="/dashboard/services">View Services</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/dashboard/services/create">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Bookings</CardTitle>
          <Calendar className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingBookings.length}</div>
          <p className="text-xs text-muted-foreground">Pending bookings for your services</p>
          <Button asChild className="w-full mt-4" size="sm">
            <Link href="/dashboard/bookings">View Bookings</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Recent bookings for your services</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{booking.service?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(booking.bookingDate).toLocaleDateString()} - {booking.clientName}
                    </p>
                  </div>
                  <div className="text-sm">
                    <span
                      className={`px-2 py-1 rounded-full capitalize ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No recent bookings</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

