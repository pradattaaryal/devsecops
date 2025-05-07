from Books.repositories import BookRepository
from uuid import UUID

from Authors.models import Author
from Books.models import Book

class BookService:
    def __init__(self):
        self.repository = BookRepository()  # Instantiate the repository class
    
    def get_all_books(self):
        return self.repository.get_all_books()

    def get_book_by_id(self, book_id):
        return self.repository.get_book_by_id(book_id)

    def create_book(self, data):
        return self.repository.create_book(data)

    def update_book(self, book_id, data):
        # This method is no longer directly used in PUT, but kept for consistency
        try:
            book = self.repository.get_book_by_id(book_id)
            if not book:
                return None
            # Update fields manually if called directly
            book.title = data.get('title', book.title)
            if 'author' in data:
                book.author = Author.objects.get(author_id=data['author'])
            book.genre = data.get('genre', book.genre)
            book.isbn = data.get('isbn', book.isbn)
            book.quantity = data.get('quantity', book.quantity)
            book.save()
            return book
        except (Book.DoesNotExist, Author.DoesNotExist):
            return None
    def delete_book(self, book_id):
        return self.repository.delete_book(book_id)