from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import generics
from .models import Plantio
from .serializers import PlantioSerializer

class RegisterPlantio(generics.CreateAPIView):
    queryset = Plantio.objects.all()
    serializer_class = PlantioSerializer
    
class ListPlantios(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        plantios = Plantio.objects.filter(propriedade__agricultor = user)
        serializer = PlantioSerializer(plantios, many= True)
        
        return Response(serializer.data)    