# **6. Testes de Software**

O plano de testes do projeto AgroRenda incluirá a estratégia empregada e o roteiro
dos testes de maneira a subsidiar o funcionamento da aplicação ao usuário final e validar o
atendimento a requisitos funcionais e não funcionais do sistema.

**Estratégias de testes**

A estratégia de testes adotada para o projeto AgroRenda visa garantir a qualidade
funcional e a usabilidade da aplicação em diferentes contextos de uso. O roteiro elaborado
contempla cenários reais do usuário, baseados nas principais funcionalidades do sistema. A
seguir, estão descritas as abordagens utilizadas:

**Nível de teste**

Todos os testes previstos são de nível de sistema, com foco na verificação do
comportamento do sistema como um todo. Os testes consideram a integração entre
componentes e a interface final com o usuário.

**Tipo de teste**

- Funcionais: Verificam se os requisitos funcionais estão sendo corretamente
implementados (ex: login, cadastro, envio de formulários).
- Validação de regras de negócio: Inclusão de testes negativos (ex: login com dados
inválidos).
- Navegação e UX: Garantem a acessibilidade e coerência de navegação entre telas.
- UI/UX: teste de responsividade para garantir uso adequado em dispositivos móveis.
Os testes do sistema AgroRenda serão realizados em múltiplos ambientes, com o
objetivo de assegurar a qualidade, compatibilidade e robustez da aplicação em diversos
contextos de uso. A seguir, descrevem-se os ambientes de teste previstos.

**Ambiente de teste**

O Ambiente de Desenvolvimento é utilizado para validação preliminar de
funcionalidades, possibilitando correções rápidas durante o processo de codificação. Nesse
ambiente, são utilizados dados fictícios, com configurações específicas que permitem
depuração e testes de unidade. As alterações podem ser realizadas diretamente, sem a
necessidade de processos formais de implantação (SOMMERVILLE, 2011).

O Ambiente de Homologação é destinado à execução de testes de integração e de
sistema, simulando as condições reais do ambiente de produção. Nele, são realizados testes
completos das funcionalidades, utilizando dados de teste que representam cenários típicos de
uso do sistema. Esse ambiente possibilita que a equipe de Garantia da Qualidade (Quality
Assurance) e as partes interessadas validem a aplicação antes de sua liberação para os
usuários finais (PRESSMAN; MAXIM, 2021).

O Ambiente de Produção corresponde ao ambiente real em que o sistema será
disponibilizado aos usuários finais. Nesse contexto, são realizados testes de verificação após
a implantação, com foco no monitoramento de desempenho e estabilidade. As atividades de
teste nesse ambiente são restritas, de modo a evitar impactos negativos sobre a operação do
sistema ou prejuízos aos usuários (ISO/IEC/IEEE, 2013).

Além desses, o sistema será validado em diferentes plataformas para assegurar a sua
compatibilidade e responsividade. Os testes contemplarão múltiplos navegadores, tais como
Google Chrome, Mozilla Firefox, Microsoft Edge e Safari, bem como sistemas operacionais
variados, incluindo Windows, Linux e macOS. Também serão realizados testes em
dispositivos móveis, abrangendo sistemas Android (a partir da versão 10) e iOS (a partir da
versão 14), utilizando navegadores nativos e o Google Chrome.

Adicionalmente, serão considerados aspectos relacionados à infraestrutura de banco
de dados e à comunicação com serviços externos. O banco de dados, baseado em sistemas
relacionais como MySQL ou PostgreSQL, será avaliado quanto à integridade e consistência
das informações, sob diferentes volumes e cargas. As interfaces de comunicação com APIs e
serviços externos também serão testadas, de modo a garantir que eventuais falhas ou
indisponibilidades não comprometam o funcionamento da aplicação (ISO/IEC 25010, 2011).

Dessa forma, a realização de testes em múltiplos ambientes e plataformas visa
assegurar que o sistema AgroRenda opere de forma eficiente, segura e estável em diversos
cenários de uso.

**Formas de análise**

A análise dos testes será conduzida de maneira qualitativa e quantitativa, com o
objetivo de assegurar que todos os requisitos funcionais e não funcionais do sistema foram
devidamente atendidos (ISO/IEC/IEEE, 2013). Diversas abordagens serão empregadas para
garantir a confiabilidade dos resultados e a adequação do sistema às expectativas dos usuários
e às especificações técnicas.

Inicialmente, será realizada a comparação entre os resultados obtidos e os resultados
esperados. Cada caso de teste contará com critérios objetivos de aceitação, permitindo uma
avaliação precisa da conformidade do sistema. O comportamento observado será analisado
frente ao comportamento previsto, e, em caso de divergências, as inconsistências serão
devidamente registradas (PRESSMAN; MAXIM, 2021).

Além disso, será efetuada a análise de logs, a qual consiste na verificação dos
registros gerados pelo sistema durante a execução dos testes. Essa prática possibilita a
identificação de falhas que não são perceptíveis diretamente pela interface do usuário, mas
que podem comprometer o funcionamento interno da aplicação (SOMMERVILLE, 2011).

Os relatórios de erros também serão utilizados como uma ferramenta essencial para o
registro sistemático das falhas encontradas. Tais relatórios incluirão a descrição detalhada dos
problemas, os passos necessários para a sua reprodução, bem como evidências objetivas, tais
como capturas de tela e registros de logs (ISO/IEC/IEEE, 2013).

Quando pertinente, será coletado o feedback de usuários por meio de sessões de testes
orientadas à avaliação da usabilidade, da navegabilidade e da aderência do sistema aos
requisitos previamente estabelecidos. Essa abordagem visa garantir que a experiência do
usuário final seja satisfatória e que o sistema atenda às suas necessidades de forma eficaz
(ISO/IEC 25010, 2011).

Por fim, serão realizados ciclos de reteste após cada correção implementada. Esses
ciclos são fundamentais para garantir que as falhas identificadas foram, de fato, resolvidas,
além de assegurar que as modificações realizadas não introduziram novos defeitos, por meio
da execução de testes de regressão (SOMMERVILLE, 2011). Dessa forma, busca-se a
entrega de um produto robusto, confiável e alinhado às expectativas e necessidades dos
usuários.


<div class="centered-text"><b> Tabela 11 - Testes de software</b></div>


| Código do teste | Nome do teste | Objetivo | Nível do teste | Tipo de teste | Pré-condições |
|-----------------|---------------|----------|----------------|---------------|----------------|
| TC001 | Validação da página inicial | Verificar se a página inicial carrega corretamente com os elementos esperados | Sistema | Funcional | Aplicativo instalado e em execução |
| TC002 | Login com credenciais válidas | Garantir que o usuário consegue acessar o sistema com credenciais válidas | Sistema | Funcional | Usuário já cadastrado no sistema |
| TC003 | Login com credenciais inválidas | Verificar a tipagem de credenciais inválidas no login | Sistema | Funcional | Usuário deve estar desconectado |
| TC004 | Cadastro de novo usuário | Validar o cadastro de novos usuários no sistema | Sistema | Funcional | Acesso à tela de cadastro |
| TC005 | Envio de formulário vazio | Verificar a validação de campos obrigatórios no formulário | Sistema | Funcional | Formulário deve estar acessível |
| TC006 | Logout do sistema | Confirmar que o logout encerra corretamente a sessão do usuário | Sistema | Funcional | Usuário logado no sistema |
| TC007 | Pesquisa de produto existente | Verificar a exibição de resultados para um produto existente | Sistema | Funcional | Produto cadastrado no sistema |
| TC008 | Pesquisa de produto inexistente | Verificar a resposta para um produto não cadastrado | Sistema | Funcional | Sistema acessível |
| TC009 | Navegação por menu | Testar se os itens do menu redirecionam para as telas corretas | Sistema | Navegação | Sistema inicializado |
| TC010 | Responsividade em celular | Validar se a interface se adapta corretamente a resoluções móveis | Interface | UI/UX | Acesso via navegador móvel |

<div class="centered-text"><b> Fonte: </b> Elaborado por Milena e Davi do Egito</div>


<br><br>

<div class="centered-text"><b> Tabela 12 - Critérios de Aceitação, Reparos e Evidências </b></div>

| Código do teste | Nome do teste | Critérios de aceitação | Resultado esperado | Evidências | Retestes executados | Ciclos de teste |
|-----------------|---------------|------------------------|---------------------|------------|----------------------|----------------|
| TC001 | Validação da página inicial | Todos os elementos visuais devem estar visíveis e funcionais | Página inicial exibida corretamente com todos os elementos interativos | Captura de tela da página inicial | Nenhum | 1 |
| TC002 | Login com credenciais válidas | Acesso autorizado e redirecionamento para a tela principal | Login efetuado com sucesso e redirecionamento | Captura de tela da tela principal após login | Nenhum | 1 |
| TC003 | Login com credenciais inválidas | Mensagem de erro clara e impedimento de acesso | Login recusado e mensagem de erro exibida | Captura de tela da mensagem de erro | Nenhum | 1 |
| TC004 | Cadastro de novo usuário | Usuário deve ser registrado e redirecionado com sucesso | Cadastro realizado com sucesso | Captura de tela de confirmação de cadastro | Nenhum | 1 |
| TC005 | Envio de formulário vazio | Erro deve ser exibido para cada campo obrigatório não preenchido | Mensagem de erro nos campos vazios | Captura de tela das mensagens de erro | Nenhum | 1 |
| TC006 | Logout do sistema | Sessão finalizada e redirecionamento para a tela de login | Usuário deslogado com sucesso | Captura de tela da tela de login | Nenhum | 1 |
| TC007 | Pesquisa de produto existente | Produto deve aparecer na lista de resultados | Produto encontrado e exibido corretamente | Captura de tela dos resultados | Nenhum | 1 |
| TC008 | Pesquisa de produto inexistente | Mensagem informando ausência de resultados | Nenhum resultado encontrado e exibição da mensagem apropriada | Captura de tela da mensagem de 'produto não encontrado' | Nenhum | 1 |
| TC009 | Navegação por menu | Todas as opções devem funcionar conforme esperado | Cada item redireciona corretamente para sua respectiva função | Capturas de tela das telas acessadas | Nenhum | 1 |
| TC010 | Responsividade em celular | Todos os elementos devem se ajustar corretamente ao layout mobile | Layout ajustado e funcional em celular | Captura de tela do celular | Nenhum | 1 |

<div class="centered-text"><b>Fonte: </b> Elaborado por Milena e Davi do Egito </div>