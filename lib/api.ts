// import { getAuthToken } from "./auth"

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://bulir-backend-3nhbtru02-abraaodaniels-projects.vercel.app/"
 const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004/api"


interface ApiOptions {
  method?: string
  body?: any
  headers?: Record<string, string>
}

export async function fetchApi<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  // const token = getAuthToken()

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  }

    headers["Authorization"] = `jdhfjasjhsakjhdjsa`

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "An error occurred")
  }

  return response.json()
}

