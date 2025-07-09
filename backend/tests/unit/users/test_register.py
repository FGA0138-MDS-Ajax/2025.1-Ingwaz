import pytest
from users.serializers import UserSerializer
from users.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

@pytest.mark.django_db
def test_usuario_serializer_cria_usuario_valido():
#verificar se no preenchimento correto dos dados há a criação do usuário
    dados = {
        'name': 'Joao',
        'email': 'joao@uol.com.br',
        'password': 'senha123',
        'role': 'analista',
        'cpf': '123.456.789-09' 
    }

    serializer = UserSerializer(data=dados)
    assert serializer.is_valid(), serializer.errors

    usuario = serializer.save()
    assert usuario.name == 'Joao'
    assert usuario.email == 'joao@uol.com.br'
    assert usuario.username == 'joao@uol.com.br'
    assert usuario.check_password('senha123')
    assert usuario.cpf == '12345678909'

@pytest.mark.django_db
def test_usuario_senha_pequena():
#verificar se ele cria um usuário com uma senha com menos de 6 caracteres
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
def test_usuario_mesmo_email():
#verifica se ele permite a criação de mais de 1 usuário com o mesmo email
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
        'role': 'analista',
        'cpf': '123.456.789-09'
    }

    serializer = UserSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'email' in serializer.errors

@pytest.mark.django_db
def test_usuario_sem_credenciais():
#verificar se ele aceita a criação de usuário sem qualquer preenchimento
    dados = {
        'name': '',
        'email': '',
        'password': '',
        'role': '',
        'cpf': ''
    }

    serializer = UserSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'name' in serializer.errors
    assert 'email' in serializer.errors
    assert 'password' in serializer.errors
    assert 'role' in serializer.errors
    assert 'cpf' in serializer.errors

@pytest.mark.django_db
def test_email_invalido():
#verificar se ele aceita formatos inválidos de email
    dados = {
        'name': 'fabio',
        'email': 'fabio@@uol.com.br',
        'password': 'senhamedia123',
        'role': 'analista',
        'cpf': '123.456.789-09'
    }

    serializer = UserSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'email' in serializer.errors

@pytest.mark.django_db
def test_role_invalida():
#verificar se ele permite a criação com uma role inválida
    dados = {
        'name': 'sergio',
        'email': 'sergio@gmail.com',
        'password': 'senhamediana12',
        'role': 'jardineiro',
        'cpf': '123.456.789-09'
    }

    serializer = UserSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'role' in serializer.errors

@pytest.mark.django_db
def test_cpf_invalido():
#verificar se ele permite a criação com um cpf de dígito verificador inválido
    dados = {
        'name': 'sergio',
        'email': 'sergio@gmail.com',
        'password': 'senhamediana12',
        'role': 'jardineiro',
        'cpf': '123.456.789-10'
    }

    serializer = UserSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'cpf' in serializer.errors

@pytest.mark.django_db
def test_cpf_desformatado():
#verificar se ele permite a criação de um cpf sem o formato correto
    dados = {
        'name': 'sergio',
        'email': 'sergio@gmail.com',
        'password': 'senhamediana12',
        'role': 'analista',
        'cpf': '12345678909'
    }

    serializer = UserSerializer(data=dados)
    assert serializer.is_valid(), serializer.errors

@pytest.mark.django_db
def test_campo_ausente():
#verificar se ele cria um usuário sem algum campo, no caso sem o nome nem CPF
    dados = {
        'email': 'joao321@uol.com.br',
        'password': 'senhamedia123',
        'role': 'analista'
    }

    serializer = UserSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'name' in serializer.errors

@pytest.mark.django_db
def test_senha_hasheada():
#verificar se ele o campo da senha no banco de dados não é igual ao texto puro digitado
    dados = {
        'name': 'davi',
        'email': 'davi123@hotmail.com',
        'password': 'senhamediana321',
        'role': 'analista',
        'cpf': '123.456.789-09'
    }

    serializer = UserSerializer(data=dados)
    assert serializer.is_valid(), serializer.errors

    usuario = serializer.save()
    #primeiro assegurar que a senha que está no banco é diferente da que foi digitada
    assert usuario.password != 'senhamediana321'
    assert usuario.check_password('senhamediana321')

@pytest.mark.django_db
def test_string_digitada():
#verificar se a string digitada pelo usuário como o e-mail está igual ao formato do banco 
    user = User.objects.create(name='João', email='joaozinho123@uol.com.br', cpf='123.456.789-09')
    assert str(user) == 'joaozinho123@uol.com.br'


    
