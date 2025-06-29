from rest_framework import serializers
from .models import Weather

class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ['data_forecast','data_creation','data_expiration']