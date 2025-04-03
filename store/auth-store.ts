import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type User, setAuthToken, removeAuthToken, getUserInfo } from "@/lib/auth"
import { fetchApi } from "@/lib/api"

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  fullName: string
  nif: string
  email: string
  password: string
  userType: "client" | "provider"
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  refreshUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetchApi<{ token: string; user: string }>("/login", {
            method: "POST",
            body: data,
          })

          setAuthToken(response.token)
          localStorage?.setItem("user", JSON.stringify(response.user))
          const user = getUserInfo()
          set({ user, isLoading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            isLoading: false,
          })
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null })
        try {
          await fetchApi<{ message: string }>("/users", {
            method: "POST",
            body: data,
          })

          // Auto login after registration
          await useAuthStore.getState().login({
            email: data.email,
            password: data.password,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Registration failed",
            isLoading: false,
          })
        }
      },

      logout: () => {
        removeAuthToken()
        set({ user: null })
      },

      refreshUser: () => {
        const user = getUserInfo()
        set({ user })
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
)

