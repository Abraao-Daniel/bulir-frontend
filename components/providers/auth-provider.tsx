"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { isTokenExpired } from "@/lib/auth"

const publicRoutes = ["/", "/register"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, refreshUser, logout } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // // Check if token is expired
    // if (isTokenExpired()) {
    //   logout()
    //   if (!publicRoutes.includes(pathname)) {
    //     router.push("/")
    //   }
    //   return
    // }

    // // Refresh user data from token
    // if (!user) {
    //   refreshUser()
    // }
  }, [pathname, user, refreshUser, logout, router])

  return <>{children}</>
}

