import { redirect } from "next/navigation"
import { getAuthToken, getUserInfo } from "@/lib/auth"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import ServiceForm from "@/components/services/service-form"
import { getServiceById } from "@/lib/services"

export default async function EditServicePage({ params }: { params: { id: string } }) {
  // Check if user is authenticated
  const token = getAuthToken()
  // if (!token) {
  //   redirect("/")
  // }

  // Get user info
  const user = getUserInfo()

  // Only providers can edit services
  // if (user?.userType !== "provider") {
  //   redirect("/dashboard")
  // }

  // Get service details
  const service = await getServiceById(Number.parseInt(params.id))

  // Check if service exists and belongs to the provider
  if (!service) {
    redirect("/dashboard/services")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Service</h1>
        <ServiceForm service={service} />
      </div>
    </DashboardLayout>
  )
}

