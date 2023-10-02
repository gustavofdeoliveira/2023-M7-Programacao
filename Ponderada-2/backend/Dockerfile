# Utiliza a imagem oficial do Node.js como base
FROM node:lts

# COPY package.json and package-lock.json files
COPY package.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY
COPY . .

RUN npm install

RUN npx prisma generate

# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
CMD npx prisma db push && npm start