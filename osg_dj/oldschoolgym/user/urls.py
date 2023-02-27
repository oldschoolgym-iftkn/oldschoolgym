from django.urls import path
from .views import get_users, UserAPI
urlpatterns = [
    path('', get_users),
    path('api/', UserAPI.as_view())
]
