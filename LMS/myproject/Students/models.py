from django.db import models
import uuid
from Users.models import User

class Student(models.Model):
    student_id = models.AutoField(primary_key=True, editable=False)
    student_name = models.CharField(max_length=255, default="Unknown Student")
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=15, default="0000000000")
    department = models.CharField(max_length=255, default="Undeclared")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='students', null=True, blank=True)  # Nullable
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    
def save(self, *args, **kwargs):
    if not self.email and not self.student_id:  # Only generate email for new students
        self.email = f"student_{uuid.uuid4()}@domain.com"
        attempt = 1
        while Student.objects.filter(email=self.email).exists():
            self.email = f"student_{uuid.uuid4()}@domain.com"
            attempt += 1
            if attempt > 10:
                raise ValueError("Unable to generate a unique email after multiple attempts")
    super().save(*args, **kwargs)
