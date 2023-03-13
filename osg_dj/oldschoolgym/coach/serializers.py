from rest_framework.serializers import ModelSerializer
from .models import Coach


class CoachSerializer(ModelSerializer):
    class Meta:
        model = Coach
        fields = '__all__'
        read_only_fields = ('user_profile', 'is_confirmed')

    def create(self, validated_data):
        coach = Coach.objects.create(**validated_data)
        return coach
