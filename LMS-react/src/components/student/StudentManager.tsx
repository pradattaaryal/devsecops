import React, { useState, useEffect } from "react";
import { Student } from "../../types/index";
import { fetchAllStudents, createStudent, updateStudent, deleteStudent } from "../../services/studentService";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import Toast, { ToastType } from "../toast"; // Import Toast component

const emptyFormData: Student = {
  student_id: 0,
  user: "",
  student_name: "",
  email: "",
  department: "",
  contact_number: "",
};

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Student>(emptyFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  // Fetch all students
  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllStudents();
      setStudents(data);
    } catch (err) {
      setError("Failed to load students. Please try again.");
      console.error("Load students error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to reset the form
  const resetForm = () => {
    setFormData(emptyFormData);
    setEditingId(null);
  };

  // Add or update student
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (editingId !== null) {
        const studentToUpdate = { ...formData, student_id: editingId };
        await updateStudent(editingId, studentToUpdate);
        setToast({ message: "Student updated successfully!", type: "success" });
      } else {
        await createStudent(formData);
        setToast({ message: "Student added successfully!", type: "success" });
      }
      
      resetForm();
      await loadStudents();
    } catch (err) {
      setError("Operation failed. Please check your input and try again.");
      setToast({ message: "Operation failed. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Edit student
  const handleEdit = (student: Student) => {
    setFormData({ ...student });
    setEditingId(student.student_id);
  };

  // Delete student
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await deleteStudent(id);
      setToast({ message: "Student deleted successfully!", type: "success" });
      await loadStudents();
    } catch (err) {
      setError("Failed to delete student. Please try again.");
      setToast({ message: "Failed to delete student.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="max-w-4xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      
      <StudentForm 
        formData={formData}
        editingId={editingId}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <StudentTable 
          students={students}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default StudentManager;
