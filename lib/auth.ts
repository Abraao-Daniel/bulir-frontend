import { jwtDecode } from "jwt-decode"

export interface User {
  id: number
  fullName: string
  email: string
  nif: string
  userType: "client" | "provider"
}

interface DecodedToken {
  userId: number
  userType: "client" | "provider"
  fullName: string
  email: string
  nif: string
  iat: number
  exp: number
}

// Get auth token from localStorage (client-side only)
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("token", token)
}

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("token")
}

// Get user info from decoded token
export const getUserInfo = (): User | null => {
  const token = getAuthToken()
  if (!token) return null

  try {
    const decoded = jwtDecode<DecodedToken>(token)
    return {
      id: decoded.userId,
      fullName: decoded.fullName,
      email: decoded.email,
      nif: decoded.nif,
      userType: decoded.userType,
    }
  } catch (error) {
    console.error("Error decoding token:", error)
    removeAuthToken()
    return null
  }
}

// Check if token is expired
export const isTokenExpired = (): boolean => {
  const token = getAuthToken()
  if (!token) return true

  try {
    const decoded = jwtDecode<DecodedToken>(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch (error) {
    console.error("Error checking token expiration:", error)
    return true
  }
}

