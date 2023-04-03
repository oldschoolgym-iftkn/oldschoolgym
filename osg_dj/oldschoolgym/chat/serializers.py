from rest_framework import serializers
from .models import Chat, Message


class ChatSerializer(serializers.ModelSerializer):
    # users = MyUserSerializerToView(many=True)
    last_msg = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = '__all__'

    def last_msg(self, chat: Chat):
        return MessageSerializer(chat.messages.order_by('send_at').last()).data


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ('sender', 'send_at')
