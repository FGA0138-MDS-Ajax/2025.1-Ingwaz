import pytest
from rest_framework.test import APIClient
from users.models import User
from django.urls import reverse

@pytest.mark.django_db
def test_fluxo_redefinicao_senha():
    client = APIClient()

    # Cria usuário com CPF desformatado (como espera a view)
    user = User.objects.create_user(
        username='maria123',
        name='Maria',
        email='maria@example.com',
        password='senha_antiga',
        role='agricultor',
        cpf='12345678909'  # CPF desformatado!
    )

    # Envia solicitação de redefinição de senha com CPF formatado
    url = reverse('forgot-password')
    response = client.post(url, {
        'email': 'maria@example.com',
        'cpf': '123.456.789-09'  # View remove pontos e traços, então OK
    }, format='json')

    # Espera 200 e presença do token
    assert response.status_code == 200
    assert 'token' in response.data
