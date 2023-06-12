from .models import MyUser, UserVerification
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVerification
        exclude = ('id', 'code')
        read_only_fields = ('is_activate',)


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        exclude = ('user_permissions', 'groups')
        read_only_fields = ('created_at', 'is_superuser',
                            'is_staff', 'last_login', 'groups', 'verifying')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = MyUser.objects.create_user(**validated_data)
        return user


class MyUserSerializerToUpdate(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        exclude = ('user_permissions', 'groups', 'password', 'email')
        read_only_fields = ('created_at', 'is_superuser',
                            'is_staff', 'last_login', 'groups', 'verifying')


class MyUserSerializerToView(serializers.ModelSerializer):
    verifying = UserVerificationSerializer()

    class Meta:
        model = MyUser
        exclude = ('user_permissions', 'groups', 'password')
        read_only_fields = ('created_at', 'is_superuser',
                            'is_staff', 'last_login', 'groups', 'verifying')


class ConfirmMailSerializer(serializers.Serializer):
    code = serializers.CharField(min_length=6, max_length=6)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('avatar')