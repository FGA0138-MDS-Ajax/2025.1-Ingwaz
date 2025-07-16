from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'name', 'cpf', 'role', 'is_active', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_active', 'groups')
    search_fields = ('email', 'name', 'cpf')
    fieldsets = (
        ('Informações Pessoais', {'fields': ('name', 'email', 'cpf', 'password')}),
        ('Funções e Permissões', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Datas Importantes', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Campos Customizados', {
            'fields': ('name', 'cpf', 'role'),
        }),
    )
    model = User
