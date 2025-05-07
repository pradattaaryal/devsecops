from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Books.services import BookService
from rest_framework.permissions import IsAuthenticated,AllowAny
from uuid import UUID
from Books.serializers import BookSerializer
from Authors.models import Author

class BookListView(APIView):
    permission_classes = [AllowAny]  # Only authenticated users can access

    def get(self, request):
        service = BookService()
        books = service.get_all_books()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        author_id = data.get('author')

        # Check if author_id is provided and valid
        if author_id is None:
            return Response({'error': 'Author ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            author_id = int(author_id)
            if author_id <= 0:
                return Response({'error': 'Author ID must be a positive integer'}, status=status.HTTP_400_BAD_REQUEST)
            # Verify the author exists, but don’t modify data
            if not Author.objects.filter(author_id=author_id).exists():
                return Response({'error': 'Author does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        except (ValueError, TypeError):
            return Response({'error': 'Invalid author ID format'}, status=status.HTTP_400_BAD_REQUEST)

        # Let the serializer handle the raw integer
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class BookDetailView(APIView):
    permission_classes = [AllowAny]  # Only authenticated users can access

    def get(self, request, book_id):
        service = BookService()
        book = service.get_book_by_id(book_id)
        if book:
            serializer = BookSerializer(book)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, book_id):
        service = BookService()
        book = service.get_book_by_id(book_id)
        if not book:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

        # Use the serializer to validate and update the book
        serializer = BookSerializer(book, data=request.data, partial=True)  # partial=True for PATCH-like behavior
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, book_id):
        service = BookService()
        book = service.delete_book(book_id)
        if book:
            return Response({"message": "Book deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)