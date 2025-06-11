from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.hashers import make_password
from rest_framework.validators import UniqueValidator

class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializador para criar e listar objetos de Usuario.
    """
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=Usuario.objects.all(), message="Já existe um usuário com este e-mail.")]
    )

    senha = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Usuario
        fields = ('id', 'nome', 'email', 'senha')
        extra_kwargs = {
            'nome': {'required': True}
        }

    def validate_senha(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("A senha deve ter no mínimo 6 caracteres.")
        return value

    def create(self, validated_data):
        """
        Cria uma nova instância de Usuário com a senha hasheada.
        """
        senha = validated_data.pop('senha')
        
        usuario = Usuario.objects.create(**validated_data)
        
        usuario.set_password(senha)  
        usuario.save()
        
        return usuario