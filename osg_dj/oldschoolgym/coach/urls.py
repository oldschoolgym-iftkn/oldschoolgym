from django.urls import path
from .views import send_coach_application, send_user_application

urlpatterns = [
    path('send_coach_application', send_coach_application),
    path('send_user_application', send_user_application),
]
