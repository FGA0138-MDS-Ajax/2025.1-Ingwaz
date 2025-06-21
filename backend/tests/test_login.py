## ✅ O que os testes verificam

- ✅ Login com sucesso
- ❌ Login com email inválido
- ❌ Login com senha incorreta
- ❌ Login com campo de email vazio
- ❌ Login com campo de senha vazio

# Importa o framework de testes pytest e o cliente de testes da DRF
import pytest
from rest_framework.test import APIClient
from users.models import User

# Marca o teste como sendo dependente do banco de dados do Django
@pytest.mark.django_db
def test_login_sucesso():
    # Cria um usuário válido no banco de dados para teste
    user = User.objects.create_user(
        username='joao123',         # campo obrigatório para AbstractUser
        name='Joao',                # nome do usuário (campo personalizado)
        email='joao@example.com',   # email utilizado no login
        password='senha123',        # senha que será testada
        role='administrador'        # papel (role) do usuário
    )

    # Cria um cliente de teste para simular requisições HTTP
    client = APIClient()

    # Envia uma requisição POST para o endpoint de login com dados válidos
    response = client.post('/api/login', {
        'email': 'joao@example.com',
        'password': 'senha123'
    }, format='json')

    # Verifica se o status da resposta é 200 (login bem-sucedido)
    assert response.status_code == 200

    # Verifica se um token foi retornado na resposta
    assert 'token' in response.data


@pytest.mark.django_db
def test_login_email_invalido():
    # Simula uma tentativa de login com email que não existe
    client = APIClient()
    response = client.post('/api/login', {
        'email': 'naoexiste@example.com',
        'password': 'qualquer'
    }, format='json')

    # Espera-se uma resposta 403 (acesso proibido)
    assert response.status_code == 403


@pytest.mark.django_db
def test_login_senha_errada():
    # Cria um usuário com senha correta
    User.objects.create_user(
        username='joao123',
        name='Joao',
        email='joao@example.com',
        password='senha123',
        role='administrador'
    )

    # Simula uma tentativa de login com senha errada
    client = APIClient()
    response = client.post('/api/login', {
        'email': 'joao@example.com',
        'password': 'senha_errada'
    }, format='json')

    # Espera-se uma resposta 403 (senha incorreta)
    assert response.status_code == 403


@pytest.mark.django_db
def test_login_campo_email_vazio():
    # Simula uma tentativa de login com campo de email vazio
    client = APIClient()
    response = client.post('/api/login', {
        'email': '',
        'password': 'senha123'
    }, format='json')

    # Espera-se uma resposta 403 (credencial inválida)
    assert response.status_code == 403


@pytest.mark.django_db
def test_login_campo_senha_vazio():
    # Simula uma tentativa de login com campo de senha vazio
    client = APIClient()
    response = client.post('/api/login', {
        'email': 'joao@example.com',
        'password': ''
    }, format='json')

    # Espera-se uma resposta 403 (credencial inválida)
    assert response.status_code == 403
