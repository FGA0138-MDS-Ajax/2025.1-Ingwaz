from django.db import models
from plantios.models import Plantio
from propriedade.models import Propriedade
from django.conf import settings 

class SolicitacaoCredito(models.Model):
    # Link to the User who created this request
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="solicitacoes_credito_user",
        help_text="Usuário que criou a solicitação de crédito."
    )
    
    plantio = models.ForeignKey(Plantio, on_delete=models.CASCADE, related_name="solicitacoes")
    
    propriedade = models.ForeignKey( 
        Propriedade,
        on_delete=models.CASCADE,
        related_name="solicitacoes_credito",
        null=True, 
        blank=True
    )

    score = models.FloatField(null=True, blank=True, help_text="Score de crédito gerado (0.0 a 1.0)")
    
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Solicitação de Crédito"
        verbose_name_plural = "Solicitações de Crédito"
        ordering = ['-created_at'] 

    def __str__(self):
        return f"Solicitação {self.id} - Status: {self.status} - User: {self.user.email}"