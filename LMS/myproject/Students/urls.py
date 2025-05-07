from django.urls import path
from .views import StudentListCreateView, StudentDetailView

urlpatterns = [
    path('students/', StudentListCreateView.as_view(), name='student-list'),
    path('students/<int:student_id>/', StudentDetailView.as_view(), name='student-detail'),
]
