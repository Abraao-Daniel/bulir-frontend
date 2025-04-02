import { redirect } from "next/navigation"
import { getAuthToken } from "@/lib/auth"
import LoginForm from "@/components/auth/login-form"

export default function Home() {
  // If user is already logged in, redirect to dashboard
  const token = getAuthToken()
  if (token) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Service Booking Platform</h1>
        <LoginForm />
      </div>
    </main>
  )
}

