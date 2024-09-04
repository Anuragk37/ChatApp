from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class UserView(generics.ListCreateAPIView):
   queryset = User.objects.all()
   serializer_class = UserSerializer


class UserLoginView(APIView):
   def post(self, request):
      username = request.data.get("username")
      password = request.data.get("password")
      user = authenticate(username=username, password=password)
      if user:
         refresh = RefreshToken.for_user(user)
         return Response({
            "message": "Login Successful",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
         }, status=status.HTTP_200_OK)
      return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


