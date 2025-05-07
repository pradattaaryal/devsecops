import { useState, useEffect } from "react";
import { Author } from "../types";
import { authorService } from "../services/authorService";

export const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const data = await authorService.getAll();
      setAuthors(data);
      setError(null);
    } catch (err: any) {
      setError("Failed to fetch authors: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const addAuthor = async (author: Author) => {
    setLoading(true);
    try {
      const newAuthor = await authorService.create(author);
      setAuthors([...authors, newAuthor]);
      setError(null);
      return newAuthor;
    } catch (err: any) {
      setError("Failed to add author: " + (err.response?.data?.detail || err.message));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAuthor = async (id: number, author: Author) => {
    setLoading(true);
    try {
      const updatedAuthor = await authorService.update(id, author);
      setAuthors(authors.map(a => a.author_id === id ? updatedAuthor : a));
      setError(null);
      return updatedAuthor;
    } catch (err: any) {
      setError("Failed to update author: " + (err.response?.data?.detail || err.message));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAuthor = async (id: number) => {
    setLoading(true);
    try {
      await authorService.delete(id);
      setAuthors(authors.filter(a => a.author_id !== id));
      setError(null);
    } catch (err: any) {
      setError("Failed to delete author: " + (err.response?.data?.detail || err.message));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return {
    authors,
    loading,
    error,
    fetchAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor
  };
};
