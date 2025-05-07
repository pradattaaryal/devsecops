from rest_framework import serializers
from Books.models import Book
from Authors.models import Author

class BookSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all())
    author_name = serializers.CharField(source='author.name', read_only=True)

    class Meta:
        model = Book
        fields = ['book_id', 'title', 'author', 'author_name', 'genre', 'isbn', 'quantity', 'is_deleted']
        read_only_fields = ['book_id', 'is_deleted']  # Prevent updating these directly