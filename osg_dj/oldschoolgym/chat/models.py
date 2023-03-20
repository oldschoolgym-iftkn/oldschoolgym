from django.db import models
from user.models import MyUser


class Chat(models.Model):
    users = models.ManyToManyField(MyUser, related_name='chats')


class Message(models.Model):
    chat = models.ForeignKey(
        Chat, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(
        MyUser, on_delete=models.CASCADE, related_name='sender')
    message = models.CharField(max_length=255)
    send_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender.first_name} {self.sender.last_name} - {self.send_at}'
