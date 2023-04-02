from django.urls import path
from .views import test_view, ChatAPIView, MessageAPIView

urlpatterns = [
    path('api/chat/', ChatAPIView.as_view()),
    path('api/message/', MessageAPIView.as_view())
]
