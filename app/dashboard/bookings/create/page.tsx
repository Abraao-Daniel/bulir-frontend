import { redirect } from "next/navigation"
import { getAuthToken, getUserInfo } from "@/lib/auth"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import BookingForm from "@/components/bookings/booking-form"

export default function CreateBookingPage() {
  // Check if user is authenticated
  const token = getAuthToken()
  // if (!token) {
  //   redirect("/")
  // }

  // Get user info
  const user = getUserInfo()

  // Only clients can create bookings
  //  if (user?.userType !== "client") {
  //    redirect("/dashboard")
  //  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Reservar um serviço</h1>
        <BookingForm />
      </div>
    </DashboardLayout>
  )
}

