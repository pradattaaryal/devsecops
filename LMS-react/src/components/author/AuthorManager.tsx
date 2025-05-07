import React, { useState } from "react";
import { User } from "lucide-react";
import { useAuthors } from "../../hooks/useAuthors";
import { AuthorForm } from "./AuthorForm";
import { AuthorList } from "./AuthorList";
import { Author } from "../../types";
import Toast, { ToastType } from "../toast"; // Import Toast component

export const AuthorManager: React.FC = () => {
  const { authors, loading, error, addAuthor, updateAuthor, deleteAuthor } = useAuthors();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null); // Toast state

  const handleSubmit = async (authorData: Author) => {
    try {
      if (isEditing && currentAuthor) {
        await updateAuthor(currentAuthor.author_id, authorData);
        setToast({ message: "Author updated successfully!", type: "success" });
        setIsEditing(false);
        setCurrentAuthor(null);
      } else {
        await addAuthor(authorData);
        setToast({ message: "Author added successfully!", type: "success" });
      }
    } catch (err) {
      setToast({ message: "Operation failed. Please try again.", type: "error" });
    }
  };

  const handleEdit = (author: Author) => {
    setCurrentAuthor(author);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentAuthor(null);
  };

  const handleDelete = async (authorId: number) => {
    try {
      await deleteAuthor(authorId);
      setToast({ message: "Author deleted successfully!", type: "success" });
    } catch (err) {
      setToast({ message: "Failed to delete author. Please try again.", type: "error" });
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-gray-700" />
            <h2 className="text-lg font-semibold">Author Info</h2>
          </div>
        </div>
        <div className="p-6 bg-gray-50">
          <AuthorForm
            onSubmit={handleSubmit}
            author={currentAuthor || undefined}
            isEditing={isEditing}
            onCancel={handleCancel}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Author Details</h2>
        </div>
        <AuthorList
          authors={authors}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete} // Pass the delete handler here
        />
      </div>
    </div>
  );
};
