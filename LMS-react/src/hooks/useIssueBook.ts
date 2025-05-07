// src/hooks/useIssueBook.ts
import { useState, useEffect, type ChangeEvent } from "react";
import { createTransaction } from "../services/transactionService";
import { type ToastType } from "../components/toast";

interface FormData {
  bookId: string;
  userId: string;
  username: string;
  studentId: string;
  bookTitle: string;
  date: string;
  transactionType: "borrow" | "return";
}

export function useIssueBook() {
  const [formData, setFormData] = useState<FormData>({
    bookId: "",
    userId: "",
    username: "",
    studentId: "",
    bookTitle: "",
    date: new Date().toISOString().split("T")[0],
    transactionType: "borrow",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType }>({
    message: "",
    type: null,
  });

  // Load user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      const storedUsername = localStorage.getItem("username");

      if (storedUserId || storedUsername) {
        setFormData(prev => ({
          ...prev,
          userId: storedUserId || "",
          username: storedUsername || "",
        }));
      }
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string): string => {
    return dateString.replace(/-/g, "/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const transactionData = {
        student: Number.parseInt(formData.studentId),
        user: formData.userId,
        book: Number.parseInt(formData.bookId),
        transaction_type: formData.transactionType,
        date: formatDate(formData.date),
      };

      const response = await createTransaction(transactionData);
      const actionText = formData.transactionType === "borrow" ? "borrowed" : "returned";

      setToast({
        message: `Book successfully ${actionText}. Transaction ID: ${response.transaction_id}`,
        type: "success",
      });

      // Reset form but keep user info
      setFormData(prev => ({
        ...prev,
        bookId: "",
        studentId: "",
        bookTitle: "",
        date: new Date().toISOString().split("T")[0],
        transactionType: "borrow",
      }));
    } catch (error) {
      setToast({
        message: `Failed to ${formData.transactionType} book: ${error instanceof Error ? error.message : "Unknown error"}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetToast = () => {
    setToast({ message: "", type: null });
  };

  return {
    formData,
    isLoading,
    toast,
    handleChange,
    handleSubmit,
    resetToast,
  };
}