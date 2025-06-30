import pytest
from rest_framework.test import APIClient
from users.models import User
from django.urls import reverse
from rest_framework import status

@pytest.mark.django_db
def test_login_sucesso():
    user = User.objects.create_user(
        username='joao123',
        name='Joao',
        email='joao@example.com',
        password='senha123',
        role='administrador',
        cpf='123.456.789-09'
    )
    client = APIClient()
    url = reverse('login')
    response = client.post(url, {
        'email': 'joao@example.com',
        'password': 'senha123'
    }, format='json')
    assert response.status_code == 200
    assert 'token' in response.data

@pytest.mark.django_db
def test_login_email_invalido():
    client = APIClient()
    response = client.post(reverse('login'), {
        'email': 'inexistente@example.com',
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
    response = client.post(reverse('login'), {
        'email': 'joao@example.com',
        'password': 'senha_errada'
    }, format='json')
    assert response.status_code == 403

@pytest.mark.django_db
def test_login_campo_email_vazio():
    client = APIClient()
    response = client.post(reverse('login'), {
        'email': '',
        'password': 'senha123'
    }, format='json')
    assert response.status_code == 403

@pytest.mark.django_db
def test_login_campo_senha_vazio():
    client = APIClient()
    response = client.post(reverse('login'), {
        'email': 'joao@example.com',
        'password': ''
    }, format='json')
    assert response.status_code == 403
