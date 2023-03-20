from django.shortcuts import render
from rest_framework.views import APIView
from .models import Chat
from .serializers import ChatSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


def test_view(request):
    return render(request, 'index.html', {})


class ChatAPIView(APIView):
    @swagger_auto_schema(operation_description="Get all chats", responses={200: ChatSerializer(many=True)})
    def get(self, request, format=None):
        all_chats = Chat.objects.all()
        serialized_chats = ChatSerializer(all_chats, many=True)
        return Response(serialized_chats.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description="Create chat", request_body=ChatSerializer, responses={200: ChatSerializer})
    def post(self, request, format=None):
        chat = ChatSerializer(data=request.data)
        if chat.is_valid():
            chat.save()
            return Response(chat.data, status=status.HTTP_200_OK)
        return Response(chat.errors, status=status.HTTP_400_BAD_REQUEST)
