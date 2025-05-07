from rest_framework import serializers
from .models import TransactionModel
from django.utils import timezone
from datetime import datetime

class TransactionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.student_name', read_only=True)
    librarian_name = serializers.CharField(source='user.user_name', read_only=True)
    book_name = serializers.CharField(source='book.title', read_only=True)
    related_borrow = serializers.PrimaryKeyRelatedField(
        queryset=TransactionModel.objects.filter(transaction_type='borrow'),
        required=False, allow_null=True
    )

    class Meta:
        model = TransactionModel
        fields = ['transaction_id', 'student', 'user', 'book', 'transaction_type', 
                  'date', 'student_name', 'librarian_name', 'book_name', 'related_borrow']
        read_only_fields = ['student_name', 'librarian_name', 'book_name']

    def to_internal_value(self, data):
        # Handle the 'date' field before the default validation
        if 'date' in data:
            if data['date'] is None:
                # Set to current date and time if null
                data['date'] = timezone.now()
            elif isinstance(data['date'], str):
                try:
                    # Parse the date in the format "%Y/%m/%d"
                    parsed_date = datetime.strptime(data['date'], "%Y/%m/%d")
                    data['date'] = timezone.make_aware(parsed_date)
                except ValueError:
                    raise serializers.ValidationError({"date": "Invalid date format. Use YYYY/MM/DD."})
        
        return super().to_internal_value(data)
    
    def validate(self, data):
        """Additional validation for transaction data"""
        transaction_type = data.get('transaction_type')
        
        # For return transactions, either related_borrow must be provided
        # or it will be automatically found in the repository
        if transaction_type == 'return' and 'related_borrow' in data and data['related_borrow'] is not None:
            # Verify the related borrow is for the same book and student
            related_borrow = data['related_borrow']
            if related_borrow.book.book_id != data['book'].book_id:
                raise serializers.ValidationError(
                    "The related borrow transaction must be for the same book"
                )
            if related_borrow.student.id != data['student'].id:
                raise serializers.ValidationError(
                    "The related borrow transaction must be for the same student"
                )
        
        return data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['date'] = instance.date.strftime("%Y/%m/%d")
        return representation
