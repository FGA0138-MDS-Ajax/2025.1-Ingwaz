# **6. Testes de Software**

O plano de testes do projeto AgroRenda incluirá a estratégia empregada e o roteiro dos testes de maneira a subsidiar o funcionamento da aplicação ao usuário final e validar o atendimento a requisitos funcionais e não funcionais do sistema.

## **6.1 Estratégias de testes**

A estratégia de testes do projeto AgroRenda visa garantir que as funcionalidades do sistema estejam corretas, seguras e em conformidade com os requisitos definidos. Serão utilizados diferentes níveis de teste para verificar desde componentes isolados (como modelos e validadores) até o comportamento completo da API, simulando interações reais com o sistema. As abordagens adotadas incluem:

* Organização dos testes em três níveis: unitário, integração e API (sistema);
* Validação com dados válidos e inválido;
* Coleta de evidências com logs, prints e relatórios de cobertura;
* Retestes após correções para assegurar estabilidade.


## **6.2 Nível de teste**

### **6.2.1 Testes Unitários**

Validam partes isoladas do sistema, como métodos de modelos ou validações em serializers. São executados com unittest ou pytest e não envolvem requisições HTTP

Exemplos:
* Verificar se um campo obrigatório está sendo validado
* Testar a lógica de um método customizado do modelo

### **6.2.2 Testes de Integração**
Avaliaram se diferentes partes do sistema interagem corretamente. Simulam o fluxo entre serializers, views e banco de dados, usando o cliente de teste do Django (APIClient).

Exemplos:

* Testar o processo de cadastro de usuário completo
* Verificar se o token é gerado corretamente após login

### **6.2.3 Testes de API (nível de sistema)**
Simulam chamadas reais à API, testando o sistema como um todo por meio de requisições HTTP. Garantem que os endpoints estão funcionando conforme esperado.

Exemplos:

* Enviar uma requisição POST para login com credenciais válidas
* Testar o endpoint de criação de produção com token de autenticação


### **6.2.4 Tipo de teste**

* Funcionais: validam o comportamento esperado do sistema
* Negativos: testam situações inválidas (ex: dados incorretos)
* Segurança: verificam autenticação e proteção contra acessos indevidos
* Usabilidade técnica: verificam mensagens de erro, respostas claras e feedback do sistema


### **6.2.5 Ambiente de teste**

* Desenvolvimento: usado para testes unitários e ajustes locais
* Homologação: simula o ambiente real, usado para testes de integração e API
* Produção: restrito a verificações não invasivas, apenas para validação pós-deploy

As execuções serão feitas com pytest e coverage.py para gerar relatórios de cobertura e logs. O banco de dados utilizado nos testes será isolado do ambiente de produção (por padrão, SQLite em memória).


## **6.3 Roteiro de testes**

Dentro do plano de testes, os testes realizados abarcarão diferentes tipos e níveis dentro de um escopo comum, sendo alguns dos testes replicados em mais de uma funcionalidade para garantir a maior quantidade possível de cobertura e garantir o funcionamento adequado das funcionalidades e recursos do projeto AgroRenda. Segue nas tabelas abaixo os testes a serem realizados e as condições para aceitação dos devidos testes.



<div class="centered-text"><b> Tabela 11 - Testes de software</b></div>


| Código do teste | Nome do teste | Tipo | Nível| Pré-condição |
|-----------------|---------------|----------|----------------|---------------|
| TU001 | Validação de CPF no serializer | Funcional | Unitário | Nenhum | 
| TU002 | Validação de campos obrigatórios | Negativo| Unitário | Nenhum |
| TU003 | Verificação de senha mínima | Funcional | Unitário | Nenhum | 
| TU004 | Método __str__ no model | Funcional | Unitário | Objeto instanciado |
| TI001 | Cadastro com dados válidos | Funcional | Integração | Nenhum | 
| TI002 | Cadastro com campos vazios | Negativo | Integração | Nenhum |
| TI003 | Login com credenciais válidas | Funcional | Integração | Usuário já cadastrado | 
| TI004 | Login com credenciais inválidas | Negativo | Integração | Usuário inexistente ou senha errada |
| TI005 | Geração e uso de token | Segurança | Integração | Login realizado | 
| TA001 | Envio de produção com token válido | Funcional | API (Sistema) | Usuário autenticado |
| TA002 | Envio de produção com token inválido | Segurança | API (Sistema) | Token expirado ou inválido | 
| TA003 | Listagem de atividades do usuário | Funcional | API (Sistema)| Produções cadastradas | 

<div class="centered-text"><b> Fonte: </b> Elaborado por Milena, Davi do Egito e Renan Reis(2025)</div>


<br><br>

<div class="centered-text"><b> Tabela 12 - Critérios de Aceitação dos testes </b></div>

| Código do Teste | Funcionalidade Associada          | Critério de Aceitação                                                                 |
|-----------------|-----------------------------------|----------------------------------------------------------------------------------------|
| TU001           | Validação de CPF                  | O CPF deve ser válido segundo a regra oficial. Em caso de erro, o sistema deve rejeitar. |
| TU002           | Campos obrigatórios               | Todos os campos obrigatórios devem disparar erro se vazios.                           |
| TU003           | Validação de senha                | A senha deve conter no mínimo 8 caracteres.                                           |
| TU004           | Exibição de dados                 | O método `__str__()` deve retornar uma string coerente com os dados do objeto.        |
| TI001           | Cadastro de usuário               | O cadastro deve ser bem-sucedido com dados válidos e salvar no banco.                 |
| TI002           | Cadastro incompleto               | O sistema deve rejeitar cadastro com campos obrigatórios vazios.                      |
| TI003           | Login com credenciais válidas     | O sistema deve autenticar e retornar token.                                           |
| TI004           | Login inválido                    | O sistema deve rejeitar o login e retornar erro com mensagem clara.                   |
| TI005           | Token de autenticação             | O token gerado deve ser válido e funcionar em endpoints protegidos.                   |
| TA001           | Envio de produção                 | A produção deve ser registrada com sucesso se o token for válido.                     |
| TA002           | Envio com token inválido          | O sistema deve rejeitar a requisição e retornar erro de autenticação.                 |
| TA003           | Listagem de atividades            | O usuário autenticado deve conseguir visualizar apenas suas próprias produções.       |

<div class="centered-text"><b>Fonte: </b> Elaborado por Milena, Davi do Egito e Renan Reis(2025)</div>