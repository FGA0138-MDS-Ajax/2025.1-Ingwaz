from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Plantio
from .serializers import PlantioSerializer


class PlantioViewSet(viewsets.ModelViewSet):
    serializer_class = PlantioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Plantio.objects.filter(propriedade__agricultor=user)
