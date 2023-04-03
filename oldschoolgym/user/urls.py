from django.urls import path
from .views import UserAPI, confirm_email, get_all_chats, get_user_by_id
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
urlpatterns = [
    path('api/', UserAPI.as_view()),
    path('api/get_user_by_id/', get_user_by_id),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/confirm_mail/', confirm_email),
    path('api/get_chats/', get_all_chats),
]
