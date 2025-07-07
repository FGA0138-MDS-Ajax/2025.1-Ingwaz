from rest_framework import serializers
from .models import SolicitacaoCredito

class SolicitacaoCreditoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitacaoCredito
        fields = ['id', 'plantio', 'propriedade', 'finalidade', 'valor_solicitado', 'status', 'user', 'created_at', 'updated_at']
        read_only_fields = ['id', 'propriedade', 'status', 'user', 'created_at', 'updated_at'] 


class SolicitacaoCreditoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitacaoCredito
        fields = ['id', 'plantio', 'propriedade', 'finalidade', 'valor_solicitado', 'score', 'status', 'user', 'created_at', 'updated_at']
        read_only_fields = ['id', 'propriedade', 'score', 'status', 'user', 'created_at', 'updated_at']