from .models import Student
from .repositories import StudentRepository

class StudentService:
    """Handles business logic for Student operations."""

    @staticmethod
    def create_student(data):
        """Create and return a new student instance."""
        user_instance = data.get('user')  # Could be None or a User instance

        # Check for email uniqueness if user is provided
        if user_instance and Student.objects.filter(email=data.get('email'), user=user_instance).exists():
            raise ValueError("A student with this email already exists for the user.")

        student = Student(
            student_name=data.get('student_name'),
            email=data.get('email'),
            contact_number=data.get('contact_number'),
            department=data.get('department'),
            user=user_instance
        )
        student.save()
        return student

    @staticmethod
    def get_student(student_id):
        """Get a student by ID."""
        return StudentRepository.get_student_by_id(student_id)

    @staticmethod
    def get_students_by_user(user):
        """Get students linked to a user."""
        return StudentRepository.get_students_by_user(user)

    @staticmethod
    def update_student(student_id, data):
     """Update a student record."""
     student = StudentRepository.get_student_by_id(student_id)

     if not student:
        return None

    # Get new email and user (use existing values if not provided)
     new_email = data.get('email', student.email)
     new_user = data.get('user', student.user)

     print(f"DEBUG: Checking uniqueness for email {new_email}, user {new_user}, excluding ID {student_id}")

    # Ensure it excludes the current student properly
     if Student.objects.filter(email=new_email, user=new_user).exclude(student_id=student_id).exists():
        print(f"DEBUG: Found duplicate email for another student")
        raise ValueError("A student with this email already exists for the user.")

     return StudentRepository.update_student(student, data)




    @staticmethod
    def delete_student(student_id):
        """Soft delete a student."""
        student = StudentRepository.get_student_by_id(student_id)
        if student:
            StudentRepository.delete_student(student)
            return True
        return False