from django.shortcuts import render

import random
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status
from rest_framework.generics import RetrieveUpdateDestroyAPIView # Importe se for usar a classe base
from .models import SolicitacaoCredito
from .serializers import SolicitacaoCreditoSerializer

class RegisterView(generics.CreateAPIView):
    """
    View para registrar um usuario.
    """
    permission_classes = [AllowAny]
    queryset = SolicitacaoCredito.objects.all()
    serializer_class = SolicitacaoCreditoSerializer

class AvaliarView(APIView):

    permission_classes = [IsAuthenticated]
    def get(self, request, solicitacao_id):
        """
        Endpoint para simular algoritmo de score e atualizar o status da solicitação.
        """
        try:
            solicitacao = SolicitacaoCredito.objects.get(id=solicitacao_id)
        except SolicitacaoCredito.DoesNotExist:
            return Response(
                {"detail": "Solicitação de crédito não encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

        score_gerado = random.randint(0, 1000)

        if score_gerado >= 700:
            novo_status = 'aprovado'
        elif 500 <= score_gerado < 700:
            novo_status = 'analise'
        else:
            novo_status = 'rejeitado'

        solicitacao.score = score_gerado
        solicitacao.status = novo_status
        solicitacao.save()

        serializer = SolicitacaoCreditoSerializer(solicitacao)

        return Response(
            {
                "message": "Avaliação de crédito realizada com sucesso!",
                "solicitacao": serializer.data,
                "score_gerado": score_gerado,
                "novo_status": novo_status
            },
            status=status.HTTP_200_OK
        )