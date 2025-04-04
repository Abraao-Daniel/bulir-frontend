import { create } from "zustand"
import { type Booking, getBookings, createBooking, cancelBooking } from "@/lib/bookings"

interface BookingsState {
  bookings: Booking[]
  isLoading: boolean
  error: string | null
  fetchBookings: () => Promise<void>
  addBooking: (data: { serviceId: number; bookingDate: string; user: number }) => Promise<void>
  cancelBooking: (id: number) => Promise<void>
}

export const useBookingsStore = create<BookingsState>((set, get) => ({
  bookings: [],
  isLoading: false,
  error: null,

  fetchBookings: async () => {
    set({ isLoading: true, error: null })
    try {
      const bookings = await getBookings()
      set({ bookings, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch bookings",
        isLoading: false,
      })
    }
  },

  addBooking: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const newBooking = await createBooking(data)
      set({
        bookings: [...get().bookings, newBooking],
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create booking",
        isLoading: false,
      })
    }
  },

  cancelBooking: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const updatedBooking = await cancelBooking(id)
      set({
        bookings: get().bookings.map((booking) => (booking.id === id ? updatedBooking : booking)),
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to cancel booking",
        isLoading: false,
      })
    }
  },
}))

