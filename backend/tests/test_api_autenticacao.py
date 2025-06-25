from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from users.models import User

#T1 - Teste de cadastro de usuário
class UserRegistrationTest(APITestCase):
  def setUp(self):
    self.existing_user = User.objects.create_user(
      name='João da Silva',
      username='joao123@uol.com.br',
      email='joao123@uol.com.br',
      password='senhaexistente'
    )
    self.short_password = {
      'name' : 'João da Silva',
      'email' : 'joao123@uol.com.br',
      'password' : '123'
    }
    self.invalid_email = {
      'name' : 'Davi',
      'email' : 'davi@@gmail.com',
      'password' : 'davioie1234'
    }
    self.existing_email = {
      'name' : 'Sósia da Silva',
      'email' : 'joao123@uol.com.br',
      'password' : 'senhadososia'
    }
  
  def test_se_usuario_criado(self):
  #o usuário 1 é o caso de sucesso, então ele tem de constar no banco de dados
    user1_exists = User.objects.filter(email='joao123@uol.com.br').exists()
    self.assertTrue(user1_exists)

  def teste_registro_com_sucesso(self):
  #verificação se o usuário é registrado com sucesso
    data = {
      'name': 'usuario novo',
      'email': 'novousuario@uol.com.br',
      'password': 'senhamedia123',
      'role': 'analista'
    }
    
    url = reverse('register')
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code,201)
    self.assertEqual(response.data['email'], 'novousuario@uol.com.br')

  def test_usuario_sem_campos_cadastrados(self):
  #verificar se o usuário é cadastrado com campos vazios
    data = {'name': "", 'email': "", 'password': "", 'role': ""}
    url = reverse('register')
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code,400)
    self.assertIn('email', response.data)

  def test_usuario_senha_curta(self):
  #verificar se o usuário é cadastrado quando coloca uma senha curta
    url = reverse('register')
    response = self.client.post(url, self.short_password, format='json')
    self.assertEqual(response.status_code,400)
    self.assertIn('password', response.data)

  def test_usuario_com_email_invalido(self):
  #verificar se o usuário é cadastrado com um formato inválido de email
    url = reverse('register')
    response = self.client.post(url, self.invalid_email, format='json')
    self.assertEqual(response.status_code,400)
    self.assertIn('email', response.data)

  def test_usuario_com_email_ja_cadastrado(self):
  #verificar se o usuário pode ser cadastrado com um email que já consta no banco
    url = reverse('register')
    response = self.client.post(url, self.existing_email, format='json')
    self.assertEqual(response.status_code,400)
    self.assertIn('email', response.data)
  
  def test_usuario_com_role_invalida(self):
  #verificar se o usuário consegue se cadastrar com uma role inválida
    data = {
      'name': 'Fabiano',
      'email': 'fabiano@hotmail.com',
      'password': 'senhamedia123',
      'role': 'role inválida'
    }
    url = reverse('register')
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, 400)
    self.assertIn('role', response.data)

  def test_usuario_com_email_em_maiusculo(self):
  #verifica a case sensitivity, ou seja, se o CAPS faz diferença na hora de digitar o email ou não
    data = {
      'name': 'João Silva',
      'email': 'JOAOSILVA@yahoo.com.br',
      'password': 'senhadetamanhook123',
      'role': 'agricultor'
    }
    url = reverse('register')
    response = self.client.post(url, data, format='json')
    self.assertIn(response.status_code, [400, 201])

