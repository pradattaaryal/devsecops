import {  useEffect } from "react"
import { CheckCircle, AlertCircle, X } from 'lucide-react'

export type ToastType = "success" | "error" | null

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!type) return null

  return (
    <div 
      className={`fixed top-4 right-4 flex items-center p-4 rounded-md shadow-lg z-50 max-w-md animate-slide-up
        ${type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
          'bg-red-50 text-red-800 border border-red-200'}`}
    >
      <div className="mr-3">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-500" />
        )}
      </div>
      <div className="flex-1 mr-2">{message}</div>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Toast
