from django.urls import path
from .consumers import UserConsumer

websockets_urlpattern = [
    path('ws/', UserConsumer.as_asgi()),
]
