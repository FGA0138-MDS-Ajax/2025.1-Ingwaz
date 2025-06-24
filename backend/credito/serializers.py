from rest_framework import serializers
from .models import SolicitacaoCredito

class SolicitacaoCreditoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitacaoCredito
        fields = ['id', 'plantio', 'score', 'status']
        read_only_fields = ['score', 'status']