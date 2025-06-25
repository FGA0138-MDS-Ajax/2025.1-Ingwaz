from rest_framework.test import APITestCase
from users.serializers import UserSerializer
from users.models import User
from unittest.mock import patch
from django.urls import reverse
from quotes.models import Quote
from django.contrib.auth import get_user_model

class QuoteListViewTest(APITestCase):
    def test_lista_vazia_cotacoes(self):
    #verificar a resposta quando não tem cotações no banco
        url = reverse('quote-list')
        response = self.client.get(url)
        assert response.status_code == 200
        assert response.data == []

    def test_acesso_nao_autenticado(self):
    #verificar se ele aceita acesso sem autenticação à lista de cotações
        url = reverse('quote-list')
        response = self.client.get(url)
        assert response.status_code == 200     

    def test_filtro_nome_API(self):
    #verificar se dá pra filtrar o nome pra buscar uma cultura específica
        Quote.objects.create(date='2024-10-17', name='soja', unity='kg', value=70)
        Quote.objects.create(date='2024-10-17', name='milho', unity='kg', value=80)
        url = reverse('quote-list')
        response = self.client.get(f"{url}?name=soja")
        assert response.status_code == 200
        assert all(q['name'].lower() == 'soja' for q in response.data)

    def test_atualizacao_lote_sem_autenticacao(self):
    #verificar se o lote pode ser atualizado sem autenticação
        url = reverse('quote-update')
        response = self.client.post(url)
        assert response.status_code == 401

    #esses mocks foram colocados pra diminuir o tempo de execução deste teste no pytest (estava em 33s)
    @patch('quotes.views.get_all_cepea_quotes', return_value=([], True))
    @patch('quotes.views.get_all_hfbrasil_quotes', return_value=([], True))
    def test_atualizacao_em_lote_com_autenticacao(self, mock_get_all_hfbrasil_quotes, mock_get_all_cepea_quotes):
        #criar um usuário que irá fazer o login com permissão de admin
        User = get_user_model()
        user = User.objects.create_user(username='admin', email='admin@admin.com', password='senha123', role='analista')
        
        #realizar o login via API
        url_login = reverse('login')
        response = self.client.post(url_login, {'email': 'admin@admin.com', 'password': 'senha123'})
        assert response.status_code == 200
        token = response.data['token']

        #agora vamos usar o token pra validar a autenticação
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        url = reverse('quote-update')
        response = self.client.post(url)
        assert response.status_code == 200
            
        