from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed
from .serializers import RegistrationSerializer, LoginSerializer
from .services import UserService

class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user_service = UserService()
            try:
                user = user_service.register_user(serializer.validated_data)
                return Response({
                    "message": "User registered successfully",
                    "user_id": str(user.userId)
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user_service = UserService()
            try:
                tokens = user_service.authenticate_user(
                    serializer.validated_data['user_name'],
                    serializer.validated_data['password']
                )
                return Response(tokens, status=status.HTTP_200_OK)
            except AuthenticationFailed as e:
                return Response({"message": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
