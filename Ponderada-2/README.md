## Projeto To-Do List com Node, React e Banco de Dados PostgreSQL

![1693273053428](image/README/1693273053428.png)
Bem-vindo a ponderada de To-Do List, uma aplicação simples para gerenciar suas tarefas do dia-a-dia. Este projeto utiliza as tecnologias Node.js, React e PostgreSQL, e oferece um ambiente de desenvolvimento usando Docker Compose para facilitar a configuração e execução.

### Motivo da escolha

As tecnologias que foram escolhidas para a construção desta ponderada se dá pelo grau de desafio que elas me proporcionam, pois são tecnologias que eu não tenho muito conhecimento, mas que eu tenho muita vontade de aprender, e acredito que essa ponderada me proporcionará um grande aprendizado. Sendo assim, o projeto pode conter alguns erros, mas que com o tempo e com a prática, eu irei melhorando e aperfeiçoando.

### Arquitetura da Solução

O projeto é composto por três principais componentes:

1. **Backend (Node.js):** Responsável por fornecer APIs para criar, ler, atualizar e deletar tarefas. Utiliza o Express.js como framework, e se conecta ao banco de dados PostgreSQL para persistência de dados.
2. **Frontend (React):** Interface de usuário onde os usuários podem interagir com as tarefas. Permite a criação, edição, conclusão e remoção de tarefas.
3. **Banco de Dados (PostgreSQL):** Armazena as informações das tarefas, incluindo seus detalhes como título, descrição e status de conclusão.

#### Frontend (React)

A construção do frontend ocorrerá usando a biblioteca React, possibilitando a criação de interfaces de usuário interativas e dinâmicas. Componentes reutilizáveis serão desenvolvidos para organizar a estrutura do aplicativo. O estado do aplicativo será gerenciado por meio de ferramentas como useState ou um gerenciador de estado, como Redux. A comunicação com o backend será realizada por meio de chamadas de API, seja via fetch ou uma biblioteca como o Axios.

##### Vantagens

Experiência Interativa: O uso do React oferece uma interface de usuário fluida e altamente responsiva.
Modularidade: A abordagem baseada em componentes permite a criação de um código modular, facilitando a manutenção e reutilização.
Gerenciamento de Estado Eficiente: O uso do useState ou de soluções de gerenciamento de estado simplifica o controle do estado do aplicativo.
Comunicação Efetiva: A comunicação com o backend é aprimorada por meio de chamadas de API assíncronas.

#### Backend (Node.js)

A camada de backend será construída utilizando o ambiente Node.js, conhecido por sua eficiência na criação de APIs RESTful. O framework Express será adotado para gerenciar rotas e solicitações. Autenticação será implementada usando JSON Web Tokens (JWT), fortalecendo a segurança e autenticando os usuários. Controladores serão definidos para lidar com a lógica de negócios, se comunicando com os modelos que representam os dados no banco de dados PostgreSQL.

##### Vantagens:

Eficiência no Gerenciamento de Solicitações: O Node.js é altamente adequado para tratar um grande número de solicitações, tornando-o ideal para APIs.
Segurança Aprimorada: A autenticação via JWT melhora a segurança e protege as rotas sensíveis.
Estrutura Organizada: A utilização do Express.js facilita a organização de rotas e lógica de manipulação de solicitações.
Flexibilidade na Modelagem de Dados: Os modelos do banco de dados permitem estruturar os dados de forma eficiente e escalável.

#### Banco de Dados (PostgreSQL):

O PostgreSQL será empregado como o sistema de gerenciamento de banco de dados para armazenar as informações das tarefas. Uma tabela específica será projetada para conter detalhes como ID, título, descrição e status de cada tarefa.

##### Fluxo do Login até o Cadastro e Deleção de uma Tarefa:

Fluxo de Login:

- O usuário insere suas credenciais no formulário de login.
- O frontend encaminha as credenciais para o backend.
- O backend verifica as credenciais e emite um token JWT se forem válidas.
- O token é retornado ao frontend e armazenado para autenticação subsequente.

Fluxo de Cadastro de Tarefa:

- O usuário logado acessa o aplicativo.
- Um novo conjunto de detalhes de tarefa é inserido em um formulário.
- O frontend envia os detalhes para o backend.
- O backend verifica o token JWT e adiciona a nova tarefa ao banco de dados.
- A tarefa é exibida na lista do usuário.

Fluxo de Deleção de Tarefa:

- O usuário logado visualiza a lista de tarefas.
- Uma tarefa é selecionada para exclusão.
- O frontend solicita a exclusão ao backend com o ID da tarefa.
- O backend valida o token JWT, remove a tarefa do banco de dados e confirma a ação.
- O frontend atualiza a lista de tarefas, refletindo a exclusão.

##### Vantagens:

Confiabilidade e Integridade: O PostgreSQL é conhecido por sua confiabilidade e recursos avançados de integridade de dados.
Suporte a Relacionamentos Complexos: A capacidade de estabelecer relacionamentos entre tabelas é benéfica para casos de dados interconectados, como as tarefas em um To-Do List.
Eficiência em Consultas: O PostgreSQL otimiza consultas complexas, garantindo um desempenho eficiente.

### Estrutura de dados

Por ser uma aplicação com poucas funções e rotas, os dados que serão armazenados no banco de dados seraão apenas das tasks e do user, sendo assim, a estrutura de dados será a seguinte:

#### Task

O modelo task representa uma tarefa a ser realizada. Possui os seguintes campos:

- id: Identificador único da tarefa, gerado automaticamente como um UUID.
- title: Título da tarefa, representado como uma string.
- dir: Diretório da tarefa, representado como uma string.
- description: Descrição da tarefa, representada como uma string.
- date: Data da tarefa, representada como uma string.
- completed: Indica se a tarefa foi concluída, representado como um valor booleano (verdadeiro ou falso), com o valor padrão como falso.
- important: Indica se a tarefa é importante, representado como um valor booleano, com o valor padrão como falso.
- createdAt: Data e hora de criação da tarefa, representada como um valor de data e hora.
- updatedAt: Data e hora da última atualização da tarefa, representada como um valor de data e hora.

#### User

O modelo user representa um usuário. Possui os seguintes campos:

- id: Identificador único do usuário, gerado automaticamente como um UUID.
- name: Nome do usuário, representado como uma string.
- email: Endereço de email do usuário, único em toda a tabela, representado como uma string.
- password: Senha do usuário, representada como uma string.
- createdAt: Data e hora de criação do usuário, representada como um valor de data e hora.

### Como Rodar usando Docker Compose

Certifique-se de que você tenha o Docker e o Docker Compose instalados em sua máquina antes de prosseguir.

1. **Clone o Repositório:**

   ```
   git clone https://github.com/gustavofdeoliveira/ToDo-Ponderada.git
   cd Todo
   ```
2. **Rodando o Docker Compose:**

   - No diretório raiz do projeto, onde está o arquivo `docker-compose.yml`, execute o comando:
     ```
     docker-compose up
     ```

   Isso criará os containers para o backend, frontend e banco de dados, e os serviços estarão disponíveis nas seguintes URLs:

   - Backend API: http://localhost:3001
   - Frontend UI: http://localhost:3000
   - Banco de Dados PostgreSQL: Host: `localhost`, Porta: `5432`
3. **Configuração Usuário no Banco de Dados:**

   - Acesse o bd criado pelo docker, pela url:

   ```
    postgresql://user:password@postgres:5432/mydatabase
   ```

   - Pelo `dbeaver`, crie um usuário na tabela `.user` de acordo com as credencias escolhidas.
4. **Acessando o Frontend:**
   Abra o navegador e acesse `http://localhost:3000` para interagir com a interface de usuário do To-Do List.
5. **Parando os Serviços:**
   Quando quiser parar os serviços, vá para o terminal onde o `docker-compose` está rodando e pressione `Ctrl+C`. Para remover os containers e redes, execute:

   ```
   docker-compose down
   ```
6. **Acesso no DockerHub:**
   ``https://hub.docker.com/repository/docker/gustavofdeoliveira/frontend-to-do-list/``
   ``https://hub.docker.com/repository/docker/gustavofdeoliveira/backend-to-do-list/``

Aproveite o gerenciamento de tarefas simplificado com seu novo To-Do List!
