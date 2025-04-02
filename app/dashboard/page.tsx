import { redirect } from "next/navigation"
import { getAuthToken, getUserInfo } from "@/lib/auth"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import ClientDashboard from "@/components/dashboard/client-dashboard"
import ProviderDashboard from "@/components/dashboard/provider-dashboard"

export default function DashboardPage() {
  // Check if user is authenticated
  const token = getAuthToken()
  if (!token) {
    redirect("/")
  }

  // Get user info
  const user = getUserInfo()

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {user?.userType === "client" ? <ClientDashboard /> : <ProviderDashboard />}
      </div>
    </DashboardLayout>
  )
}

