# Podenrada 4 - Intefacegráfica com Modelo

Esse projeto tem como objetivo criar uma interface gráfica para o projeto Ponderada 4, com o modelo construido na Ponderada 3, com uma interface gráfica para facilitar a utilização do sistema e uma API para comunicação com o banco de dados. Além disso, o projeto foi hospedado na AWS para que possa ser acessado de qualquer lugar.

## Tecnologias utilizadas

1. Python
2. HTML
3. CSS
4. Prisma
5. Docker
6. FastAPI
7. PostgreSQL
8. Apache2
9. 
## Ambiente de Produção

### Front-end

O front-end foi desenvolvido utilizando HTML, CSS, JavaScript e a lib Chart.js. O front-end foi hospedado primeiramente em uma imagem Docker de Apache2 e depois em uma instância EC2 da AWS. O front-end está disponível em `http://3.208.163.53:80/`

### Back-end

O back-end foi desenvolvido utilizando Python, FastAPI e Prisma. O back-end foi hospedado em uma imagem Docker de Python e depois em uma instância EC2 da AWS. O back-end está disponível no endpoint `http://http://3.208.163.53:3000/` e a sua documentação está disponível em `http://3.208.163.53:3000/docs`

Ambos foram hospedados na mesma instância EC2 da AWS fo tipo `t3.micro`, com `16GB` de Armazenamento e com o tipo de imagem `Ubuntu:latest`, os grupos de seregurança, estão permitindo as portas `5432` para o Banco de Dados, `80` para p Front-end e `3000` para o Back-end, que fazem a comunicação com o banco de dados PostgreSQL hospedado em uma instância RDS da AWS.

## Variaveis de Ambiente

`DATABASE_URL="postgresql://admin123:admin123@ponderada-4.cbgyqrypqeeb.us-east-1.rds.amazonaws.com:5432/postgres" SECRET_KEY = 'iuy287e1by87oyn'`

## Deploy na AWS

## Servicos utilizados
1. 1x EC2 - com front-end e back-end
2. 1x RDS - com banco de dados PostgreSQL

## Endereço da aplicação
`http://3.208.163.53/`

## Usuário Teste

- Email: teste@teste.com
- senha: 123456789

**Mota:** o sistema possui a parte de criação de conta

## Como rodar o projeto
1. Clone o repositório
2. Crie um arquivo `.env` na pasta raiz do projeto e adicione as variáveis de ambiente
3. Dentro da pasta raiz do projeto, execute o comando `docker compose up` para instalar as dependências do projeto.
4. Os containers serão criados e o projeto estará disponível em `http://localhost:80/`

## Documentação da API

### Documentação Local

1. A documentação da API está disponível em `http://localhost:3000/docs`. Lá você pode testar as rotas e ver os modelos de dados por meio do Swagger.

### Documentação na AWS

1. A documentação da API está disponível em `http://3.208.163.53:3000/docs`. Lá você pode testar as rotas e ver os modelos de dados por meio do Swagger.

## DockerHub

1. Back-end: https://hub.docker.com/repository/docker/gustavofdeoliveira/p4-backend
2. Front-end: https://hub.docker.com/repository/docker/gustavofdeoliveira/p4-frontend
## Video de demonstração

[Acessar o Link](https://drive.google.com/file/d/1PCH2SKlDK0diCTLxITTfd0nb5eW_9jIz/view?usp=sharing)
