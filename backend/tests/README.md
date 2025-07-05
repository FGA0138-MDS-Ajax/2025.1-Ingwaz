# Testes automatizados - sistema de autenticação com Django REST

Este repositório contém um conjunto de testes automatizados desenvolvidos para validar funcionalidades de **registro**, **login** e **serialização de usuários** em uma API Django REST.

## Como executar os testes

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

## Testes de API

---

### `test_api_credito.py` – testes da API de crédito

Testa o endpoint /api/solicitacoes.

| Teste | O que é testado |
|-------|------------------|
| `test_api_criacao_credito` | Verifica a criação de uma solicitação válida pela API. |
| `test_api_dados_invalidos` | Rejeita com erro 400 a criação de uma solicitação com dados inválidos. |
| `test_api_lista_solicitacoes` | Verifica se um analista consegue listar as solicitações com sucesso. |
| `test_api_permissao_sem_autenticacao` | Rejeita requisições se não houver autenticação. |
| `test_api_atualizacao_status` | Verifica se o status é corretamente atualizado na view. |
| `test_api_filtro` | Rejeita tentativa de agricultor de acessar todas as solicitações e garante que o analista consiga ter esse acesso. |
| `test_avaliacao_solicitacao_pelo_analista` | Verifica se o analista pode avaliar solicitações com sucesso. |
| `test_api_agricultor_nao_cria_registro_pro_outro` | Verifica se um agricultor pode criar solicitação pro plantio de outro agricultor. |

---
## `test_password.py`

| Teste                        | O que é testado                                                                                         |
|-----------------------------|----------------------------------------------------------------------------------------------------------|
| `test_fluxo_redefinicao_senha` | Valida o fluxo completo de redefinição de senha: envio de email + CPF, atualização de senha e novo login. |

### `test_api_propriedade.py` - testes da API da propriedade

...
| Teste                          | O que é testado                                                                 |
|-------------------------------|----------------------------------------------------------------------------------|
| `test_criacao_sucesso`        | Verifica se um agricultor consegue criar uma propriedade com dados válidos.     |
| `test_area_total_negativa`    | Garante que não é possível criar propriedade com área total negativa.           |
| `test_latitude_sem_longitude`| Valida que, ao informar latitude sem longitude, ocorre erro de validação.       |
| `test_tecnico_nao_pode_criar`| Assegura que um usuário com papel de técnico não pode criar propriedades.       |
| `test_edicao_por_dono`        | Verifica se o agricultor dono da propriedade consegue editá-la com sucesso.     |
| `test_listagem_filtrada_agricultor` | Garante que um agricultor só vê propriedades criadas por ele mesmo.    |

---

### `test_api_quotes.py` – testes da API das cotações

Testa o endpoint /api/quotes.

| Teste | O que é testado |
|-------|------------------|
| `test_lista_vazia_cotacoes` | Verifica se é retornada uma lista vazia quando não há cotações no banco. |
| `test_acesso_nao_autenticado` | Verifica se qualquer pessoa possa consultar as cotações sem precisar de login. (São informações públicas, então sem problemas) |
| `test_filtro_nome_API` | Verifica se é possível pesquisar o nome de uma cultura específica |
| `test_atualizacao_sem_autenticacao` | Rejeita a atualização do lote sem autenticação. |


---

### `test_api_autenticacao.py` – testes da API de cadastro

Testa o endpoint /api/register.

| Teste | O que é testado |
|-------|------------------|
| `test_se_usuario_criado` | Verifica se um usuário inicial foi corretamente criado no setUp. |
| `test_registro_com_sucesso` | Simula o cadastro de um novo usuário e espera status 201. |
| `test_usuario_sem_campos_cadastrados` | Verifica erro 400 ao enviar campos vazios no registro. |
| `test_usuario_senha_curta` | Rejeita senhas com menos de 6 caracteres. |
| `test_usuario_com_email_invalido` | Rejeita e-mails em formato inválido. |
| `test_usuario_com_email_ja_cadastrado` | Rejeita tentativa de registrar um e-mail já existente. |
| `test_usuario_com_role_invalida` | Rejeita tentativa de registro de usuário com uma role inválida. |
| `test_usuario_cpf_invalido` | Rejeita tentativa de registro de usuário com um CPF inválido. |
| `test_usuario_cpf_sem_formatacao` | Rejeita tentativa de registro de usuário com um CPF de formato inválido. |
| `test_usuario_com_email_em_maiusculo` | Verifica se há diferenciação a depender do case, se minúsculo ou maiúsculo. |

---

### `test_weather_api.py` - testes da API do clima

---
| Teste                                   | O que é testado                                                                                     |
|----------------------------------------|------------------------------------------------------------------------------------------------------|
| `test_weather_list_view_com_cache`     | Verifica se a visualização de clima por propriedade funciona com cache, mesmo com possível falha no serviço externo. |
| `test_weather_detail_view_data_invalida` | Garante que a API retorna erro 400 ao receber uma data inválida na URL de previsão do tempo.         |

---

## Testes de integração

---

### `test_login.py` – testes da API de login

Testa o endpoint `/api/login`.

| Teste | O que é testado |
|-------|------------------|
| `test_login_sucesso` | Login com credenciais válidas; espera `200 OK` e um `token` na resposta. |
| `test_login_email_invalido` | Login com e-mail inexistente; espera `403 Forbidden`. |
| `test_login_senha_errada` | Login com senha incorreta; espera `403 Forbidden`. |
| `test_login_campo_email_vazio` | Login com campo de e-mail vazio; espera `403 Forbidden`. |
| `test_login_campo_senha_vazio` | Login com senha em branco; espera `403 Forbidden`. |

---

## Testes unitários

---

### `test_credito.py` – testes das solicitações de crédito

Testa diretamente o `SolicitacaoCreditoSerializer` e o `SolicitacaoCreditoCreateSerializer`.

| Teste | O que é testado |
|-------|------------------|
| `test_criacao_credito` | Verifica se uma solicitação de crédito é criada com preenchimento total e correto dos campos. |
| `test_criacao_sem_score` | Verifica se um usuário consegue fazer a solicitação sem o preenchimento de um campo **optativo**. |
| `test_credito_status_invalido` | Rejeita uma solicitação de teste com um status inválido. |
| `test_str_solicitacao` | Testa se a string está igual à presente no arquivo models dos créditos. |
| `test_atualizacao_score` | Verifica se o status consegue ser devidamente atualizado. |
| `test_solicitacao_sem_usuario` | Rejeita a criação de solicitações de crédito sem usuário associado. |
| `test_analista_acessando_solicitacao` | Verifica se o analista pode visualizar todas as solicitações feitas. |

---

### `test_plantio.py` - testes do plantio
---

| Teste                                       | O que é testado                                                                                          |
|--------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `test_criacao_plantio_sucesso`             | Verifica se um agricultor autenticado consegue criar um plantio com dados válidos.                        |
| `test_plantio_com_data_invalida`           | Garante que a API rejeita um plantio com estimativa de colheita anterior à data de plantio.              |
| `test_plantio_com_area_invalida`           | Verifica se o campo `area` do plantio valida corretamente entradas não numéricas.                        |
| `test_plantio_com_troca_entre_area_e_cultura` | Testa se a API identifica trocas de tipo entre os campos `cultura` e `area`, retornando erro.         |
| `test_plantio_em_propriedade_de_outro_usuario` | Garante que um agricultor não pode registrar plantios em propriedades de outro usuário.              |
| `test_listar_plantios_usuario_autenticado` | Verifica se um agricultor autenticado consegue listar os próprios plantios corretamente.                 |
| `test_plantio_sem_autenticacao`            | Assegura que a listagem de plantios não está acessível para usuários não autenticados.                   |

---

### `test_propriedade_uni.py` - testes da propriedade
---
| Teste                           | O que é testado                                                                                   |
|--------------------------------|----------------------------------------------------------------------------------------------------|
| `test_area_total_negativa`     | Verifica se o serializer bloqueia a criação de uma propriedade com `area_total` negativa.         |

---

### `test_quotes.py` - testes das cotações

Testa diretamente o `QuoteSerializer`.

| Teste | O que é testado |
|-------|------------------|
| `test_criacao_cotacao` | Verifica se a cotação é criada corretamente com atributos válidos. |
| `test_string_cotacao` | Verifica se a string de cotação retorna o mesmo que a string que está em modelos. |
| `test_campos_vazios` | Rejeita a criação de uma cotação com campos vazios. |
| `test_valor_formato_incorreto` | Rejeita a criação com valor numérico em formato string(incorreto). |
| `test_valor_nao_numerico` | Rejeita a criação com valor composto de uma string. |
| `test_atualizacao_cotacao` | Testa se um valor e um nome de cultura pode ser alterado. |
| `test_campo_ausente` | Rejeita um campo ausente. |

---

### `test_register.py` – testes do cadastro

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

### `test_weather_uni.py` - testes do clima
---
| Teste               | O que é testado                                                                                   |
|--------------------|----------------------------------------------------------------------------------------------------|
| `test_criacao_weather` | Verifica se é possível criar corretamente uma instância de previsão do tempo (`Weather`) associada a uma propriedade. |

---

## Observações

- Esses testes foram feitos com base em um modelo customizado de `User` que herda de `AbstractUser`, onde o campo `email` é usado como identificador.
- O sistema deve estar com `pytest` e `pytest-django` configurados, e com o banco de dados de testes acessível.
- O endpoint `/api/login` deve retornar `403` para credenciais inválidas e `200` com `token` em casos de sucesso.
- O serializer `UserSerializer` deve conter validações de e-mail, senha e role.
