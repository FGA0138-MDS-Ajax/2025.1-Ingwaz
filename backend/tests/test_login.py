import pytest
from rest_framework.test import APIClient
from users.models import User

@pytest.mark.django_db
def test_login_sucesso():
    user = User.objects.create_user(
        username='joao123',
        name='Joao',
        email='joao@example.com',
        password='senha123',
        role='administrador'
    )
    client = APIClient()
    response = client.post('/api/login', {
        'email': 'joao@example.com',
        'password': 'senha123'
    }, format='json')

    assert response.status_code == 200
    assert 'token' in response.data


@pytest.mark.django_db
def test_login_email_invalido():
    client = APIClient()
    response = client.post('/api/login', {
        'email': 'naoexiste@example.com',
        'password': 'qualquer'
    }, format='json')

    assert response.status_code == 403


@pytest.mark.django_db
def test_login_senha_errada():
    User.objects.create_user(
        username='joao123',
        name='Joao',
        email='joao@example.com',
        password='senha123',
        role='administrador'
    )

    client = APIClient()
    response = client.post('/api/login', {
        'email': 'joao@example.com',
        'password': 'senha_errada'
    }, format='json')

    assert response.status_code == 403


@pytest.mark.django_db
def test_login_campo_email_vazio():
    client = APIClient()
    response = client.post('/api/login', {
        'email': '',
        'password': 'senha123'
    }, format='json')

    assert response.status_code == 403


@pytest.mark.django_db
def test_login_campo_senha_vazio():
    client = APIClient()
    response = client.post('/api/login', {
        'email': 'joao@example.com',
        'password': ''
    }, format='json')

    assert response.status_code == 403
