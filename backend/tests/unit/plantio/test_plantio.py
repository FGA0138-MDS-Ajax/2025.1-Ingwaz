import pytest
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from users.models import User
from propriedade.models import Propriedade
from plantios.models import Plantio
from datetime import date, timedelta

@pytest.mark.django_db
def test_criacao_plantio_sucesso():
    user = User.objects.create_user(
        username='joao123',
        name='Joao',
        email='joao@example.com',
        password='senha123',
        role='agricultor',
        cpf='123.456.789-09'
    )
    propriedade = Propriedade.objects.create(
        nome='Fazenda A',
        area_total=100.00,
        latitude=-15.7801,
        longitude=-47.9292,
        agricultor=user
    )

    client = APIClient()
    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    response = client.post('/api/plantios/', {
        'cultura': 'Milho',
        'area': 50.00,
        'data': str(date.today()),
        'estimativa_colheita': str(date.today() + timedelta(days=30)),
        'propriedade': propriedade.id
    }, format='json')

    assert response.status_code == 201
    assert Plantio.objects.count() == 1


@pytest.mark.django_db
def test_plantio_com_data_invalida():
    user = User.objects.create_user(
        username='ana123',
        name='Ana',
        email='ana@example.com',
        password='senha123',
        role='agricultor'
    )
    propriedade = Propriedade.objects.create(
        nome='Sítio Ana',
        area_total=200.00,
        latitude=-15.8,
        longitude=-47.9,
        agricultor=user
    )

    client = APIClient()
    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    response = client.post('/api/plantios/', {
        'cultura': 'Soja',
        'area': 80.00,
        'data': str(date.today()),
        'estimativa_colheita': str(date.today() - timedelta(days=5)),
        'propriedade': propriedade.id
    }, format='json')

    assert response.status_code == 400
    assert 'non_field_errors' in response.data


@pytest.mark.django_db
def test_plantio_em_propriedade_de_outro_usuario():
    user1 = User.objects.create_user(
        username='lucas123',
        name='Lucas',
        email='lucas@example.com',
        password='senha123',
        role='agricultor',
        cpf='123.456.789-09'
    )
    user2 = User.objects.create_user(
        username='maria123',
        name='Maria',
        email='maria@example.com',
        password='senha123',
        role='agricultor',
        cpf='987.654.321-00'
    )
    propriedade = Propriedade.objects.create(
        nome='Chácara Maria',
        area_total=300.00,
        latitude=-16.0,
        longitude=-48.0,
        agricultor=user2
    )

    client = APIClient()
    token = Token.objects.create(user=user1)
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    response = client.post('/api/plantios/', {
        'cultura': 'Feijão',
        'area': 30.00,
        'data': str(date.today()),
        'estimativa_colheita': str(date.today() + timedelta(days=60)),
        'propriedade': propriedade.id
    }, format='json')

    assert response.status_code == 400
    assert 'propriedade' in response.data


@pytest.mark.django_db
def test_listar_plantios_usuario_autenticado():
    user = User.objects.create_user(
        username='carlos123',
        name='Carlos',
        email='carlos@example.com',
        password='senha123',
        role='agricultor'
    )
    propriedade = Propriedade.objects.create(
        nome='Fazenda Carlos',
        area_total=120.00,
        latitude=-14.5,
        longitude=-47.5,
        agricultor=user
    )
    Plantio.objects.create(
        cultura='Algodão',
        area=70.00,
        data=date.today(),
        estimativa_colheita=date.today() + timedelta(days=45),
        propriedade=propriedade
    )

    client = APIClient()
    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    response = client.get('/api/plantios/')

    assert response.status_code == 200
    assert isinstance(response.data, list)
    assert any(item['cultura'] == 'Algodão' for item in response.data)


@pytest.mark.django_db
def test_plantio_sem_autenticacao():
    client = APIClient()
    response = client.get('/api/plantios/')
    assert response.status_code == 401
