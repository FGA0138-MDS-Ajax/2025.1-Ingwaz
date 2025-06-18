import pytest
from users.serializers import UserSerializer

@pytest.mark.django_db
def test_usuario_serializer_cria_usuario_valido():
    dados = {
        'name': 'Joao',
        'email': 'joao@example.com',
        'password': 'senha123'
    }

    serializer = UserSerializer(data=dados)
    assert serializer.is_valid(), serializer.errors

    usuario = serializer.save()
    assert usuario.name == 'Joao'
    assert usuario.email == 'joao@example.com'
    assert usuario.username == 'joao@example.com' 
    assert usuario.check_password('senha123')
