from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .services import StudentService
from .serializers import StudentSerializer

class StudentListCreateView(APIView):
    """Handles listing and creating students."""
    permission_classes = [AllowAny]

    def get(self, request):
        # If authenticated, filter by user; otherwise, return all students
        students = StudentService.get_students_by_user(request.user if request.user.is_authenticated else None)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data.copy()

        # Hybrid logic: Use request.user if authenticated, else use provided user or None
        if request.user.is_authenticated:
            data['user'] = request.user
        elif 'user' in data and data['user'] is not None:
            # If user is provided in request data, it will be validated by the serializer
            pass
        else:
            data['user'] = None  # Allow unauthenticated users to create students without a user

        serializer = StudentSerializer(data=data)
        if serializer.is_valid():
            try:
                student = StudentService.create_student(serializer.validated_data)
                return Response(StudentSerializer(student).data, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"detail": "Error creating student"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentDetailView(APIView):
    """Handles retrieving, updating, and deleting a student."""
    permission_classes = [AllowAny]

    def get(self, request, student_id):
        student = StudentService.get_student(student_id)
        if not student:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, student_id):
        student = StudentService.get_student(student_id)
        if not student:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data.copy()
        # Optionally set user if authenticated and not provided
        if request.user.is_authenticated and 'user' not in data:
            data['user'] = request.user

        serializer = StudentSerializer(student, data=data, partial=True)
        if serializer.is_valid():
            updated_student = StudentService.update_student(student_id, serializer.validated_data)
            return Response(StudentSerializer(updated_student).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, student_id):
        success = StudentService.delete_student(student_id)
        if success:
            return Response({"message": "Student deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)