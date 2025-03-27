FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 4433

CMD ["nodemon","index.js"]