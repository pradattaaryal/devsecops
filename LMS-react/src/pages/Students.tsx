import type React from "react"
import StudentManager from "../components/student/StudentManager"

const Student: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <StudentManager />
    </div>
  )
}

export default Student
