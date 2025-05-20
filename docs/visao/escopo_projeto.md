# 4. **Declaração de Escopo do Projeto**

## **4.1 Backlog do produto**

*Forneça o backlog do produto:*

* *Sugiro as tabelas, dos itens a seguir organizadas em perfis, cenários, contendo cada um deles, os requisitos obrigatórios (MUST), e desejáveis (Should ou Could). As tabelas que se seguem são sugestões mínimas. Assim sendo elas podem ser modificadas/adaptadas pela equipe de acordo com as necessidades de cada desenvolvimento, desde que justificadas.* 

* *Defina o que cada uma dessas classes representa para o software em desenvolvimento que justifique sua classificação (visão da equipe a ser validada pelo P.O.)*

* *Identifique a forma de obtenção do requisito (elicitação): brainstorm, entrevistas, questionários, etc.*

\[Falar sobre o objetivo principal do projeto e como obtivemos os requisitos\]

As funcionalidades primordiais para o projeto foram realizadas com base na literatura e por meio de \[ALGUMA OUTRA COISA\]

| Funcionalidade | Descrição |
| :---- | :---- |
| Sistema de registro e acompanhamento de atividades de produção | Tem por objetivo auxiliar o acompanhamento das atividades de produção e a geração de relatórios. |
| Sistema de login | Tem por objetivo o registro de produtores de alimento, caso a comunidade tenha mais de um chefe de família |
| Sistema com materiais de apoio | Tem por objetivo ajudar na capacitação dos produtores de alimento |
| Calendário | Tem por objetivo auxiliar os produtores com o cronograma das safras e colheitas ou coleta |
| Interface gráfica | Tem por objetivo auxiliar visualmente o usuário por meio de navegação guiada, ícones autoexplicativos e uso reduzido de texto em cada tela |
| Acessibilidade | Tem por objetivo auxiliar os produtores a utilizarem o produto sem maiores dificuldades, com instruções onde for necessário e uso de linguagem simples |

## **4.2 Perfis**

*Perfis de acesso ao sistema de software podem ser importantes para identificar funcionalidades disponíveis de acordo com tais perfis. Neste sentido eles precisam ser identificados para, mais tarde, serem tratados as limitações de cada um deles. Além disso, é importante, ao cadastrar usuários que tenham permissões de acesso diferenciadas, que elas também sejam identificadas. Para isso é sugerida a seguinte tabela.* 

Os perfis de acesso do AgroRenda foram cuidadosamente elaborados para atender às necessidades específicas de cada ator envolvido no ecossistema agrícola, garantindo usabilidade, segurança e eficiência na gestão rural. O sistema foi projetado com três perfis principais, cada um com funções e responsabilidades bem definidas, alinhadas aos objetivos de inclusão digital e apoio à agricultura familiar.

O Agricultor Familiar é o usuário central, com ferramentas simplificadas para registro e acompanhamento da produção, desenvolvidas especialmente para superar barreiras tecnológicas. O Técnico Agrícola atua como facilitador, utilizando dados consolidados para oferecer suporte personalizado e promover o desenvolvimento sustentável das propriedades. Por fim, o Administrador garante o funcionamento contínuo da plataforma, assegurando que todos os recursos estejam disponíveis e acessíveis.

Essa estrutura organizada permite que cada usuário interaja com o sistema de forma intuitiva e produtiva, promovendo a gestão eficiente da produção agrícola e o acesso a oportunidades de crédito e assistência técnica. A seguir, os perfis são detalhados em suas características e permissões:

Tabela : Perfis de acesso

| \# | Nome do perfil | Características do perfil | Permissões de acesso |
| :---- | :---- | :---- | :---- |
| *\<1\>* | *\<ex\> Administrador*  | *Reponsável por manter os perfis de acesso da aplicação, criar novos usuários, alterar usuários já existentes, ou excluir usuários (Manter usuários)* | *Descrever suscintamente as permissões de acesso* |
| *1* | Administrador do Sistema | Responsável pelo sistema, deve garantir funcionamento do app e atualizar conteúdos. | Gerenciar usuários, ajustar configurações, monitorar uso. |
| *2* | Técnico Agrícola | Profissional que auxilia agricultores, ele irá acompanhar vários produtores, identificar problemas, gerar relatórios. | Ver dados consolidados, enviar orientações, validar pedidos de crédito. |
| 3 | Agricultor Familiar | Pequeno produtor rural, baixa escolaridade, pouca experiência com tecnologia. | Cadastrar atividades, ver relatório, consultar informações, pedir ajuda técnica. |

*Perfis diferentes podem usar técnicas diferentes para a elicitação dos requisitos. Descreva e justifique como parte deste item, qual(is) técnicas de elicitação serão usadas (criem tabelas para isso).*

## **4.3 Cenários**

Tabela : Cenários funcionais

| Sistema: xxx – Cenários funcionais |  |  |
| :---: | :---: | :---: |
| Numeração do cenário | Nome do cenário | Sprints |
|  |  |  |

*Alternativamente/ ou adicionalmente pode ser usado um mapa hierárquico para representar os cenários e suas Sprints e itens do backlog relacionados.*

## 

## **4.4 Tabela de Backlog do produto**

Tabela : Backlog do produto

| Sistema: xxxx – Backlog do produto |  |  |  |  |  |  |
| ----- | :---- | :---- | :---- | :---- | :---- | ----- |
| Numeração (Cenário / requisito) | Sprint | Nome do requisito | Tipo de requisito (Funcional / Não Funcional) | Priorização do requisito Must, Should, Could | Descrição sucinta do requisito | **User histories (U.S.) associadas** Identifique as U.S. associadas ao requisito |
|  |  | Página inicial | Funcional | Could | Onde o usuário é apresentado ao produto e ferramentas |  |
|  |  | Cadastro | Funcional | Must | Registrar o usuário no aplicativo |  |
|  |  | Login | Funcional | Must | Autenticar o usuário no aplicativo |  |
|  |  | Página de gestão da produção | Funcional | Must | Onde o agricultor insere, remove e altera dados de colheitas, cultivos, animais e vendas realizadas |  |
|  |  | Página de checar produtividade | Funcional | Must | Onde o agricultor confere informações pertinentes à sua produção como lucros, expectativas e histórico de desempenho |  |
|  |  | Página de consulta de cotações de cultivos e animais | Funcional | Must | Onde o agricultor busca por cultivos ou animais para consultar a cotação atual na região. |  |
|  |  | Página de consulta de informações sobre cultivos e animais | Funcional | Must | Onde o agricultor busca por cultivos ou animais para se informar sobre doenças, pestes e outras informações pertinentes |  |
|  |  | Página de solicitar e acompanhar pedidos de crédito | Funcional | Must | Onde o agricultor solicita e confere suas solicitações por crédito |  |
|  |  | Página de perguntas frequentes | Funcional | Could | Onde o agricultor pode buscar por informações comuns que podem o auxiliar |  |
|  |  | Página de cartilhas educacionais | Funcional | Could | Onde o agricultor poderia ler cartilhas produzidas por técnicos para auxílio com técnicas e manejos  |  |
|  |  | Sincronização optativa offline | Funcional | Must | Tem o objetivo de baixar e sincronizar dados que o agricultor queira ver depois, mesmo que não tenha acesso à internet |  |
|  |  | Interface gráfica intuitiva | Não Funcional | Must | Interface que siga padrões de usabilidade e facilidade de uso para agricultores que podem ou não ter dificuldades com tecnologia |  |
|  |  | Cliques  | Não Funcional | Could | Quantidade de cliques que o usuário executa para acessar cada página |  |
|  |  | Criptografia de senha | Não Funcional | Must | Criptografar a senha para manter as informações dos usuários seguras e privadas |  |
|  |  | Padronização | Não funcional | Could | Padronização do código escrito a fim de aumentar a organização e manutenibilidade para a equipe de desenvolvimento |  |
|  |  | Manutenibilidade | Não funcional | Must | Manutenibilidade a fim de garantir a continuidade do software |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |