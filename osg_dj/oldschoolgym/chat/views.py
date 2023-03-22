from django.shortcuts import render
from rest_framework.views import APIView
from .models import Chat
from .serializers import ChatSerializer, MessageSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import permission_classes
from .utils import get_query_params
from user.permissions import VerifiedOnly


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


class MessageAPIView(APIView):
    @swagger_auto_schema(manual_parameters=get_query_params('chat_id', 'Return messages history in chat'),
                         responses={200: MessageSerializer(many=True)})
    @permission_classes([VerifiedOnly])
    def get(self, request, format=None):
        try:
            chat_id = int(request.query_params.get('chat_id'))
        except:
            return Response('Check the chat id!', status=status.HTTP_400_BAD_REQUEST)
        # TODO: check if user has access to get history of this chat
        if Chat.objects.filter(pk=chat_id).exists():
            msg = Chat.objects.get(pk=chat_id).messages.all()
            serialized_msg = MessageSerializer(msg, many=True)
            return Response(serialized_msg.data, status=status.HTTP_200_OK)
        else:
            return Response('Chat with id could not be found!', status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(operation_description="Create message", request_body=MessageSerializer, responses={200: MessageSerializer})
    @permission_classes([VerifiedOnly])
    def post(self, request, format=None):
        msg = MessageSerializer(data=request.data)
        # TODO: CHeck if user has access to this chat
        if msg.is_valid():
            msg.save()
            return Response(msg.data, status=status.HTTP_200_OK)
        return Response(msg.errors, status=status.HTTP_400_BAD_REQUEST)
