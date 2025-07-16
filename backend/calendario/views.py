import json

from django.conf import settings
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Crop, Region, State
from .serializers import CropSerializer


class CropDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]

    serializer_class = CropSerializer
    queryset = Crop.objects.prefetch_related('regions__states')

    lookup_field = 'slug'


# https://www.gov.br/conab/pt-br/acesso-a-informacao/institucional/publicacoes/arquivos-de-paginas/calendariozplantiozezcolheitazjunz2022.pdf
class DataUpdateView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        try:
            with open(str(settings.BASE_DIR) + '/calendario/conab.json', encoding='utf-8') as f:
                data = json.load(f)

            Crop.objects.all().delete()

            for crop_data in data:
                crop_obj = Crop.objects.create(name=crop_data['name'])
                for region_data in crop_data['regions']:
                    region_obj = Region.objects.create(
                        crop=crop_obj,
                        name=region_data['name'],
                    )
                    for state_data in region_data['states']:
                        State.objects.create(
                            region=region_obj,
                            name=state_data['name'],
                            plantios=state_data['plantios'],
                            colheitas=state_data['colheitas'],
                            plantios_colheitas=state_data['plantios-colheitas'],
                        )

            return Response(
                {'message': 'Dados do calendário atualizados com sucesso.'},
                status=status.HTTP_200_OK,
            )

        except FileNotFoundError:
            return Response(
                {'error': 'Arquivo conab.json não encontrado no servidor.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        except Exception as e:
            return Response(
                {'error': f'Ocorreu um erro inesperado: {e!s}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
