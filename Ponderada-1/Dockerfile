# Use uma imagem base oficial do Node.js
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante do código da aplicação para o contêiner
COPY . .

# Exponha a porta 80 no contêiner
EXPOSE 80

# Comando para iniciar sua aplicação
CMD [ "node", "app.js" ] 
