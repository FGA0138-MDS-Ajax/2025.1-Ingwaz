# ATA DE REUNIÃO - 02/06/2025

#### Presença 
* Todo mundo presente!

####  **Pontos positivos reconhecidos**

* Entrega do *git page* conforme esperado (único grupo).
* Referências bibliográficas corretas e reais.
* Bom uso do GitHub com organização inicial adequada.
* Objetivo do produto claro, com requisitos elicitados.
* Rastreabilidade considerada uma das melhores da disciplina.
* Decisão de mudar o front-end para *mobile* (decisão acertada).
* Diagramas de pacotes, classes e outros com boa estrutura geral.
* Grupo elogiado pelo uso consistente do Teams e organização.

---

###  **Correções e Ajustes Necessários (Foco: Arquitetura)**

####  **Arquitetura Geral**

* **Correção conceitual:** MVC não é arquitetura, é um *modelo de arquitetura*. Corrigir esse termo e explicação no documento.
* **Diagrama de arquitetura:** Necessita ajustes no fluxo (ex: identificar claramente início com bolinha preta, sentido das setas, interação entre camadas).

#### **Diagramas**

* **Diagrama de casos de uso:**

  * Corrigir a relação entre usuários primários (à esquerda) e os elementos à direita.
  * Garantir que todas as interações possíveis estejam corretamente mapeadas.
* **Diagrama de atividades (confundido com estados):**

  * O diagrama apresentado está mais próximo de um *diagrama de atividades*, e não de *estados*.
  * Separar claramente os tipos de diagramas.
  * Utilizar ferramentas adequadas como o [draw.io](https://www.draw.io), conforme sugerido.
* **Diagrama de estados:**

  * Refazer de acordo com a semântica correta (transições de estado, não de ações).
  * Incluir elementos como losangos (condições) e setas com eventos.
* **Diagrama do banco de dados (ER ou DER):**

  * Incluir na entrega final para comprovar coerência com o que foi proposto no documento.
  * Pode usar modelo lógico ou físico (ex: MySQL Workbench, dbdiagram.io).
  * Atenção às cardinalidades (evitar tudo como 1\:N sem justificativa).

####  **Formatação e Padronização**

* Padronizar:

  * Fonte: Times New Roman, tamanho 12.
  * Espaçamento: 1,15 ou 1,5 (desde que unificado).
  * Legendas e fontes de diagramas (legenda acima, fonte/autoria abaixo).
* Manter a documentação organizada mesmo fora do padrão ABNT, mas visualmente limpa e uniforme.

###  **Recomendações Finais**

* Revisar todos os diagramas com base nas aulas e nos exemplos apresentados pelo Gabriel.
* Não colar diagramas diretamente de sites — pode gerar incoerências e penalizações.
* Aproveitar a boa estrutura e engajamento do grupo para manter o ritmo.
* Garantir justificativas técnicas claras para decisões tomadas (ex: mobile vs web).
* Para diagramas complexos, dividir em partes menores, como feito no exemplo do Airbnb.