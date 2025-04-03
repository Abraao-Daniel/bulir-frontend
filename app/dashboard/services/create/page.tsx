// import { redirect } from "next/navigation"
// import { getAuthToken, getUserInfo } from "@/lib/auth"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import ServiceForm from "@/components/services/service-form"
import { getUserInfo } from "@/lib/auth"
import { redirect } from "next/navigation"

export default function CreateServicePage() {
  // Check if user is authenticated
  // const token = getAuthToken()
  // if (!token) {
  //   redirect("/")
  // }

  // Get user info
   const user = getUserInfo()

  //  Only providers can create services
  //  if (user?.userType !== "provider") {
  //    redirect("/dashboard")
  //  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Criar um novo serviço</h1>
        <ServiceForm />
      </div>
    </DashboardLayout>
  )
}

