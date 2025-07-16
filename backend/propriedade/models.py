from django.db import models 
from django.core.validators import MinValueValidator
from users.models import User

class Propriedade(models.Model):
    nome = models.CharField(max_length=255, verbose_name="Nome da propriedade", help_text = "Nome identificador da propriedade")
    area_total = models.DecimalField(max_digits = 12, decimal_places=2, validators=[MinValueValidator(0.01)], verbose_name="Área total (hectares)", help_text="Área total da propriedade em hectares")
    latitude =  models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, verbose_name="Latitude")
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, verbose_name="Longitude")
    agricultor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='propriedades', verbose_name="Agricultor", limit_choices_to={'role': 'agricultor'})
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Propriedade"
        verbose_name_plural = "Propriedades"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.nome} - {self.agricultor.name}"
    
    @property
    def coordinates(self):
        if self.latitude and self.longitude:
            return {
                'latitude': float(self.latitude),
                'longitude': float(self.longitude)
            }
        return None