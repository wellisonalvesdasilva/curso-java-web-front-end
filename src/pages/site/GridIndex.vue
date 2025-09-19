<template>
  <q-layout view="hHh lpR fFf" class="font-poppins bg-white text-dark">
    <!-- Header -->
    <q-header elevated class="bg-black text-white font-poppins">
      <q-toolbar class="q-px-lg q-py-sm">
        <!-- Logo / Título -->
        <div class="text-h6 font-bold cursor-pointer gradient-text"  @click="scrollToSection('inicio')">
          <span>Curso</span> Java Web
        </div>

        <q-space />

        <!-- Menu central (desktop) -->
        <div class="row items-center q-gutter-xl gt-sm">
          <q-btn flat dense label="Início" class="text-white menu-font" no-caps @click="scrollToSection('inicio')" />
          <q-btn flat dense label="Conteúdo" class="text-white menu-font" no-caps @click="scrollToSection('conteudos')" />
          <q-btn flat dense label="Depoimentos" class="text-white menu-font" no-caps @click="scrollToSection('depoimentos')" />
          <q-btn flat dense label="Instrutor" class="text-white menu-font" no-caps @click="scrollToSection('instrutor')" />
        </div>
        <!-- Menu hamburguer (mobile apenas) -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="text-white lt-md"
          @click="menu = !menu"
        />

        <!-- Botão Área do aluno -->
        <q-btn
          unelevated
          color="primary"
          class="text-white font-bold q-ml-md"
          label="Entrar"
          no-caps
          style="padding: 8px 18px; font-weight: 600; border-radius: 8px;"
          @click="onLogin"
        />
      </q-toolbar>
    </q-header>

    <!-- Drawer (menu lateral mobile) -->
    <q-drawer
      v-model="menu"
      side="right"
      overlay
      :breakpoint="600"
      class="bg-grey-10 text-white"
    >
      <q-list>
        <q-item clickable v-ripple class="menu-font" @click="scrollToSection('inicio'); menu = false">
          <q-item-section>Início</q-item-section>
        </q-item>
        <q-item clickable v-ripple class="menu-font" @click="scrollToSection('conteudos'); menu = false">
          <q-item-section>Conteúdo</q-item-section>
        </q-item>
        <q-item clickable v-ripple class="menu-font" @click="scrollToSection('depoimentos'); menu = false">
          <q-item-section>Depoimentos</q-item-section>
        </q-item>
        <q-item clickable v-ripple class="menu-font" @click="scrollToSection('instrutor'); menu = false">
          <q-item-section>Instrutor</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  <section id="inicio"></section>
    <!-- Main Content -->
    <q-page-container class="bg-gray-light text-blue-dark">

      <!-- Banner topo -->
      <div class="hero-banner">
        <span>🚀 Seja o próximo aluno contratado</span>
      </div>
    <!-- Hero -->
<!-- Hero -->
<section id="hero" class="q-pa-xl hero-section">
  <div class="hero-grid">
    <!-- Texto -->
    <div class="hero-left">
      <h1 class="hero-title">
        Conquiste sua carreira como <br />
        <span class="highlight">Desenvolvedor Java Fullstack</span> em 2025!
      </h1>
      <p class="hero-subtitle">
        Salários a partir de
        <span class="highlight-salary">R$ 4.000</span>
        e podendo ultrapassar <b>R$ 15.000</b>, mesmo trabalhando de casa.
      </p>

      <!-- NOVO DETALHE -->
      <div class="highlight-badge">
        🎓 Não é necessário ter faculdade!
      </div>

      <!-- CTA direto -->
<q-btn
  color="green"
  unelevated
  rounded
  size="lg"
  class="q-mt-lg font-bold pulse-btn neon-border"
  label="Quero ser um programador desejado"
  icon-right="chevron_right"
  @click="onSubscribe"
/>

    </div>

    <!-- Vídeo -->
    <div class="hero-right">
      <div class="video-container">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Vídeo de Apresentação"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</section>

      <!-- Benefícios -->
      <section id="aulas-praticas" class="q-pa-xl beneficios-section">
        <!-- Grid de benefícios -->
        <div class="benefits-grid">
          <div class="benefit-item" data-icon="🖥️">Aulas práticas 100% online</div>
          <!-- <div class="benefit-item" data-icon="🤝">Atendimento e suporte humano</div> -->
          <div class="benefit-item" data-icon="💻">Projetos reais para o seu portfólio (Github)</div>
          <div class="benefit-item" data-icon="📜">Certificados valorizados no mercado</div>
          <div class="benefit-item" data-icon="♾️">Acesso vitalício com atualizações constantes</div>
        </div>

        <!-- Badge -->
        <!-- <div class="q-mt-xl text-center">
          <span class="inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-md">
            +500 alunos contratados em 2024
          </span>
        </div> -->
      </section>

      <!-- Seção 3 - Faixa Salarial -->
<section id="salarios" class="q-pa-xl salary-section">
  <div class="text-center q-mb-xl">
      <h2 class="instructor-title">
        <span class="emoji">💰</span>
        <span class="gradient-title"> Pesquisa Salarial de Programadores Brasileiros 2025</span>
      </h2>
    <p class="salary-subtitle">
      Confira a <b>média salarial por nível de experiência</b> no mercado brasileiro.
    </p>
  </div>

  <!-- Grid de salários -->
  <div class="salary-grid">
    <!-- Estágio -->
    <div class="salary-card">
      <div class="salary-level">Estágio</div>
      <div class="salary-value">R$ 1.743,40</div>
      <div class="salary-trend down">🠗</div>
    </div>

    <!-- Júnior -->
    <div class="salary-card highlight-card">
      <div class="salary-level">Júnior</div>
      <div class="salary-value">R$ 4.154,21</div>
      <div class="salary-trend up">🠕</div>
    </div>

    <!-- Pleno -->
    <div class="salary-card">
      <div class="salary-level">Pleno</div>
      <div class="salary-value">R$ 7.840,74</div>
      <div class="salary-trend down">🠗</div>
    </div>

    <!-- Sênior -->
    <div class="salary-card highlight-card">
      <div class="salary-level">Sênior</div>
      <div class="salary-value">R$ 15.635,35</div>
      <div class="salary-trend up">🠕</div>
    </div>

    <!-- Especialista / Tech Lead -->
    <div class="salary-card">
      <div class="salary-level">Especialista / Tech Lead</div>
      <div class="salary-value">R$ 19.290,08</div>
      <div class="salary-trend up">🠕</div>
    </div>
  </div>

  <!-- Fonte -->
  <div class="text-center q-mt-lg text-sm text-white opacity-80">
    Fonte: <b>Código Fonte</b>
  </div>
</section>

<!-- Seção Conteúdo -->
<section id="conteudos" class="q-pa-xl content-section">
  <div class="text-center q-mb-xl">
    <h2 class="instructor-title">
      <span class="emoji">📚</span>
      <span class="gradient-title"> Conteúdo</span>
    </h2>
    <p class="content-subtitle">
      Confira os <b>8 módulos programados, que juntos ultrapassam 20 horas de conteúdo</b> e avance no seu ritmo!
    </p>
  </div>

  <!-- Grid de módulos -->
  <div class="modules-grid">

    <!-- Módulo 1 – Algoritmos e Lógica de Programação -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-status gravando">🎥 Gravando...</span>
        <span class="module-number">01</span>
      </div>
      <h3 class="module-title">Módulo 1 – Algoritmos e Lógica de Programação</h3>

      <div class="module-item">
        <span class="icon">🧠</span>
        <strong>Introdução à Lógica</strong>
        <p>Conceitos de lógica, raciocínio estruturado e resolução de problemas</p>
      </div>
      <div class="module-item">
        <span class="icon">🔀</span>
        <strong>Estruturas de Decisão</strong>
        <p>Uso de if, else e switch para tomada de decisão</p>
      </div>
      <div class="module-item">
        <span class="icon">🔁</span>
        <strong>Estruturas de Repetição</strong>
        <p>Loops for, while, do-while e controle de iterações</p>
      </div>
      <div class="module-item">
        <span class="icon">📊</span>
        <strong>Algoritmos e Fluxogramas</strong>
        <p>Criação de algoritmos simples e representação visual com fluxogramas</p>
      </div>
      <div class="module-item">
        <span class="icon">🛠️</span>
        <strong>Prática de Exercícios</strong>
        <p>Resolução de problemas passo a passo, focando pensamento lógico</p>
      </div>

      <div class="module-tags">
        <span>Lógica</span>
        <span>Algoritmos</span>
        <span>Programação</span>
      </div>
    </div>

    <!-- Módulo 2 – Fundamentos da Linguagem de Programação Java -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-status programado">⚪ Programado</span>
        <span class="module-number">02</span>
      </div>
      <h3 class="module-title">Módulo 2 – Fundamentos da Linguagem de Programação Java</h3>

      <div class="module-item">
        <span class="icon">💻</span>
        <strong>Introdução à linguagem Java</strong>
        <p>Variáveis, tipos de dados e operadores</p>
      </div>
      <div class="module-item">
        <span class="icon">🔁</span>
        <strong>Estruturas de controle</strong>
        <p>If, switch, loops (for, while, do-while)</p>
      </div>
      <div class="module-item">
        <span class="icon">📚</span>
        <strong>Arrays e Coleções</strong>
        <p>ArrayList, HashMap</p>
      </div>
      <div class="module-item">
        <span class="icon">⚙️</span>
        <strong>Métodos e Funções</strong>
        <p>Definição e uso de métodos</p>
      </div>
      <div class="module-item">
        <span class="icon">🛠️</span>
        <strong>Configuração do Ambiente</strong>
        <p>Setup do JDK, IDEs e variáveis de ambiente</p>
      </div>

      <div class="module-tags">
        <span>Java</span>
        <span>Básico</span>
        <span>Setup</span>
      </div>
    </div>

    <!-- Módulo 3 – Programação Orientada a Objetos -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-status programado">⚪ Programado</span>
        <span class="module-number">03</span>
      </div>
      <h3 class="module-title">Módulo 3 – Programação Orientada a Objetos</h3>

      <div class="module-item">
        <span class="icon">🏛️</span>
        <strong>Classes e Objetos</strong>
        <p>Criação e uso de classes</p>
      </div>
      <div class="module-item">
        <span class="icon">🔐</span>
        <strong>Encapsulamento</strong>
        <p>Construtores, getters e setters</p>
      </div>
      <div class="module-item">
        <span class="icon">♻️</span>
        <strong>Herança e Polimorfismo</strong>
        <p>Reutilização e sobrecarga</p>
      </div>
      <div class="module-item">
        <span class="icon">📦</span>
        <strong>Interfaces e Abstração</strong>
        <p>Interfaces e classes abstratas</p>
      </div>
      <div class="module-item">
        <span class="icon">🔢</span>
        <strong>Enum e Constantes</strong>
        <p>Tipos fixos de dados</p>
      </div>

      <div class="module-tags">
        <span>POO</span>
        <span>Java</span>
        <span>Classes</span>
      </div>
    </div>

    <!-- Módulo 4 – Introdução ao Banco de Dados -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-status programado">⚪ Programado</span>
        <span class="module-number">04</span>
      </div>
      <h3 class="module-title">Módulo 4 – Introdução ao Banco de Dados</h3>

      <div class="module-item">
        <span class="icon">🗂️</span>
        <strong>Modelagem DER</strong>
        <p>Visual Paradigm e planejamento das entidades e relacionamentos</p>
      </div>
      <div class="module-item">
        <span class="icon">💾</span>
        <strong>SQL Básico</strong>
        <p>Criação de tabelas, queries e relacionamentos</p>
      </div>
      <div class="module-item">
        <span class="icon">🔗</span>
        <strong>JPA/Hibernate</strong>
        <p>Mapeamento de entidades, persistência e relacionamentos</p>
      </div>
      <div class="module-item">
        <span class="icon">📝</span>
        <strong>Mapeamento de Entidades do Projeto</strong>
        <p>Parte 1, 2 e 3 do projeto prático</p>
      </div>

      <div class="module-tags">
        <span>Banco de Dados</span>
        <span>SQL</span>
        <span>JPA</span>
      </div>
    </div>

    <!-- Módulo 5 – Backend & Testes Unitários -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-status liberado">✔ Liberado</span>
        <span class="module-number">05</span>
      </div>
      <h3 class="module-title">Módulo 5 – Backend & Testes Unitários</h3>

      <div class="module-item">
        <span class="icon">⚙️</span>
        <strong>Spring Boot CRUD</strong>
        <p>POST, GET, PUT, DELETE, filtros e validações</p>
      </div>
      <div class="module-item">
        <span class="icon">🔗</span>
        <strong>JPA/Hibernate</strong>
        <p>Integração com banco de dados, entidades, relacionamentos e queries avançadas</p>
      </div>
      <div class="module-item">
        <span class="icon">🧪</span>
        <strong>Testes Unitários</strong>
        <p>JUnit para endpoints, mocks e validação de regras de negócio</p>
      </div>
      <div class="module-item">
        <span class="icon">🛠️</span>
        <strong>Serviços e Camadas</strong>
        <p>Service, Repository, Controller, boas práticas de arquitetura</p>
      </div>
      <div class="module-item">
        <span class="icon">📜</span>
        <strong>Boas práticas</strong>
        <p>Tratamento de exceções, logs e segurança básica</p>
      </div>

      <div class="module-tags">
        <span>Backend</span>
        <span>Spring Boot</span>
        <span>Testes</span>
      </div>
    </div>

    <!-- Módulo 6 – Frontend -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-status liberado">✔ Liberado</span>
        <span class="module-number">06</span>
      </div>
      <h3 class="module-title">Módulo 6 – Frontend</h3>

      <div class="module-item">
        <span class="icon">🌐</span>
        <strong>Quasar/Vue.js</strong>
        <p>Componentes, layouts, formulários e tabelas</p>
      </div>
      <div class="module-item">
        <span class="icon">🔄</span>
        <strong>CRUD Frontend</strong>
        <p>Cadastro, edição, visualização, consulta e exclusão integrado ao backend</p>
      </div>
      <div class="module-item">
        <span class="icon">⚡</span>
        <strong>Comunicação com API</strong>
        <p>Axios, requisições GET/POST/PUT/DELETE e tratamento de respostas</p>
      </div>
      <div class="module-item">
        <span class="icon">📝</span>
        <strong>Validações de Formulário</strong>
        <p>Campos obrigatórios, mensagens de erro e feedback visual</p>
      </div>
      <div class="module-item">
        <span class="icon">🎨</span>
        <strong>Estilização e Responsividade</strong>
        <p>Classes Quasar/Tailwind e layouts adaptativos</p>
      </div>

      <div class="module-tags">
        <span>Frontend</span>
        <span>Vue.js</span>
        <span>Interface</span>
      </div>
    </div>

    <!-- Módulo 7 – Relatório -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-status liberado">✔ Liberado</span>
        <span class="module-number">07</span>
      </div>
      <h3 class="module-title">Módulo 7 – Relatório</h3>

      <div class="module-item">
        <span class="icon">📦</span>
        <strong>Exportar dados CSV</strong>
        <p>Integração backend + frontend para exportação de dados com Apache POI</p>
      </div>

      <div class="module-tags">
        <span>Relatório</span>
        <span>CSV</span>
        <span>Dados</span>
      </div>
    </div>

    <!-- Módulo 8 – Hospedagem e Domínio -->
    <div class="module-card">
      <div class="module-header">
        <span class="module-status programado">✔ Programado</span>
        <span class="module-number">08</span>
      </div>
      <h3 class="module-title">Módulo 8 – Hospedagem e Domínio</h3>

      <div class="module-item">
        <span class="icon">🚀</span>
        <strong>Deploy do Backend</strong>
        <p>Publicando Spring Boot no Railway</p>
      </div>
      <div class="module-item">
        <span class="icon">🌐</span>
        <strong>Deploy do Frontend</strong>
        <p>Publicando Quasar/Vue.js em produção</p>
      </div>
      <div class="module-item">
        <span class="icon">🔗</span>
        <strong>Registrar Domínio</strong>
        <p>Configuração de domínio no UOL Host</p>
      </div>
      <div class="module-item">
        <span class="icon">🔒</span>
        <strong>Boas práticas</strong>
        <p>SSL, monitoramento, deploy contínuo e segurança</p>
      </div>

      <div class="module-tags">
        <span>Hospedagem</span>
        <span>Deployment</span>
        <span>Domínio</span>
      </div>
    </div>

    <!-- Módulo 9 – Muito mais módulos futuros -->
<div class="module-card">
  <div class="module-header">
    <span class="module-status programado">🚀 Muito mais</span>
    <span class="module-number">09</span>
  </div>
  <h3 class="module-title">Muito mais... 🚀</h3>

  <div class="module-item">
    <span class="icon">✨</span>
    <strong>Mais módulos conforme as tecnologias evoluirem...</strong>
    <p>Além dos módulos programados, no futuro outros serão preparados outros...</p>
  </div>

  <div class="module-tags">
    <span>Futuro</span>
    <span>Evolução</span>
    <span>Novidades</span>
  </div>
</div>

  </div>
</section>

<!-- Seção 4 - Instrutor -->
<section id="instrutor" class="q-pa-xl instructor-section">
  <div class="instructor-container">
    <!-- Foto -->
    <div class="instructor-photo">
      <img
        src="https://media.licdn.com/dms/image/v2/D4D03AQHnH_7wrGWFkg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727467885037?e=2147483647&v=beta&t=h1doJ9W1zAL0ISYbaCmWm2OrX7ZFZrCQvREmIrAyiro"
        alt="Instrutor Wellison Alves"
      />
    </div>

    <!-- Texto -->
    <div class="instructor-text">
      <h2 class="instructor-title">
        <span class="emoji">👨‍🏫</span>
        <span class="gradient-title"> Instrutor</span>
      </h2>
      <h3 class="instructor-name">Wellison Alves da Silva</h3>
      <p class="instructor-role">
        <b>Tech Lead Java Sênior</b> com mais de <b>10 anos de experiência</b> em
        desenvolvimento de aplicações Web.
      </p>
  <p class="instructor-desc">
    Migrou de carreira assim como você e hoje compartilha sua trajetória para
    inspirar novos desenvolvedores.
  </p>
      <p class="instructor-desc">
        Especialista em <b>Java</b> com certificações internacionais obtidas via
        <span class="highlight"> Oracle</span>:
      </p>

      <!-- Lista de certificações -->
      <ul class="cert-list">
        <li>✅ Oracle Certified Associate: Database SQL (1Z0-071)</li>
        <li>✅ Oracle Certified Associate: Java Foundations (1Z0-811)</li>
        <li>✅ Oracle Certified Associate: Java SE 8 Programmer (1Z0-808)</li>
        <li>✅ Oracle Certified Professional: Java SE 11 Developer (1Z0-819)</li>
        <li>✅ Oracle Certified Professional: Java EE 7 Application Developer (1Z0-900)</li>
      </ul>

      <!-- Rodapé com LinkedIn -->
      <div class="instructor-footer">
        <a href="https://www.linkedin.com/in/wellison-alves" target="_blank" class="linkedin-link">
          <q-icon name="mdi-linkedin" size="32px" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
</section>
<!-- Seção Recomendações -->
<section id="depoimentos" class="q-pa-xl recommendations-section">
  <div class="text-center q-mb-xl">
         <h2 class="instructor-title">
        <span class="emoji">💬</span>
        <span class="gradient-title"> Recomendações de Alunos</span>
      </h2>
    <p class="content-subtitle">
      Veja o que nossos alunos estão dizendo sobre o curso!
    </p>
  </div>

  <div class="recommendations-grid">
    <!-- Depoimento 1 -->
    <div class="recommendation-card">
      <img src="https://randomuser.me/api/portraits/women/21.jpg" alt="Taísa Pierina" />
      <p>O professor exibe uma notável excelência profissional, e o curso é estruturado de forma clara e compreensível. Estou me dedicando a essa formação para expandir meus conhecimentos.</p>
      <h4>Taísa Pierina</h4>
    </div>

    <!-- Depoimento 2 -->
    <div class="recommendation-card">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos Souza" />
      <p>Curso incrível! Consegui aplicar o que aprendi nos projetos reais e já estou mais confiante na área de desenvolvimento.</p>
      <h4>Carlos Souza</h4>
    </div>

    <!-- Depoimento 3 -->
    <div class="recommendation-card">
      <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Mariana Oliveira" />
      <p>As aulas são super didáticas e o conteúdo é bem estruturado. Recomendo para quem quer aprender Java e web do zero.</p>
      <h4>Mariana Oliveira</h4>
    </div>

    <!-- Depoimento 4 -->
    <div class="recommendation-card">
      <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Felipe Lima" />
      <p>Estou impressionado com a profundidade do conteúdo e a forma como os conceitos são explicados. Vale cada minuto investido.</p>
      <h4>Felipe Lima</h4>
    </div>

    <!-- Depoimento 5 -->
    <div class="recommendation-card">
      <img src="https://randomuser.me/api/portraits/women/67.jpg" alt="Juliana Costa" />
      <p>O curso me ajudou a consolidar conhecimentos que eu tinha de forma fragmentada e trouxe segurança para meus projetos profissionais.</p>
      <h4>Juliana Costa</h4>
    </div>
  </div>
</section>
<!-- Seção Reembolso -->
<section id="reembolso" class="q-pa-xl refund-section">
  <div class="refund-container">
    <div class="refund-text">
            <h2 class="instructor-title">
        <span class="emoji">💰</span>
        <span class="gradient-title"> Reembolso Garantido</span>
      </h2>
      <p class="refund-description">
        Peça reembolso caso não sirva para você!<br><br>
        Se em até <strong>7 dias</strong> você não gostar, achar que não é para você ou por qualquer outro motivo quiser cancelar, nós daremos seu dinheiro de volta sem questionar nada.<br><br>
        Queremos que você alcance seu objetivo, então tiramos todo o seu risco de ficar com algo que não lhe serve, você precisa sair satisfeito.
      </p>
    </div>
    <div class="refund-image">
      <img src="https://javanauta.com.br/wp-content/uploads/2024/07/7dias-garantia.png" alt="Garantia de 7 dias" />
    </div>
  </div>
</section>

<!-- Seção CTA Final -->
<!-- Seção CTA Final com Valores -->
<section id="cta-expert" class="q-pa-xl cta-expert-section bg-dark text-white">
  <div class="cta-expert-container text-center q-mx-auto" style="max-width: 700px;">
    <!-- Título -->
    <h2 class="cta-title text-h4 md:text-h2 font-bold q-mb-md">
      🚀 Pronto para se tornar um <span class="highlight gradient-title">Expert em Java Web</span>?
    </h2>
    <p class="cta-subtitle text-lg q-mb-lg">
      Junte-se ao grupo seleto de <strong>desenvolvedores</strong> que já transformaram suas carreiras.
    </p>

    <!-- Valores -->
    <div class="cta-values q-mt-md q-px-md q-py-sm bg-gradient rounded-lg shadow-lg">
      <p class="text-bold text-xl md:text-2xl font-extrabold text-white mb-xs" style="font-size: 50px">
        10 x <span class="text-yellow-400">R$ 72,10</span>
      </p>
      <p class="text-xl md:text-2xl font-extrabold text-white mb-xs">
        ou <span class="text-yellow-400">R$ 599,90 à vista</span>
      </p>
      <p class="text-sm blinking-yellow">Pagamento único - Acesso vitalício</p>
    </div>

    <!-- Benefícios -->
    <ul class="cta-benefits q-mt-lg text-left q-px-md">
      <li class="q-mb-xs">✅ <strong>Acesso vitalício</strong></li>
      <li class="q-mb-xs">✅ <strong>+ de 9 módulos com MVP's reais</strong></li>
      <li class="q-mb-xs">✅ <strong>Projetos práticos</strong></li>
      <li class="q-mb-xs">✅ <strong>Certificado de conclusão</strong></li>
      <li class="q-mb-xs">✅ <strong>Garantia de 7 dias ou seu dinheiro de volta</strong></li>
    </ul>

    <!-- Botão -->
    <q-btn
      color="green"
      unelevated
      rounded
      size="lg"
      class="q-mt-lg font-bold pulse-btn neon-border"
      label="Obter curso + vantagens"
      icon="mdi-certificate"
      icon-right="chevron_right"
      @click="onSubscribe"
    />
  </div>
</section>

    </q-page-container>
  </q-layout>

    <q-dialog v-model="showUrgency">
      <q-card class="q-pa-lg text-center" style="max-width: 400px; border-radius: 16px;">
        <q-card-section>
          <div class="text-h6 font-bold text-red-600">
            ⏳ O tempo está acabando!
          </div>
          <p class="q-mt-md text-grey-8">
            Garanta sua vaga no <b>Curso Java Fullstack</b> agora mesmo.
          </p>
          <div class="q-mt-md text-lg font-bold text-blue-600">
            Oferta pode expirar em: {{ countdown }}
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            color="green"
            rounded
            label="Quero garantir minha vaga"
            icon-right="chevron_right"
            @click="onSubscribe"
            class="pulse-btn neon-border"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LandingPage',
  data () {
    return {
      faqs: ref([
        {
          question: 'Qualquer um consegue?',
          answer: 'Se você tem dedicação, então já tem o que é preciso. Minhas aulas são focadas em ensinar passo a passo de forma que todos entendam.'
        },
        {
          question: 'Precisa ter conhecimento prévio?',
          answer: 'Nem pensar! Esse treinamento serve para completos iniciantes que ainda nem sabem direito as oportunidades que existem dentro da programação de software.'
        },
        {
          question: 'Precisa de muita matemática?',
          answer: 'O que usamos é a matemática básica: mais, menos, multiplicação, divisão, porcentagem. Nada que você não faça no dia-a-dia.'
        },
        {
          question: 'Precisa de um computador bom?',
          answer: 'Mesmo com um computador mais antigo, ainda é possível começar. Quando você entrar em uma empresa, ele vai fornecer um computador para trabalhar, então não precisa se preocupar.'
        },
        {
          question: 'Como sei se realmente vai fazer diferença na minha vida?',
          answer: 'Se você estudar o que eu ensino e fizer tudo o que eu digo, eu sei que você vai ter resultado. Mas se continuar indeciso ou procrastinando, nada cairá do céu para você. O que você tem a perder?'
        },
        {
          question: 'Tem garantia?',
          answer: 'Sim, você acessa o curso e pode assistir. Se em 7 dias você não gostar por qualquer motivo, pode solicitar o reembolso.'
        },
        {
          question: 'Tem atendimento e suporte?',
          answer: 'Sim, totalmente humanizado, direto por WhatsApp ou pela plataforma do curso. Outros cursos cobram mais de R$ 2.000,00 por algo assim, mas você terá meu suporte durante toda a sua jornada incluso no investimento inicial.'
        }
      ]),
      menu: false,
      slide: 0,
      showMore: false,
      countdown: ref(null),
      showUrgency: ref(false),
      testimonials: [
        { text: 'O curso mudou minha carreira! As aulas são didáticas e práticas.', author: 'Ana Silva' },
        { text: 'Aprendi tudo do zero e já consegui um emprego na área.', author: 'Carlos Souza' },
        { text: 'Recomendo para quem quer dominar Java e web.', author: 'Mariana Oliveira' }
      ]
    }
  },
  mounted () {
    // Exibe o popup após 15s na página
    setTimeout(() => {
      this.showUrgency = true
      this.startCountdown(5 * 60) // 5 minutos em segundos
    }, 15000)
  },
  methods: {
    scrollToSection (id) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    startCountdown (seconds) {
      let remaining = seconds
      const interval = setInterval(() => {
        if (remaining <= 0) {
          clearInterval(interval)
          this.countdown = '00:00'
          return
        }
        const min = String(Math.floor(remaining / 60)).padStart(2, '0')
        const sec = String(remaining % 60).padStart(2, '0')
        this.countdown = `${min}:${sec}`
        remaining--
      }, 1000)
    },
    onSubscribe () {
      alert('Redirecionando para página de inscrição!')
    },
    scrollTo (sectionId) {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    onLogin () {
      alert('Abrindo área do aluno!')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@500;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Fonte para menu estilo Curso Vue.js */
.menu-font {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;
  font-size: 0.95rem;
}

/* Gradiente no título */
.gradient-text {
  background: linear-gradient(90deg, #3b82f6, #06b6d4, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-banner {
  width: 100%;
  background: #dc2626;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
}

/* Hero com duas colunas */
.hero-section {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 40px;
  text-align: left;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  max-width: 1200px;
  width: 100%;
}

.hero-left {
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
}
.hero-title .highlight {
  color: #facc15;
}
.hero-subtitle {
  font-size: 1.4rem;
  margin-top: 10px;
  opacity: 0.95;
  max-width: 600px;
}

/* Vídeo */
.hero-right .video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 6px 16px rgba(0,0,0,0.25);
}
.hero-right iframe {
  width: 100%;
  height: 100%;
}

/* Benefícios */
.beneficios-section {
  background: linear-gradient(135deg, #06b6d4, #10b981);
  padding: 3px 20px;
  color: white;
}

.gradient-title {
  background: linear-gradient(90deg, #facc15, #f97316, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-benefits {
  margin: 24px 0;
  padding-left: 0;
  list-style: none;
  font-size: 1.05rem;
  font-weight: 500;
}
.hero-benefits li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  margin: 60px 0;
}

.benefit-item {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 24px;
  border-radius: 16px;
  font-size: 1.15rem;
  font-weight: 600;
  text-align: center;
  color: #fff;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.25);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.benefit-item:hover {
  transform: translateY(-8px);
  box-shadow: 0px 12px 28px rgba(0,0,0,0.35);
}
.benefit-item::before {
  content: attr(data-icon);
  display: block;
  font-size: 2rem;
  margin-bottom: 12px;
  color: #facc15;
}

/* Responsivo */
@media (max-width: 1024px) {
  .hero-title { font-size: 2.8rem; }
}
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-left {
    margin-bottom: 30px;
  }
  .hero-section {
    text-align: center;
    padding: 60px 20px;
  }
  .hero-subtitle { margin: 0 auto; }
}
@media (max-width: 600px) {
  .hero-title { font-size: 2.2rem; }
  .hero-subtitle { font-size: 1rem; }
  .hero-banner { font-size: 1rem; padding: 8px 0; }
}

/* Botão pulsando */
.pulse-btn {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

/* Destaque no salário inicial */
.highlight-salary {
  font-weight: 700;
  color: #facc15; /* amarelo chamativo */
  padding: 2px 8px;
  border: 2px solid #facc15;
  border-radius: 6px;
  display: inline-block;
  animation: border-blink 1.2s infinite;
}

@keyframes border-blink {
  0%, 100% {
    border-color: #facc15;
    box-shadow: 0 0 8px rgba(250, 204, 21, 0.7);
  }
  50% {
    border-color: #f97316; /* laranja */
    box-shadow: 0 0 14px rgba(249, 115, 22, 0.9);
  }
}

/* Badge piscando - Não precisa faculdade */
.highlight-badge {
  margin-top: 16px;
  display: inline-block;
  background: #f97316;
  color: #fff;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1rem;
  animation: blink-badge 1.2s infinite;
}

@keyframes blink-badge {
  0%, 100% {
    background: #f97316;
    box-shadow: 0 0 12px rgba(249, 115, 22, 0.9);
  }
  50% {
    background: #dc2626;
    box-shadow: 0 0 16px rgba(220, 38, 38, 1);
  }
}

.gradient-text {
  font-weight: 800;
  background: linear-gradient(90deg, #3b82f6, #06b6d4, #10b981, #facc15, #f97316, #ef4444);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-flow 6s ease infinite;
}

@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.neon-border {
  border: 2px solid #9b30ff; /* roxo neon */
  box-shadow: 0 0 10px #9b30ff,
              0 0 20px #9b30ff,
              0 0 40px #9b30ff;
  transition: box-shadow 0.3s ease-in-out;
}

.neon-border:hover {
  box-shadow: 0 0 20px #bf40ff,
              0 0 40px #bf40ff,
              0 0 60px #bf40ff;
}

/* Seção de Salários */
.salary-section {
  background: linear-gradient(135deg, #0f172a, #1e293b, #3b82f6);
  color: white;
  padding: 100px 20px;
}

.salary-title {
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.salary-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Grid de salários */
.salary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

/* Card de salário */
.salary-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 2px solid rgba(255, 255, 255, 0.15);
  padding: 28px;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.salary-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.4);
}

.salary-level {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.salary-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: #facc15; /* amarelo destaque */
  margin-bottom: 8px;
}

.salary-trend {
  font-size: 2rem;
}
.salary-trend.up {
  color: #22c55e; /* verde */
}
.salary-trend.down {
  color: #ef4444; /* vermelho */
}

/* Destaque em alguns cards */
.highlight-card {
  border: 2px solid #facc15;
  background: rgba(250, 204, 21, 0.15);
  box-shadow: 0 0 20px rgba(250, 204, 21, 0.4);
}

/* Responsivo */
@media (max-width: 600px) {
  .salary-title { font-size: 2rem; }
  .salary-value { font-size: 1.3rem; }
}

/* Seção Instrutor */
.instructor-section {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: white;
  padding: 100px 20px;
}

.instructor-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
}

.instructor-photo img {
  width: 260px;
  height: 260px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #facc15;
  box-shadow: 0 0 20px rgba(250, 204, 21, 0.6);
  transition: transform 0.3s ease;
}
.instructor-photo img:hover {
  transform: scale(1.05);
}

.instructor-title {
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.instructor-name {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #facc15;
}

.instructor-role {
  font-size: 1.2rem;
  margin-bottom: 16px;
  opacity: 0.95;
}

.instructor-desc {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.cert-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.cert-list li {
  margin-bottom: 10px;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.08);
  padding: 10px 14px;
  border-radius: 8px;
  transition: background 0.25s ease;
}
.cert-list li:hover {
  background: rgba(250, 204, 21, 0.15);
}

/* Responsivo */
@media (max-width: 900px) {
  .instructor-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .instructor-photo {
    margin: 0 auto 20px auto;
  }
}

.instructor-title {
  color: inherit; /* garante que emoji não fica transparente */
}
.instructor-title span,
.instructor-title {
  -webkit-text-fill-color: initial; /* devolve cor padrão ao emoji */
}

.instructor-footer {
  margin-top: 24px;
}

.linkedin-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0a66c2;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.linkedin-link:hover {
  color: #004182;
}

/* Conteúdo */
.content-section {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  padding: 100px 20px;
}

.content-title {
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.content-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Grid */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

/* Card */
.module-card {
  background: #0f172a; /* preto-azulado */
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.module-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.45);
}

/* Header */
.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.module-number {
  font-size: 1.2rem;
  font-weight: 800;
  color: rgba(255,255,255,0.3);
}

/* Título */
.module-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #facc15; /* amarelo destaque */
}

/* Itens */
.module-item {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 10px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.module-item strong {
  font-weight: 600;
  display: block;
  color: #fff;
}
.module-item p {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 2px 0 0 0;
}
.module-item .icon {
  font-size: 1.2rem;
}

/* Tags */
.module-tags {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.module-tags span {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255,255,255,0.2);
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 6px;
}

/* Botão ver mais */
.expand-btn {
  font-size: 1.1rem;
  padding: 10px 24px;
}
.emoji {
  margin-right: 8px;
  margin-left: 8px;
  vertical-align: middle;
  position: relative;
  z-index: 10;
}

/* Recomendações */
.recommendations-section {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
  padding: 100px 20px;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.recommendation-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.recommendation-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.45);
}

.recommendation-card img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 16px;
  border: 2px solid #facc15;
  box-shadow: 0 0 12px rgba(250,204,21,0.6);
}

.recommendation-card p {
  font-size: 0.95rem;
  opacity: 0.9;
  margin-bottom: 12px;
}

.recommendation-card h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #facc15;
  margin: 0;
}

/* Seção Reembolso */
.refund-section {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: white;
  padding: 100px 20px;
}

.refund-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.refund-text {
  max-width: 600px;
}

.refund-text h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #facc15, #fcd34d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.refund-description {
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.9;
}

.refund-image img {
  width: 250px;
  max-width: 100%;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(250,204,21,0.5);
  transition: transform 0.3s ease;
}

.refund-image img:hover {
  transform: translateY(-6px);
}

/* Responsivo */
@media (max-width: 900px) {
  .refund-container {
    flex-direction: column-reverse;
    text-align: center;
  }
  .refund-text {
    max-width: 100%;
  }
}
.faq-section {
  background-color: #f9fafb;
  color: #0f172a;
  padding: 80px 20px;
}

.faq-container {
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 12px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}

.faq-item .faq-answer {
  padding: 12px 16px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #334155;
}

.gradient-title {
  font-size: 2rem;
  margin-bottom: 40px;
  background: linear-gradient(90deg, #facc15, #fcd34d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Responsivo */
@media (max-width: 600px) {
  .faq-item .faq-answer {
    font-size: 0.9rem;
  }
}

/* Seção CTA Expert */
.cta-expert-section {
  background: linear-gradient(135deg, #10b981, #06b6d4, #3b82f6);
  color: white;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.cta-expert-container {
  max-width: 800px;
}

.cta-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 16px;
}

.cta-title .highlight {
  color: #facc15;
}

.cta-subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
  margin-bottom: 30px;
}

/* Valores */
.cta-values p {
  margin: 4px 0;
  font-size: 1.4rem;
}

.cta-benefits {
  list-style: none;
  padding: 0;
  max-width: 400px;
  margin: 0 auto;
}

.cta-benefits li {
  font-size: 1.1rem;
  margin: 8px 0;
  display: flex;
  align-items: center;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); }
  70% { box-shadow: 0 0 20px 10px rgba(0, 255, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
}

/* Apenas para reforçar caso o tema do botão sobrescreva */
.pulse-btn {
  animation: pulse 2s infinite;
}

.blinking-yellow {
  color: #FFD700; /* amarelo */
  font-weight: bold;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
}

.module-status {
  font-weight: 700;
  padding: 0.2em 0.5em;
  border-radius: 0.25em;
  font-size: 0.85rem;
  display: inline-block;
}

/* Gravando: amarelo */
.module-status.gravando {
  background-color: #ff0800; /* amarelo ouro */
  color: #000;
}

/* Programado: cinza */
.module-status.programado {
  background-color: #B0B0B0; /* cinza */
  color: #fff;
}

/* Liberado: verde com check */
.module-status.liberado {
  background-color: #4CAF50; /* verde */
  color: #fff;
}

</style>
