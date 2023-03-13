from user.permissions import VerifiedCoachOnly
from rest_framework.decorators import api_view, permission_classes
from .serializers import CoachSerializer
from rest_framework.response import Response
from rest_framework import status
from user.utils import get_header_params
from drf_yasg.utils import swagger_auto_schema
from .models import Coach


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
