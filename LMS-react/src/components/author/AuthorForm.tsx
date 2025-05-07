import React, { useEffect } from "react";
import { Author } from "../../types";
import { useForm } from 'react-hook-form';
interface AuthorFormProps {
  onSubmit: (author: Author) => void;
  author?: Author;
  isEditing: boolean;
  onCancel?: () => void;
  loading: boolean;
  error: string | null;
}

export const AuthorForm: React.FC<AuthorFormProps> = ({
  onSubmit,
  author,
  isEditing,
  onCancel,
  loading,
  error
}) => {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<Author>({
    defaultValues: {
      author_id: author?.author_id || 0,
      name: author?.name || "",
      bio: author?.bio || ""
    }
  });

  useEffect(() => {
    reset({
      author_id: author?.author_id || 0,
      name: author?.name || "",
      bio: author?.bio || ""
    });
  }, [author, reset]);

  const onFormSubmit = (data: Author) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
        <input
          type="text"
          {...register("name", { required: "Author name is required" })}
          className={`w-full px-4 py-2 bg-gray-200 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          {...register("bio")}
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
          rows={3}
        />
      </div>
      
      <input type="hidden" {...register("author_id")} />
      
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-[#1B4965] text-white px-4 py-2 rounded hover:bg-[#1B4965]/90 transition-colors disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Processing..." : isEditing ? "Update Author" : "Add Author"}
        </button>
        
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

 