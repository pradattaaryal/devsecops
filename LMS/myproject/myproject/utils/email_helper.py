from django.core.mail import send_mail
from django.conf import settings

class EmailHelper:
    @staticmethod
    def send_email(subject, message, recipient_email):
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient_email],
                fail_silently=False,  # Set to False to catch errors
            )
            print(f"Email sent to {recipient_email}")
        except Exception as e:
            print(f"Failed to send email to {recipient_email}: {str(e)}")