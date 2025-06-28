import pytest
from credito.serializers import SolicitacaoCreditoSerializer
from credito.serializers import SolicitacaoCreditoCreateSerializer
from credito.models import SolicitacaoCredito
from rest_framework import serializers
from users.models import User 
from propriedade.models import Propriedade
from plantios.models import Plantio
from datetime import date, timedelta, datetime
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.urls import reverse

@pytest.mark.django_db
#verificar a criação de uma solicitação de crédito válida via API
def test_api_criacao_credito(django_user_model):
  usuario1 = django_user_model.objects.create_user(
    username = '@fabio123',
    email = 'fabio@yahoo.com.br',
    password = 'senhamedia123',
    role = 'analista',
    cpf = '123.456.789-09',
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
  
  token = Token.objects.create(user=usuario1)
  client = APIClient()
  client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

  dados = {
    'plantio': plantio1.id,
    'propriedade': propriedade1.id,
    'score': 1.0,
    'status': 'aprovado'
  }

  url = reverse('solicitacao-register')
  response = client.post(url, dados)
  assert response.status_code == 201

@pytest.mark.django_db
def test_api_dados_invalidos(django_user_model):
#verificar a criação de solicitação de créditos inválida via API
  usuario1 = django_user_model.objects.create_user(
    username = '@fabio123',
    email = 'fabio@yahoo.com.br',
    password = 'senhamedia123',
    role = 'analista',
    cpf = '123.456.789-09',
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
  
  token = Token.objects.create(user=usuario1)
  client = APIClient()
  client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

  dados = {
    'plantio': '',
    'propriedade': '',
    'score': 'bem alto',
    'status': 'inexistente'
  }

  url = reverse('solicitacao-register')
  response = client.post(url, dados)
  assert response.status_code == 400

@pytest.mark.django_db
#verificar se um analista autenticado consegue listar as solicitações de crédito
def test_api_lista_solicitacoes(django_user_model):
  usuario1 = django_user_model.objects.create_user(
    username = '@fabio123',
    email = 'fabio@yahoo.com.br',
    password = 'senhamedia123',
    role = 'analista',
    cpf = '123.456.789-09',
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
  
  token = Token.objects.create(user=usuario1)
  client = APIClient()
  client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

  dados = {
    'plantio': plantio1.id,
    'propriedade': propriedade1.id,
    'score': 1.0,
    'status': 'aprovado'
  }

  url = reverse('solicitacao-list')
  response = client.get(url)
  assert response.status_code == 200

@pytest.mark.django_db
#verificar se a API bloqueia requisições sem autenticação
def test_api_permissao_sem_autenticacao(client, django_user_model):
  usuario1 = django_user_model.objects.create_user(
    username = '@fabio123',
    email = 'fabio@yahoo.com.br',
    password = 'senhamedia123',
    role = 'analista',
    cpf = '123.456.789-09',
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
  
  dados = {
    'plantio': plantio1.id,
    'propriedade': propriedade1.id,
    'score': 1.0,
    'status': 'aprovado'
  }
  
  url = reverse('solicitacao-register')
  response = client.post(url, dados)
  assert response.status_code == 401
  
  url = reverse('solicitacao-list')
  response = client.post(url, dados)
  assert response.status_code == 401

@pytest.mark.django_db
#verificar se o status é corretamente atualizado na view
def test_api_atualizacao_status(django_user_model):
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

  token = Token.objects.create(user=usuario1)
  client = APIClient()
  client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

  url = reverse('solicitacao-avaliar', kwargs={'solicitacao_id': solicitacao1.id})
  response = client.get(url)

  assert response.status_code == 200
  data = response.json()
  assert data['solicitacao']['id'] == solicitacao1.id
  assert 'score_gerado' in data
  assert 'novo_status' in data
  assert data['novo_status'] in ['aprovado', 'analise', 'rejeitado']

@pytest.mark.django_db
#verificar se analista pode ver todas as solicitações e agricultor somente as dele
def test_api_filtro(django_user_model):
  #analista
  usuario1 = User.objects.create_user(
        username='fabio123',
        name='fabio',
        email='fabio@gmail.com.br',
        password='senha123',
        role='analista',
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
  #agricultor
  usuario2 = User.objects.create_user(
        username='pedro123',
        name='pedro',
        email='pedro@hotmail.com.br',
        password='senha123',
        role='agricultor',
        cpf='987.654.321-00'
    )

  propriedade2 = Propriedade.objects.create(
    nome = 'chácara raiz',
    area_total = 320,
    latitude=-16.6,
    longitude=-45.6,
    agricultor = usuario1
  )

  plantio2 = Plantio.objects.create(
    cultura = 'Milho',
    area = 35,
    data = str(date.today()),
    estimativa_colheita = str(date.today()),
    propriedade = propriedade1
  ) 
    
  solicitacao2 = SolicitacaoCredito.objects.create(
    user = usuario2,
    plantio = plantio2,
    propriedade = propriedade2,
    score = 0.9,
    status = 'analise',
    created_at = str(date.today()),
    updated_at = str(date.today())
  )  

  #Autenticação do analista, que deve ter permissão de enxergar todas as solicitações
  token = Token.objects.create(user=usuario1)
  client = APIClient()
  client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

  url = reverse('solicitacao-list')
  response = client.get(url)

  assert response.status_code == 200
  data = response.json()
  assert len(data) == 2 #solicitações criadas do agricultor e analista

  #Autenticação do agricultor
  token = Token.objects.create(user=usuario2)
  client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

  url = reverse('solicitacao-list')
  response = client.get(url)
  data = response.json()
  assert len(data) == 1
  assert data[0]['user'] == usuario2.id

@pytest.mark.django_db
def test_avaliacao_solicitacao_pelo_analista(django_user_model):
#verificar se o analista pode acessar e avaliar solicitações
  analista = django_user_model.objects.create_user(
        username='fabio123',
        email='fabio@gmail.com.br',
        password='senha123',
        role='analista',
        cpf='123.456.789-09'
  )  
  agricultor = django_user_model.objects.create_user(
        username='joao123',
        email='joao@gmail.com.br',
        password='senhamedia123',
        role='agricultor',
        cpf='987.654.321-00'
  )  

  propriedade1 = Propriedade.objects.create(
    nome = 'chácara raiz',
    area_total = 320,
    latitude=-16.6,
    longitude=-45.6,
    agricultor = agricultor
  )

  plantio1 = Plantio.objects.create(
    cultura = 'Milho',
    area = 35,
    data = str(date.today()),
    estimativa_colheita = str(date.today()),
    propriedade = propriedade1
  ) 
    
  solicitacao1 = SolicitacaoCredito.objects.create(
    user = agricultor,
    plantio = plantio1,
    propriedade = propriedade1,
    score = 0.9,
    status = 'pendente',
    created_at = str(date.today()),
    updated_at = str(date.today())
  )  

  token = Token.objects.create(user=analista)
  client = APIClient()
  client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
  url = reverse('solicitacao-avaliar', kwargs={'solicitacao_id': solicitacao1.id})
  response = client.get(url)
  assert response.status_code == 200
  data = response.json()
  assert data['solicitacao']['id'] == solicitacao1.id
  assert data['novo_status'] in ['aprovado', 'analise', 'rejeitado']
  solicitacao1.refresh_from_db()
  assert solicitacao1.status == data['novo_status']
