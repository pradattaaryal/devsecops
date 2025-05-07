from rest_framework import serializers
from .models import Dashboard, OverdueBorrower

class OverdueBorrowerSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source="student.student_name", read_only=True)
    
    class Meta:
        model = OverdueBorrower
        fields = ["student_name", "borrowed_id"]
        
class DashboardSerializer(serializers.ModelSerializer):
    overdue_borrowers = OverdueBorrowerSerializer(many=True, read_only=True)

    class Meta:
        model = Dashboard
        fields = [
            'total_student_count',
            'total_book_count',
            'total_transaction_count',
            'total_borrowed_books',
            'total_returned_books',
            'overdue_borrowers',
        ]
