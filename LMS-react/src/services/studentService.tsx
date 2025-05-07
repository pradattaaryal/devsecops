import axios from "axios";
import { Student } from "../types/index";

const API_URL = "http://127.0.0.1:8000/students/students/";

export const fetchAllStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const createStudent = async (studentData: Student) => {
  try {
    const response = await axios.post(API_URL, studentData);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const updateStudent = async (id: number, studentData: Student) => {
  try {
    // Ensure proper URL formatting and log for debugging
    const updateUrl = API_URL.endsWith('/') 
      ? `${API_URL}${id}/` 
      : `${API_URL}/${id}/`;
    
    console.log("Update URL:", updateUrl);
    
    // Instead of creating a new object, use the entire studentData object
    // The backend might be checking if email field exists before generating a random one
    // Make sure to explicitly include the email in the request
    const dataToSend = {
      student_name: studentData.student_name,
      email: studentData.email, // Make sure this is explicitly included
      department: studentData.department,
      contact_number: studentData.contact_number,
      user: studentData.user
    };
    
    console.log("Data being sent:", dataToSend);
    
    // Try using PATCH instead of PUT as it might handle partial updates better
    const response = await axios.put(updateUrl, dataToSend);
    return response.data;
  } catch (error: any) {
    console.error("Error updating student:", error);
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteStudent = async (id: number) => {
  try {
    // Ensure proper URL formatting
    const deleteUrl = API_URL.endsWith('/') 
      ? `${API_URL}${id}/` 
      : `${API_URL}/${id}/`;
      
    await axios.delete(deleteUrl);
    return true;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};