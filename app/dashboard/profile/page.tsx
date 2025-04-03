"use client";

import { getUserInfo, User } from "@/lib/auth"
import { useEffect, useState } from "react"
import { User as  U, Mail, BadgeIcon as IdCard, Type, Calendar, UserCircle } from "lucide-react"
// import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/layouts/dashboard-layout"

export default function UserProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const userData = getUserInfo();
      if (userData) {
        setUser(userData);
      }
    }, []);
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null


  return (
     <DashboardLayout>
    <div className="flex flex-col items-stretch min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div
        className="flex-1 w-full"
      >
        <Card className="shadow-xl border-0 rounded-none h-full flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
              <div
                className="bg-white rounded-full p-3 shadow-lg"
              >
                <UserCircle className="h-20 w-20 md:h-24 md:w-24 text-blue-600" />
              </div>
              <div className="text-center md:text-left">
                <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {user?.userType || "Usuário Padrão"}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{user?.fullName || "Nome do Usuário"}</h2>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-1 flex flex-col">
            <div
              className="p-6 md:p-8 space-y-6 flex-1"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 min-w-[150px]">
                  <IdCard className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-700 text-lg">ID:</span>
                </div>
                <p className="text-gray-600 ml-9 sm:ml-0 text-lg">{user?.id || "ID não disponível"}</p>
              </div>

              <Separator className="bg-gray-200" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 min-w-[150px]">
                  <U className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-700 text-lg">Nome:</span>
                </div>
                <p className="text-gray-600 ml-9 sm:ml-0 text-lg">{user?.fullName || "Nome não disponível"}</p>
              </div>

              <Separator className="bg-gray-200" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 min-w-[150px]">
                  <Mail className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-700 text-lg">Email:</span>
                </div>
                <p className="text-gray-600 ml-9 sm:ml-0 text-lg">{user?.email || "Email não disponível"}</p>
              </div>

              <Separator className="bg-gray-200" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 min-w-[150px]">
                  <IdCard className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-700 text-lg">NIF:</span>
                </div>
                <p className="text-gray-600 ml-9 sm:ml-0 text-lg">{user?.nif || "NIF não disponível"}</p>
              </div>

              <Separator className="bg-gray-200" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 min-w-[150px]">
                  <Type className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-700 text-lg">Tipo:</span>
                </div>
                <p className="text-gray-600 ml-9 sm:ml-0 text-lg">{user?.userType || "Tipo não disponível"}</p>
              </div>

              <Separator className="bg-gray-200" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 min-w-[150px]">
                  <Calendar className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-700 text-lg">Membro desde:</span>
                </div>
                <p className="text-gray-600 ml-9 sm:ml-0 text-lg">{user?.createdAt instanceof Date ? user.createdAt.toLocaleDateString() : user?.createdAt || "data não disponível"}</p>
              </div>
            </div>

            <div
              className="bg-gray-50 p-6 md:p-8 mt-auto"
            >
              <div className="flex justify-center">
                <div
                  className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition-all duration-300 text-lg"
                >
                  Editar Perfil
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </DashboardLayout>
  )
}

