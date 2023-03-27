from django.urls import path
from .views import test_view, ChatAPIView, MessageAPIView

urlpatterns = [
    path('test/', test_view),
    path('api/chat/', ChatAPIView.as_view()),
    path('api/message/', MessageAPIView.as_view())
]
