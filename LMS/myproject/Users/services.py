from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from .repositories import UserRepository

class UserService:
    def __init__(self):
        self.repo = UserRepository()
    
    def register_user(self, data):
        return self.repo.create_user(data)
    
    def authenticate_user(self, user_name, password):
        user = self.repo.get_user_by_username(user_name)
        if not user:
            raise AuthenticationFailed("Invalid username or password")
        
        if not user.is_active:
            raise AuthenticationFailed("User account is inactive")

        if not user.check_password(password):  # Proper password verification
            raise AuthenticationFailed("Invalid username or password")

        refresh = RefreshToken.for_user(user)
        return {
            "user_id": str(user.userId),
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh)
        }
