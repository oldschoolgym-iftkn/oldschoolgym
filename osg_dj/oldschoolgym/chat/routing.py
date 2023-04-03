from django.urls import re_path
from .consumers import ChatConsumer

websockets_urlpattern = [
    re_path(r'ws/chat/(?P<chat_name>\w+)/$', ChatConsumer.as_asgi()),
]
