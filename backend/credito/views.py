from django.shortcuts import render
import random
import math
from rest_framework import status, permissions
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics, status

from plantios.models import Plantio 
from propriedade.models import Propriedade 
from .models import SolicitacaoCredito 
from .serializers import SolicitacaoCreditoSerializer, SolicitacaoCreditoCreateSerializer 
from .permissions import IsOwnerOrAnalyst, IsOwnerOrAnalystForList 

class RegisterView(generics.CreateAPIView):
    """
    View para registrar uma nova solicitação de crédito.
    """
    permission_classes = [IsAuthenticated]
    queryset = SolicitacaoCredito.objects.all()
    serializer_class = SolicitacaoCreditoCreateSerializer 

    def get_serializer(self, *args, **kwargs):
        data = self.request.data.copy()
        plantio_id = data.get('plantio')

        if not plantio_id:
            return super().get_serializer(*args, **kwargs) 
        
        try:
            plantio = Plantio.objects.get(id=plantio_id)
        except Plantio.DoesNotExist:
            raise serializers.ValidationError({"plantio": f"Plantio com ID {plantio_id} não encontrado."})

        if plantio.propriedade.agricultor != self.request.user:
            raise PermissionDenied(
                detail="Você só pode criar solicitações para plantios que pertencem às suas propriedades."
            )

        data['propriedade'] = plantio.propriedade.id 
        data['user'] = self.request.user.id 

        kwargs['data'] = data
        return super().get_serializer(*args, **kwargs)

    def perform_create(self, serializer):
        plantio = serializer.validated_data.get('plantio') 

        user = self.request.user

        propriedade = plantio.propriedade
        serializer.save(user=user, propriedade=propriedade)

class AvaliarView(APIView):
    """
    Endpoint para simular algoritmo de score e atualizar o status da solicitação.
    """
    permission_classes = [IsAuthenticated, IsOwnerOrAnalyst]

    def get(self, request, solicitacao_id): 
        try:
            solicitacao = SolicitacaoCredito.objects.get(id=solicitacao_id)
        except SolicitacaoCredito.DoesNotExist:
            return Response(
                {"detail": "Solicitação de crédito não encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

        self.check_object_permissions(request, solicitacao) 

        area_plantio = solicitacao.plantio.area  
        area_total = solicitacao.propriedade.area_total 
        valor_pedido = float(solicitacao.valor_solicitado or 0) # Value requested by the user 

        if valor_pedido < 0:
            valor_pedido *= -1

        pbi = float(area_plantio) # Potential Brute Income
        fs = float(valor_pedido/pbi) # FS: Fairness Score, how fair your request is, based on how much land you have to work on
        
        #escalahec = 100.0  # Constant for normalization
        #pbi_normalizado = pbi / escalahec
                
        area_total_f = float(area_total)

        if area_total_f is None or area_total_f == 0:
            return Response(
                {"detail": "Área total da propriedade inválida para cálculo (divisão por zero)."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        gui = float(pbi / area_total_f) # Ground Usage Index -> meant to see what percentage of the property is being used for farming.

        gus = 1.0 # Ground Usage Score -> meant to detract score from the user if their GUI is too high
        if 0.7 < gui <= 0.9:
            gus = 0.9
        elif gui > 0.9:
            gus = 0.8

        k = -0.0001999 # This is the 'grading' curve, basically how much a value influences the curvature of the sigmoid function
        pcs = float(fs * gus) # Pre Normalisation score
        avg_price = 25000 # This is the average price for fully planting crops in a ha (Hectare de assaí ou açaí, não me lembro exatamente) 

        try: # Sigmoid function in order to normalise the score in the range 0-1
            exponent = -k * (pcs - avg_price)
            
            if exponent > 700:
                score_gerado = 0.0
            elif exponent < -700:
                score_gerado = 1.0
            else:
                sigmoid_denominador = 1 + math.exp(exponent)
                score_gerado = 1 / sigmoid_denominador

        except OverflowError:
            # Handle very large/small pcs values that cause overflow in math.exp
            score_gerado = 0.0 

        # Define new status based on generated score
        if score_gerado >= 0.7:
            novo_status = 'aprovado'
        elif 0.5 <= score_gerado < 0.7:
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
    

# Recent Additions - Prone to errors
class AprovarSolicitacaoView(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrAnalyst]

    def post(self, request, solicitacao_id):
        try:
            solicitacao = SolicitacaoCredito.objects.get(id=solicitacao_id)
            self.check_object_permissions(request, solicitacao)
            
            if solicitacao.status != 'analise':
                return Response({"detail": "Apenas solicitações 'Em Análise' podem ser aprovadas."}, status=status.HTTP_400_BAD_REQUEST)

            solicitacao.status = 'aprovado'
            solicitacao.save()
            serializer = SolicitacaoCreditoSerializer(solicitacao)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except SolicitacaoCredito.DoesNotExist:
            return Response({"detail": "Solicitação não encontrada."}, status=status.HTTP_404_NOT_FOUND)

# Recent Additions - Prone to errors
class RejeitarSolicitacaoView(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrAnalyst]

    def post(self, request, solicitacao_id):
        try:
            solicitacao = SolicitacaoCredito.objects.get(id=solicitacao_id)
            self.check_object_permissions(request, solicitacao)

            if solicitacao.status != 'analise':
                return Response({"detail": "Apenas solicitações 'Em Análise' podem ser rejeitadas."}, status=status.HTTP_400_BAD_REQUEST)

            solicitacao.status = 'rejeitado'
            solicitacao.save()
            serializer = SolicitacaoCreditoSerializer(solicitacao)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except SolicitacaoCredito.DoesNotExist:
            return Response({"detail": "Solicitação não encontrada."}, status=status.HTTP_404_NOT_FOUND)


class SolicitacaoCreditoListView(generics.ListAPIView):
    """
    Endpoint para listar solicitações de crédito.
    """
    permission_classes = [IsAuthenticated, IsOwnerOrAnalystForList]
    serializer_class = SolicitacaoCreditoSerializer

    def get_queryset(self):
        user = self.request.user
        # If the user's role is 'analista', return all requests
        if hasattr(user, 'role') and user.role == 'analista':
            return SolicitacaoCredito.objects.all().order_by('-created_at')
        
        # Otherwise, return only the requests belonging to the current user
        return SolicitacaoCredito.objects.filter(user=user).order_by('-created_at')