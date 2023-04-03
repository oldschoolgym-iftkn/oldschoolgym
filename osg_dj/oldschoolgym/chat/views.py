from rest_framework.views import APIView
from .models import Chat
from .serializers import ChatSerializer, MessageSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from user.utils import get_header_params, get_query_params
from user.permissions import VerifiedOnly


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
    permission_classes = [VerifiedOnly]

    @swagger_auto_schema(manual_parameters=get_query_params('chat_id', 'Return messages history in chat')+get_header_params(),
                         responses={200: MessageSerializer(many=True)})  # CODE SMELL?
    def get(self, request, format=None):
        try:
            chat_id = int(request.query_params.get('chat_id'))
        except ValueError:
            return Response('Check the chat id!', status=status.HTTP_400_BAD_REQUEST)
        if Chat.objects.filter(pk=chat_id).exists():
            if request.user in Chat.objects.get(pk=chat_id).users.all():
                msg = Chat.objects.get(pk=chat_id).messages.all()
                serialized_msg = MessageSerializer(msg, many=True)
                return Response(serialized_msg.data, status=status.HTTP_200_OK)
            else:
                return Response('You dont have access to get this!', status=status.HTTP_403_FORBIDDEN)
        else:
            return Response('Chat with id could not be found!', status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(operation_description="Create message", request_body=MessageSerializer, responses={200: MessageSerializer},
                         manual_parameters=get_header_params())
    def post(self, request, format=None):
        msg = MessageSerializer(data=request.data)
        if msg.is_valid():
            if request.user in msg.validated_data.get('chat').users.all():
                msg.save(sender=request.user)
                return Response(msg.data, status=status.HTTP_200_OK)
            else:
                return Response({'detail': ['You dont have permission to this chat']}, status=status.HTTP_403_FORBIDDEN)
        return Response(msg.errors, status=status.HTTP_400_BAD_REQUEST)
