from .models import MyUser
from rest_framework import serializers


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        # fields = '__all__'
        exclude = ('user_permissions', 'groups')
        read_only_fields = ('created_at', 'is_superuser',
                            'is_staff', 'last_login', 'groups', 'user_permissions', 'verifying')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = MyUser.objects.create_user(**validated_data)
        return user
