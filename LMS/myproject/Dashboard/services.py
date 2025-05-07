# Import necessary Django and DRF packages
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from myproject.utils.email_helper import EmailHelper
from .serializers import OverdueBorrowerSerializer
from .repository import DashboardRepository
# If you had a Celery task for sending emails, you would import it here
#from .tasks import send_overdue_emails

from datetime import timedelta
from django.utils import timezone

class DashboardService:
    def __init__(self, dashboard_repo: DashboardRepository):
        """Injecting the repository into the service"""
        self.repository = dashboard_repo

    def get_dashboard_data(self):
        return {
            'total_student_count': self.repository.get_total_students(),
            'total_book_count': self.repository.get_total_books(),
            'total_transaction_count': self.repository.get_total_transactions(),
            'total_borrowed_books': self.repository.get_borrowed_books_count(),
            'total_returned_books': self.repository.get_returned_books_count(),
        }
    
    def get_overdue_borrowers(self):
        return self.repository.get_overdue_borrowers()
    
    def email_get_overdue_borrowers(self):
     print("Fetching overdue borrowers")
     overdue_borrowers = self.repository.get_overdue_borrowers()
     print(f"Found {len(overdue_borrowers)} overdue borrowers")
     for borrower in overdue_borrowers:
        subject = "Library Overdue Notice"
        message = f"Dear {borrower.student.student_name},\n\nOverdue book notice."
        recipient_email = borrower.student.email
        print(f"Attempting to send email to {recipient_email}")
        EmailHelper.send_email(subject, message, recipient_email)
        borrower.last_email_sent = timezone.now()
        borrower.save()
        print(f"Updated last_email_sent for {borrower.student.student_name}")
     return overdue_borrowers