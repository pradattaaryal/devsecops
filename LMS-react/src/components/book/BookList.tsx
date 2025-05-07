import type React from "react"
import type { Book } from "../../types"
import { Pencil, Trash2 } from "lucide-react"

interface BookListProps {
  books: Book[]
  loading: boolean
  onEdit: (book: Book) => void
  onDelete: (id: number) => void
  authorNames: Record<number, string>
}

export const BookList: React.FC<BookListProps> = ({ books, loading, onEdit, onDelete, authorNames }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">BookID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Genre</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ISBN</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                {loading ? "Loading books..." : "No books found."}
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.book_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.book_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {authorNames[book.author] || book.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.genre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(book)}
                      className="text-blue-600 hover:text-blue-900"
                      aria-label="Edit"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this book?")) {
                          onDelete(book.book_id)
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

