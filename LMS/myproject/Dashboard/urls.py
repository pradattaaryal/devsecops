from django.urls import path
from .views import DashboardView, GetOverdueBorrowersView, MailOverdueBorrowersView

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('GetOverdueBorrowers', GetOverdueBorrowersView.as_view(), name='overdue-borrowers'),
     path('MailOverdueBorrowers/', MailOverdueBorrowersView.as_view(), name='mail-overdue-borrowers'),
]
