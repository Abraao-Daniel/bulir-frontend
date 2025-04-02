import { fetchApi } from "./api"

export interface Service {
  id: number
  name: string
  description: string
  price: number
  providerId: number
  providerName?: string
  createdAt: string
  updatedAt: string
}

export interface CreateServiceData {
  name: string
  description: string
  price: number
}

// Get all services
export async function getServices(): Promise<Service[]> {
  return fetchApi<Service[]>("/services")
}

// Get service by ID
export async function getServiceById(id: number): Promise<Service> {
  return fetchApi<Service>(`/services/${id}`)
}

// Create a new service
export async function createService(data: CreateServiceData): Promise<Service> {
  return fetchApi<Service>("/services", {
    method: "POST",
    body: data,
  })
}

// Update a service
export async function updateService(id: number, data: CreateServiceData): Promise<Service> {
  return fetchApi<Service>(`/services/${id}`, {
    method: "PUT",
    body: data,
  })
}

// Delete a service
export async function deleteService(id: number): Promise<void> {
  return fetchApi<void>(`/services/${id}`, {
    method: "DELETE",
  })
}

