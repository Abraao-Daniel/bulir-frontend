"use client";

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useBookingsStore } from "@/store/bookings-store"
import { useServicesStore } from "@/store/services-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {  getUserInfo } from "@/lib/auth"

export default function BookingForm() {
  const [serviceId, setServiceId] = useState<string>("")
  const [bookingDate, setBookingDate] = useState<string>("")
  const [bookingTime, setBookingTime] = useState<string>("10:00")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { services, fetchServices } = useServicesStore()
  const { addBooking } = useBookingsStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const user = getUserInfo()
  // Get serviceId from query params if available
  useEffect(() => {
    const id = searchParams.get("serviceId")
    if (id) {
      setServiceId(id)
    }

    // Set default booking date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setBookingDate(tomorrow.toISOString().split("T")[0])

    fetchServices()
  }, [searchParams, fetchServices])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Combine date and time
      const dateTime = new Date(`${bookingDate}T${bookingTime}`)

      await addBooking({
        serviceId: Number.parseInt(serviceId),
        bookingDate: dateTime.toISOString(),
        user:  Number(user?.id)

      })

      toast({
        title: "Booking created",
        description: "Your booking has been successfully created.",
      })

      router.push("/dashboard/bookings")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Select value={serviceId} onValueChange={setServiceId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    {service.name} - ${service.price.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Book Service"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

