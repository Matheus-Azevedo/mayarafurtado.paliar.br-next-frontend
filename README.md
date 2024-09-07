# Mayara Furtado - Sistema de Gerenciamento e Promoção Profissional

## Introdução

Este projeto é uma Single Page Application (SPA) desenvolvida para promover a imagem profissional da fisioterapeuta Mayara Furtado, além de gerenciar o relacionamento com seus pacientes. A aplicação permite que os usuários deixem depoimentos, consultem serviços e se tornem novos pacientes. A fisioterapeuta poderá gerenciar depoimentos e informações dos pacientes, classificando-os com base no tempo desde o último atendimento, e promovendo reativações personalizadas.

## Cronograma do Projeto

| Data       | Descrição                                                            |
| ---------- | -------------------------------------------------------------------- |
| 20/07/2024 | Definição da equipe e tema do projeto                                |
| 20/07/2024 | Entrega do documento de definição de atividades e tarefas por equipe |
| 20/07/2024 | Definição do cronograma do projeto                                   |
| DD/MM/AAAA | Entrega da Interface/Front-end do site desenvolvidas                 |
| DD/MM/AAAA | Entrega de código-fonte e demais peças desenvolvidas                 |
| DD/MM/AAAA | Entrega do link (URL) do sistema hospedado em servidor web           |
| 31/08/2024 | Apresentação parcial do projeto em equipe                            |
| 29/09/2024 | Apresentação Final do Projeto em equipe                              |

## Equipe de Desenvolvimento

| Nome                       | Função                   |
| -------------------------- | ------------------------ |
| Matheus Eduardo S. Azevedo | Analista / Desenvolvedor |
| Vinícius Freitas           | Desenvolvedor            |

## Descrição Geral do Sistema

O sistema é composto por duas principais seções: uma interface administrativa para a fisioterapeuta e uma página inicial acessível aos usuários. A fisioterapeuta poderá gerenciar depoimentos, visualizar e cadastrar pacientes, e realizar ações de reativação de pacientes. A página inicial permitirá que os usuários visualizem informações sobre a fisioterapeuta, os serviços oferecidos, e deixem depoimentos.

### Funcionalidades Principais

#### Acesso Administrativo para a Fisioterapeuta

- Visualizar e remover depoimentos dos pacientes.
- Cadastrar, visualizar e classificar pacientes em: quente, quieto e gelado, com base no tempo desde o último atendimento.
- Acessar detalhes específicos de cada paciente, incluindo a possibilidade de reativação através de mensagens personalizadas.

#### Página Inicial para Usuários

- Exibir informações sobre a fisioterapeuta e sua biografia.
- Listar os serviços oferecidos pela clínica.
- Permitir que os usuários deixem depoimentos.
- Visualizar depoimentos de outros pacientes.
- Fornecer informações sobre a localização da clínica e acesso rápido para contato via WhatsApp.

### Objetivo Principal

Promover a imagem profissional da fisioterapeuta Mayara Furtado, refletindo sua trajetória e serviços prestados, além de facilitar a interação com pacientes atuais e potenciais. O sistema permitirá a gestão eficiente de pacientes e depoimentos, incentivando a reativação de pacientes inativos e a conversão de novos pacientes.

## Requisitos Funcionais

### [UC001] Autenticar-se no Sistema

- **Descrição**: Permite à fisioterapeuta e ao administrador logarem no sistema administrativo.
- **Atores**: Fisioterapeuta, Administrador.
- **Entradas e Pré-condições**: Estar devidamente cadastrado no sistema.
- **Mensagens**:
  - M1: Login ou senha inválidos.
  - M2: Valores inválidos para login ou senha.

### [UC002] Gerenciar Depoimentos

- **Descrição**: Permite à fisioterapeuta ou ao administrador visualizar, remover e cadastrar depoimentos deixados pelos pacientes.
- **Atores**: Fisioterapeuta, Administrador.
- **Entradas e Pré-condições**: Estar autenticado no sistema.
- **Mensagens**:
  - M1: Depoimento enviado com sucesso.
  - M2: Erro ao enviar depoimento.
  - M3: Depoimento removido com sucesso.
  - M4: Erro ao remover depoimento.

### [UC003] Gerenciar Pacientes

- **Descrição**: Permite à fisioterapeuta ou ao administrador visualizar, cadastrar e classificar pacientes em categorias baseadas no tempo desde o último atendimento.
- **Atores**: Fisioterapeuta, Administrador.
- **Entradas e Pré-condições**: Estar autenticado no sistema.
- **Mensagens**:
  - M1: Paciente cadastrado com sucesso.
  - M2: Erro ao cadastrar paciente.
  - M3: Paciente atualizado com sucesso.
  - M4: Erro ao atualizar paciente.

## Requisitos Não-Funcionais

- **Usabilidade**: Interface amigável e intuitiva, adaptável a diferentes dispositivos.
- **Desempenho**: Páginas devem carregar em até 3 segundos sob condições normais.
- **Segurança**: Informações sensíveis devem ser armazenadas e transmitidas de forma segura.
- **Confiabilidade**: Alta disponibilidade, minimizando o tempo de inatividade.
- **Manutenibilidade**: Sistema modular para facilitar futuras manutenções e atualizações.

## Tecnologias Usadas

### Organização do Projeto

- **GitHub**: Controle de versão e colaboração.

### Front-end

- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **Vercel**: Plataforma para deploy de aplicações front-end.

### Back-end

- **Spring Boot**: Framework Java para desenvolvimento de APIs.
- **Docker**: Contêineres para consistência no ambiente de desenvolvimento e deploy.
- **Render**: Hospedagem de aplicações back-end com suporte para Docker.

### Testes e Qualidade

- **Vitest com V8**: Ferramenta de teste para JavaScript.
- **Cypress**: Framework de teste end-to-end.
- **TestLink**: Ferramenta de gerenciamento de casos de teste.

### Documentação

- **Documentação Escrita**: Complementa as issues e milestones do GitHub, detalhando o projeto para entrega formal.
