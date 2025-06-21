from rest_framework import serializers
from .models import Credito

class CreditoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credito
        fields = ['id', 'amount', 'status']