from django.shortcuts import render
from rest_framework import generics
from .models import ChatRoom
from .serializers import ChatRoomSerializer
# Create your views here.

class ChatRoomView(generics.ListCreateAPIView):
   queryset = ChatRoom.objects.all()
   serializer_class = ChatRoomSerializer
