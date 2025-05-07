import api from "./api";
import { Author } from "../types/index";

export const authorService = {
  getAll: async (): Promise<Author[]> => {
    const response = await api.get("/authors/");
    return response.data;
  },
  
  create: async (author: Author): Promise<Author> => {
    const response = await api.post("/authors/", author);
    return response.data;
  },
  
  update: async (id: number, author: Author): Promise<Author> => {
    const response = await api.put(`/authors/authors/${id}/`, author);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/authors/authors/${id}/`);
  }
};