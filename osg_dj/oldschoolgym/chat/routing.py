from django.urls import path, re_path
from .consumers import UserConsumer, ChatConsumer

websockets_urlpattern = [
    path('ws/', UserConsumer.as_asgi()),
    re_path(r'ws/chat/(?P<chat_name>\w+)/$', ChatConsumer.as_asgi())
]
