"use client";
import { redirect } from "next/navigation"
// import { getAuthToken, getUserInfo } from "@/lib/auth"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import ClientDashboard from "@/components/dashboard/client-dashboard"
import ProviderDashboard from "@/components/dashboard/provider-dashboard"
import { getUserInfo, User } from "@/lib/auth"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  // Check if user is authenticated
  // const token = getAuthToken()
  // if (!token) {
  //   redirect("/")
  // }

  //  Get user info
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUserInfo();
    if (userData) {
      setUser(userData);
    }
  }, []);

 
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

     {user?.userType === "client" ?
     <ClientDashboard /> 
      :  
       <ProviderDashboard  
       />  
       } 
      </div>
    </DashboardLayout>
  )
}

