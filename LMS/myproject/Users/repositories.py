from .models import User
from django.contrib.auth.hashers import make_password

class UserRepository:
    def create_user(self, user_data):
        # Ensure the password is hashed
        user = User.objects.create_user(
            user_name=user_data["user_name"],
            password=user_data["password"]
        )
        return user
    def get_user_by_username(self, user_name):
        try:
            return User.objects.get(user_name=user_name.lower())
        except User.DoesNotExist:
            return None
    
    def validate_password(self, user, password):
        return user.check_password(password)  