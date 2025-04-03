import { fetchApi } from "./api"
import type { Service } from "./services"

export interface Booking {
  id: number
  serviceId: number
  clientId: number
  bookingDate: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
  updatedAt: string
  service?: Service
  clientName?: string
}

export interface CreateBookingData {
  serviceId: number
  bookingDate: string
  user: number
}

// Get all bookings
export async function getBookings(): Promise<Booking[]> {
  return fetchApi<Booking[]>("/bookings")
}

// Create a new booking
export async function createBooking(data: CreateBookingData): Promise<Booking> {
  return fetchApi<Booking>("/bookings", {
    method: "POST",
    body: data,
  })
}

// Cancel a booking
export async function cancelBooking(id: number): Promise<Booking> {
  return fetchApi<Booking>(`/bookings/${id}/cancel`, {
    method: "PUT",
  })
}

