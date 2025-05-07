# models.py
from django.db import models
import uuid

class Author(models.Model):
    author_id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255)
    bio = models.TextField()

    def __str__(self):
        return self.name
