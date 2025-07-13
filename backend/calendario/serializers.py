from rest_framework import serializers

from .models import Crop, Region, State


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['name', 'plantios', 'colheitas', 'plantios_colheitas']


class RegionSerializer(serializers.ModelSerializer):
    states = StateSerializer(many=True, read_only=True)

    class Meta:
        model = Region
        fields = ['name', 'states']


class CropSerializer(serializers.ModelSerializer):
    regions = RegionSerializer(many=True, read_only=True)

    class Meta:
        model = Crop
        fields = ['name', 'regions']
