from .models import MyUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MyUserSerializer
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema


class TestMe(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        return Response({'status': '200'}, status=status.HTTP_200_OK)


class UserAPI(APIView):
    """API with user"""

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
