from django.db import models

class Produtividade(models.Model):
    quantidade_colhida = models.FloatField()
    sacas_por_hectare = models.FloatField()
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantidade_colhida} kg – {self.sacas_por_hectare} sc/ha"
