from user.permissions import VerifiedCoachOnly, VerifiedUserOnly
from rest_framework.decorators import api_view, permission_classes
from .serializers import CoachSerializer, UserApplicationSerializer
from rest_framework.response import Response
from rest_framework import status
from user.utils import get_header_params
from drf_yasg.utils import swagger_auto_schema
from .models import Coach
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers


@swagger_auto_schema(method='get')
@cache_page(60*60)
def get_confirmed_coaches(request):
    coaches = Coach.objects.filter(
        is_confirmed=True).select_related('user_profile').all()
    serialized_data = CoachSerializer(coaches, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)


@swagger_auto_schema(method='post', request_body=CoachSerializer, manual_parameters=get_header_params())
@api_view(['POST',])
@permission_classes([VerifiedCoachOnly])
def send_coach_application(request):
    if Coach.objects.filter(user_profile=request.user.id).exists():
        return Response('You already have sent the application!', status=status.HTTP_409_CONFLICT)
    serialized_data = CoachSerializer(
        data=request.data)
    if serialized_data.is_valid():
        serialized_data.save(user_profile=request.user)
        return Response(serialized_data.data, status=status.HTTP_200_OK)
    return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='post', request_body=UserApplicationSerializer, manual_parameters=get_header_params())
@api_view(['POST',])
@permission_classes([VerifiedUserOnly])
def send_user_application(request):
    user_application = UserApplicationSerializer(data=request.data)
    if user_application.is_valid():
        user_application.save(user=request.user)
        return Response(user_application.data, status=status.HTTP_200_OK)
    return Response(user_application.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='get', response={200: UserApplicationSerializer(many=True)}, manual_parameters=get_header_params())
@cache_page(60*15)
@vary_on_headers("Authorization",)
@api_view(['GET',])
@permission_classes([VerifiedCoachOnly])
def get_my_application(request):
    my_applications = UserApplicationSerializer(
        Coach.objects.get(user_profile=request.user).user_applications.all(), many=True)
    return Response(my_applications.data, status=status.HTTP_200_OK)
