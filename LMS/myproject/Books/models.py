from django.db import models
import uuid
from Authors.models import Author  # Import the Author model
from django.utils import timezone

class Book(models.Model):
    book_id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)  # ForeignKey to Author model
    genre = models.CharField(max_length=100, default="Not Defined")
    isbn = models.CharField(max_length=13, unique=True, default="0000000000000")
    quantity = models.IntegerField(default=1)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title