# Use uma imagem de Node.js como base
FROM node:lts

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do projeto para o contêiner
COPY . .

# Construa o aplicativo React
RUN npm run build

# Expõe a porta em que a aplicação estará em execução (geralmente a 3000)
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "start"]
