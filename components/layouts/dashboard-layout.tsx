"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"
import { Home, Package, Calendar, User, LogOut, Menu, X } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const { user, logout } = useAuthStore()
  const { logout } = useAuthStore()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  
  const user = {
    fullName: "Edson Builir",
    nif: "dsdsdsdfdgsf",
    email: "edson@exemplo.com",
    password: "1234ssda56",
    userType: "provider",
    id:9
  }

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      label: "Services",
      href: "/dashboard/services",
      icon: Package,
    },
    {
      label: "Bookings",
      href: "/dashboard/bookings",
      icon: Calendar,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Service Booking</h2>
            <p className="text-sm text-gray-500">{user?.fullName}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.userType}</p>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-2 rounded-md transition-colors
                      ${pathname === item.href ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}
                    `}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => logout()}
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

