from django.urls import path
from .views import ChatAPIView, MessageAPIView, get_chat_by_id

urlpatterns = [
    path('api/chat/', ChatAPIView.as_view()),
    path('api/message/', MessageAPIView.as_view()),
    path('api/get_by_id/', get_chat_by_id),
]
