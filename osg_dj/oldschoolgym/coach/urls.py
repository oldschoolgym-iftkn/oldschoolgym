from django.urls import path
from .views import send_coach_application

urlpatterns = [
    path('send_application', send_coach_application)
]
