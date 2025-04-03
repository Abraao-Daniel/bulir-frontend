import { redirect } from "next/navigation"
import { getAuthToken } from "@/lib/auth"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import BookingsList from "@/components/bookings/bookings-list"

export default function BookingsPage() {
  //  Check if user is authenticated
  //  const token = getAuthToken()
  // if (!token) {
  //   redirect("/")
  // }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Minhas reservas</h1>
        <BookingsList />
      </div>
    </DashboardLayout>
  )
}

