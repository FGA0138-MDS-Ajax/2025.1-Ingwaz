from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """Serializador para criar e listar objetos de Usuario."""

    password = serializers.CharField(write_only=True, required=True, min_length=6)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance:
            self.fields['password'].required = False

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'cpf', 'role']

    def to_internal_value(self, data):
        value = data.copy()
        if 'cpf' in value:
            value['cpf'] = value['cpf'].replace('-', '').replace('.', '')
        return super().to_internal_value(value)

    def validate(self, attrs):
        if 'email' in attrs:
            attrs['username'] = attrs['email']
        return super().validate(attrs)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user
