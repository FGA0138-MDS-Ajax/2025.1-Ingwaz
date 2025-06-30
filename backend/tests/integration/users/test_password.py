import pytest
from rest_framework.test import APIClient
from users.models import User
from django.urls import reverse

@pytest.mark.django_db
def test_fluxo_redefinicao_senha():
    # 1. Cria usuário no sistema
    user = User.objects.create_user(
        username='maria123',
        name='Maria',
        email='maria@example.com',
        password='senha_antiga',
        role='agricultor',
        cpf='987.654.321-00'  # CPF obrigatório conforme sua view
    )

    client = APIClient()

    # 2. Envia solicitação de redefinição de senha com CPF
    forgot_url = reverse('forgot-password')
    forgot_response = client.post(forgot_url, {
        'email': 'maria@example.com',
        'cpf': '987.654.321-00'
    }, format='json')

    # Espera-se que a resposta seja 200 OK com um token retornado
    assert forgot_response.status_code == 200
    assert 'token' in forgot_response.data

    # 3. Atualiza a senha autenticado com o token
    patch_url = reverse('user-info')
    client.force_authenticate(user=user)
    patch_response = client.patch(patch_url, {
        'password': 'nova_senha123'
    }, format='json')

    assert patch_response.status_code in [200, 204]

    # 4. Faz login com a nova senha
    client.logout()
    login_url = reverse('login')
    login_response = client.post(login_url, {
        'email': 'maria@example.com',
        'password': 'nova_senha123'
    }, format='json')

    assert login_response.status_code == 200
    assert 'token' in login_response.data
