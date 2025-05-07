from django.db import models
from Students.models import Student
from Users.models import User
from Books.models import Book
from django.utils import timezone

class TransactionModel(models.Model):
    TRANSACTION_TYPES = [
        ('borrow', 'Borrow'),
        ('return', 'Return'),
    ]

    transaction_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="transactions")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transactions")  # Librarian
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="transactions")
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    date = models.DateTimeField(default=timezone.now)
    is_deleted = models.BooleanField(default=False)
    # New field to track which borrow transaction this return is for
    related_borrow = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, 
                                       related_name='returns', limit_choices_to={'transaction_type': 'borrow'})

    student_name = models.CharField(max_length=255)
    book_name = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        """Automatically populate student_name and book_name before saving."""
        self.student_name = self.student.student_name
        self.book_name = self.book.title
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.transaction_type} - {self.book_name} by {self.student_name}"