"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Toast, { type ToastType } from "../components/toast"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Toast state
  const [toast, setToast] = useState<{ type: ToastType; message: string }>({
    type: null,
    message: "",
  })

  // State for draggable functionality
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 })
  const modalRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)

  // Reset position when modal opens
  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignIn = () => {
    navigate("/login")
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("http://127.0.0.1:8000/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Registration failed")
      }

      // Registration successful
      setToast({
        type: "success",
        message: "Registration successful! Redirecting to login...",
      })

      // Wait a moment before closing and redirecting
      setTimeout(() => {
        onClose()
        navigate("/login")
      }, 2000)
    } catch (err: any) {
      setError(err.message)
      setToast({
        type: "error",
        message: err.message || "Registration failed. Please try again.",
      })
      setLoading(false)
    }
  }

  const closeToast = () => {
    setToast({ type: null, message: "" })
  }

  // Draggable functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragHandleRef.current?.contains(e.target as Node)) {
      setIsDragging(true)
      setInitialMousePosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - initialMousePosition.x,
        y: e.clientY - initialMousePosition.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onMouseDown={handleMouseDown}>
        <div
          ref={modalRef}
          className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? "none" : "transform 0.1s ease",
            cursor: isDragging ? "grabbing" : "auto",
          }}
        >
          <div ref={dragHandleRef} className="p-6 cursor-grab active:cursor-grabbing">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 p-2 rounded">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-800" fill="currentColor">
                    <circle cx="9" cy="9" r="2" />
                    <circle cx="15" cy="9" r="2" />
                    <circle cx="9" cy="15" r="2" />
                    <circle cx="15" cy="15" r="2" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold select-none">Add Admin</h2>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t border-gray-200 mb-6"></div>

            <form onSubmit={handleSignUp}>
              {error && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">{error}</div>
              )}

              <div className="space-y-4">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Username"
                  value={formData.user_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300 transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Sign Up"}
                  </button>

                  <button
                    type="button"
                    onClick={handleSignIn}
                    className="w-full py-3 bg-[#1B4965] text-white rounded font-medium hover:bg-[#1B4965]/90 transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <Toast type={toast.type} message={toast.message} onClose={closeToast} />
    </>
  )
}

export default RegisterModal

