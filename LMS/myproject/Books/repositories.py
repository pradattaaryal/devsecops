from Books.models import Book
from django.db import transaction
from uuid import UUID

class BookRepository:
    def __init__(self):
        self.model = Book  # The model to interact with
    
    def get_all_books(self):
        return self.model.objects.filter(is_deleted=False)

    def get_book_by_id(self, book_id):
        try:
            return self.model.objects.get(book_id=book_id, is_deleted=False)
        except Book.DoesNotExist:
            return None

    def create_book(self, data):
        with transaction.atomic():
            book = self.model.objects.create(
                title=data.get('title'),
                author=data.get('author'),
                genre=data.get('genre'),
                isbn=data.get('isbn'),
                quantity=data.get('quantity', 1)
            )
            return book

    def update_book(self, book_id, data):
        try:
            book = self.model.objects.get(book_id=book_id, is_deleted=False)
            book.title = data.get('title', book.title)
            book.author = data.get('author', book.author)
            book.genre = data.get('genre', book.genre)
            book.isbn = data.get('isbn', book.isbn)
            book.quantity = data.get('quantity', book.quantity)
            book.save()
            return book
        except Book.DoesNotExist:
            return None

    def delete_book(self, book_id):
        try:
            book = self.model.objects.get(book_id=book_id, is_deleted=False)
            book.is_deleted = True
            book.save()
            return book
        except Book.DoesNotExist:
            return None