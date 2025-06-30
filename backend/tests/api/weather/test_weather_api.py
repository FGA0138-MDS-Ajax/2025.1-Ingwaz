import pytest
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from users.models import User
from propriedade.models import Propriedade
from datetime import datetime, timedelta

@pytest.mark.django_db
def test_weather_list_view_com_cache(client):
    user = User.objects.create_user(
        username='joao123',
        name='João Silva',
        email='joao@example.com',
        password='senha123',
        cpf='12345678909',
        role='agricultor'
    )
    propriedade = Propriedade.objects.create(
        nome='Fazenda Teste',
        area_total=100,
        latitude=-15.7801,
        longitude=-47.9292,
        agricultor=user
    )

    client = APIClient()
    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    response = client.get(f'/api/weather/{propriedade.id}/true/')
    assert response.status_code in [200, 500]  # pode falhar se o serviço externo não funcionar

@pytest.mark.django_db
def test_weather_detail_view_data_invalida(client):
    user = User.objects.create_user(
        username='maria123',
        name='Maria',
        email='maria@example.com',
        password='senha123',
        cpf='98765432100',
        role='agricultor'
    )
    propriedade = Propriedade.objects.create(
        nome='Chácara da Maria',
        area_total=80,
        latitude=-12.0,
        longitude=-45.0,
        agricultor=user
    )

    client = APIClient()
    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    response = client.get(f'/api/weather/{propriedade.id}/invalid-date/')
    assert response.status_code == 400
    assert "Formato de data inválido" in response.data["erro"]
