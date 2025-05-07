import type React from "react"
import { useState, useEffect } from "react"
import type { Book, Author, BookFormData } from "../../types"
import { authorService } from "../../services/authorService"

interface BookFormProps {
  onSubmit: (book: BookFormData) => void
  book?: Book
  isEditing: boolean
  onCancel?: () => void
  loading: boolean
  error: string | null
}

export const BookForm: React.FC<BookFormProps> = ({ onSubmit, book, isEditing, onCancel, loading, error }) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: 0,
    genre: "Not Defined",
    isbn: "0000000000000",
    quantity: 1,
  })
  const [authors, setAuthors] = useState<Author[]>([])
  const [fetchingAuthors, setFetchingAuthors] = useState<boolean>(false)

  useEffect(() => {
    const fetchAuthors = async () => {
      setFetchingAuthors(true)
      try {
        const data = await authorService.getAll()
        setAuthors(data)
      } catch (err) {
        console.error("Failed to fetch authors:", err)
      } finally {
        setFetchingAuthors(false)
      }
    }

    fetchAuthors()
  }, [])

  useEffect(() => {
    if (book) {
      setFormData({
        book_id: book.book_id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        quantity: book.quantity,
      })
    } else {
      setFormData({
        title: "",
        author: 0,
        genre: "Not Defined",
        isbn: "0000000000000",
        quantity: 1,
      })
    }
  }, [book])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number.parseInt(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Book ID</label>
          <input
            type="text"
            name="book_id"
            value={formData.book_id || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
            disabled={true}
            placeholder="Auto-generated"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
            required
            maxLength={13}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <select
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
            required
          >
            <option value="">Select Author</option>
            {fetchingAuthors ? (
              <option value="" disabled>
                Loading authors...
              </option>
            ) : (
              authors.map((author) => (
                <option key={author.author_id} value={author.author_id}>
                  {author.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
            required
            min={1}
          />
        </div>
      </div>

      <div className="flex justify-start mt-4">
        <button
          type="submit"
          className="bg-[#1B4965] text-white px-4 py-2 rounded hover:bg-[#1B4965]/90 transition-colors disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Processing..." : isEditing ? "UPDATE BOOK" : "ADD BOOK"}
        </button>

        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

