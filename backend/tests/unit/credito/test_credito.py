import pytest
from credito.serializers import SolicitacaoCreditoSerializer
from credito.serializers import SolicitacaoCreditoCreateSerializer
from credito.models import SolicitacaoCredito
from rest_framework import serializers

# @pytest.mark.django_db
# def test_criacao_credito():
#verificar se a criação de crédito é possível com atributos corretos
  # solicitacao1 = SolicitacaoCredito.objects.create(
  #   user = '',
  #   plantio = '',
  #   propriedade = '',
  #   score = '',
  #   status = '',
  #   created_at = '',
  #   updated_at = ''
  # )   
  # assert solicitacao1.user == ''
  # assert solicitacao1.plantio == ''
  # assert solicitacao1.propriedade == ''
  # assert solicitacao1.score == ''
  # assert solicitacao1.status == ''
  # assert solicitacao1.created_at == ''
  # assert solicitacao1.updated_at == ''

# @pytest.mark.django_db
# def test_criacao_campos_vazios():
#verificar se a criação de crédito é possível com atributos corretos
  # solicitacao1 = SolicitacaoCredito.objects.create(
  #   user = '',
  #   plantio = '',
  #   propriedade = '',
  #   score = '',
  #   status = '',
  #   created_at = '',
  #   updated_at = ''
  # )   
  # serializer = SolicitacaoCreditoCreateSerializer
  # assert solicitacao1.user == ''
  # assert solicitacao1.plantio == ''
  # assert solicitacao1.propriedade == ''
  # assert solicitacao1.score == ''
  # assert solicitacao1.status == ''
  # assert solicitacao1.created_at == ''
  # assert solicitacao1.updated_at == ''

