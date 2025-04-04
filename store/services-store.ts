import { create } from "zustand"
import { type Service, getServices, createService, updateService, deleteService } from "@/lib/services"

interface ServicesState {
  services: Service[]
  isLoading: boolean
  error: string | null
  fetchServices: () => Promise<void>
  addService: (data: { name: string; description: string; price: number; user: number }) => Promise<void>
  updateService: (id: number, data: { name: string; description: string; price: number ; user: number }) => Promise<void>
  removeService: (id: number) => Promise<void>
}

export const useServicesStore = create<ServicesState>((set, get) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null })
    try {
      const services = await getServices()
      set({ services, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch services",
        isLoading: false,
      })
    }
  },

  addService: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const newService = await createService(data)
      set({
        services: [...get().services, newService],
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create service",
        isLoading: false,
      })
    }
  },

  updateService: async (id, data) => {
    set({ isLoading: true, error: null })
    try {
      const updatedService = await updateService(id,data)
      set({
        services: get().services.map((service) => (service.id === id ? updatedService : service)),
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update service",
        isLoading: false,
      })
    }
  },

  removeService: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await deleteService(id)
      set({
        services: get().services.filter((service) => service.id !== id),
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete service",
        isLoading: false,
      })
    }
  },
}))

