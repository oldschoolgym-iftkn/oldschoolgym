from rest_framework import serializers
from .models import Coach, UserApplication


class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = '__all__'
        read_only_fields = ('user_profile', 'is_confirmed')

    def create(self, validated_data):
        coach = Coach.objects.create(**validated_data)
        return coach

# Дописати валідацію, що відкинута може бути лише 1 заявка


class UserApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserApplication
        fields = '__all__'
        read_only_fields = ('user',)

    def create(self, validated_data):
        usr_appl = UserApplication.objects.create(**validated_data)
        return usr_appl
