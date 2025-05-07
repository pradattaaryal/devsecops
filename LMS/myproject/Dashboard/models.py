from django.db import models
from Students.models import Student
from Books.models import Book
from Transactions.models import TransactionModel
from django.utils import timezone

class OverdueBorrower(models.Model):
    student = models.ForeignKey('Students.Student', on_delete=models.CASCADE)
    borrowed_id = models.CharField(max_length=255)  # Assuming transaction_id is a string
    last_email_sent = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.student.student_name} - {self.borrowed_id}"

class Dashboard(models.Model):
    total_student_count = models.IntegerField(default=0)
    total_book_count = models.IntegerField(default=0)
    total_transaction_count = models.IntegerField(default=0)
    total_borrowed_books = models.IntegerField(default=0)
    total_returned_books = models.IntegerField(default=0)
    overdue_borrowers = models.ManyToManyField(OverdueBorrower, related_name="dashboards")

    def __str__(self):
        return "Library Dashboard Statistics"
