from .models import TransactionModel
from Books.models import Book
from django.db import transaction

class TransactionRepository:
    def __init__(self):
        self.model = TransactionModel

    def get_all(self):
        return self.model.objects.filter(is_deleted=False)

    def get_by_id(self, transaction_id):
        return self.model.objects.filter(transaction_id=transaction_id, is_deleted=False).first()
    
    def get_unreturned_books_for_student(self, student_id, book_id):
        """Get unreturned borrows for a specific student and book"""
        return self.model.objects.filter(
            student_id=student_id,
            book_id=book_id,
            transaction_type='borrow',
            returns__isnull=True,
            is_deleted=False
        )

    def create(self, data):
        """Create a transaction with additional checks for borrowing/returning"""
        with transaction.atomic():
            transaction_type = data.get('transaction_type')
            student_id = data.get('student')
            book_id = data.get('book')
            book = Book.objects.get(book_id=book_id)
            
            if transaction_type == 'borrow':
                # Check if book is available (quantity > 0)
                if book.quantity <= 0:
                    raise ValueError("This book is not available for borrowing")
                
                # Reduce book quantity by 1
                book.quantity -= 1
                book.save()
                
            elif transaction_type == 'return':
                # Get the related borrow transaction from data
                related_borrow_id = data.get('related_borrow')
                
                if not related_borrow_id:
                    # Find an unreturned borrow transaction for this student and book
                    unreturned_borrows = self.get_unreturned_books_for_student(student_id, book_id)
                    if not unreturned_borrows.exists():
                        raise ValueError("This student has not borrowed this book")
                    
                    # Use the first unreturned borrow transaction
                    data['related_borrow'] = unreturned_borrows.first().transaction_id
                
                # Increase book quantity by 1
                book.quantity += 1
                book.save()
            
            return self.model.objects.create(**data)

    def update(self, transaction_id, data):
        transaction_obj = self.get_by_id(transaction_id)
        if transaction_obj:
            for key, value in data.items():
                setattr(transaction_obj, key, value)
            transaction_obj.save()
        return transaction_obj

    def delete(self, transaction_id):
        transaction_obj = self.get_by_id(transaction_id)
        if transaction_obj:
            transaction_obj.is_deleted = True
            transaction_obj.save()
            return True
        return False