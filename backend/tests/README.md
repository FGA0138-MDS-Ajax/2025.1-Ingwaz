# 🧪 Testes Automatizados - Sistema de Autenticação com Django REST

Este repositório contém um conjunto de testes automatizados desenvolvidos para validar funcionalidades de **registro**, **login** e **serialização de usuários** em uma API Django REST.

## 📁 Estrutura dos Arquivos de Teste

- `test_api.py` → Testes da **API de cadastro**
- `test_login.py` → Testes da da aplicação de login 
- `test_register.py` → 

---

## ▶️ Como executar os testes

Certifique-se de que você está com o ambiente virtual ativado e o Django configurado corretamente.

**Passo 1 – Instale as dependências:**

```bash
pip install pytest pytest-django
```

**Passo 2 – Execute os testes com:**

```bash
pytest
```

---

## ✅ `test_user_registration_api.py` – Testes da API de Cadastro

Testa o endpoint `/api/register`.

| Teste | O que é testado |
|-------|------------------|
| `test_se_usuario_criado` | Verifica se um usuário inicial foi corretamente criado no `setUp`. |
| `teste_registro_com_sucesso` | Simula o cadastro de um novo usuário e espera status 201. |
| `test_usuario_sem_campos_cadastrados` | Verifica erro 400 ao enviar campos vazios no registro. |
| `test_usuario_senha_curta` | Rejeita senhas com menos de 6 caracteres. |
| `test_usuario_com_email_invalido` | Rejeita e-mails em formato inválido. |
| `test_usuario_com_email_ja_cadastrado` | Rejeita tentativa de registrar um e-mail já existente. |

---

## 🔐 `test_user_login_api.py` – Testes da API de Login

Testa o endpoint `/api/login`.

| Teste | O que é testado |
|-------|------------------|
| `test_login_sucesso` | Login com credenciais válidas; espera `200 OK` e um `token` na resposta. |
| `test_login_email_invalido` | Login com e-mail inexistente; espera `403 Forbidden`. |
| `test_login_senha_errada` | Login com senha incorreta; espera `403 Forbidden`. |
| `test_login_campo_email_vazio` | Login com campo de e-mail vazio; espera `403 Forbidden`. |
| `test_login_campo_senha_vazio` | Login com senha em branco; espera `403 Forbidden`. |

---

## 🧱 `test_user_serializer.py` – Testes do Serializador

Testa diretamente o `UserSerializer`.

| Teste | O que é testado |
|-------|------------------|
| `test_usuario_serializer_cria_usuario_valido` | Verifica se um usuário válido é criado com sucesso via serializer. |
| `test_usuario_senha_pequena` | Garante que senhas pequenas (menos de 6 caracteres) são rejeitadas. |
| `test_usuario_mesmo_email` | Rejeita duplicidade de e-mails. |
| `test_usuario_sem_credenciais` | Rejeita criação com todos os campos vazios. |
| `test_email_invalido` | Rejeita e-mails em formato inválido. |
| `test_role_invalida` | Rejeita `role` fora das opções definidas. |
| `test_campo_ausente` | Rejeita criação se o campo `name` estiver ausente. |
| `test_senha_hasheada` | Garante que a senha não é salva em texto puro. |
| `test_string_digitada` | Verifica se a representação textual do usuário (str) é o e-mail. |

---

## 💡 Observações

- Esses testes foram feitos com base em um modelo customizado de `User` que herda de `AbstractUser`, onde o campo `email` é usado como identificador.
- O sistema deve estar com `pytest` e `pytest-django` configurados, e com o banco de dados de testes acessível.
- O endpoint `/api/login` deve retornar `403` para credenciais inválidas e `200` com `token` em casos de sucesso.
- O serializer `UserSerializer` deve conter validações de e-mail, senha e role.
