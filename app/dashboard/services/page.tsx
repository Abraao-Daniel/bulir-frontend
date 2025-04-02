import { redirect } from "next/navigation"
import { getAuthToken, getUserInfo } from "@/lib/auth"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import ServicesList from "@/components/services/services-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesPage() {
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services</h1>

          {user?.userType === "provider" && (
            <Link href="/dashboard/services/create">
              <Button>Create New Service</Button>
            </Link>
          )}
        </div>

        <ServicesList />
      </div>
    </DashboardLayout>
  )
}

