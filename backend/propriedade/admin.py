from django.contrib import admin
from .models import Propriedade

@admin.register(Propriedade)
class PropriedadeAdmin(admin.ModelAdmin):
    list_display = ['nome', 'area_total', 'agricultor', 'get_agricultor_email', 'created_at']
    list_filter = ['created_at', 'agricultor__role']
    search_fields = ['nome', 'agricultor__name', 'agricultor__email']
    readonly_fields = ['created_at', 'updated_at']
    
    def get_agricultor_email(self, obj):
        return obj.agricultor.email
    get_agricultor_email.short_description = 'Email do Agricultor'
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('nome', 'area_total', 'agricultor')
        }),
        ('Geolocalização', {
            'fields': ('latitude', 'longitude'),
            'classes': ('collapse',)
        }),
        ('Auditoria', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )