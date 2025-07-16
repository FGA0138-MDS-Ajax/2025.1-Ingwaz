import pytest
from credito.serializers import SolicitacaoCreditoSerializer
from credito.serializers import SolicitacaoCreditoCreateSerializer
from credito.models import SolicitacaoCredito
from rest_framework import serializers
from users.models import User 
from propriedade.models import Propriedade
from plantios.models import Plantio
from datetime import date, timedelta, datetime
from credito.views import SolicitacaoCreditoListView
from django.utils import timezone

@pytest.mark.django_db
def test_criacao_credito():
#verificar se a criação de crédito é possível com atributos corretos
  usuario1 = User.objects.create_user(
        username='joao123',
        name='joao',
        email='joao@uol.com.br',
        password='senha123',
        role='agricultor',
        cpf='123.456.789-09'
    )

  propriedade1 = Propriedade.objects.create(
    nome = 'chácara feliz',
    area_total = 450,
    latitude=-15.6,
    longitude=-46.6,
    agricultor = usuario1
  )

  plantio1 = Plantio.objects.create(
    cultura = 'Soja',
    area = 30,
    data = str(date.today()),
    estimativa_colheita = str(date.today()),
    propriedade = propriedade1
  ) 
    
  solicitacao1 = SolicitacaoCredito.objects.create(
    user = usuario1,
    plantio = plantio1,
    propriedade = propriedade1,
    score = 1.0,
    status = 'aprovado',
    created_at = str(date.today()),
    updated_at = str(date.today())
  )  

  assert solicitacao1.score == 1.0
  assert solicitacao1.status == 'aprovado'
  assert abs((solicitacao1.created_at - timezone.now()).total_seconds()) < 5
  # Permite diferença de até 5 segundos para evitar falha por milissegundos/UTC
  assert abs((solicitacao1.updated_at - timezone.now()).total_seconds()) < 5

@pytest.mark.django_db
def test_criacao_sem_score():
#verificar se ele aceita a criação de uma solicitação sem um campo optativo
  usuario1 = User.objects.create_user(
      username='joao123', 
      name='Joao', 
      email='joao@uol.com.br',
      password='senha123', 
      role='agricultor', 
      cpf='123.456.789-09'
  )
  propriedade1 = Propriedade.objects.create(
      nome='Chácara feliz', 
      area_total=450, 
      latitude=-15.6, 
      longitude=-46.6, 
      agricultor=usuario1
  )
  plantio1 = Plantio.objects.create(
      cultura='Soja', 
      area=30, 
      data=date.today(), 
      estimativa_colheita=date.today(), 
      propriedade=propriedade1
  )
  solicitacao1 = SolicitacaoCredito.objects.create(
      user=usuario1, 
      plantio=plantio1, 
      propriedade=propriedade1, 
      status='aprovado'
  )
  assert solicitacao1.score is None or solicitacao1.score == 0

@pytest.mark.django_db
def test_credito_status_invalido():
#verificar se ocorre a criação de uma solicitação com status inválido
  usuario1 = User.objects.create_user(
      username = 'joao123', 
      name = 'Joao', 
      email = 'joao@uol.com.br',
      password = 'senha123', 
      role = 'agricultor', 
      cpf = '123.456.789-09'
  )
  propriedade1 = Propriedade.objects.create(
      nome = 'Chácara feliz', 
      area_total = 450, 
      latitude = -15.6, 
      longitude = -46.6, 
      agricultor = usuario1
  )
  plantio1 = Plantio.objects.create(
      cultura = 'Soja', 
      area = 30, 
      data = date.today(), 
      estimativa_colheita = date.today(), 
      propriedade = propriedade1
  )
  with pytest.raises(Exception):
    dados = {
      'user': usuario1,
      'plantio': plantio1,
      'propriedade': propriedade1,
      'score': 1.0,
      'status': 'nenhumstatus'
    }
    serializer = SolicitacaoCreditoSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'status' in serializer.errors

@pytest.mark.django_db
def test_str_solicitacao():
#verificar se a string retorna a mesma que está em credito.models
  user = User.objects.create_user(
      username = 'joao123', 
      name = 'Joao', 
      email = 'joao@uol.com.br',
      password = 'senha123', 
      role = 'agricultor', 
      cpf = '123.456.789-09'
  )
  propriedade1 = Propriedade.objects.create(
      nome = 'Chácara feliz', 
      area_total = 450, 
      latitude = -15.6, 
      longitude = -46.6, 
      agricultor = user
  )
  plantio1 = Plantio.objects.create(
      cultura = 'Soja', 
      area = 30, 
      data = date.today(), 
      estimativa_colheita = date.today(), 
      propriedade = propriedade1
  )
  solicitacao1 = SolicitacaoCredito.objects.create(
    user = user,
    plantio = plantio1,
    propriedade = propriedade1,
    score = 1.0,
    status = 'pendente'
  )
  assert str(solicitacao1) == f"Solicitação {solicitacao1.id} - Status: {solicitacao1.status} - User: {solicitacao1.user.email}"

@pytest.mark.django_db
def test_atualizacao_score():
#verificar se o status é corretamente atualizado
  user = User.objects.create_user(
      username = 'joao123', 
      name = 'Joao', 
      email = 'joao@uol.com.br',
      password = 'senha123', 
      role = 'agricultor', 
      cpf = '123.456.789-09'
  )
  propriedade1 = Propriedade.objects.create(
      nome = 'Chácara feliz', 
      area_total = 450, 
      latitude = -15.6, 
      longitude = -46.6, 
      agricultor = user
  )
  plantio1 = Plantio.objects.create(
      cultura = 'Soja', 
      area = 30, 
      data = date.today(), 
      estimativa_colheita = date.today(), 
      propriedade = propriedade1
  )
  solicitacao1 = SolicitacaoCredito.objects.create(
    user = user,
    plantio = plantio1,
    propriedade = propriedade1,
    score = 0.9,
    status = 'aprovado'
  )

  solicitacao1.score = 1.0
  solicitacao1.save()
  assert solicitacao1.score == 1.0

@pytest.mark.django_db
def test_solicitacao_sem_usuario():
#verificar se é possível criar solicitação sem usuário associado
  usuario1 = User.objects.create_user(
      username = 'joao123', 
      name = 'Joao', 
      email = 'joao@uol.com.br',
      password = 'senha123', 
      role = 'agricultor', 
      cpf = '123.456.789-09'
  )
  propriedade1 = Propriedade.objects.create(
      nome = 'Chácara feliz', 
      area_total = 450, 
      latitude = -15.6, 
      longitude = -46.6, 
      agricultor = usuario1
  )
  plantio1 = Plantio.objects.create(
      cultura = 'Soja', 
      area = 30, 
      data = date.today(), 
      estimativa_colheita = date.today(), 
      propriedade = propriedade1
  )
  with pytest.raises(Exception):
    SolicitacaoCredito.objects.create(
    user = None,
    plantio = plantio1,
    propriedade = propriedade1,
    score = 1.0,
    status = 'aprovado'
  )

@pytest.mark.django_db
def test_analista_acessando_solicitacao(django_user_model):
#verificar se analista consegue acessar solicitações
  analista = django_user_model.objects.create_user(
      username = 'joao123', 
      name = 'Joao', 
      email = 'joao@uol.com.br',
      password = 'senha123', 
      role = 'analista', 
      cpf = '123.456.789-09'
  )
  agricultor = django_user_model.objects.create_user(
      username = 'fabio123', 
      name = 'Fabio', 
      email = 'fabio@hotmail.com.br',
      password = 'senhaok123', 
      role = 'agricultor', 
      cpf = '987.654.321-00'
  )
  propriedade1 = Propriedade.objects.create(
      nome = 'Chácara feliz', 
      area_total = 450, 
      latitude = -15.6, 
      longitude = -46.6, 
      agricultor = agricultor
  )
  plantio1 = Plantio.objects.create(
      cultura = 'Soja', 
      area = 30, 
      data = date.today(), 
      estimativa_colheita = date.today(), 
      propriedade = propriedade1
  )
  solicitacao1 = SolicitacaoCredito.objects.create(
    user = agricultor,
    plantio = plantio1,
    propriedade = propriedade1,
    score = 1.0,
    status = 'pendente'
  )
  class SimulacaoAnalise:
    user = analista
  view = SolicitacaoCreditoListView()
  view.request = SimulacaoAnalise()
  queryset = view.get_queryset()
  assert solicitacao1 in queryset
