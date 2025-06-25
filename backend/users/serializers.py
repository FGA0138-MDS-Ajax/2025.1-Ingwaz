from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """Serializador para criar e listar objetos de Usuario."""

    password = serializers.CharField(write_only=True, required=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance:
            self.fields['password'].required = False

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'cpf', 'role']

    def validate_password(self, value):
        if len(value) < 6:
            msg = 'A senha deve ter no mínimo 6 caracteres.'
            raise serializers.ValidationError(msg)
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(
            username=validated_data['email'],
            password=password,
            **validated_data,
        )
        return user

    def update(self, instance, validated_data):
        if 'email' in validated_data:
            validated_data['username'] = validated_data['email']

        password = validated_data.pop('password', None)

        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user
