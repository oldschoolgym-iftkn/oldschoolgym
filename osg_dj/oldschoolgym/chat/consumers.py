from user.models import MyUser
from .models import Chat, Message
from .serializers import MessageSerializer
from user.serializers import MyUserSerializer
from djangochannelsrestframework import mixins
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.contrib.auth.models import AnonymousUser
import json


class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["chat_name"]
        self.room_group_name = f"chat_{self.room_name}"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        chat = Chat.objects.get(id=int(self.room_name))
        sender = self.scope['user']
        new_message = Message.objects.create(
            sender=sender,
            message=message,
            chat=chat,
        )
        serialized_msg = MessageSerializer(new_message)
        chat_type = {"type": "chat_message"}
        return_dict = {**chat_type, **dict(serialized_msg.data)}
        if not isinstance(sender, AnonymousUser) and sender in chat.users.all():
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                return_dict,
            )

    def chat_message(self, event):
        dict_to_send = event.copy()
        dict_to_send.pop('type')
        self.send(
            text_data=json.dumps(
                dict_to_send
            )
        )
