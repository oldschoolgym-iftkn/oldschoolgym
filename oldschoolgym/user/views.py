from .models import MyUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (MyUserSerializer, ConfirmMailSerializer,
                          MyUserSerializerToUpdate, MyUserSerializerToView,
                          MyTokenObtainPairSerializer)
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from chat.serializers import ChatSerializer
from .permissions import VerifiedOnly
from drf_yasg.utils import swagger_auto_schema
from .utils import get_header_params, get_query_params
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from rest_framework_simplejwt.views import TokenObtainPairView


class UserAPI(APIView):

    @method_decorator(cache_page(60 * 15, key_prefix='users'))
    @swagger_auto_schema(operation_description='To get all users.\nReturns a list with user (confirmed/unconfirmed).',
                         responses={200: MyUserSerializerToView(many=True)})
    def get(self, request, format=None):
        users = MyUser.objects.all()
        serialized_users = MyUserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description='To change user`s fields. Returns a updated user.',
                         responses={200: MyUserSerializer}, request_body=MyUserSerializerToUpdate,
                         manual_parameters=[get_query_params('user_id', 'User id to update')])
    def put(self, request, format=None):
        try:
            user = MyUser.objects.get(pk=request.query_params.get('user_id'))
        except MyUser.DoesNotExist:
            return Response({'id': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        user_serialized = MyUserSerializerToUpdate(user, request.data)
        if user_serialized.is_valid():
            user_serialized.save()
            return Response(user_serialized.data, status=status.HTTP_200_OK)
        else:
            return Response(user_serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(operation_description='To change user`s fields (partial). Returns a updated user.',
                         responses={200: MyUserSerializer}, request_body=MyUserSerializerToUpdate,
                         manual_parameters=[get_query_params('user_id', 'User id to update')])
    def patch(self, request, format=None):
        try:
            user = MyUser.objects.get(pk=request.query_params.get('user_id'))
        except MyUser.DoesNotExist:
            return Response({'id': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        user_serialized = MyUserSerializerToUpdate(
            user, request.data, partial=True)
        if user_serialized.is_valid():
            user_serialized.save()
            return Response(user_serialized.data, status=status.HTTP_200_OK)
        else:
            return Response(user_serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(operation_description='To delete user. Nothing to return.',
                         responses={204: {}}, manual_parameters=[get_query_params('user_id', 'User id to delete')])
    def delete(self, request, format=None):
        try:
            user = MyUser.objects.get(pk=request.query_params.get('user_id'))
        except MyUser.DoesNotExist:
            return Response({'id': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response({}, status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(operation_description='To create user. Returns a default user with unconfirmed email.',
                         request_body=MyUserSerializer, responses={200: MyUserSerializer})
    def post(self, request, format=None):
        user = MyUserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_200_OK)
        else:
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='post', request_body=ConfirmMailSerializer, manual_parameters=[get_header_params()],
                     operation_description='To confirm user email.')
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_email(request):
    serialized_data = ConfirmMailSerializer(data=request.data)
    if request.user.verifying.is_activate:
        return Response('User email has already confirmed!', status.HTTP_409_CONFLICT)
    if serialized_data.is_valid():
        if request.user.verifying.code == serialized_data.data['code']:
            request.user.verifying.is_activate = True
            request.user.verifying.save()
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'code': 'Code to confirm is uncorrect!'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='get', manual_parameters=[get_header_params()],
                     operation_description='To get user`s chats. Returns all chat, where user is a member.')
@cache_page(60 * 15)
@vary_on_headers("Authorization")
@api_view(['GET'])
@permission_classes([VerifiedOnly])
def get_all_chats(request):
    chats = MyUser.objects.get(pk=request.user.id).chats.all()
    serialized_chats = ChatSerializer(chats, many=True)
    return Response(serialized_chats.data, status=status.HTTP_200_OK)


@swagger_auto_schema(method='get', manual_parameters=[get_query_params("user_id", "User id")],
                     operation_description='To get user with specific id. Returns single user object.')
@cache_page(60 * 15)
@api_view(['GET'])
def get_user_by_id(request):
    try:
        user = MyUser.objects.get(pk=request.query_params.get('user_id'))
    except MyUser.DoesNotExist:
        return Response({'id': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
    user_serialized = MyUserSerializerToView(user)
    return Response(user_serialized.data, status=status.HTTP_200_OK)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
