from rest_framework import serializers
from .models import Coach, UserApplication
from user.serializers import MyUserSerializerToView


class CoachSerializer(serializers.ModelSerializer):
    user_profile = MyUserSerializerToView()

    class Meta:
        model = Coach
        fields = '__all__'
        read_only_fields = ('user_profile', 'is_confirmed')


class UserApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserApplication
        fields = '__all__'
        read_only_fields = ('user', 'is_accepted')
