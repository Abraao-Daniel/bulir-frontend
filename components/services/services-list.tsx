"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useServicesStore } from "@/store/services-store"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Calendar, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ServicesList() {
  const { services, isLoading, error, fetchServices, removeService } = useServicesStore()
  const { user } = useAuthStore()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await removeService(id)
        toast({
          title: "Service deleted",
          description: "The service has been successfully deleted.",
        })
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to delete the service.",
          variant: "destructive",
        })
      }
    }
  }

  const handleBookService = (serviceId: number) => {
    router.push(`/dashboard/bookings/create?serviceId=${serviceId}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => fetchServices()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (services.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No services found.</p>
        {user?.userType === "provider" && (
          <Button asChild className="mt-4">
            <Link href="/dashboard/services/create">Create Your First Service</Link>
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.id}>
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{service.providerName || "Unknown Provider"}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{service.description}</p>
            <p className="text-xl font-bold mt-4">${service.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            {user?.userType === "provider" && service.providerId === user.id ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/services/${service.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </>
            ) : user?.userType === "client" ? (
              <Button className="w-full" size="sm" onClick={() => handleBookService(service.id)}>
                <Calendar className="w-4 h-4 mr-2" />
                Book Service
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Service details</p>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

