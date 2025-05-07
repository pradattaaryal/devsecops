import React from "react";
import { StudentTableProps } from "../../types/index";

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Student Lists</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="p-2 text-left">StudentID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Faculty</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Contact No.</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-2">{student.student_id}</td>
                <td className="p-2">{student.student_name}</td>
                <td className="p-2">{student.department}</td>
                <td className="p-2">{student.email}</td>
                <td className="p-2">{student.contact_number}</td>
                <td className="p-2 flex space-x-2">
                  <button 
                    onClick={() => handleEdit(student)} 
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(student.student_id)} 
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;