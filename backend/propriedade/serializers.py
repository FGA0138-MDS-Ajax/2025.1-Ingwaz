from rest_framework import serializers
from users.models import User
from .models import Propriedade
from decimal import Decimal

class PropriedadeSerializer(serializers.ModelSerializer):
    area_total = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=Decimal("0.01")
    )

    agricultor = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='agricultor'),
        required=False
    )

    agricultor_name = serializers.CharField(source='agricultor.name', read_only=True)
    agricultor_email = serializers.CharField(source='agricultor.email', read_only=True)
    coordinates = serializers.ReadOnlyField()

    class Meta:
        model = Propriedade
        fields = [
            'id',
            'nome',
            'area_total',
            'latitude',
            'longitude',
            'coordinates',
            'agricultor',
            'agricultor_name',
            'agricultor_email',
            'created_at',
            'updated_at'
        ]
        read_only_fields = [
            'id', 'created_at', 'updated_at', 'coordinates',
            'agricultor_name', 'agricultor_email'
        ]

    def validate(self, data):
        latitude = data.get('latitude')
        longitude = data.get('longitude')

        if latitude is not None and longitude is None:
            raise serializers.ValidationError("Se informar latitude, deve informar longitude também.")
        if longitude is not None and latitude is None:
            raise serializers.ValidationError("Se informar longitude, deve informar latitude também.")

        if latitude is not None and not (-90 <= latitude <= 90):
            raise serializers.ValidationError("Latitude deve estar entre -90 e 90 graus.")
        if longitude is not None and not (-180 <= longitude <= 180):
            raise serializers.ValidationError("Longitude deve estar entre -180 e 180 graus.")

        return data
