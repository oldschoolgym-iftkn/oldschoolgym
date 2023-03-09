from rest_framework.serializers import ModelSerializer
from .models import Coach


class CoachSerializer(ModelSerializer):
    class Meta:
        model = Coach
