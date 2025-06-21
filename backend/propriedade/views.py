from rest_framework import status, permissions, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from users.models import User
from .models import Propriedade
from .serializers import PropriedadeSerializer

class PropriedadeListCreateView(ListCreateAPIView):
    
    serializer_class = PropriedadeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'agricultor':
            return Propriedade.objects.filter(agricultor=user)
        elif user.role in ['administrador', 'tecnico', 'analista']:
            return Propriedade.objects.all()
        else:
            return Propriedade.objects.none()
    
    def perform_create(self, serializer):
        
        if self.request.user.role != 'agricultor':
            raise serializers.ValidationError(
                "Apenas agricultores podem criar propriedades."
            )
        
        
        serializer.save(agricultor=self.request.user)

class PropriedadeDetailView(RetrieveUpdateDestroyAPIView):
   
    serializer_class = PropriedadeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        
        user = self.request.user
        
        if user.role == 'agricultor':
            return Propriedade.objects.filter(agricultor=user)
        elif user.role in ['administrador', 'tecnico', 'analista']:
            return Propriedade.objects.all()
        else:
            return Propriedade.objects.none()
      
    def perform_update(self, serializer):
    
        user = self.request.user
        propriedade = self.get_object()
        
        if user.role == 'agricultor' and propriedade.agricultor != user:
            raise serializers.ValidationError(
                "Você só pode editar suas próprias propriedades."
            )
        
        serializer.save()
    
    def perform_destroy(self, instance):
       
        user = self.request.user
        
        if user.role == 'agricultor' and instance.agricultor != user:
            raise serializers.ValidationError(
                "Você só pode deletar suas próprias propriedades."
            )
        
        instance.delete()

