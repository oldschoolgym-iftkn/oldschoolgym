from django.urls import path
from .views import test_view, ChatAPIView, MessageAPIView

urlpatterns = [
    path('test/', test_view),
    path('chat/', ChatAPIView.as_view()),
    path('message/', MessageAPIView.as_view())
]
