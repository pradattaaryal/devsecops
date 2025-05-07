from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import OverdueBorrowerSerializer
from .repository import DashboardRepository
from .services import DashboardService
#from .tasks import send_overdue_emails

# API Views
class DashboardView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """Inject Repository into Service"""
        dashboard_repo = DashboardRepository()
        dashboard_service = DashboardService(dashboard_repo)

        dashboard_data = dashboard_service.get_dashboard_data()
        return Response(dashboard_data)


class GetOverdueBorrowersView(APIView):
    """
    Returns the list of overdue borrowers without sending emails.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        dashboard_repo = DashboardRepository()
        service = DashboardService(dashboard_repo)

        overdue_borrowers = service.get_overdue_borrowers()
        serializer = OverdueBorrowerSerializer(overdue_borrowers, many=True)
        return Response(serializer.data)  # No message, just data


class MailOverdueBorrowersView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        dashboard_repo = DashboardRepository()
        dashboard_service = DashboardService(dashboard_repo)

        try:
            overdue_borrowers = dashboard_service.email_get_overdue_borrowers()
            return Response({"message": "Emails sent to overdue borrowers", "count": len(overdue_borrowers)})
        except Exception as e:
            return Response({"error": str(e)}, status=500)