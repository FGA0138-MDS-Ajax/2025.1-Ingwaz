from django.db import models
from propriedade.models import Propriedade

class Weather(models.Model):
    """
    Armazena os dados da previsão do tempo para uma propriedade específica,
    atuando como um cache local.
    """
    propriedade = models.OneToOneField(
        Propriedade,
        on_delete=models.CASCADE,
        related_name='weather'
    )

    data_forecast = models.JSONField()
    data_creation = models.DateTimeField(auto_now_add=True)
    data_expiration = models.DateTimeField()

    def __str__(self):
        return f"Previsão para {self.propriedade.nome}"
