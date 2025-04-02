"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterForm() {
  const [fullName, setFullName] = useState("")
  const [nif, setNif] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"client" | "provider">("client")

  const { register, isLoading, error } = useAuthStore()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await register({ fullName, nif, email, password, userType })
      router.push("/dashboard")
    } catch (err) {
      toast({
        title: "Registration failed",
        description: error || "Please check your information and try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nif">NIF</Label>
            <Input id="nif" value={nif} onChange={(e) => setNif(e.target.value)} required placeholder="123456789" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup
              value={userType}
              onValueChange={(value) => setUserType(value as "client" | "provider")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="client" />
                <Label htmlFor="client">Client</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="provider" id="provider" />
                <Label htmlFor="provider">Service Provider</Label>
              </div>
            </RadioGroup>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register"}
          </Button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

