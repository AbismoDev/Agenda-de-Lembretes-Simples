# Agenda de Lembretes Simples 🔔

## 📝 Descrição
<p>Quinto projeto do meu plano de estudos de JavaScript Vanilla, fechando a primeira metade da lista focada em manipulação de datas. Esta aplicação é uma agenda simples que permite ao usuário cadastrar lembretes com uma mensagem, data e hora específicas. A aplicação então dispara uma notificação quando o momento agendado chega.</p>

## 🚀 Funcionalidades
-   Cadastro de lembretes com mensagem e data/hora futuras.
-   Agendamento de uma notificação no navegador (via `alert`) para o momento exato do lembrete.
-   **Bônus:** Exibição de uma lista dinâmica com todos os lembretes pendentes.
-   **Bônus:** Funcionalidade para excluir um lembrete da lista, cancelando também a notificação agendada.

## 💻 Tecnologias Utilizadas
-   ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
-   ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
-   ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## 🖼️ Screenshot
![Screenshot da Aplicação](https://github.com/AbismoDev/Agenda-de-Lembretes-Simples/blob/main/assets/img/screenshot.png?raw=true)

## 🔗 Links
-   **Deploy:** https://agenda-de-lembretes-simples.vercel.app/
-   **Repositório:** https://github.com/AbismoDev/Agenda-de-Lembretes-Simples

## 🧠 Aprendizados
<p>Este projeto foi um mergulho no conceito de ações assíncronas em JavaScript. O principal aprendizado foi entender o mecanismo para agendar uma função para ser executada uma única vez no futuro. A lógica para calcular a diferença exata em milissegundos entre o agora e o momento do lembrete foi crucial.</p>
<p>O maior desafio foi escalar a solução para múltiplos lembretes, o que exigiu a criação de um sistema para agendar e gerenciar dinamicamente vários "despertadores". A implementação da funcionalidade de exclusão foi particularmente instrutiva, pois me forçou a aprender não apenas como agendar uma ação, mas também como cancelá-la para evitar "notificações fantasmas".</p>