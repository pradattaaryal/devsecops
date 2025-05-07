export interface Author {
  author_id: number;
  name: string;
  bio: string;
}

export interface Book {
  book_id: number;
  title: string;
  author: number; // Foreign key to Author
  genre: string;
  isbn: string;
  quantity: number;
  is_deleted: boolean;
}

export interface BookFormData {
  book_id?: number;
  title: string;
  author: number;
  genre: string;
  isbn: string;
  quantity: number;
}

export interface Student {
  student_id: number;
  user: string;
  student_name: string;
  email: string;
  department: string;
  contact_number: string;
}

export interface StudentFormProps {
  formData: Student;
  editingId: number | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface StudentTableProps {
  students: Student[];
  handleEdit: (student: Student) => void;
  handleDelete: (id: number) => void;
}