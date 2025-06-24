from django.db import models
from plantios.models import Plantio
from propriedade.models import Propriedade

class SolicitacaoCredito(models.Model):
    plantio = models.ForeignKey(Plantio, on_delete=models.CASCADE, related_name="solicitacoes")
    
    propriedade = models.ForeignKey(  
        Propriedade,
        on_delete=models.CASCADE,
        related_name="solicitacoes_credito",
        null=True,
        blank=True
    )

    score = models.IntegerField(null=True, blank=True)
    status = models.CharField(
        max_length=50,
        default='pendente',
        choices=[
            ('pendente', 'Pendente'),
            ('aprovado', 'Aprovado'),
            ('rejeitado', 'Rejeitado'),
            ('analise', 'Em Análise'),
        ]
    )
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Solicitação {self.id} - Status: {self.status}"
