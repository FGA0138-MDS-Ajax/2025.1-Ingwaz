from django.shortcuts import render
from rest_framework import generics
from .models import Plantio
from .serializers import PlantioSerializer

class RegisterPlantio(generics.CreateAPIView):
    queryset = Plantio.objects.all()
    serializer_class = PlantioSerializer