import pytest
from datetime import timedelta
from django.utils import timezone  # Correção aqui
from weather.models import Weather
from propriedade.models import Propriedade
from users.models import User

@pytest.mark.django_db
def test_criacao_weather():
    user = User.objects.create_user(
        username='lucas123',
        name='Lucas',
        email='lucas@example.com',
        password='senha123',
        cpf='11122233344',
        role='agricultor'
    )
    propriedade = Propriedade.objects.create(
        nome='Sítio Lucas',
        area_total=50,
        latitude=-10.0,
        longitude=-40.0,
        agricultor=user
    )

    previsao = {
        "hoje": {"temp_min": 18, "temp_max": 27, "chuva": "leve"},
        "amanha": {"temp_min": 19, "temp_max": 28, "chuva": "moderada"}
    }

    weather = Weather.objects.create(
        propriedade=propriedade,
        data_forecast=previsao,
        data_expiration=timezone.now() + timedelta(days=1)  # Correção aqui
    )

    assert weather.propriedade == propriedade
    assert "hoje" in weather.data_forecast
