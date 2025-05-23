# 4. **Declaração de Escopo do Projeto**

## **4.1 Backlog do produto**

O backlog do produto é uma lista de requisitos e funcionalidades, os quais serão
trabalhados pelo time de desenvolvimento Frontend e Backend, juntamente com o Product
Owner e o Scrum Master. Os requisitos e funcionalidades deverão, por meio de sprints, serem
entregues ao cliente, reordenando e atualizando conforme requerido e validado pelo mesmo.

Tendo em vista que o projeto AgroRenda, baseado na O.D.S 2.3, não possui um
cliente real, o Product Owner e o Scrum Master desempenham juntos o papel de cliente e
gerenciam o Backlog se baseando em literatura especializada como os artigos científicos que
abordam o tema do projeto, e estão disponíveis nas referências bibliográficas.

Os requisitos se encontram listados na tabela de backlog do produto, subitem 4.4, de
acordo com sua ordem de importância, o seu tipo, sua priorização, sua descrição breve e as
histórias de usuários que serão a base do desenvolvimento.

<div class="centered-text"><b>Tabela 7 - Funcionalidades e descrições</b></div>

| Funcionalidade                                | Descrição                                                                                     |
|-----------------------------------------------|-----------------------------------------------------------------------------------------------|
| Sistema de registro e acompanhamento de atividades de produção | Tem por objetivo auxiliar o acompanhamento das atividades de produção e a geração de relatórios. |
| Sistema de login                              | Tem por objetivo o registro de produtores de alimento, caso a comunidade tenha mais de um chefe de família. |
| Sistema com materiais de apoio                | Tem por objetivo ajudar na capacitação dos produtores de alimento.                             |
| Calendário                                    | Tem por objetivo auxiliar os produtores com o cronograma das safras e colheitas ou coleta.     |
| Interface gráfica                             | Tem por objetivo auxiliar visualmente o usuário por meio de navegação guiada, ícones autoexplicativos e uso reduzido de texto em cada tela. |
| Acessibilidade                                | Tem por objetivo auxiliar os produtores a utilizarem o produto sem maiores dificuldades, com instruções onde for necessário e uso de linguagem simples. |

<div class="centered-text"><b>Fonte: </b> Elaborado por integrantes do projeto</div>

## **4.2 Perfis**


Os perfis de acesso do AgroRenda foram cuidadosamente elaborados para atender às necessidades específicas de cada ator envolvido no ecossistema agrícola, garantindo usabilidade, segurança e eficiência na gestão rural. O sistema foi projetado com três perfis principais, cada um com funções e responsabilidades bem definidas, alinhadas aos objetivos de inclusão digital e apoio à agricultura familiar.

O Agricultor Familiar é o usuário central, com ferramentas simplificadas para registro e acompanhamento da produção, desenvolvidas especialmente para superar barreiras tecnológicas. O Técnico Agrícola atua como facilitador, utilizando dados consolidados para oferecer suporte personalizado e promover o desenvolvimento sustentável das propriedades. Por fim, o Administrador garante o funcionamento contínuo da plataforma, assegurando que todos os recursos estejam disponíveis e acessíveis.

Essa estrutura organizada permite que cada usuário interaja com o sistema de forma intuitiva e produtiva, promovendo a gestão eficiente da produção agrícola e o acesso a oportunidades de crédito e assistência técnica. A seguir, os perfis são detalhados em suas características e permissões:

<div class="centered-text"><b>Tabela 8 - Perfis de acesso e suas características</b></div>

| # | Nome do Perfil        | Características do Perfil                                                                 | Permissões de Acesso                                                                 |
|---|-----------------------|------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| 1 | Administrador do Sistema | Responsável pelo sistema, deve garantir funcionamento do app e atualizar conteúdos.       | Gerenciar usuários, ajustar configurações, monitorar uso.                            |
| 2 | Técnico Agrícola      | Profissional que auxilia agricultores, acompanha vários produtores, identifica problemas e gera relatórios. | Ver dados consolidados, enviar orientações.                                         |
| 3 | Agricultor Familiar   | Pequeno produtor rural, tem como principal interesse oportunidades financeiras e melhor gestão de seu negócio. | Cadastrar atividades, ver relatórios, consultar informações, pedir ajuda técnica, solicitar e acompanhar pedidos de crédito. |
| 4 | Analista de Crédito   | Profissional responsável pela análise dos pedidos de crédito agrícola.                   | Analisar pedidos de crédito dos agricultores familiares.                            |

<div class="centered-text"><b>Fonte: </b> Elaborado por integrantes do projeto</div>

## **4.3 Cenários**

Os cenários funcionais definidos para o AgroRenda vão desde o planejamento inicial
até as operações que cobrem totalmente o suporte ao agricultor. Tudo começa com a escolha
do que será feito, incluindo o backlog do produto, a criação de uma identidade visual e um
documento que resume a visão geral do projeto. A partir daí, o MVP é planejado e dividido
em sprints para fornecer valor de forma contínua.

Quando os usuários interagem com o sistema, eles encontram funcionalidades como
cadastro e login, além de interfaces intuitivas, adaptadas para agricultores com diferentes
níveis de familiaridade com a tecnologia. Operacionalmente, o AgroRenda permite o
gerenciamento eficiente de dados de produção, consulta de cotações, acesso a informações
técnicas e gerência de crédito rural.

Funcionalidades adicionais, como a possibilidade de uso offline, vídeos educacionais
e uma página de perguntas frequentes, ajudam a promover a acessibilidade, autonomia e
capacitação dos usuários. Recursos não funcionais, como criptografia de dados e fácil
usabilidade, garantem que o sistema seja seguro e confiável. Abaixo, disponibilizamos uma
tabela que resume os principais cenários funcionais mapeados:
 

<div class="centered-text"><b>Tabela 9 - Cenários funcionais</b></div>

<table>
  <thead>
    <tr>
      <th colspan="3" style="text-align: center;border-bottom: .05rem solid var(--md-typeset-table-color); padding-bottom: 8px;">
        <h3 style="margin: 0;"><b>Sistema: AgroRenda – Cenários funcionais</b></h3>
      </th>
    </tr>
    <tr>
      <th>Numeração do cenário</th>
      <th>Nome do cenário</th>
      <th>Sprints</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Definição do produto, backlog, identidade visual, documento de visão</td>
      <td>Definir os principais aspectos do produto, incluindo backlog inicial, identidade visual e documento de visão.</td>
    </tr>
    <tr>
      <td>2</td>
      <td>MVP e planejamento do projeto</td>
      <td>Planejar o desenvolvimento do MVP e estruturar as entregas ao longo do projeto.</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Página inicial</td>
      <td>O sistema apresenta uma página inicial com informações introdutórias sobre o produto, tutoriais de como usar o produto e ferramentas disponíveis.</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Cadastro de Usuário</td>
      <td>Permitir o registro de novos usuários no sistema, garantindo que o agricultor crie uma conta.</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Login de Usuário</td>
      <td>Implementar a funcionalidade para autenticação de usuários, permitindo acesso seguro ao sistema através de login com credenciais.</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Visualização de Perfil do Usuário</td>
      <td>Permitir que o usuário visualize seu perfil pessoal no sistema, com informações como dados cadastrais.</td>
    </tr>
    <tr>
      <td>7</td>
      <td>Gestão da Produção</td>
      <td>O agricultor pode adicionar, editar e excluir dados relacionados a culturas, colheitas, animais e vendas realizadas, facilitando a gestão da produção.</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Consulta de Produtividade</td>
      <td>O agricultor pode visualizar dados sobre a produtividade da sua produção, como lucros, histórico e expectativas.</td>
    </tr>
    <tr>
      <td>9</td>
      <td>Consulta de Informações Técnicas</td>
      <td>O agricultor pode consultar informações sobre cultivos e animais, como manejo, doenças, pragas e outras informações técnicas.</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Solicitação de Crédito</td>
      <td>O agricultor pode solicitar crédito diretamente no sistema e acompanhar o status de suas solicitações.</td>
    </tr>
    <tr>
      <td>11</td>
      <td>Página de Perguntas Frequentes (FAQ)</td>
      <td>O agricultor pode acessar uma seção de perguntas frequentes para tirar dúvidas comuns relacionadas à produção agrícola.</td>
    </tr>
    <tr>
      <td>12</td>
      <td>Vídeos Educacionais</td>
      <td>O agricultor pode acessar vídeos técnicos que fornecem orientações sobre práticas agrícolas, como adubação e manejo de culturas.</td>
    </tr>
  </tbody>
</table>

<div class="centered-text"><b>Fonte: </b> Elaborado por integrantes do projeto</div>

<br><br>

## **4.4 Tabela de Backlog do produto**

<div class="centered-text"><b>Tabela 10 - Backlog do produto</b></div>

| Numeração | Sprint | Nome do requisito                                      | Tipo de requisito (Funcional / Não Funcional) | Priorização (Must, Should, Could) | Descrição sucinta do requisito                                                                                                                                 | User stories (U.S.) associadas                                                                                                                                                                                                 |
|-----------|--------|-------------------------------------------------------|-----------------------------------------------|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1         |        | Página inicial                                        | Funcional                                     | Must                              | Onde o usuário é apresentado ao produto e ferramentas                                                                                                          | “Como agricultor, quero ver as funcionalidades disponíveis, para me auxiliarem.”                                                                                                                                             |
| 2         |        | Cadastro                                              | Funcional                                     | Must                              | Registrar o usuário no aplicativo                                                                                                                              | “Como novo usuário, quero me cadastrar no aplicativo, para que eu possa acessar as funcionalidades disponíveis.”                                                                                                             |
| 3         |        | Login                                                 | Funcional                                     | Must                              | Autenticar o usuário no aplicativo                                                                                                                             | “Como usuário registrado, quero fazer login no sistema, para que eu possa acessar as funcionalidades disponíveis.”                                                                                                           |
| 4         |        | Página de gestão da produção                          | Funcional                                     | Must                              | Onde o agricultor insere, remove e altera dados de colheitas, cultivos, animais e vendas realizadas                                                            | “Como agricultor, quero poder administrar informações sobre a minha produção, podendo adicionar, editar e excluir elas.”                                                                                                     |
| 5         |        | Página de checar produtividade                        | Funcional                                     | Must                              | Onde o agricultor confere informações pertinentes à sua produção como lucros, expectativas e histórico de desempenho                                           | “Como agricultor, quero acessar uma página com informações sobre minha produtividade, para que eu possa acompanhar meus lucros, expectativas e histórico de desempenho.”                                                     |
| 6         |        | Página de consulta de cotações de cultivos e animais  | Funcional                                     | Must                              | Onde o agricultor busca por cultivos ou animais para consultar a cotação atual na região                                                                       | “Como agricultor, quero ver e pesquisar qual o valor atual dos cultivos e animais na minha região para atribuir um preço, para meus produtos.”                                                                               |
| 7         |        | Página de consulta de informações sobre cultivos e animais | Funcional                                  | Must                              | Onde o agricultor busca por cultivos ou animais para se informar sobre doenças, pestes e outras informações pertinentes                                        | “Como agricultor, quero ver e pesquisar informações sobre doenças, pestes, práticas e dicas sobre cultivos e animais, principalmente com fotos para me informar.”                                                           |
| 8         |        | Página de solicitar e acompanhar pedidos de crédito    | Funcional                                     | Must                              | Onde o agricultor solicita e confere suas solicitações por crédito                                                                                             | “Como agricultor, quero poder solicitar crédito, para custear novas ferramentas, máquinas ou produtos.”                                                                                                                     |
| 9         |        | Página de perguntas frequentes                        | Funcional                                     | Could                             | Onde o agricultor pode buscar por informações comuns que podem o auxiliar                                                                                     | “Como agricultor, quero poder ver uma lista de perguntas que eu provavelmente posso ter, junto com respostas, para me informar.”                                                                                            |
| 10        |        | Página de ajuda técnica                               | Funcional                                     | Could                             | Onde o agricultor pode perguntar a um técnico por alguma questão específica                                                                                   | “Como agricultor, se nenhuma das opções prontas tiverem me atendido, quero poder falar com um técnico, para tirar minhas dúvidas.”                                                                                          |
| 11        |        | Página de vídeos educacionais                         | Funcional                                     | Could                             | Onde o agricultor poderia ver vídeos produzidos por técnicos para auxílio com técnicas e manejos                                                              | “Como agricultor, quero poder ver os vídeos produzidos por técnicos com informações sobre cultivo e manejo, para me auxiliar com técnicas agrícolas.”                                                                        |
| 12        |        | Página do analista de crédito                         | Funcional                                     | Must                              | Onde o analista de crédito poderá receber e consultar as solicitações de crédito                                                                               | “Como analista de crédito, quero poder ter acesso aos pedidos de crédito feitos pelo agricultor, para avaliar as informações de produção e portanto aprovar ou não a solicitação.”                                           |
| 13        |        | Página de acompanhamento técnico                      | Funcional                                     | Could                             | Onde o técnico acompanha e responde aos agricultores                                                                                                           | “Como técnico agrícola, quero ter acesso aos rendimentos e dúvidas dos agricultores, para gerar relatórios e tirar dúvidas.”                                                                                                |
| 14        |        | Sincronização optativa offline                        | Funcional                                     | Should                            | Tem o objetivo de baixar e sincronizar dados que o agricultor queira ver depois, mesmo que não tenha acesso à internet                                         | “Como agricultor, quero poder ter a opção de baixar dados necessários para uma funcionalidade funcionar, para utilizá-la no futuro, sem acesso à internet.”                                                                  |
| 15        |        | Instruções para as funcionalidades de cada página      | Funcional                                     | Must                              | Disponibilizar um botão para ativar descrições explicativas dos elementos visíveis na página atual                                                            | “Como agricultor, se eu tiver dúvidas sobre usabilidade na página que estou, quero poder clicar um botão que ativa descrições em áudio ou texto para explicar botões, formulários e os demais elementos na página, para tirar minhas dúvidas.” |
| 16        |        | Tour guiado                                           | Funcional                                     | Could                             | Apresentação do aplicativo, mostrando suas funcionalidades (tipo uma visualização das user stories)                                                            | “Como agricultor, ao entrar no aplicativo, quero ter uma opção de ver as funcionalidades disponíveis e como chegar nela e utilizá-las, para conhecer o software.”                                                            |
| 17        |        | Interface gráfica intuitiva                           | Não Funcional                                 | Must                              | Interface que siga padrões de usabilidade e facilidade de uso para agricultores que podem ou não ter dificuldades com tecnologia                               | “Como agricultor, quero conseguir acessar todas as funcionalidades do sistema, sem ter que gastar muito tempo procurando elas.”                                                                                              |
| 18        |        | Cliques                                               | Não Funcional                                 | Could                             | Quantidade de cliques que o usuário executa para acessar cada página                                                                                          | “Como usuário, quero navegar pelo software rapidamente, para utilizar quaisquer funcionalidades.”                                                                                                                           |
| 19        |        | Criptografia de senha                                 | Não Funcional                                 | Must                              | Criptografar a senha para manter as informações dos usuários seguras e privadas                                                                               | “Como desenvolvedor quero que as senhas dos usuários sejam armazenadas de forma criptografada, para que as informações pessoais deles permaneçam seguras e privadas”                                                         |
| 20        |        | Padronização                                          | Não Funcional                                 | Could                             | Padronização do código escrito a fim de aumentar a organização e manutenibilidade para a equipe de desenvolvimento                                             | “Como desenvolvedor, quero trabalhar num ambiente padronizado e organizado, para ser mais produtivo.”                                                                                                                       |
| 21        |        | Manutenibilidade                                      | Não Funcional                                 | Must                              | Manutenibilidade a fim de garantir a continuidade do software                                                                                                 | “Como desenvolvedor, quero que as funcionalidades estejam bem estruturadas, testadas e organizadas, para se houver algum problema eu conseguir corrigir mais facilmente.”                                                   |

<div class="centered-text"><b>Fonte: </b> Elaborado por integrantes do projeto</div>