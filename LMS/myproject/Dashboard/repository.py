from datetime import timedelta
from django.utils import timezone
from Students.models import Student
from Books.models import Book
from .models import OverdueBorrower, TransactionModel


class DashboardRepository:
    def __init__(self, student_model=Student, book_model=Book, transaction_model=TransactionModel, overdue_borrower_model=OverdueBorrower):
        """Dependency Injection for easier testing and flexibility"""
        self.Student = student_model
        self.Book = book_model
        self.Transaction = transaction_model
        self.OverdueBorrower = overdue_borrower_model

    def get_total_students(self):
        return self.Student.objects.filter(is_deleted=False).count()

    def get_total_books(self):
        return self.Book.objects.filter(is_deleted=False).count()

    def get_total_transactions(self):
        return self.Transaction.objects.filter(is_deleted=False).count()

    def get_borrowed_books_count(self):
        return self.Transaction.objects.filter(
            transaction_type='borrow', is_deleted=False
        ).count()

    def get_returned_books_count(self):
        return self.Transaction.objects.filter(
            transaction_type='return', is_deleted=False
        ).count()

    def get_overdue_borrowers(self):
        overdue_borrowers = []
        transactions = self.Transaction.objects.filter(transaction_type="borrow", is_deleted=False)

        for transaction in transactions:
            overdue_date = transaction.date + timedelta(days=14)
            if timezone.now().date() > overdue_date.date():
                overdue_borrower, created = self.OverdueBorrower.objects.get_or_create(
                    student=transaction.student,  # FIXED: Use correct field
                    borrowed_id=transaction.transaction_id
                )
                overdue_borrowers.append(overdue_borrower)
        return overdue_borrowers

