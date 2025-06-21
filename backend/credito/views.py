from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Credito
from .serializers import CreditoSerializer

class ApproveCreditView(APIView):
    def post(self, request, credit_id):
        try:
            credit = Credito.objects.get(id=credit_id)
            credit.approve()
            serializer = CreditoSerializer(credit)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Credito.DoesNotExist:
            return Response({"error": "Credit not found."}, status=status.HTTP_404_NOT_FOUND)

class DenyCreditView(APIView):
    def post(self, request, credit_id):
        try:
            credit = Credito.objects.get(id=credit_id)
            credit.deny()
            serializer = CreditoSerializer(credit)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Credito.DoesNotExist:
            return Response({"error": "Credit not found."}, status=status.HTTP_404_NOT_FOUND)