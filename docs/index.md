# Apresentação 

**AgroRenda** é uma aplicação mobile gratuita desenvolvida por alunos da **FCTE - UnB** cursando a disciplina **Métodos de Desenvolvimento de Software - Turma 02** no semestre **2025.1**. A nossa aplicação apoia diretamente os pequenos produtores de alimentos — como agricultores familiares, pescadores artesanais e comunidades indígenas e quilombolas — a aumentarem sua produtividade e renda, em consonância com o **<a href="https://brasil.un.org/pt-br/sdgs/2">ODS 2.3</a>** da **ONU**.

> 2.3 Até 2030, dobrar a produtividade agrícola e a renda dos pequenos produtores de alimentos, particularmente das mulheres, povos indígenas, agricultores familiares, pastores e pescadores, inclusive por meio de acesso seguro e igual à terra, outros recursos produtivos e insumos, conhecimento, serviços financeiros, mercados e oportunidades de agregação de valor e de emprego não agrícola

Na barra lateral, você encontra a documentação e outras informações relevantes para o desenvolvimento da aplicação, isso inclui: visão geral do produto, arquitetura, atas de reuniões e etc.

# Membros

<div class="team-container">
  {% for member in extra.team %}
    <a class="team-card" href="https://github.com/{{ member.username }}" target="_blank" rel="noopener">
      <img src="https://avatars.githubusercontent.com/{{ member.username }}?s=120" alt="{{ member.name }}">
      <p>{{ member.name }}</p>
    </a>
  {% endfor %}
</div>
