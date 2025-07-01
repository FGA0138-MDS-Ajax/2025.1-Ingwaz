from django.contrib.auth.models import AbstractUser
from django.db import models
from localflavor.br.models import BRCPFField


class User(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    cpf = BRCPFField(unique=True)

    role_functions = [
        ('administrador', 'Administrador'),
        ('agricultor', 'Agricultor'),
        ('analista', 'Analista de crédito'),
        ('tecnico', 'Técnico'),
    ]
    role = models.CharField(max_length=20, choices=role_functions)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'cpf', 'role']

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if not self.is_superuser:
            if self.role == 'administrador':
                self.is_staff = True
            else:
                self.is_staff = False
        super().save(*args, **kwargs)
