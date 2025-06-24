from django.shortcuts import render
import random
import math
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status
from rest_framework.generics import RetrieveUpdateDestroyAPIView # Importe se for usar a classe base
from .models import SolicitacaoCredito
from plantios.models import Plantio
from propriedade.models import Propriedade
from .serializers import SolicitacaoCreditoSerializer

class RegisterView(generics.CreateAPIView):
    """
    View para registrar um usuario.
    """
    permission_classes = [AllowAny]
    queryset = SolicitacaoCredito.objects.all()
    serializer_class = SolicitacaoCreditoSerializer
    
    def perform_create(self, serializer):
        plantio = serializer.validated_data.get('plantio')
        if plantio:
            serializer.save(propriedade=plantio.propriedade)
        else:
            serializer.save()

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

        # 1. Recupera valores de instância:
        # Área do plantio
        area_plantio = solicitacao.plantio.area  
        area_total = solicitacao.propriedade.area_total  

        # 2. Calcula pbi (potencial bruto de income). Ajuste conforme necessidade:
        pbi = float(area_plantio)
        
        
        escalahec = 100.0  
        pbi_normalizado = pbi / escalahec
                
        area_total_f = float(area_total)

        # 3. Calcula gui (índice uso do solo) com verificação de divisão por zero:
        if area_total is None or area_total == 0:
            # Tratamento: definir comportamento padrão ou erro
            # Por exemplo, se não fizer sentido, retorna erro:
            return Response(
                {"detail": "Área total da propriedade inválida para cálculo."},
                status=status.HTTP_400_BAD_REQUEST
            )
        gui = float(pbi / area_total_f)

        # 4. Define Ground Usage Score (gus)
        gus = 1.0
        if 0.7 < gui <= 0.9:
            gus = 0.9
        elif gui > 0.9:
            gus = 0.8

        # 5. Potentital Credit Score (pcs)
        #pcs = pbi * gus
        pcs = float(pbi_normalizado * gus)

        # 6. Função sigmoid para normalizar entre 0 e 1
        try:
            sigmoid_denominador = 1 + math.exp(-pcs)
            score_gerado = 1 / sigmoid_denominador
        except OverflowError:
            # Caso pcs muito grande/pequeno; trate conforme desejado:
            score_gerado = 0 if pcs < 0 else 1

        # Se quiser forçar um valor fixo para testes:
        # score_gerado = 1

        # 7. Define novo status
        if score_gerado >= 0.7:
            novo_status = 'aprovado'
        elif 0.5 <= score_gerado < 0.7:
            novo_status = 'analise'
        else:
            novo_status = 'rejeitado'

        # 8. Salva na instância
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
