"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useServicesStore } from "@/store/services-store"
import type { Service } from "@/lib/services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface ServiceFormProps {
  service?: Service
}

export default function ServiceForm({ service }: ServiceFormProps) {
  const [name, setName] = useState(service?.name || "")
  const [description, setDescription] = useState(service?.description || "")
  const [price, setPrice] = useState(service?.price.toString() || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { addService, updateService } = useServicesStore()
  const router = useRouter()
  const { toast } = useToast()

  const isEditing = !!service

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const serviceData = {
        name,
        description,
        price: Number.parseFloat(price),
      }

      if (isEditing && service) {
        await updateService(service.id, serviceData)
        toast({
          title: "Service updated",
          description: "The service has been successfully updated.",
        })
      } else {
        await addService(serviceData)
        toast({
          title: "Service created",
          description: "The service has been successfully created.",
        })
      }

      router.push("/dashboard/services")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the service. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Haircut, House Cleaning"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe your service..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="0.00"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Service" : "Create Service"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

