from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny
from .services import AuthorService
from .serializers import AuthorSerializer
from rest_framework.exceptions import NotFound

class AuthorListView(APIView):
    permission_classes = [AllowAny]  # Add this line to require authentication

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.author_service = AuthorService()

    def get(self, request):
        authors = self.author_service.get_all_authors()
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)

    def post(self, request):
     serializer = AuthorSerializer(data=request.data)
     if serializer.is_valid():
        name = serializer.validated_data.get('name')
        bio = serializer.validated_data.get('bio')
        author = self.author_service.create_author(name, bio)
        
        # Use 'author.author_id' instead of 'author.id'
        request.data['author'] = author.author_id  # Store the correct primary key value
        
        return Response(AuthorSerializer(author).data, status=status.HTTP_201_CREATED)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthorDetailView(APIView):
    permission_classes = [AllowAny]  # Add this line to require authentication

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.author_service = AuthorService()

    def get(self, request, author_id):
        # Use author_id to find the author
        author = self.author_service.get_author_by_id(author_id)
        if author:
            return Response(AuthorSerializer(author).data)
        raise NotFound(detail="Author not found")

    def put(self, request, author_id):
        author = self.author_service.get_author_by_id(author_id)
        if author:
            serializer = AuthorSerializer(author, data=request.data, partial=True)
            if serializer.is_valid():
                updated_author = self.author_service.update_author(
                    author_id,
                    name=serializer.validated_data.get('name'),
                    bio=serializer.validated_data.get('bio')
                )
                return Response(AuthorSerializer(updated_author).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        raise NotFound(detail="Author not found")

    def delete(self, request, author_id):
        author = self.author_service.delete_author(author_id)
        if author:
            return Response(status=status.HTTP_204_NO_CONTENT)
        raise NotFound(detail="Author not found")
