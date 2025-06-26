from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Serializador para criar e listar objetos de Usuario.
    """
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Já existe um usuário com este e-mail.")]
    )   

    password = serializers.CharField(write_only=True, required=True)

    role = serializers.ChoiceField(
        choices=User.role_functions,
        required=True,
        error_messages={'invalid_choice': 'Escolha uma função válida.'}
    )

    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password', 'role')
        extra_kwargs = {
            'name': {'required': True}
        }

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("A senha deve ter no mínimo 6 caracteres.")
        return value

    def create(self, validated_data):
        """
        Cria uma nova instância de Usuário com a senha hasheada.
        """
        password = validated_data.pop('password')
        
        user = User.objects.create(
            username=validated_data['email'],
            **validated_data
        )
        
        user.set_password(password)  
        user.save()
        
        return user