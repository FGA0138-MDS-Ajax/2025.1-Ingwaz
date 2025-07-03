from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import UserSerializer


class RegisterView(generics.CreateAPIView):
    """View para registrar um usuario."""

    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginView(APIView):
    """View para gerar um token de login para um usuário registrado."""

    permission_classes = [AllowAny]

    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)

        if user is not None:
            token, _created = Token.objects.get_or_create(user=user)
            return Response({
                'id': user.id,
                'token': token.key,
                'nome': user.name,       
                'tipo': user.role,       
                'email': user.email,
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_403_FORBIDDEN)



class PasswordForgotView(APIView):
    """View para gerar um token de recuperação de senha."""

    permission_classes = [AllowAny]

    def post(self, request, format=None):
        email = request.data.get('email')
        cpf = request.data.get('cpf')
        user = User.objects.filter(email=email, cpf=cpf).first()

        if user is not None:
            token, _created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_403_FORBIDDEN)


class UserInfoView(generics.RetrieveUpdateAPIView):
    """View, que necessita token, para um usuário visualizar e atualizar informações."""

    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserListView(generics.ListAPIView):
    """View, que necessita token, para listar todos os usuários."""

    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer
