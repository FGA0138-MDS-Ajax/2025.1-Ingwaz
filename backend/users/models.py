from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    funções = [('agriculto', 'Agricultor'), ('tecnico', 'Técnico'), ('administrador', 'Administrador'), ('analista', 'Analista de crédito')}
    role = models.CharField(max_length=20, escolha = funções)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'username']

    def __str__(self):
        return self.email
