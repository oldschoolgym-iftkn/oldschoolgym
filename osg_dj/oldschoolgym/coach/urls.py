from django.urls import path
from .views import send_coach_application, send_user_application, get_confirmed_coaches, get_my_application

urlpatterns = [
    path('api/send_coach_application', send_coach_application),
    path('api/send_user_application', send_user_application),
    path('api/get_confirmed_coaches', get_confirmed_coaches),
    path('api/get_my_applications', get_my_application)
]
