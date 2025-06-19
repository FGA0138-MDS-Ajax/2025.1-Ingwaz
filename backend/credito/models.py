from django.db import models

class SolicitacaoCredito(models.Model):
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