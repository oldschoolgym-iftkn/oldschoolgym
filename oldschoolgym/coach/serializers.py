from rest_framework import serializers
from .models import Coach, UserApplication
from user.serializers import MyUserSerializerToView
import json


class CoachSerializerToView(serializers.ModelSerializer):
    user_profile = MyUserSerializerToView()

    class Meta:
        model = Coach
        fields = '__all__'
        read_only_fields = ('is_confirmed',)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['rates'] = json.loads(representation['rates'])
        return representation


class CoachSerializerToCreate(serializers.ModelSerializer):

    class Meta:
        model = Coach
        fields = '__all__'
        read_only_fields = ('is_confirmed',)
        extra_kwargs = {'user_profile': {'read_only': True}}

    def validate_rates(self, value):
        if len(value) > 5:
            raise serializers.ValidationError("The max count of rates is 5!")
        if (not all(isinstance(key, str) for key in value.keys())
                and not all(isinstance(val, int) for val in value.values())):
            raise serializers.ValidationError("Schema isn't followed (string:int)")
        if all(val > 5000 for val in value.values()):
            raise serializers.ValidationError("The max price is 5000")
        return json.dumps(value)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['rates'] = json.loads(representation['rates'])
        return representation


class UserApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserApplication
        fields = '__all__'
        read_only_fields = ('user', 'is_accepted')
