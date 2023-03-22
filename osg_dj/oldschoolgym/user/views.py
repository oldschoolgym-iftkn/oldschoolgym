from .models import MyUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MyUserSerializer, ConfirmMailSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from chat.serializers import ChatSerializer
from .permissions import VerifiedOnly
from drf_yasg.utils import swagger_auto_schema
from .utils import get_header_params


class UserAPI(APIView):

    @swagger_auto_schema(operation_description="Get all users", responses={200: MyUserSerializer(many=True)})
    def get(self, request, format=None):
        users = MyUser.objects.all()
        serialized_users = MyUserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description="Create user", request_body=MyUserSerializer, responses={200: MyUserSerializer})
    def post(self, request, format=None):
        user = MyUserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_200_OK)
        else:
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='post', request_body=ConfirmMailSerializer, manual_parameters=get_header_params())
@api_view(['POST',])
@permission_classes([IsAuthenticated])
def confirm_email(request):
    serialized_data = ConfirmMailSerializer(data=request.data)
    if request.user.verifying.is_activate:
        return Response('User email has already confirmed!', status.HTTP_409_CONFLICT)
    if serialized_data.is_valid():
        if request.user.verifying.code == serialized_data.data['code']:
            request.user.verifying.is_activate = True
            request.user.verifying.save()
            return Response('The mail was successfully confirmed!', status=status.HTTP_200_OK)
        else:
            return Response('Code to confirm is uncorrect!', status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='get', manual_parameters=get_header_params())
@api_view(['GET',])
@permission_classes([VerifiedOnly])
def get_all_chats(request):
    chats = MyUser.objects.get(pk=request.user.id).chats.all()
    serialized_chats = ChatSerializer(chats, many=True)
    return Response(serialized_chats.data, status=status.HTTP_200_OK)
