# Students/admin.py
from django.contrib import admin
from .models import Student

class StudentAdmin(admin.ModelAdmin):
    list_display = ['student_name', 'user', 'created_date', 'updated_date']
    search_fields = ['student_name', 'user__user_name']
    ordering = ['student_name']

admin.site.register(Student, StudentAdmin)
