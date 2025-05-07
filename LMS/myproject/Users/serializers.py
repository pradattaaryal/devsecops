from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userId', 'user_name', 'is_active', 'is_staff', 'created_date', 'updated_date']

class RegistrationSerializer(serializers.Serializer):
    user_name = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

class TokenSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

class LoginSerializer(serializers.Serializer):
    user_name = serializers.CharField()
    password = serializers.CharField()
