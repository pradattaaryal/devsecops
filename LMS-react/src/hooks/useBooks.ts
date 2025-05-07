import { useState, useEffect } from "react";
import { Book, BookFormData } from "../types";
import { bookService } from "../services/bookService";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await bookService.getAll();
      setBooks(data);
      setError(null);
    } catch (err: any) {
      setError("Failed to fetch books: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: BookFormData) => {
    setLoading(true);
    try {
      const newBook = await bookService.create(book);
      setBooks([...books, newBook]);
      setError(null);
      return newBook;
    } catch (err: any) {
      setError("Failed to add book: " + (err.response?.data?.detail || err.message));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (id: number, book: BookFormData) => {
    setLoading(true);
    try {
      const updatedBook = await bookService.update(id, book);
      setBooks(books.map(b => b.book_id === id ? updatedBook : b));
      setError(null);
      return updatedBook;
    } catch (err: any) {
      setError("Failed to update book: " + (err.response?.data?.detail || err.message));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: number) => {
    setLoading(true);
    try {
      await bookService.delete(id);
      setBooks(books.filter(b => b.book_id !== id));
      setError(null);
    } catch (err: any) {
      setError("Failed to delete book: " + (err.response?.data?.detail || err.message));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook
  };
};
