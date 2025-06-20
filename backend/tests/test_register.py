import pytest
from users.serializers import UserSerializer
from users.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

@pytest.mark.django_db
def test_usuario_serializer_cria_usuario_valido():
    dados = {
        'name': 'Joao',
        'email': 'joao@uol.com.br',
        'password': 'senha123',
        'role': 'analista' 
    }

    serializer = UserSerializer(data=dados)
    assert serializer.is_valid(), serializer.errors

    usuario = serializer.save()
    assert usuario.name == 'Joao'
    assert usuario.email == 'joao@uol.com.br'
    assert usuario.username == 'joao@uol.com.br'
    assert usuario.check_password('senha123')

@pytest.mark.django_db
def test_usuario_small_password():
    dados = {
        'name': 'Davi',
        'email': 'davi@uol.com.br',
        'password': '123',
        'role': 'analista'
    }

    serializer = UserSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'password' in serializer.errors

@pytest.mark.django_db
def test_usuario_same_email():
    User.objects.create_user(
        name='Joao',
        email='joao@uol.com.br',
        password='senha123',
        role='analista',
        username='joao@uol.com.br'
    )
    
    dados = {
        'name': 'Pedro',
        'email': 'joao@uol.com.br',
        'password': 'senha123',
        'role': 'analista'
    }

    serializer = UserSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'email' in serializer.errors

@pytest.mark.django_db
def test_user_with_no_credentials():
    dados = {
        'name': '',
        'email': '',
        'password': '',
        'role': ''
    }

    serializer = UserSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'name' in serializer.errors
    assert 'email' in serializer.errors
    assert 'password' in serializer.errors
    assert 'role' in serializer.errors

    