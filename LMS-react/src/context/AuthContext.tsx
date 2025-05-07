"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import axios from "axios"

//Types
interface AuthContextType {
  user: string | null
  userId: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

//Context here
const AuthContext = createContext<AuthContextType | null>(null)

// Auth Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  // Check for existing auth data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("username")
    const storedUserId = localStorage.getItem("userId")

    if (storedUser) setUser(storedUser)
    if (storedUserId) setUserId(storedUserId)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/login/", {
        user_name: username,
        password: password,
      })

      // Store tokens in localStorage
      localStorage.setItem("accessToken", response.data.access_token)
      localStorage.setItem("refreshToken", response.data.refresh_token)

      // Store user information
      localStorage.setItem("username", username)

      // Store user_id if it's in the response
      if (response.data.user_id) {
        localStorage.setItem("userId", response.data.user_id)
        setUserId(response.data.user_id)
      }

      setUser(username)
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Login failed.")
    }
  }

  const logout = () => {
    // Remove all auth-related items from localStorage
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")

    // Reset state
    setUser(null)
    setUserId(null)
  }

  return <AuthContext.Provider value={{ user, userId, login, logout }}>{children}</AuthContext.Provider>
}

// Authentication Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

