from django.urls import path
from .views import send_coach_application, send_user_application, get_confirmed_coaches

urlpatterns = [
    path('send_coach_application', send_coach_application),
    path('send_user_application', send_user_application),
    path('get_confirmed_coaches', get_confirmed_coaches)
]
