import React from "react";
import { StudentFormProps } from "../../types/index";

const StudentForm: React.FC<StudentFormProps> = ({
  formData,
  editingId,
  handleChange,
  handleSubmit,
}) => {
  // Function to reset the form
  const resetForm = () => {
    // Reset the form using form element directly if needed
    document.forms[0].reset();
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        {editingId ? "Update Student" : "Add Student"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 bg-gray-200 rounded"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 rounded"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-200 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact No.</label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              className="w-full p-2 bg-gray-200 rounded"
              required
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-[#1B4965] text-white py-2 px-4 rounded hover:bg-blue-900 w-40"
          >
            {editingId ? "Update Student" : "Add Student"}
          </button>
          
          {editingId !== null && (
            <button
              type="button"
              onClick={() => {
                resetForm();
                // We need to create a function that will reset the state in the parent component
                // This will be implemented in StudentManager.tsx
                window.location.reload(); // Temporary solution
              }}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 w-40"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;