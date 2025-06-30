import pytest
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.urls import reverse
from users.models import User
from propriedade.models import Propriedade

@pytest.mark.django_db
class TestPropriedadeAPI:

    @pytest.fixture
    def agricultor(self):
        return User.objects.create_user(
            username='agri1',
            email='agri@example.com',
            password='123456',
            role='agricultor',
            cpf='11111111111'
        )

    @pytest.fixture
    def tecnico(self):
        return User.objects.create_user(
            username='tec1',
            email='tec@example.com',
            password='123456',
            role='tecnico',
            cpf='33333333333'
        )

    @pytest.fixture
    def client_auth(self, agricultor):
        client = APIClient()
        token = Token.objects.create(user=agricultor)
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        return client

    def test_criacao_sucesso(self, client_auth):
        response = client_auth.post(reverse('propriedade-list-create'), {
            "nome": "Sítio Verde",
            "area_total": 50.00,
            "latitude": -15.78,
            "longitude": -47.93
        })
        assert response.status_code == 201
        assert response.data["nome"] == "Sítio Verde"

    def test_area_total_negativa(self, client_auth):
        response = client_auth.post(reverse('propriedade-list-create'), {
            "nome": "Área Inválida",
            "area_total": -10
        })
        # Adapte de acordo com a mensagem que quiser (customizada ou padrão)
        assert response.status_code == 400
        assert "Ensure this value is greater than or equal to 0.01." in str(response.data)

    def test_latitude_sem_longitude(self, client_auth):
        response = client_auth.post(reverse('propriedade-list-create'), {
            "nome": "Coord Inválida",
            "area_total": 10,
            "latitude": 10
        })
        assert response.status_code == 400
        assert "longitude" in str(response.data)

    def test_tecnico_nao_pode_criar(self, tecnico):
        client = APIClient()
        token = Token.objects.create(user=tecnico)
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        response = client.post(reverse('propriedade-list-create'), {
            "nome": "Não pode",
            "area_total": 10,
            "latitude": -10.0,
            "longitude": -47.0
        })
        assert response.status_code == 400
        assert "Apenas agricultores podem criar" in str(response.data)

    def test_edicao_por_dono(self, client_auth, agricultor):
        prop = Propriedade.objects.create(
            nome="Editável", area_total=20, agricultor=agricultor
        )
        response = client_auth.patch(reverse('propriedade-detail', args=[prop.id]), {
            "area_total": 25
        })
        assert response.status_code == 200
        assert float(response.data["area_total"]) == 25.0

    def test_listagem_filtrada_agricultor(self, client_auth, agricultor):
        Propriedade.objects.create(nome="Minha", area_total=10, agricultor=agricultor)
        outro_user = User.objects.create_user(
            username='outro',
            email='outro@example.com',
            password='123456',
            role='agricultor',
            cpf='22222222222'
        )
        Propriedade.objects.create(nome="Outra", area_total=20, agricultor=outro_user)
        response = client_auth.get(reverse('propriedade-list-create'))
        assert response.status_code == 200
        assert len(response.data) == 1
