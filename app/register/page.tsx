import { redirect } from "next/navigation"
import { getAuthToken } from "@/lib/auth"
import RegisterForm from "@/components/auth/register-form"

export default function RegisterPage() {
  // If user is already logged in, redirect to dashboard
  // const token = getAuthToken()
  // if (token) {
  //   redirect("/dashboard")
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Cria uma contat</h1>
        <RegisterForm />
      </div>
    </main>
  )
}

