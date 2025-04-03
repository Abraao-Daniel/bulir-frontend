import { jwtDecode } from "jwt-decode"

export interface User {
  id: number
  fullName: string
  email: string
  nif: string
  createdAt?: Date
  userType: "client" | "provider"
}

interface DecodedToken {
  userId: number
  userType: "client" | "provider"
  fullName: string
  email: string
  nif: string
  iat: number
  exp: number,
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
  setUserInfo()
}

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("token")
  removeUserInfo()
}

// Set user info in localStorage
export const setUserInfo = (): void => {
  const token = getAuthToken()
  if (!token) return

  try {
    const decoded = jwtDecode<DecodedToken>(token)
    const user: User = {
      id: decoded.userId,
      fullName: decoded.fullName,
      email: decoded.email,
      nif: decoded.nif,
      userType: decoded.userType,
    }
    localStorage.setItem("user", JSON.stringify(user))
  } catch (error) {
    console.error("Error saving user info:", error)
  }
}

// Get user info from localStorage
export const getUserInfo = (): User | null => {
  if (typeof window === "undefined") return null
  const user = localStorage?.getItem("user")
  return user ? JSON.parse(user) : null
}

// Remove user info from localStorage
export const removeUserInfo = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("user")
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
