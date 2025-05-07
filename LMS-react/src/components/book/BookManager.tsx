import React, { useState, useEffect } from "react"
import { BookOpen } from "lucide-react"
import { useBooks } from "../../hooks/useBooks"
import { authorService } from "../../services/authorService"
import { BookForm } from "./BookForm"
import { BookList } from "./BookList"
import type { Book, Author, BookFormData } from "../../types"
import Toast, { ToastType } from "../toast"  // Make sure to import Toast and ToastType

export const BookManager: React.FC = () => {
  const { books, loading, error, addBook, updateBook, deleteBook } = useBooks()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [currentBook, setCurrentBook] = useState<Book | null>(null)
  const [authorNames, setAuthorNames] = useState<Record<number, string>>({})
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  useEffect(() => {
    // Fetch all authors to map author_id to names
    const fetchAuthors = async () => {
      try {
        const authors = await authorService.getAll()
        const authorMap: Record<number, string> = {}
        authors.forEach((author: Author) => {
          authorMap[author.author_id] = author.name
        })
        setAuthorNames(authorMap)
      } catch (err) {
        console.error("Failed to fetch authors:", err)
      }
    }

    fetchAuthors()
  }, [])

  const handleSubmit = async (bookData: BookFormData) => {
    try {
      if (isEditing && currentBook) {
        await updateBook(currentBook.book_id, bookData)
        setIsEditing(false)
        setCurrentBook(null)
        setToast({ message: "Book updated successfully!", type: "success" })
      } else {
        await addBook(bookData)
        setToast({ message: "Book added successfully!", type: "success" })
      }
    } catch (err) {
      console.error("Error submitting book:", err)
      setToast({ message: "Error occurred while submitting book.", type: "error" })
    }
  }

  const handleEdit = (book: Book) => {
    setCurrentBook(book)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentBook(null)
  }

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-gray-700" />
            <h2 className="text-lg font-semibold">Books Details</h2>
          </div>
        </div>
        <div className="p-6 bg-gray-50">
          <BookForm
            onSubmit={handleSubmit}
            book={currentBook || undefined}
            isEditing={isEditing}
            onCancel={handleCancel}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Book Lists</h2>
        </div>
        <BookList books={books} loading={loading} onEdit={handleEdit} onDelete={deleteBook} authorNames={authorNames} />
      </div>
    </div>
  )
}
