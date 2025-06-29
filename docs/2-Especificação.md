# Especificações Do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Contexto.md"> Documentação de Contexto</a></span>

> Apresente uma visão geral do que será abordado nesta parte do
> documento, enumerando as técnicas e/ou ferramentas utilizadas para
> realizar a especificações do projeto

## Personas

Persona 1: Jeanice Martins Oliveira

Idade: 49 anos
Profissão: Recepcionista em hospital
Conhecimento de informática: Básico
Objetivo: Alugar um local para festa de 50 anos.
Necessidades: Local grande, com cozinha ampla e piscina. Descrição detalhada do local nos sites de busca. Certeza da escolha antes de alugar.
Frase-chave: "Preciso ter certeza de tudo antes de alugar o lugar."

Persona 2: Bores da Silva Falinho

Idade: 26 anos
Profissão: Programador de banco, estudante de Ciência da Computação.
Conhecimento de informática: Avançado
Objetivo: Alugar um local para formatura.
Necessidades: Descrição detalhada do local e preço no site. Acesso rápido e fácil ao site para convidados. Plataforma que disponibilize cópia do convite por e-mail.
Frase-chave: "Preciso que a plataforma disponibilize uma cópia do convite para ser enviado para o e-mail do comprador."

Persona 3: João Button Moreira

Idade: 36 anos
Profissão: Empresário, administrador de empresa de engenharia.
Objetivo: Alugar imóveis para eventos para expandir renda.
Necessidades: Plataforma fácil e otimizada. Informações dos interessados. Chat para conversar com compradores. Segurança na plataforma.
Frase-chave: "Seria interessante que a plataforma fosse o mais fácil e otimizada possível."

> Enumere e detalhe as personas da sua solução. Para
> tanto, baseie-se tanto nos documentos disponibilizados na disciplina
> e/ou nos seguintes links:
>
> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
> Lembre-se que você deve ser enumerar e descrever precisamente e
> personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

| EU COMO... `PERSONA` | QUERO/PRECISO ... `FUNCIONALIDADE` | PARA ... `MOTIVO/VALOR` |
|---|---|---|
| Jeanice (Usuária) | Pesquisar locais para eventos com filtros (tamanho, cozinha, piscina) | Encontrar o local ideal para minha festa de aniversário com facilidade. |
| Jeanice (Usuária) | Ver fotos e descrições detalhadas dos locais | Ter certeza de que o local atende às minhas expectativas antes de alugar. |
| Jeanice (Usuária) | Comparar preços e disponibilidade de diferentes locais | Escolher a melhor opção custo-benefício. |
| Bores (Usuário) | Criar e gerenciar convites online para a formatura | Enviar convites para todos os convidados de forma eficiente e organizada. |
| Bores (Usuário) | Ter um site fácil de usar e acessível para os convidados | Facilitar o acesso à informação sobre a formatura para todos os participantes. |
| Bores (Usuário) | Verificar a disponibilidade e reservar um local para eventos | Garantir que o local esteja disponível para a data da formatura. |
| João (Proprietário) | Cadastrar meus imóveis com fotos e descrições detalhadas | Atrair mais clientes e aumentar a locação dos meus imóveis. |
| João (Proprietário) | Receber notificações sobre novas solicitações de locação | Responder rapidamente aos interessados e otimizar o processo de locação. |
| João (Proprietário) | Gerenciar reservas e comunicação com os locatários | Manter um controle eficiente das locações e comunicação com os clientes. |
| João (Proprietário) | Ter um sistema seguro para transações financeiras | Garantir a segurança das transações e evitar problemas. |

> Apresente aqui as histórias de usuário que são relevantes para o
> projeto de sua solução. As Histórias de Usuário consistem em uma
> ferramenta poderosa para a compreensão e elicitação dos requisitos
> funcionais e não funcionais da sua aplicação. Se possível, agrupe as
> histórias de usuário por contexto, para facilitar consultas
> recorrentes à essa parte do documento.
>
> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

## Requisitos Funcionais

| ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
| RF-001 | Permitir que o usuário cadastre tarefas | ALTA |
| RF-002 | Emitir um relatório de tarefas no mês   | MÉDIA |
| RF-003 | Permitir a edição e exclusão de tarefas | ALTA |  *(Adicionado para melhor funcionalidade)*
| RF-004 | Permitir a organização das tarefas por data ou prioridade | ALTA | *(Adicionado para melhor funcionalidade)*
| RF-005 | Permitir a marcação de tarefas como concluídas | ALTA | *(Adicionado para melhor funcionalidade)*


## Requisitos Não Funcionais

| ID     | Descrição do Requisito  | Prioridade |
|-------|-------------------------|----|
| RNF-001 | O sistema deve ser responsivo para rodar em dispositivos móveis | ALTA | *(Prioridade alterada para refletir importância)*
| RNF-002 | Deve processar requisições do usuário em no máximo 3 segundos | MÉDIA | *(Prioridade alterada para refletir importância)*
| RNF-003 | O sistema deve ser seguro e proteger os dados do usuário | ALTA | *(Adicionado para segurança)*
| RNF-004 | A interface do usuário deve ser intuitiva e fácil de usar | ALTA | *(Adicionado para usabilidade)*
> Com base nas Histórias de Usuário, enumere os requisitos da sua
> solução. Classifique esses requisitos em dois grupos:
>
> - [Requisitos Funcionais
>   (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
>   correspondem a uma funcionalidade que deve estar presente na
>   plataforma (ex: cadastro de usuário).
>
> - [Requisitos Não Funcionais
>   (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
>   correspondem a uma característica técnica, seja de usabilidade,
>   desempenho, confiabilidade, segurança ou outro (ex: suporte a
>   dispositivos iOS e Android).
>
> Lembre-se que cada requisito deve corresponder à uma e somente uma
> característica alvo da sua solução. Além disso, certifique-se de que
> todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


> Enumere as restrições à sua solução. Lembre-se de que as restrições
> geralmente limitam a solução candidata.
> 
> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
